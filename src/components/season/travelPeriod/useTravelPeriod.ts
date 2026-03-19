import { useEffect, useState, useMemo } from 'react'
import { TResGetCommuTravelPeriod } from '../apiSeason'
import orderBy from 'lodash/orderBy'
import moment from 'moment'

export type UseTravelPeriodProps = {
    communityTravelPeriodData: TResGetCommuTravelPeriod[]
}

const useTravelPeriod = ({ communityTravelPeriodData }: UseTravelPeriodProps) => {
    const [dataSorted, setdataSorted] = useState(communityTravelPeriodData)
    let [currentSortName, setCurrentSortName] = useState<string>('SEASON.HIGHLIGHT')

    const handleSortByHighlight = () => {
        setCurrentSortName('SEASON.HIGHLIGHT')
        // // @ts-ignore
        // let sortData = dataSorted.sort((a: TResGetCommuTravelPeriod, b: TResGetCommuTravelPeriod) => {
        //     // @ts-ignore
        //     return new Date(b.isHighlight) - new Date(a.isHighlight)
        // })
        let sortData = orderBy(dataSorted as TResGetCommuTravelPeriod[], ['isHighlight'], ['desc'])
        // console.log('highlight', sortData)
        setdataSorted(sortData)
    }

    const handleSortByUpdateDate = () => {
        setCurrentSortName('SEASON.LATEST')
        // // @ts-ignore
        // let sortData = dataSorted.sort((a: TResCommunity, b: TResCommunity) => {
        //     // @ts-ignore
        //     return new Date(b.updateDate) - new Date(a.updateDate)
        // })
        let sort = orderBy(dataSorted.map((item) => ({ ...item, updateDate: new Date(item.updateDate) })), ['updateDate'], ['desc'])
        let sortData = sort.map((item) => ({ ...item, updateDate: moment(item.updateDate).format('YYYY-MM-DD') }))
        // console.log('update', sortData)
        setdataSorted(sortData)
    }

    return {
        currentSortName,
        handleSortByHighlight,
        handleSortByUpdateDate,
        communityTravelPeriodData: dataSorted
    }
}
export default useTravelPeriod
