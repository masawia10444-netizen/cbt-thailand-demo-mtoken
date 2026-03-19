import React from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Season from '../../src/components/season/season'
import * as apiSeason from '../../src/components/season/apiSeason'

const SeasonIndex = ({
    communityHighlight,
    lookupMonth,
    lookupProvince,
    lookupCommunity,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <Season
            communityHighlight={communityHighlight}
            lookupMonth={lookupMonth}
            lookupProvince={lookupProvince}
            lookupCommunity={lookupCommunity}
        />
    )
}

export default SeasonIndex

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const [communityHighlight, lookupMonth, lookupProvince, lookupCommunity] = await Promise.all([
        apiSeason.getCommuHighlight(),
        apiSeason.getLookupMonth(),
        apiSeason.getLookupProvince(),
        apiSeason.getLookupCommu(),
    ])

    if (res.statusCode !== 200 || !communityHighlight || !lookupMonth || !lookupProvince || !lookupCommunity) {
        res.writeHead(302, {
            // or 301
            Location: '/',
        })
        res.end()
    }

    return {
        props: {
            communityHighlight,
            lookupMonth,
            lookupProvince,
            lookupCommunity,
        },
    }
}
