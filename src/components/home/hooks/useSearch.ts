import { useEffect, useState, useMemo } from 'react'
import Store from '../../../stores/rootStore'
import Router from 'next/router'

export type GeoLocationType = {
    coords: {
        latitude: number
        longitude: number
        altitude: any
        accuracy: number
        altitudeAccuracy: any
    }
    timestamp: number
}
const useSearch = () => {
    const { LookupStore, LoadingStore } = Store()
    const [focused, setFocused] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const [isChecked, setIsChecked] = useState(false)
    const initialValues = LookupStore.searchParams

    const handleSubmitSearch = async (values: typeof initialValues) => {
        LoadingStore.setLoading(true)

        await LookupStore.searchAll(values)

        LoadingStore.setLoading(false)

        Router.pathname !== '/searchResult' && Router.push('/searchResult')
    }

    const setMyPosition = (position: GeoLocationType) => {
        LookupStore.setMyLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        })
    }

    const handleMyLocation = (checked: boolean) => {
        setIsChecked(checked)
        if (process.browser) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(setMyPosition, null)
            } else {
                console.log('unavailable')
            }
        }
    }

    const handleClearSearchParams = () => {
        LookupStore.clearSearchParams()
    }

    const initValuesSearchForm = async () => {
        LoadingStore.setLoading(true)
        await LookupStore.getProvince()
        await LookupStore.getCommunity()
        await LookupStore.getMenuList()
        LoadingStore.setLoading(false)
    }

    const filteredMenuList = () => {
        return LookupStore.menuList.filter((item) => item.menuID !== '7')
    }

    useEffect(() => {
        initValuesSearchForm()
    }, [])

    useEffect(() => {
        let sum = 0

        for (const key in LookupStore.searchResult) {
            if (Object.prototype.hasOwnProperty.call(LookupStore.searchResult, key)) {
                sum += LookupStore.searchResult[key].length
            }
        }

        setIsEmpty(sum === 0)

        return () => {}
    }, [LookupStore.searchResult])

    useEffect(() => {
        setIsChecked(LookupStore.searchParams.chkRaidus)
    }, [LookupStore.searchParams.chkRaidus])

    useEffect(() => {
        return () => {
            if (Router.pathname !== '/searchResult') {
                LookupStore.clearSearchParams()
                LookupStore.clearSearchResult()
                setIsEmpty(true)
            }
        }
    }, [])

    return {
        focused,
        setFocused,
        provinceList: LookupStore.provinceList,
        communityList: LookupStore.communityList,
        dataTypeList: filteredMenuList(),
        handleSubmitSearch,
        initialValues,
        handleMyLocation,
        searchResult: LookupStore.searchResult,
        handleClearSearchParams,
        isEmpty,
        isChecked,
    }
}
export default useSearch
