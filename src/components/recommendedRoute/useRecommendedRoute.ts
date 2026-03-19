import { useEffect, useState, useMemo, useCallback } from 'react'
import orderBy from 'lodash/orderBy'
import moment from 'moment'
import { fetchPost } from '../../utilities/request'
import { apiConfig } from '../../configs/webAPIConfig'
import { RouteType } from '../../../pages/recommendedRoute/index'
import { TResSearchRoute } from './apiRoute'
import Store from '../../stores/rootStore'

export type UseRecommendedRouteTypes = {
    routeData: TResSearchRoute[]
}

const useRecommendedRoute = ({ routeData }: UseRecommendedRouteTypes) => {
    const [routeBySearchData, setRouteBySearchData] = useState<RouteType[]>()
    const [dataSorted, setSataSorted] = useState(routeData)
    const [isShowSearchResultPage, setShowSearchResultPage] = useState(false)
    const { LoadingStore } = Store()

    let [currentSortName, setCurrentSortName] = useState<string>('ROUTE.HIGHLIGHT')

    type SubmitValuesType = {
        keyword: string
        provID: string
        communID: string
        day: number
    }
    const handleSubmit = async (values: SubmitValuesType) => {
        LoadingStore.setLoading(true)
        const params = {
            keyword: values.keyword,
            provID: values.provID,
            communID: values.communID,
            day: values.day,
        }
        setShowSearchResultPage(true)
        const resultResponse: TResSearchRoute[] = await fetchPost({ url: apiConfig.search.trip, data: params })
        if (resultResponse) {
            setRouteBySearchData(resultResponse)
            setSataSorted(resultResponse)
        }
        LoadingStore.setLoading(false)
    }

    const handleClickSetRouteBySearchData = useCallback(() => {
        setRouteBySearchData(null)
        handleSubmit({
            provID: null,
            communID: null,
            day: null,
            keyword: null,
        })
    }, [])

    const handleSortByHighlight = async () => {
        setCurrentSortName('ROUTE.HIGHLIGHT')

        let sortData = await orderBy(dataSorted as TResSearchRoute[], ['isHighlight', 'updateDate'], ['desc'])
        setRouteBySearchData(sortData)
        setSataSorted(sortData)
    }

    const handleSortByUpdateDate = () => {
        setCurrentSortName('ROUTE.LATEST')
        let sort = orderBy(
            dataSorted.map((item) => ({ ...item, updateDate: new Date(item.updateDate) })),
            ['updateDate'],
            ['desc'],
        )
        let sortData = sort.map((item) => ({ ...item, updateDate: moment(item.updateDate).format('YYYY-MM-DD') }))
        setRouteBySearchData(sortData)
        setSataSorted(sortData)
    }

    useEffect(() => {
        setSataSorted(routeData)

        if (currentSortName === 'ROUTE.HIGHLIGHT') {
            handleSortByHighlight()
        } else {
            handleSortByUpdateDate()
        }
    }, [routeData])

    return {
        handleSubmit,
        currentSortName,
        routeBySearchData,
        handleClickSetRouteBySearchData,
        handleSortByHighlight,
        handleSortByUpdateDate,
        routeData: dataSorted,
        isShowSearchResultPage,
        setShowSearchResultPage,
    }
}
export default useRecommendedRoute
