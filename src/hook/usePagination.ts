import { useState, useCallback, useMemo } from 'react'

const usePagination = <TDataPage>({
    initDataSource,
    pageSize = 12,
}: {
    initDataSource: TDataPage
    pageSize: number
}) => {
    const [state, setState] = useState<{ dataSource: TDataPage; currentPage: number }>({
        dataSource: initDataSource,
        currentPage: 1,
    })

    const onChangePage = useCallback((event, page) => {
        setState((prev) => ({
            ...prev,
            currentPage: page,
        }))
    }, [])

    // const setDataSource = useCallback((newDataSource) => {
    //     setState({
    //         dataSource: newDataSource,
    //         currentPage: 1,
    //     })
    // }, [])

    const setDataSource = (newDataSource) => {
        setState({
            dataSource: newDataSource,
            currentPage: 1,
        })
    }

    // const dataPage = useMemo(() => {
    //     if (Array.isArray(state.dataSource)) {
    //         const upperLimit = state.currentPage * pageSize
    //         return state.dataSource.slice(upperLimit - pageSize, upperLimit)
    //     } else {
    //         return []
    //     }
    // }, [state.dataSource, state.currentPage])

    const dataPage = () => {
        if (Array.isArray(state.dataSource)) {
            const upperLimit = state.currentPage * pageSize
            return state.dataSource.slice(upperLimit - pageSize, upperLimit)
        } else {
            return []
        }
    }

    const pageCount = useMemo(() => {
        if (Array.isArray(state.dataSource)) {
            return Math.ceil(state.dataSource?.length / pageSize)
        } else {
            return 0
        }
    }, [state.dataSource])

    return {
        dataPage: dataPage(),
        pageCount,
        currentPage: state.currentPage,

        setDataSource,
        onChangePage,
    }
}

export default usePagination
