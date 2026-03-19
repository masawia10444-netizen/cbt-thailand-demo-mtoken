import { FieldArrayRenderProps, FormikProps } from 'formik'
import React, { useCallback } from 'react'
import { DayTripAttractionStructure, FormDayTripStructure, DayTripStructure } from './FormDayTripStructure'
import { useConfirmationDialog } from '../../../controls/dialog/confirmationDialog'
import { useTranslation } from 'react-i18next'

type UseFieldArrayAttractionItem = {
    attractionList: DayTripAttractionStructure[]
    communityFieldArray: FieldArrayRenderProps
    name: string
    nameAttractionSelect: string
    formDayTripProps: FormikProps<FormDayTripStructure>
    fieldDayTripArray: FieldArrayRenderProps
    dayOfTrip: number
} & DayTripStructure

const useFieldArrayAttractionItem = ({
    nameAttractionSelect,
    attractionSelect,
    ...props
}: UseFieldArrayAttractionItem) => {
    // console.log('props', props)
    const { t, i18n } = useTranslation()

    const { openDialogConfirmation } = useConfirmationDialog()

    const onAddRoute = useCallback(
        async (fieldArray: FieldArrayRenderProps, values: DayTripAttractionStructure) => {
            const attractionSelectCurrent = fieldArray?.form?.getFieldProps(nameAttractionSelect)?.value
            if (attractionSelectCurrent?.length < 10) {
                // ห้าม add เกิน 10
                // if (attractionSelectCurrent?.length) {
                //     const getStartLatLon = [...attractionSelectCurrent].pop()
                //     const startLatLon = getStartLatLon
                //     const endLatLon = values
                //     const routeData = await getRouteData(startLatLon, endLatLon)
                //     fieldArray.push({ ...values, geometry: routeData.geometry, distance: routeData.distance })
                // } else {
                //     fieldArray.push(values)
                // }

                fieldArray.push(values)
            } else {
                openDialogConfirmation({
                    title: t('TRIP.LIMIT_SELECTED_LOCATION_MAIN_TEXT'),
                    message: t('TRIP.LIMIT_SELECTED_LOCATION_MINOR_TEXT'),
                    showButtonCancel: false,
                    okText: t('TRIP.BTN_OK_TEXT'),
                })
            }
        },
        [i18n.language],
    )

    return { onAddRoute }
}

export default useFieldArrayAttractionItem
