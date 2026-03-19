import React from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import ContentSeason from '../../../src/components/season/content/contentSeason'

import * as apiSeason from '../../../src/components/season/apiSeason'

const ContentSeasonIndex = ({ dataContentSeason }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return <ContentSeason dataContentSeason={dataContentSeason} />
}

export default ContentSeasonIndex

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
    // you also have access to the param postId from the context
    const id = params?.id as string
    const dataContentSeason = await apiSeason.getCommuContent(id)

    if (res.statusCode !== 200 || !dataContentSeason) {
        res.writeHead(302, {
            // or 301
            Location: '/',
        })
        res.end()
    }
    // query the data based on the postId and return as props
    return {
        props: { dataContentSeason }, // queried data
    }
}
