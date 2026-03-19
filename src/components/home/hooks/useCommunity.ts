import { useEffect, useState, useMemo } from 'react'
import { Community as CommunityType } from '../../../stores/homeStore'
import { findMonthRange } from '../../../utilities/monthUtilities'
import { useTranslation } from 'react-i18next'

type UseCommunityType = {
    communityList: CommunityType[]
}

const useCommunity = ({ communityList }: UseCommunityType) => {
    const { t } = useTranslation()
    const [communityBySeasonList, setCommunityBySeasonList] = useState<CommunityType[][]>()

    const genNewCommunityList = async () => {
        let monthSeason: any[] = [[], [], [], []]

        await communityList.forEach((item, index) => {
            let monthSeasonNum = findMonthRange(item.monthID)
            monthSeason[monthSeasonNum - 1].push(item)
        })

        setCommunityBySeasonList(monthSeason)
    }

    const monthConfig = [
        {
            label: `${t('MONTH.JAN')} - ${t('MONTH.MAR')}`,
            minMonth: 1,
            maxMonth: 3,
        },
        {
            label: `${t('MONTH.APR')} - ${t('MONTH.JUN')}`,
            minMonth: 4,
            maxMonth: 6,
        },
        {
            label: `${t('MONTH.JUL')} - ${t('MONTH.SEP')}`,
            minMonth: 7,
            maxMonth: 9,
        },
        {
            label: `${t('MONTH.OCT')} - ${t('MONTH.DEC')}`,
            minMonth: 10,
            maxMonth: 12,
        },
    ]

    const monthTitles = useMemo(() => monthConfig.map((item) => item.label), [monthConfig])
    const defaultTab = useMemo(() => {
        const currentMonth = new Date().getMonth() + 1
        const index = monthConfig.findIndex((month) => currentMonth >= month.minMonth && currentMonth <= month.maxMonth)
        return index
    }, [monthConfig])

    useEffect(() => {
        genNewCommunityList()
    }, [communityList])

    return {
        communityBySeasonList,
        monthTitles,
        defaultTab,
    }
}
export default useCommunity
