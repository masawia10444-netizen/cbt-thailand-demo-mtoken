import { FieldArrayRenderProps, FormikProps } from 'formik'
import Router from 'next/router'
import React, { ChangeEvent, useCallback, useEffect, useState, useRef } from 'react'
import Store from '../../../stores/rootStore'
import { FormDayTripStructure, DayTripStructure } from './FormDayTripStructure'
import { useConfirmationDialog } from '../../../controls/dialog/confirmationDialog'
import { InitialTabObj } from '../../../controls/tabs/addableTabs'
// import { toJS } from 'mobx'
import pickBy from 'lodash/pickBy'
import isEqual from 'lodash/isEqual'
import { useTranslation } from 'react-i18next'

type HookFomManageAttractionProps = {
    renderCurrentPage?: 'search-attraction' | 'route-preview'
    setRenderCurrentPage?: (value: 'search-attraction' | 'route-preview') => void
}
const useFomManageAttraction = ({ setRenderCurrentPage, ...props }: HookFomManageAttractionProps) => {
    // const [renderCurrentPage , setRenderCurrentPage] = useState<'search-attraction'|'route-preview'>('search-attraction')
    const { t, i18n } = useTranslation()
    const refFormDayOfTrip = useRef<FormikProps<FormDayTripStructure> | undefined>()
    const { openDialogConfirmation } = useConfirmationDialog()
    const { TripStore } = Store()

    useEffect(() => {
        ; (async function () {
            await TripStore.setup()
        })()
    }, [])

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

    const onCancel = useCallback(() => {
        const formState = refFormDayOfTrip?.current
        if (formState?.values?.isEditMode) {
            /** เคยมีการแก้ไขมาก่อน*/
            // Router.push('/trip/preview')
            setRenderCurrentPage && setRenderCurrentPage('route-preview')
        } else {
            const initialFormState = {
                ...pickBy(formState?.initialValues, ['tripName', 'days']),
                days: formState?.initialValues?.days
                    ?.map((item, index) => ({
                        attractionSelect: item.attractionSelect,
                    }))
                    .filter((item: DayTripStructure) => item.attractionSelect?.length),
            }

            const currentFormState = {
                ...pickBy(formState?.values, ['tripName', 'days']),
                days: formState?.values?.days
                    ?.map((item, index) => ({
                        attractionSelect: item.attractionSelect,
                    }))
                    .filter((item: DayTripStructure) => item.attractionSelect?.length),
            }

            if (!isEqual(initialFormState, currentFormState)) {
                openDialogConfirmation({
                    title: t('TRIP.CONFIRM_CANCEL_TRIP_MAIN_TEXT'),
                    message: t('TRIP.CONFIRM_CANCEL_TRIP_MINOR_TEXT'),
                    actionCallbackOk: () => {
                        initialState()
                        onOkCancel()
                    },
                })
            } else {
                onOkCancel()
                initialState()
            }
        }
    }, [i18n.language])

    const onOkCancel = useCallback(() => {
        Router.push('/profile')
    }, [])

    const onPreview = () => {
        const formState = refFormDayOfTrip?.current?.values
        const { days = [] } = formState as FormDayTripStructure
        // const dayTripEmpty = formState?.days?.filter((item : DayTripStructure ,index :number)=>item.attractionSelect?.length) ?? []
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
            TripStore.setInitialValuesDayOfTripData({
                ...formState,
                days: formState?.days.filter((item) => item.attractionSelect?.length),
            } as FormDayTripStructure)

            setRenderCurrentPage && setRenderCurrentPage('route-preview')
            //   Router.push('/trip/preview')
        }
    }

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

    const onCallBackAddTab = useCallback(
        (fieldArrayProps: FieldArrayRenderProps) => () => {
            if (fieldArrayProps.form.values.days?.length < 5) {
                fieldArrayProps.push({
                    dayOfTrip: fieldArrayProps.form.values.days?.length + 1,
                    attractionSelect: [],
                    community: [],
                })
            } else {
                openDialogConfirmation({
                    okText: t('TRIP.BTN_OK_TEXT'),
                    showButtonCancel: false,
                    title: t('TRIP.LIMIT_NEW_DAY_MAIN_TEXT'),
                    message: t('TRIP.LIMIT_NEW_DAY_MINOR_TEXT'),
                })
            }
        },
        [i18n.language],
    )

    return {
        onPreview,
        onCancel,
        onCallBackAddTab,
        onCallBackRemoveTab,
        initFormTrip: TripStore.dayOfTripData,
        refFormDayOfTrip,

        // renderCurrentPage ,
        // setRenderCurrentPage
    }
}

export default useFomManageAttraction
