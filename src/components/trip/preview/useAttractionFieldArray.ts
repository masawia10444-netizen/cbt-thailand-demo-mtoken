import React, { useCallback, useEffect ,useMemo } from 'react'
// import jsonp from 'jsonp'
// import querystring from 'querystring'
import { DropResult, ResponderProvided } from 'react-beautiful-dnd'
import { TResGetRoute, getRoute, TRoute, getRouteData } from '../apiTrip'
import Store from '../../../stores/rootStore'
import { DayTripAttractionStructure, DayTripStructure, FormDayTripStructure } from '../form/FormDayTripStructure'
import { toJS } from 'mobx'
import { FormikProps, FieldArrayRenderProps } from 'formik'
import useAppLoading from '../../loading/useAppLoading'
import { useConfirmationDialog } from '../../../controls/dialog/confirmationDialog'
import { useTranslation } from 'react-i18next'
// import useResizeObserver from 'use-resize-observer'
// import { toJS } from 'mobx'

type HookAttractionFieldArray = {
    formDayTripProps: FormikProps<FormDayTripStructure>
    fieldDayTripArray: FieldArrayRenderProps
    name: string
} & DayTripStructure

const useAttractionFieldArray = ({ attractionSelect, formDayTripProps, name, ...props }: HookAttractionFieldArray) => {

    const { TripStore, LoadingStore } = Store()
    const { t, i18n } = useTranslation()
    const loading = useAppLoading()


    const { openDialogConfirmation } = useConfirmationDialog()

    const reorder = useCallback((list: Array<any>, startIndex: number, endIndex: number) => {
     
        const result = Array.from(list)
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)
        return result
    }, [])

    const reOrderRoute = useCallback(async (timeline, curIndex, newIndex) => {
        let timelineListUpdate = [...timeline]
        //update รายการที่อยู่ภายใต้ตำแหน่งเดิมของตัวที่ย้าย
        if (timelineListUpdate[curIndex + 1]) {
            const pointStart1 = timelineListUpdate[curIndex - 1] as DayTripAttractionStructure
            const pointEnd1 =
                timelineListUpdate[curIndex + 1] && (timelineListUpdate[curIndex + 1] as DayTripAttractionStructure)

            const routeUpdate1 = await getRouteData(pointStart1, pointEnd1)
            timelineListUpdate[curIndex + 1].geometry = routeUpdate1.geometry
            timelineListUpdate[curIndex + 1].distance = routeUpdate1.distance
        }

        //ทำการจัดเรียงใหม่
        timelineListUpdate = reorder(timelineListUpdate, curIndex, newIndex)

        // เก็บค่า getRouteData เพื่อเอาไว้ยิงทีเดียว
        const promiseGetRoute: Array<Promise<{
            geometry: TRoute
            distance: number
        }> | null> = [null, null]

        //update รายการที่อยู่ภายใต้ตำแหน่งใหม่ของตัวที่ย้าย
        if (timelineListUpdate[newIndex + 1]) {
            const pointStart2 = timelineListUpdate[newIndex]
            const pointEnd2 = timelineListUpdate[newIndex + 1] && timelineListUpdate[newIndex + 1]
            promiseGetRoute[0] = getRouteData(pointStart2, pointEnd2)
        }

        // update ค่ารายการที่ย้าย
        if (newIndex === 0) {
            timelineListUpdate[newIndex].geometry = []
            timelineListUpdate[newIndex].distance = 0
        } else {
            const pointStart3 = timelineListUpdate[newIndex - 1] && timelineListUpdate[newIndex - 1]
            const pointEnd3 = timelineListUpdate[newIndex]
            promiseGetRoute[1] = getRouteData(pointStart3, pointEnd3)
        }

        const [routeUpdate2, routeUpdate3] = await Promise.all(promiseGetRoute)
        if (routeUpdate2) {
            timelineListUpdate[newIndex + 1].geometry = routeUpdate2.geometry
            timelineListUpdate[newIndex + 1].distance = routeUpdate2.distance
        }
        if (routeUpdate3) {
            timelineListUpdate[newIndex].geometry = routeUpdate3.geometry
            timelineListUpdate[newIndex].distance = routeUpdate3.distance
        }
        return timelineListUpdate
    }, [])

    const onDragEnd = useCallback(
        async (result: DropResult, provided: ResponderProvided) => {
            if (result.source && typeof result?.destination?.index === 'number') {
                loading.functions.setShowLoading()
                // สั่ง reorder แล้วให้ form change ก่อน
                const timelineListUpdate1 = reorder(attractionSelect, result.source.index, result.destination.index)
                formDayTripProps?.setFieldValue(`${name}.attractionSelect`, timelineListUpdate1)

                // สั่ง reorder แล้วให้ form change อีกรอบเพื่อรอยิง service เอา route
                const timelineListUpdate2 = await reOrderRoute(
                    toJS(attractionSelect),
                    result.source.index,
                    result.destination.index,
                )

                formDayTripProps?.setFieldValue(`${name}.attractionSelect`, timelineListUpdate2)

                loading.functions.setHideLoading()
            }
        },
        [attractionSelect],
    )

    const onDeleteRoute = useCallback(
        async (indexDel: number, values: DayTripAttractionStructure) => {
            openDialogConfirmation({
                okText: t('TRIP.BTN_CONFIRM_TEXT'),
                cancelText: t('TRIP.BTN_CANCEL_TEXT'),
                title: t('TRIP.REMOVE_LOCATION_MAIN_TEXT'),
                message: t('TRIP.REMOVE_LOCATION_MINOR_TEXT'),
                actionCallbackOk: async () => {
                    let timelineListUpdate: DayTripAttractionStructure[] = [...attractionSelect]
                    if (indexDel === 0 && attractionSelect?.length > 1) {
                        // ลบจุดเริ่มต้น และใน timeline มีมากกว่า 1 จุด
                        timelineListUpdate[1].geometry = []
                        timelineListUpdate[1].distance = 0
                    } else if (indexDel !== attractionSelect?.length - 1) {
                        loading.functions.setShowLoading()
                        // ลบจุดที่ไม่ใช่จุดเริ่มต้นและสุดท้าย (เปลื่ยนแปลงค่า route ที่ตำแหน่งที่ลบ + 1)
                        const pointStart = timelineListUpdate[indexDel - 1]
                        const pointEnd = timelineListUpdate[indexDel + 1]
                        const route = await getRouteData(pointStart, pointEnd)
                        //@ts-ignore
                        timelineListUpdate[indexDel + 1].geometry = route?.geometry || []
                        timelineListUpdate[indexDel + 1].distance = route.distance

                        loading.functions.setHideLoading()
                    }
                    timelineListUpdate = timelineListUpdate.filter((_, index: number) => index !== indexDel)
                    // console.log('timelineListUpdate',toJS(timelineListUpdate,{recurseEverything : true,}) );
                    // console.log('formDayTripProps',formDayTripProps);
                    formDayTripProps?.setFieldValue(`${name}.attractionSelect`, timelineListUpdate)
                },
            })
        },
        [attractionSelect],
    )

    



    return { onDragEnd, onDeleteRoute  }
}

export default useAttractionFieldArray
