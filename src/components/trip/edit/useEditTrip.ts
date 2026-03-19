import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { updateTrip, getTrip, ResponseTripCommon, TResGetTrip, TResGetTripRoute, TAddRouteParam } from '../apiTrip'
import useStore from '../../../stores/rootStore'
import orderBy from 'lodash/orderBy'
import groupBy from 'lodash/groupBy'
import { DayTripAttractionStructure, DayTripStructure, FormDayTripStructure } from '../form/FormDayTripStructure'
import usePreviewTrip from '../preview/usePreviewTrip'
import useFormManageAttraction from '../form/useFormManageAttraction'
import { useConfirmationDialog } from '../../../controls/dialog/confirmationDialog'
import useAppLoading from '../../loading/useAppLoading'
import Router from 'next/router'
import { useTranslation } from 'react-i18next'

type HookEditTripProps = {}

const useEditTrip = (props: HookEditTripProps) => {
    const { t, i18n } = useTranslation()

    const { openDialogConfirmation } = useConfirmationDialog()
    const loading = useAppLoading()

    const [renderCurrentPage, setRenderCurrentPage] = useState<'search-attraction' | 'route-preview'>(
        'route-preview',
    )
    const { TripStore, UserStore } = useStore()

    const router = useRouter()
    const stateHookPreviewTrip = usePreviewTrip({ renderCurrentPage, setRenderCurrentPage })
    const stateHookFormManageAttraction = useFormManageAttraction({ renderCurrentPage, setRenderCurrentPage })
    const { id: tripID } = router.query
    const getMyTrip = useCallback(async () => {

        if (tripID) {
            loading.functions.setShowLoading()
            const response = (await getTrip((tripID as unknown) as number)) as TResGetTrip
            const dayAllTrip = groupBy(response.routes, 'day')
            const renewResponseDay = (Object.entries(dayAllTrip).map(([key, value]) => {
                const sortAttractionSelect = orderBy(value as TResGetTripRoute[], ['stopOrder'], ['asc'])
                const attractionSelect = sortAttractionSelect?.map((item: TResGetTripRoute) => {
                    return {
                        attracID: item.attracID,
                        attracNameTH: item.attracNameTH,
                        attracNameEN: item.attracNameEN,
                        attracDescTH: item.attracDescTH,
                        attracDescEN: item.attracDescEN,
                        attracFee: item.attracFee,
                        latitude: item.latitude,
                        longitude: item.longitude,
                        geometry: item.path,
                        distance: item.tripDistance,
                        image: item.image,
                    }
                }) as DayTripAttractionStructure[]

                return {
                    dayOfTrip: Number(key),
                    community: [],
                    budget: sortAttractionSelect[0].expense,
                    attractionSelect,
                }
            }) as unknown) as DayTripStructure[]

            TripStore.setInitialValuesDayOfTripData({
                tripName: response.tripName,
                days: renewResponseDay as DayTripStructure[],
            })

            TripStore.setInitialValuesDayOfTripPreviewData({
                tripName: response.tripName,
                days: renewResponseDay,
            })

            loading.functions.setHideLoading()
        }
    }, [tripID])

    useEffect(() => {
        getMyTrip()
    }, [getMyTrip])

    useEffect(() => {
        return () => {
            stateHookPreviewTrip.initialState()
        }
    }, [])

    const onCancelCreateTrip = useCallback(() => {
        const tripName = stateHookPreviewTrip.refFormDayOfTrip.current?.initialValues.tripName
        stateHookPreviewTrip.refFormDayOfTrip.current?.setFieldValue('tripName', tripName)
        stateHookPreviewTrip.handleClose()
    }, [stateHookPreviewTrip])

    const onSubmit = async () => {
        try {
            const formState = stateHookPreviewTrip.refFormDayOfTrip?.current?.values
            const getFieldMetaTripName = stateHookPreviewTrip.refFormDayOfTrip?.current?.getFieldMeta('tripName')
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
                expense: budget,
            }))

            stateHookPreviewTrip.refFormDayOfTrip?.current?.submitForm()

            if (getFieldMetaTripName?.error === undefined && formState?.tripName) {
                loading.functions.setShowLoading()
                const params = {
                    userID: UserStore.userInfo.userID,
                    tripName: formState.tripName,
                    estmExpense: totalCostAlldays,
                    routes: stateHookPreviewTrip.getRouteParam(dayRenewOrder, dailyCost),
                } as TAddRouteParam

                const response: ResponseTripCommon = await updateTrip(params, (tripID as unknown) as number)
                loading.functions.setHideLoading()
                stateHookPreviewTrip.handleClose()
                /** ต้องเชค case เพิ่ม ห้ามเกิน 10 trip */
                if (response.statusCode === 1) {
                    openDialogConfirmation({
                        title: t('TRIP.SUCCESS_UPDATE_TRIP_MAIN_TEXT'),
                        message: t('TRIP.SUCCESS_UPDATE_TRIP_MINOR_TEXT').replace('[{tripName}]', formState.tripName),
                        okText: t('TRIP.BTN_OK_TEXT'),
                        showButtonCancel: false,
                        actionCallbackOk: () => {
                            stateHookPreviewTrip.initialState()
                            Router.push('/profile')
                        },
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
            // console.log('onSubmit-->>>', err)
            stateHookPreviewTrip.handleClose()
            openDialogConfirmation({
                title: t('TRIP.ERROR_SYSTEM_MAIN_TEXT'),
                message: t('TRIP.ERROR_SYSTEM_MINOR_TEXT'),
                showButtonCancel: false,
                okText: t('TRIP.BTN_OK_TEXT'),
            })
        }
    }

    return {
        stateHookPreviewTrip: { ...stateHookPreviewTrip, onCancelCreateTrip, onSubmit },
        stateHookFormManageAttraction,
        renderCurrentPage,
    }
}

export default useEditTrip
