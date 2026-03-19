import React from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import * as apiSeason from '../../../src/components/season/apiSeason'
import TravelPeriod from '../../../src/components/season/travelPeriod/travelPeriod'

const TravelPeriodIndex = ({ communityTravelPeriod }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    // console.log('communityTravelPeriod', communityTravelPeriod)
    return <TravelPeriod communityTravelPeriodData={communityTravelPeriod} />
}

export default TravelPeriodIndex

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
    const id = params?.id as string
    // const id = 'JAN,MAR'
    const communityTravelPeriod = await apiSeason.getCommuTravelPeriod(id)
    if (res.statusCode !== 200 || !communityTravelPeriod) {
        res.writeHead(302, {
            // or 301
            Location: '/',
        })
        res.end()
    }
    return {
        props: {
            communityTravelPeriod,
        },
    }
}
