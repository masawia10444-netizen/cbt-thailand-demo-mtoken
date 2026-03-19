import { useEffect, useState, useCallback, useRef } from 'react'
import Store from '../../../stores/rootStore'
import { addTrip, getRouteData, ResponseTripCommon, TRoute, TRoutes } from '../apiTrip'
import { FieldArrayRenderProps, FormikProps } from 'formik'
import Router from 'next/router'
import { DayTripAttractionStructure, DayTripStructure, FormDayTripStructure } from '../form/FormDayTripStructure'
import { useConfirmationDialog } from '../../../controls/dialog/confirmationDialog'

import isEqualFuct from 'lodash/isEqual'
import useAppLoading from '../../loading/useAppLoading'
import { InitialTabObj } from '../../../controls/tabs/addableTabs'
// import { toJS } from 'mobx'
import pickBy from 'lodash/pickBy'
import { useTranslation } from 'react-i18next'
// import { toJS } from 'mobx'

type HookPreviewTrip = {
    renderCurrentPage?: 'search-attraction' | 'route-preview'
    setRenderCurrentPage?: (value: 'search-attraction' | 'route-preview') => void
    activeMode?: 'create' | 'edit'
}

const usePreviewTrip = ({ setRenderCurrentPage, renderCurrentPage, activeMode }: HookPreviewTrip) => {
    const { t, i18n } = useTranslation()
    const loading = useAppLoading()
    const { openDialogConfirmation } = useConfirmationDialog()
    const refFormDayOfTrip = useRef<FormikProps<FormDayTripStructure> | undefined>()
    const { TripStore, UserStore } = Store()
    const [open, setOpen] = useState(false)
    const [initialValuesForm, setInitialValues] = useState<FormDayTripStructure>({
        days: [],
        tripName: null,
    })

    const getRouteAttraction = useCallback(async () => {
        /** จะยิง service route เฉพาะ ตอน add เท่านั้น  */
        /** ถ้าเป็นกรณี edit ไม่ต้องเรียกแล้ว เอา data จาก base set เข้า form เลย */

        const isEqualDay = (dayItem: DayTripStructure) => {
            const dayItemPre = TripStore.dayOfTripPreviewData.days.find(
                (dayItemPreview) => dayItemPreview.dayOfTrip === dayItem.dayOfTrip,
            )
            const isEqual = isEqualFuct(dayItem?.attractionSelect || [], dayItemPre?.attractionSelect || [])
            return isEqual
        }

        const isEqualAttraction = (
            dayItem: DayTripStructure,
            attractionItem: DayTripAttractionStructure,
            doublePath: number[],
            indexAttraction: number,
        ) => {
            const dayItemPre = TripStore.dayOfTripPreviewData.days.find(
                (dayItemPreview) => dayItemPreview.dayOfTrip === dayItem.dayOfTrip,
            )

            const attractionItemPre =
                dayItemPre?.attractionSelect.map((actItem: DayTripAttractionStructure, index: number) => {
                    if (index > 0) {
                        const startPoint = dayItemPre?.attractionSelect[index - 1]
                        return {
                            ...actItem,
                            doublePath: [startPoint.attracID, actItem.attracID],
                        }
                    }

                    return {
                        ...actItem,
                        doublePath: [],
                    }
                }) ?? []

            const isEqual = attractionItemPre.some((item: DayTripAttractionStructure & { doublePath: number[] }) =>
                isEqualFuct(item.doublePath, doublePath),
            )

            return isEqual
        }

        if (TripStore.dayOfTripData.days?.length > 0 && renderCurrentPage === 'route-preview') {
            loading.functions.setShowLoading()
            /** ยิงเฉพาะวันที่มีการเปลี่ยนแปลงเท่านั้นนะจ้ะ  */

            const newDays = await Promise.all(
                TripStore.dayOfTripData.days
                    .filter((dayItem: DayTripStructure) => dayItem.attractionSelect?.length)
                    .map(async (dayItem: DayTripStructure) => {
                        const isEqual = isEqualDay(dayItem)
                        if (isEqual) {
                            /** ข้อมูลภายในวันไม่มีการเปลี่ยนแปลง */
                            return dayItem
                        } else {
                            const { attractionSelect = [] } = dayItem
                            const resultAttractions = await Promise.all(
                                attractionSelect.map(
                                    async (attractionItem: DayTripAttractionStructure, indexAttraction: number) => {
                                        if (indexAttraction > 0) {
                                            const startPoint = attractionSelect[indexAttraction - 1]

                                            const isEqualAct = isEqualAttraction(
                                                dayItem,
                                                attractionItem,
                                                [startPoint?.attracID, attractionItem?.attracID],
                                                indexAttraction,
                                            )

                                            if (isEqualAct) {
                                                /** จุดที่ไม่มีการเปลี่ยน */
                                                return attractionItem
                                            } else {
                                                let routeResponse = (null as unknown) as Promise<{
                                                    geometry: TRoute
                                                    distance: number
                                                }>

                                                const startPoint = attractionSelect[indexAttraction - 1]
                                                routeResponse = getRouteData(startPoint, attractionItem)

                                                const resultGeometry = await routeResponse
                                                return {
                                                    ...attractionItem,
                                                    geometry: resultGeometry?.geometry ?? [],
                                                    distance: resultGeometry?.distance ?? 0,
                                                }
                                            }
                                        }
                                        return attractionItem
                                    },
                                ),
                            )
                            return {
                                ...dayItem,
                                attractionSelect: resultAttractions,
                            }
                        }
                    }),
            )

            setInitialValues({
                ...TripStore.dayOfTripData,
                //@ts-ignore
                days: newDays?.length
                    ? newDays
                    : [
                          {
                              dayOfTrip: 1,
                              attractionSelect: [],
                          },
                      ],
            })

            // refFormDayOfTrip?.current?.setValues({
            //     ...TripStore.dayOfTripData,
            //     days: newDays,
            // })
            loading.functions.setHideLoading()
        }
    }, [TripStore.dayOfTripData, TripStore.dayOfTripPreviewData, renderCurrentPage])

    useEffect(() => {
        getRouteAttraction()
    }, [getRouteAttraction])

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const initialState = useCallback(() => {
        TripStore.setInitialValuesDayOfTripData({
            tripName: null,
            days: [
                {
                    dayOfTrip: 1,
                    attractionSelect: [],
                    community: [],
                    isDisplaySearched: false,
                },
            ],
        })
        TripStore.setInitialValuesDayOfTripPreviewData({
            tripName: null,
            days: [
                {
                    dayOfTrip: 1,
                    attractionSelect: [],
                    community: [],
                    isDisplaySearched: false,
                },
            ],
        })
    }, [])

    const getRouteParam = useCallback(
        (
            route: DayTripStructure[] = [],
            dailyCost: { day: number; expense: number | null | undefined | string }[] = [],
        ) => {
            const routesResult: TRoutes[] = []
            route?.forEach((route: DayTripStructure, indexRoute: number) => {
                const dailyCostByDay = dailyCost.find(
                    (item: { day: number; expense: number }) => item.day === route.dayOfTrip,
                )

                route.attractionSelect?.forEach((timeline: DayTripAttractionStructure, indexTimeline: number) => {
                    let geometry = timeline.geometry ?? []

                    if (indexTimeline > 0 && timeline?.geometry?.length === 0) {
                        let timelineBefore = route?.attractionSelect?.[indexTimeline - 1]
                        if (
                            timelineBefore &&
                            timelineBefore.latitude &&
                            timelineBefore.longitude &&
                            timeline.latitude &&
                            timeline.longitude
                        ) {
                            geometry = [
                                [
                                    //@ts-ignore
                                    [parseFloat(timelineBefore.longitude), parseFloat(timelineBefore.latitude)],
                                    //@ts-ignore
                                    [parseFloat(timeline.longitude), parseFloat(timeline.latitude)],
                                ],
                            ]
                        }
                    }
                    routesResult.push({
                        dayOfTrip: route.dayOfTrip,
                        stopOrder: indexTimeline + 1,
                        attractionSeq: timeline.isRelAttraction ? null : timeline.attracID,
                        relAttractionID: timeline.isRelAttraction ? timeline.attracID : null,
                        distance: timeline.distance ? parseFloat(timeline.distance.toFixed(2)) : 0,
                        path: geometry,
                        expense: dailyCostByDay?.expense as number,
                    })
                })
            })
            return routesResult
        },
        [],
    )

    const onSubmit = async () => {
        try {
            const formState = refFormDayOfTrip?.current?.values
            const getFieldMetaTripName = refFormDayOfTrip?.current?.getFieldMeta('tripName')
            const dayRenewOrder = formState?.days.map((item, index) => ({
                ...item,
                dayOfTrip: index + 1,
            }))

            const totalCostAlldays = dayRenewOrder
                .flatMap((item) => item.attractionSelect)
                .filter((item) => typeof item.attracFee === 'number')
                .map((item) => item.attracFee)
                .reduce((acc: any, crr: any) => acc + crr, 0)

            const dailyCost = dayRenewOrder.map(({ budget, ...item }: DayTripStructure, index: number) => ({
                day: item.dayOfTrip,
                expense: budget as number,
            }))

            refFormDayOfTrip?.current?.submitForm()

            if (getFieldMetaTripName?.error === undefined && formState?.tripName) {
                loading.functions.setShowLoading()
                const params = {
                    userID: UserStore.userInfo.userID,
                    tripName: formState.tripName,
                    estmExpense: totalCostAlldays,
                    routes: getRouteParam(dayRenewOrder, dailyCost),
                }
                const response: ResponseTripCommon = await addTrip(params)
                loading.functions.setHideLoading()
                handleClose()
                /** ต้องเชค case เพิ่ม ห้ามเกิน 10 trip */
                if (response.statusCode === 1) {
                    openDialogConfirmation({
                        title: t('TRIP.SUCCESS_CREATE_NEW_TRIP_MAIN_TEXT'),
                        message: t('TRIP.SUCCESS_CREATE_NEW_TRIP_MINOR_TEXT').replace(
                            '[{tripName}]',
                            formState.tripName,
                        ),
                        showButtonCancel: false,
                        okText: t('TRIP.BTN_OK_TEXT'),
                        actionCallbackOk: async () => {
                            if (UserStore?.userInfo?.email) {
                                await UserStore.getProfile({
                                    email: UserStore.userInfo.email,
                                    userID: UserStore.userInfo.userID,
                                })
                            }
                            initialState()
                            Router.push('/profile')
                        },
                    })
                } else if (response.statusCode === -1) {
                    openDialogConfirmation({
                        title: t('TRIP.ERROR_CREATE_NEW_TRIP_MAIN_TEXT'),
                        message: t('TRIP.ERROR_CREATE_NEW_TRIP_MINOR_TEXT'),
                        showButtonCancel: false,
                        okText: t('TRIP.BTN_OK_TEXT'),
                        // actionCallbackOk: () => {
                        //     initialState()
                        //     Router.push( '/profile')
                        // },
                    })
                } else {
                    openDialogConfirmation({
                        title: t('TRIP.ERROR_SYSTEM_MAIN_TEXT'),
                        message: t('TRIP.ERROR_SYSTEM_MINOR_TEXT'),
                        showButtonCancel: false,
                        okText: t('TRIP.BTN_OK_TEXT'),
                    })
                }
            }
        } catch (err) {
            // console.log('err-->>>', err)
            handleClose()
            openDialogConfirmation({
                title: t('TRIP.ERROR_SYSTEM_MAIN_TEXT'),
                message: t('TRIP.ERROR_SYSTEM_MINOR_TEXT'),
                showButtonCancel: false,
                okText: t('TRIP.BTN_OK_TEXT'),
            })
        }
    }

    const onCancel = useCallback(() => {
        const formState = refFormDayOfTrip?.current
        if (activeMode === 'edit') {
            const initialFormState = {
                ...pickBy(formState?.initialValues, ['tripName', 'days']),
                days: formState?.initialValues?.days
                    ?.map((item: DayTripStructure, index: number) => ({
                        attractionSelect: item.attractionSelect,
                    }))
                    .filter(
                        (item: { attractionSelect: DayTripAttractionStructure[] }) => item.attractionSelect?.length,
                    ),
            }

            const currentFormState = {
                ...pickBy(formState?.values, ['tripName', 'days']),
                days: formState?.values?.days
                    ?.map((item: DayTripStructure, index: number) => ({
                        attractionSelect: item.attractionSelect,
                    }))
                    .filter(
                        (item: { attractionSelect: DayTripAttractionStructure[] }) => item.attractionSelect?.length,
                    ),
            }

            /** จะเชคการเปลี่ยนแปลงค่าแค่  dirty ของ form ไม่ได้ ต้องเชคยัน value เอง */
            if (!isEqualFuct(initialFormState, currentFormState)) {
                openDialogConfirmation({
                    title: t('TRIP.CONFIRM_CANCEL_TRIP_MAIN_TEXT'),
                    message: t('TRIP.CONFIRM_CANCEL_TRIP_MINOR_TEXT'),
                    okText: t('TRIP.BTN_OK_TEXT'),
                    cancelText: t('TRIP.BTN_CANCEL_TEXT'),
                    actionCallbackOk: () => {
                        initialState()
                        onOkCancel()
                    },
                })
            } else {
                initialState()
                onOkCancel()
            }
        } else {
            const currentFormStateDirty = formState?.values?.days.some(
                (item: DayTripStructure) => item.attractionSelect?.length,
            )

            if (currentFormStateDirty) {
                openDialogConfirmation({
                    title: t('TRIP.CONFIRM_CANCEL_TRIP_MAIN_TEXT'),
                    message: t('TRIP.CONFIRM_CANCEL_TRIP_MINOR_TEXT'),
                    okText: t('TRIP.BTN_OK_TEXT'),
                    cancelText: t('TRIP.BTN_CANCEL_TEXT'),
                    actionCallbackOk: () => {
                        initialState()
                        onOkCancel()
                    },
                })
            } else {
                initialState()
                onOkCancel()
            }
        }
    }, [activeMode, i18n.language])

    const onOkCancel = useCallback(() => {
        Router.push('/profile')
    }, [])

    const onEdit = useCallback(
        (activeKey: number) => () => {
            /** ก่อนจะกลับไปหน้า เพิ่ม ต้องเก็บข้อมูลเข้า store ก่อน เพราะ เมื่อเปลี่ยน Route form จะถูกสร้างใหม่ทำให้ค่าใน form หาย */
            const formState = refFormDayOfTrip?.current?.values

            const { days = [] } = formState as FormDayTripStructure

            TripStore.setInitialValuesDayOfTripData({
                days: days,
                tripName: formState?.tripName,
                initialTabDay: activeKey,
                isEditMode: true,
            })

            TripStore.setInitialValuesDayOfTripPreviewData({
                days: days,
                tripName: formState?.tripName,
            })
            setRenderCurrentPage && setRenderCurrentPage('search-attraction')
            // Router.push('/trip/create')
        },
        [setRenderCurrentPage],
    )

    const onCancelCreateTrip = useCallback(() => {
        refFormDayOfTrip?.current?.setFieldValue('tripName', null)
        handleClose()
    }, [])

    const onCreateTrip = useCallback(() => {
        const formState = refFormDayOfTrip?.current?.values
        const { days = [] } = formState as FormDayTripStructure
        // const dayTripEmpty = days
        //     .filter((item: DayTripStructure, index: number) => item.attractionSelect?.length === 0)
        //     .map((item) => item.dayOfTrip)

        const dayTripEmpty = days
            .map((item: DayTripStructure, index: number) => {
                if (item.attractionSelect?.length === 0) {
                    return index + 1
                }
            })
            .filter((item: number | undefined) => item)

        if (dayTripEmpty?.length) {
            openDialogConfirmation({
                title: t('TRIP.NOT_SELECTED_LOCATION_MAIN_TEXT').replace('[{days}]', dayTripEmpty.toString()),
                message: t('TRIP.NOT_SELECTED_LOCATION_MINOR_TEXT'),
                showButtonCancel: false,
                okText: t('TRIP.BTN_OK_TEXT'),
            })
        } else {
            handleOpen()
        }
    }, [i18n.language])

    const onCallBackRemoveTab = useCallback(
        (fieldArrayProps: FieldArrayRenderProps) => (tabItem: InitialTabObj, onChange: (value: number) => void) => {
            openDialogConfirmation({
                okText: t('TRIP.BTN_CONFIRM_TEXT'),
                cancelText: t('TRIP.BTN_CANCEL_TEXT'),
                title: t('TRIP.CONFIRM_DELETE_DAY_MAIN_TEXT'),
                message: t('TRIP.CONFIRM_DELETE_DAY_MINOR_TEXT').replace('[{day}]', String(tabItem.activeKey + 1)),
                actionCallbackOk: () => {
                    if (tabItem.activeKey === 0) {
                        onChange(tabItem.activeKey)
                    } else {
                        onChange(tabItem.activeKey - 1)
                    }
                    fieldArrayProps.remove(tabItem.activeKey)
                },
            })
        },
        [i18n.language],
    )

    return {
        initFormTrip: initialValuesForm,
        refFormDayOfTrip,
        open,
        onCancelCreateTrip,
        onSubmit,
        handleClose,
        handleOpen,
        onCancel,
        onEdit,
        onCreateTrip,
        onCallBackRemoveTab,
        getRouteParam,
        initialState,
    }
}
export default usePreviewTrip
