import React from 'react'
import Accommodation from '../../src/components/accommodation/accommodation'

import * as apiAccommodation from '../../src/components/accommodation/apiAccommodation'

import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

export type AccommodationType = {
    accomID: number
    accomNameTH: string
    accomNameEN?: string
    communNameTH: string
    communNameEN?: string
    typeNameTH?: string
    typeNameEN?: string
    image?: string
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

const AccommodationIndex = ({
    getAccommodationData,
    lookupProvince,
    lookupCommunity,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <Accommodation
            accommodationData={getAccommodationData}
            lookupProvince={lookupProvince}
            lookupCommunity={lookupCommunity}
        />
    )
}

export default AccommodationIndex

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const [getAccommodationData, lookupProvince, lookupCommunity] = await Promise.all([
        apiAccommodation.searchAccommodation(),
        apiAccommodation.getLookupProvince(),
        apiAccommodation.getLookupCommu(),
    ])

    if (res.statusCode !== 200 || !getAccommodationData || !lookupProvince || !lookupCommunity) {
        res.writeHead(302, {
            // or 301
            Location: '/',
        })
        res.end()
    }

    return {
        props: {
            getAccommodationData,
            lookupProvince,
            lookupCommunity,
        },
    }
}
