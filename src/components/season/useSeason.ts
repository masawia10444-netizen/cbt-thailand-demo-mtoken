import { useEffect, useState, useMemo, useRef } from 'react'
// import { CommunityHighLightType } from '../../../pages/community/index'
import { findMonthRange } from '../../utilities/monthUtilities'
import useAppLoading from '../loading/useAppLoading'
import * as apiSeason from './apiSeason'

export type UseSeasonPropTypes = {
    communityHighlight: apiSeason.TResCommunityHighlight[]
}

const useSeason = ({ communityHighlight }: UseSeasonPropTypes) => {
    const fieldRef = [useRef<any>(null), useRef<any>(null), useRef<any>(null), useRef<any>(null)]

    const isLoading = useAppLoading()

    const [communityBySeasonList, setCommunityBySeasonList] = useState<apiSeason.TResCommunityHighlight[][]>()
    const [communityBySearchData, setCommunityBySearchData] = useState<apiSeason.TResSearchCommu[] | null>(null)
    const [isClickBack, setIsClickBack] = useState(false)

    const genNewCommunityList = async () => {
        let monthSeason: any[] = [[], [], [], []]
        await communityHighlight.forEach((item, index) => {
            let monthSeasonNum = findMonthRange(item.monthID)
            monthSeason[monthSeasonNum - 1].push(item)
        })
        setCommunityBySeasonList(monthSeason)
    }

    useEffect(() => {
        genNewCommunityList()
    }, [communityHighlight])

    // useEffect(() => {
    //    setTimeout(async () => {

    //       const currentDate = new Date()
    //       let currentMonth = currentDate.getMonth()

    //       if (fieldRef?.length > 0) {

    //          if (currentMonth >= 0 && currentMonth < 3) {
    //             console.log(' JAN,MAR', fieldRef[0].current)
    //             fieldRef[0].current.scrollIntoView();
    //          }
    //          else if (currentMonth > 2 && currentMonth < 6) {
    //             console.log('APR,JUN', fieldRef[1].current)
    //             fieldRef[1].current.scrollIntoView();

    //          }
    //          else if (currentMonth > 5 && currentMonth < 9) {
    //             console.log('JULY,SEP', fieldRef[2].current)
    //             fieldRef[2].current.scrollIntoView();

    //          }
    //          else if (currentMonth > 8 && currentMonth < 12) {
    //             console.log('OCT,DEC', fieldRef[3].current)
    //             // window.scrollBy(200, 200);
    //             fieldRef[3].current.scrollIntoView();
    //          }
    //       }

    //    }, 1000)
    // }, [fieldRef])

    const handleSubmit = async (values: any) => {
        // console.log('handleSubmit>', values)
        isLoading.functions.setShowLoading()
        const params = {
            monthID: values.month || null,
            provID: values.province || null,
            communID: values.community || null,
            keyword: values.keyword || null,
        }
        const resultResponse = await apiSeason.searchCommu(params)
        if (resultResponse) {
            isLoading.functions.setHideLoading()
            setCommunityBySearchData(resultResponse)
            setIsClickBack(false)
        }
    }

    const handleClickSetCommunityBySearchData = () => {
        setCommunityBySearchData(null)
        setIsClickBack(true)
    }

    return {
        fieldRef,
        communityBySeasonList,
        handleSubmit,
        communityBySearchData,
        handleClickSetCommunityBySearchData,
        isClickBack,
    }
}
export default useSeason
