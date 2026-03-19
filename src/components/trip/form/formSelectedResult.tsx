import React, { useState, ChangeEvent, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import Collapse from '@material-ui/core/Collapse'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { useTranslation } from 'react-i18next'
import AccordionItem from './accordionItem'
import { FormikProps, FieldArrayRenderProps } from 'formik'
import { FormDayTripStructure, DayTripStructure, DayTripAttractionStructure } from './FormDayTripStructure'
import { getRoute, getRouteData } from '../apiTrip'

type UseAttractionSelectedResult = {
    formDayTripProps: FormikProps<FormDayTripStructure>
    fieldDayTripArray: FieldArrayRenderProps
    name: string
    indexCurrentDay: number
} & DayTripStructure

const useAttractionSelectedResult = ({
    attractionSelect = [],
    formDayTripProps,
    name,
    ...props
}: UseAttractionSelectedResult) => {
    const [open, setOpen] = useState(true)

    const handleToggle = () => {
        setOpen(!open)
    }

    const onDeleteRoute = useCallback(
        async (indexDel: number, values: DayTripAttractionStructure) => {
            let timelineListUpdate: DayTripAttractionStructure[] = [...attractionSelect]

            // if (indexDel === 0 && attractionSelect?.length > 1) {
            //     // ลบจุดเริ่มต้น และใน timeline มีมากกว่า 1 จุด
            //     timelineListUpdate[1].geometry = []
            //     timelineListUpdate[1].distance = 0
            // } else if (indexDel !== attractionSelect?.length - 1) {
            //     // ลบจุดที่ไม่ใช่จุดเริ่มต้นและสุดท้าย (เปลื่ยนแปลงค่า route ที่ตำแหน่งที่ลบ + 1)
            //     const pointStart = timelineListUpdate[indexDel - 1]
            //     const pointEnd = timelineListUpdate[indexDel + 1]
            //     const route = await getRouteData(pointStart, pointEnd)
            //     timelineListUpdate[indexDel + 1].geometry = route.geometry
            //     timelineListUpdate[indexDel + 1].distance = route.distance
            // }

            timelineListUpdate = timelineListUpdate.filter((_, index: number) => index !== indexDel)
            formDayTripProps?.setFieldValue(`${name}.attractionSelect`, timelineListUpdate)
        },
        [attractionSelect],
    )

    return { handleToggle, open, onDeleteRoute }
}

type AttractionSelectedResultViewProps = {
    formDayTripProps: FormikProps<FormDayTripStructure>
    fieldDayTripArray: FieldArrayRenderProps
    name: string
    indexCurrentDay: number
} & DayTripStructure &
    ReturnType<typeof useAttractionSelectedResult>

const FormSelectedResultView: React.FC<AttractionSelectedResultViewProps> = ({
    handleToggle,
    open,
    formDayTripProps,
    name,
    onDeleteRoute,
    attractionSelect = [],
    ...props
}) => {
    const { t, i18n } = useTranslation()

    return (
        <>
            {attractionSelect?.length > 0 && (
                <>
                    <Grid
                        item
                        xs={12}
                        style={{ height: 40, background: '#D4E8DC', padding: '10px 20px', cursor: 'pointer' }}
                        container
                        justify='space-between'
                        onClick={handleToggle}
                    >
                        <Typography style={{ color: '#009687', fontSize: 14, fontFamily: 'Prompt-Regular' }}>
                            {t('TRIP.SELECTED_LOCATION_TEXT')}
                        </Typography>

                        <IconButton size='small' style={{ marginTop: -3, marginRight: 0 }} onClick={handleToggle}>
                            {open ? (
                                <ExpandLessIcon style={{ fontSize: 20, color: '#009687' }} />
                            ) : (
                                <ExpandMoreIcon style={{ fontSize: 20, color: '#009687' }} />
                            )}
                        </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                        <Collapse in={open}>
                            <Grid item xs={12} style={{ padding: '10px 25px', border: '2px solid #D4E8DC' }}>
                                {attractionSelect?.map((item: DayTripAttractionStructure, index: number) => {
                                    return (
                                        <AccordionItem
                                            key={item.attracID}
                                            {...item}
                                            data={attractionSelect}
                                            index={index}
                                            isChecked={true}
                                            onChecked={(evt, values: DayTripAttractionStructure) => {
                                                onDeleteRoute(index, values)
                                            }}
                                        />
                                    )
                                })}
                            </Grid>
                        </Collapse>
                    </Grid>
                </>
            )}
        </>
    )
}

type AttractionSelectedResultProps = {
    formDayTripProps: FormikProps<FormDayTripStructure>
    fieldDayTripArray: FieldArrayRenderProps
    name: string
    indexCurrentDay: number
} & DayTripStructure

const FormSelectedResult: React.FC<AttractionSelectedResultProps> = (props) => {
    const state = useAttractionSelectedResult(props)
    return <FormSelectedResultView {...state} {...props} />
}

export default FormSelectedResult
