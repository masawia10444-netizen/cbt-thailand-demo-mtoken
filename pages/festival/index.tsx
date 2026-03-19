import React from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import * as apiFestival from '../../src/components/festival/apiFestival'

import Festival from '../../src/components/festival/festival'

const FestivalIndex = ({
    getFestivalData,
    lookupProvince,
    lookupCommunity,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return <Festival festivalData={getFestivalData} lookupProvince={lookupProvince} lookupCommunity={lookupCommunity} />
}

export default FestivalIndex

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const [getFestivalData, lookupProvince, lookupCommunity] = await Promise.all([
        apiFestival.searchFestival({}),
        apiFestival.getLutProvince(),
        apiFestival.getLutCommunity(),
    ])

    if (res.statusCode !== 200 || !getFestivalData || !lookupProvince || !lookupCommunity) {
        res.writeHead(302, {
            // or 301
            Location: '/',
        })
        res.end()
    }

    return {
        props: {
            getFestivalData,
            lookupProvince,
            lookupCommunity,
        },
    }
}
