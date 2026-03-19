import { useEffect, useState, useMemo, useCallback } from 'react'
import Store from '../../stores/rootStore'

export type TResCommunity = {
    ID: number
    titleTH: string
    titleEN: string
    provinceTH?: string
    provinceEN?: string
    updateDate?: string
    isHighlight?: boolean
    image?: any
}
export type UseCommunityProps = {
    reviewTravelData: TResCommunity[]
}
const useCommunity = ({ reviewTravelData }: UseCommunityProps) => {
    const [dataSorted, setdataSorted] = useState(reviewTravelData)
    let [currentSortName, setCurrentSortName] = useState<string>('COMMUNITY.HIGHLIGHT')

    const handleSortByHighlight = () => {
        setCurrentSortName('COMMUNITY.HIGHLIGHT')
        // @ts-ignore
        let sortData = dataSorted.sort((a: TResCommunity, b: TResCommunity) => {
            // @ts-ignore
            return new Date(b.isHighlight) - new Date(a.isHighlight)
        })
        setdataSorted(sortData)
    }

    const handleSortByUpdateDate = () => {
        setCurrentSortName('COMMUNITY.LATEST')
        // @ts-ignore
        let sortData = dataSorted.sort((a: TResCommunity, b: TResCommunity) => {
            // @ts-ignore
            return new Date(b.updateDate) - new Date(a.updateDate)
        })
        setdataSorted(sortData)
    }

    return {
        currentSortName,
        handleSortByHighlight,
        handleSortByUpdateDate,
        reviewTravelData: dataSorted
    }
}

export default useCommunity
