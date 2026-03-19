import { Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import FormSearch from './formSearch'
import FormSearchResult from './formSearchResult'
import FormSelectedResult from './formSelectedResult'
import ReportProblemRoundedIcon from '@material-ui/icons/ReportProblemRounded'
import { FormikProps, FieldArrayRenderProps } from 'formik'
import { FormDayTripStructure, DayTripStructure } from './FormDayTripStructure'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

type UseFormCreateProps = {
    formDayTripProps: FormikProps<FormDayTripStructure>
    fieldDayTripArray: FieldArrayRenderProps
    name: string
    indexCurrentDay: number
} & DayTripStructure

const useFormCreate = ({ budget, attractionSelect, ...item }: UseFormCreateProps) => {
    const budgetValue = budget
    const totalCost =
        attractionSelect?.length &&
        attractionSelect
            .filter((attractionSelect) => typeof attractionSelect.attracFee === 'number')
            .map((attractionSelect) => attractionSelect.attracFee)
            .reduce((acc: any, crr: any) => acc + crr, 0)

    return { budget: budgetValue, totalCost }
}

type FormCreateViewProps = {
    formDayTripProps: FormikProps<FormDayTripStructure>
    fieldDayTripArray: FieldArrayRenderProps
    name: string
    indexCurrentDay: number
} & DayTripStructure &
    ReturnType<typeof useFormCreate>

let FormCreateView: React.FC<FormCreateViewProps> = (props) => {
    const { t } = useTranslation()
    const { budget, totalCost } = props
    return (
        <>
            <Grid container alignItems='flex-start'>
                {/** ค้นหากิจกรรม */}
                <FormSearch {...props} />
                {/** แสดงรายการกิจกรรมที่เลือก */}
                <FormSelectedResult {...props} />
                {/** ผลลัพธ์ค้นหากิจกรรม */}
                <FormSearchResult {...props} />
                {/** คุณมีค่าใช้จ่ายในการทำกิจกรรมเกินกว่างบประมาณที่ตั้งใว้ */}
                {budget && totalCost > Number(budget) && (
                    <Grid item xs={12} container justify='flex-end' alignItems='center' style={{ marginTop: 30 }}>
                        <ReportProblemRoundedIcon
                            style={{
                                fontSize: 35,
                                color: '#F30606',
                                marginRight: 15,
                            }}
                        />
                        <Typography variant='h5' style={{ color: '#F30606' }}>
                            {t('TRIP.ESTIMATE_COST_OVER_TEXT')}
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </>
    )
}

FormCreateView = observer(FormCreateView)

type FormCreateProps = {
    formDayTripProps: FormikProps<FormDayTripStructure>
    fieldDayTripArray: FieldArrayRenderProps
    name: string
    indexCurrentDay: number
} & DayTripStructure

let FormCreate: React.FC<FormCreateProps> = (props) => {
    const state = useFormCreate(props)
    return <FormCreateView {...state} {...props} />
}

FormCreate = observer(FormCreate)

export default FormCreate
