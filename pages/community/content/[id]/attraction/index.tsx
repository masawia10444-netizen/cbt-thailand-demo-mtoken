import React from 'react'
import AttractionInCommunity from '../../../../../src/components/season/content/attraction/attraction'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import * as apiSeason from '../../../../../src/components/season/apiSeason'

const attractionCommuIndex = ({ dataAttractionCommunity }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return <AttractionInCommunity dataAttractionCommunity={dataAttractionCommunity} />
}

export default attractionCommuIndex

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
    // you also have access to the param postId from the context
    const id = params?.id as string
    const dataAttractionCommunity = await apiSeason.getCommuAttraction(id)

    if (res.statusCode !== 200 || !dataAttractionCommunity) {
        res.writeHead(302, {
            // or 301
            Location: '/',
        })
        res.end()
    }

    return {
        props: { dataAttractionCommunity }, // queried data
    }
}
