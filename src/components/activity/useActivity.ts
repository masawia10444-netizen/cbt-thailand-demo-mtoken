import { useEffect, useState, useMemo, useCallback } from 'react'
import useAppLoading from '../loading/useAppLoading'
import * as apiAttraction from './apiAttraction'
import Store from '../../stores/rootStore'
import { SearchParamsType } from '../../stores/attractionStore'

import { apiConfig } from '../../configs/webAPIConfig'
import { getProvinceAttraction, TResProvinceAttraction } from './apiAttraction'

export type attractionDataType = {
    ID: number
    titleTH: string
    titleEN: string
    image: string
    typeTH: string
    typeEN: string
    provNameTH: string
    provNameEN: string
}
const useActivity = () => {
    const { AttractionStore, LoadingStore } = Store()
    const [attractionBySearchData, setAttractionBySearchData] = useState<apiAttraction.TResSearchAttraction[] | null>(
        null,
    )
    const [isSubmitOnMount, setIsSubmitOnMount] = useState(false)
    const [lutProvince, setLutProvince] = useState([])

    const handleSubmit = async (values: SearchParamsType) => {
        LoadingStore.setLoading(true)
        const params = {
            attracTypeID: values.attractionType || null,
            provID: values.province || null,
            communID: values.community || null,
            keyword: values.keyword || null,
        }
        const resultResponse = await apiAttraction.searchAttraction(params)
        if (resultResponse) {
            setAttractionBySearchData(resultResponse)
        }
        LoadingStore.setLoading(false)
    }

    const handleClickSetAttractionBySearchData = () => {
        setAttractionBySearchData(null)
    }

    const submitFormOnMount = (submitFuction: (() => Promise<void>) & (() => Promise<any>)) => {
        setTimeout(() => {
            if (AttractionStore.searchParams.attractionType) {
                submitFuction()
            }

            setIsSubmitOnMount(true)
        }, 0)
    }

    useEffect(() => {
        if (AttractionStore.searchParams.attractionType) {
            // call service filter province
            onChangeAttractionType(AttractionStore.searchParams.attractionType)
            handleSubmit(AttractionStore.searchParams)
        }
    }, [AttractionStore.searchParams.attractionType])

    useEffect(() => {
        return () => {
            AttractionStore.setSearchParams('')
        }
    }, [])

    const onChangeAttractionType = async (value: string) => {
        const res = await getProvinceAttraction(value)
        setLutProvince(res)
    }

    return {
        attractionBySearchData,
        handleSubmit,
        handleClickSetAttractionBySearchData,
        initSearchValues: AttractionStore.searchParams,
        submitFormOnMount,
        isSubmitOnMount,
        onChangeAttractionType,
        lutProvince: lutProvince,
    }
}
export default useActivity
