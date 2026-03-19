import React from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import RecommendedRoute from '../../src/components/recommendedRoute/recommendedRoute'

import { fetchGet, fetchPost } from '../../src/utilities/request'
import { apiConfig } from '../../src/configs/webAPIConfig'

export type RouteType = {
    ID: number
    titleTH: string
    titleEN: string
    provNameTH: string
    provNameEN: string
    image: string
    day: number
    communID: number
    communNameTH: string
    communNameEN: string
    updateDate: string
}

export type ProvinceType = {
    provID: string
    provNameTH: string
    provNameEN: string
}

export type CommunityType = {
    communID: string
    communCode: string
    communNameTH: string
    communNameEN: string
}

export const getAllData = async () => {
    try {
        const getRouteData = await fetchPost({ url: apiConfig.search.trip })
        const lookupProvince = await fetchGet({ url: apiConfig.lookup.province })
        const lookupCommunity = await fetchGet({ url: apiConfig.lookup.community })

        return { getRouteData, lookupProvince, lookupCommunity }
    } catch (err) {
        console.log('Error getRouteContent: ', err)
        return null
    }
}

const RecommendedRouteIndex = ({
    getRouteData,
    lookupProvince,
    lookupCommunity,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <RecommendedRoute routeData={getRouteData} lookupProvince={lookupProvince} lookupCommunity={lookupCommunity} />
    )
}

export default RecommendedRouteIndex

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const data = await getAllData()

    if (res.statusCode !== 200 || !data) {
        res.writeHead(302, {
            // or 301
            Location: '/',
        })
        res.end()
    }

    return {
        props: data,
    }
}
