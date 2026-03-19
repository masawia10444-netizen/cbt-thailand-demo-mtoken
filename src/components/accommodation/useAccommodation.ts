import { useEffect, useState, useMemo } from 'react'
import * as apiAccommodation from './apiAccommodation'
import useAppLoading from '../loading/useAppLoading'

const useAccommodation = () => {
    const loading = useAppLoading()
    const [accommodationBySearchData, setAccommodationBySearchData] = useState<apiAccommodation.TResAccomSearch[] | null>(null)

    type valuesType = {
        province: string
        community: string
        keyword: string
    }
    const handleSubmit = async (values: any) => {
        loading.functions.setShowLoading()

        const params = {
            "keyword": values.keyword || null,
            "provID": values.province || null,
            "communID": values.community || null,
        }

        const resultResponse = await apiAccommodation.searchAccommodation(params)
        if (resultResponse) {
            setAccommodationBySearchData(resultResponse)
            loading.functions.setHideLoading()
        }
    }

    const handleClickSetAccommodationBySearchData = () => {
        setAccommodationBySearchData(null)
    }

    return {
        accommodationBySearchData,
        handleSubmit,
        handleClickSetAccommodationBySearchData
    }
}
export default useAccommodation
