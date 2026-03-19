import { FormikProps, FieldArrayRenderProps } from 'formik'
import React, { useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Store from '../../../stores/rootStore'
import { DayTripStructure, FormDayTripStructure } from './FormDayTripStructure'
import { FormSearchProps } from './formSearch'
import useAppLoading from '../../loading/useAppLoading'

type UseFormSearchProps = {
    formDayTripProps: FormikProps<FormDayTripStructure>
    fieldDayTripArray: FieldArrayRenderProps
    name: string
    indexCurrentDay: number
} & DayTripStructure

const useFormSearch = ({ formDayTripProps, name, indexCurrentDay, ...props }: UseFormSearchProps) => {
    const { TripStore } = Store()
    const { t, i18n } = useTranslation()

    const loading = useAppLoading()

    const onSearch = useCallback(async () => {
        const provCode = formDayTripProps.getFieldProps(`${name}.provID`).value
        const attractionTypeID = formDayTripProps.getFieldProps<string[]>(`${name}.attractionTypeID`).value ?? []
        const formState = formDayTripProps?.values

        // /**ล้างค่าก่อน*/
        // formDayTripProps.setFieldValue('days',formState.days.map((data : DayTripStructure,index :number)=>{
        //     if(index !== indexCurrentDay ){
        //         data.provID = null
        //         data.attractionTypeID =null
        //     }
        //     return data
        //   }))

        //  /**ล้างค่าก่อน*/

        if (provCode) {
            loading.functions.setShowLoading()
            /** call service กิจกรรมท่องเที่ยวของแต่ละชุมชน*/
            const response = await TripStore.searchAttractions({
                attractionTypeID: attractionTypeID?.length ? attractionTypeID.toString() : null,
                provID: parseInt(provCode),
            })

            /** ได้ข้อมูลมาแล้วจัดโครงสร้างข้อมูลใหม่ */
            const renewResponse = response.map(({ attractionList = [], ...item }: any) => ({
                ...item,
                attractionList: attractionList.map((item: any) => ({
                    ...item,
                    // isChecked : false,
                    geometry: [],
                    distance: 0,
                    distanceDisplay: '',
                })),
            }))

            /** set เข้า form  */
            formDayTripProps.setFieldValue(`${name}.community`, renewResponse)
            loading.functions.setHideLoading()
        } else {
            // ถ้าไม่เลือกจังหวัด
            formDayTripProps.setFieldError(`${name}.provID`, t('TRIP.PLEASE_SELECT_TEXT'))
            formDayTripProps.setFieldTouched(`${name}.provID`, true)
        }
    }, [name, formDayTripProps, i18n.language])

    return {
        attractionType: TripStore.attractionType,
        province: TripStore.province,
        attractionList: TripStore.attractionList,
        onSearch,
    }
}

export default useFormSearch
