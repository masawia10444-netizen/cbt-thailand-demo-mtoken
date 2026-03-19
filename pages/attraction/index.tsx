import React from 'react'
import Activity from '../../src/components/activity/activity'
import * as apiAttraction from '../../src/components/activity/apiAttraction'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

const ActivityIndex = ({
    getAttractionData,
    lookupAttracType,
    lookupProvince,
    lookupCommunity,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <Activity
            attractionData={getAttractionData}
            lookupAttracType={lookupAttracType}
            lookupProvince={lookupProvince}
            lookupCommunity={lookupCommunity}
        />
    )
}

export default ActivityIndex

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const [getAttractionData, lookupAttracType, lookupProvince, lookupCommunity] = await Promise.all([
        apiAttraction.searchAttraction(),
        apiAttraction.getLookupAttractionType(),
        apiAttraction.getLookupProvince(),
        apiAttraction.getLookupCommu(),
    ])

    if (res.statusCode !== 200 || !getAttractionData || !lookupAttracType || !lookupProvince || !lookupCommunity) {
        res.writeHead(302, {
            // or 301
            Location: '/',
        })
        res.end()
    }

    return {
        props: {
            getAttractionData,
            lookupAttracType,
            lookupProvince,
            lookupCommunity,
        },
    }
}
