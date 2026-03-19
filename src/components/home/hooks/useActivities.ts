import { useEffect, useState, useMemo } from 'react'
import Router from 'next/router'
import Store from '../../../stores/rootStore'

const useActivities = () => {
    const { AttractionStore } = Store()
    const handleClickCard = async (attracTypeID: string) => {
        await AttractionStore.setSearchParams(attracTypeID)
        Router.push('/attraction')
    }

    return { handleClickCard }
}
export default useActivities
