import { useEffect, useState, useMemo } from 'react'
import { toJS } from 'mobx'
import useRootStore from '../../../stores/rootStore'
import { insertLogCommu, TResGetCommuContent } from '../apiSeason'

export type ReturnTypeUsecontentSeason = ReturnType<typeof useContentSeason>
const useContentSeason = (dataContentSeason: TResGetCommuContent) => {
    const { UserStore } = useRootStore()

    const handleClickLink = (link: string) => {
        if (process.browser && link) {
            // console.log('link', link)
            window.open(link)
        }
    }

    useEffect(() => {
        insertLogCommu(dataContentSeason.communID, UserStore.userInfo.userID)
    }, [])

    return { handleClickLink }
}
export default useContentSeason
