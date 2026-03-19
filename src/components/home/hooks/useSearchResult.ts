import React, { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import useSearch from './useSearch'
import useStore from '../../../stores/rootStore'

const useSearchResult = () => {
    const router = useRouter()
    const stateSearch = useSearch()

    const { LookupStore } = useStore()
    // console.log('useSearchResult',router.query);

    const getSearchAll = useCallback(() => {
        if (Object.keys(router.query)?.length > 0) {
            //@ts-ignore
            LookupStore.searchAll(router.query)
        }
    }, [router.query])

    useEffect(() => {
        getSearchAll()
    }, [getSearchAll])

    return { ...stateSearch, initialValues: router.query }
}

export default useSearchResult
