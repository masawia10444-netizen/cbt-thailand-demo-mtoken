import { useEffect, useState, useCallback } from 'react'

import * as apiFestival from './apiFestival'
import { convertToDateService } from '../../utilities/dateTimeUtils'
import { useTranslation } from 'react-i18next'
import Store from '../../stores/rootStore'

export type FestivalType = {
    ID: number
    titleTH: string
    titleEN: string
    startDate?: string
    endDate?: string
    publishStartDate?: string
    publishEndDate?: string
    communNameTH: string
    communNameEN: string
    image: string
    provNameTH: string
    provNameEN: string
    updateDate: string
}
type UsePropsType = {
    festivalData: apiFestival.TResSearchFestival[]
}
const useFestival = ({ festivalData }: UsePropsType) => {
    const { LoadingStore } = Store()
    const { t } = useTranslation()
    const [festivalBySearchData, setFestivalBySearchData] = useState<Array<apiFestival.TResSearchFestival> | null>(null)
    const [isShowSearchResultPage, setShowSearchResultPage] = useState(false)
    const [dataSorted, setdataSorted] = useState(festivalData)

    let [currentSortName, setCurrentSortName] = useState<string>('FESTIVAL.PUBLISH_DATE')

    const handleSubmit = useCallback(async (values: any) => {
        LoadingStore.setLoading(true)
        const param: { [key: string]: any } = {}
        if (values?.dateRange?.startDate) param.startDate = convertToDateService(values.dateRange.startDate)
        if (values?.dateRange?.endDate) param.endDate = convertToDateService(values.dateRange.endDate)
        if (values?.province) param.provID = values.province
        if (values?.community) param.communID = values.community
        if (values?.keyword) param.keyword = values.keyword
        setShowSearchResultPage(true)
        const resultResponse = await apiFestival.searchFestival(param)

        if (resultResponse) {
            // setFestivalBySearchData(resultResponse)
            await setdataSorted(resultResponse)
            // if (currentSortName === 'FESTIVAL.PUBLISH_DATE') {
            //     handleSortByPublishDate()
            // } else {
            //     handleSortByStartDate()
            // }
        }
        LoadingStore.setLoading(false)
    }, [])

    const handleClickSetFestivalBySearchData = useCallback(() => {
        setFestivalBySearchData(null)
        handleSubmit({
            dateRange: {
                startDate: null,
                endDate: null,
            },
            province: '',
            community: '',
            keyword: '',
        })
    }, [])

    const handleSortByPublishDate = () => {
        setCurrentSortName('FESTIVAL.PUBLISH_DATE')

        let sortData = dataSorted.sort((a, b) =>
            a.publishStartDate > b.publishStartDate ? 1 : b.publishStartDate > a.publishStartDate ? -1 : 0,
        )
        setdataSorted(sortData)
    }

    const handleSortByStartDate = () => {
        setCurrentSortName('FESTIVAL.START_DATE')

        let sortData = dataSorted.sort((a, b) => (a.startDate > b.startDate ? 1 : b.startDate > a.startDate ? -1 : 0))

        setdataSorted(sortData)
    }

    useEffect(() => {
        if (currentSortName === 'FESTIVAL.PUBLISH_DATE') {
            handleSortByPublishDate()
        } else {
            handleSortByStartDate()
        }
    }, [])

    return {
        festivalBySearchData,
        currentSortName,
        handleSubmit,
        handleClickSetFestivalBySearchData,
        handleSortByPublishDate,
        handleSortByStartDate,
        festivalData: dataSorted,
        setShowSearchResultPage,
        isShowSearchResultPage,
    }
}
export default useFestival
