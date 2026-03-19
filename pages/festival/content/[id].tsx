import React from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import * as apiFestival from '../../../src/components/festival/apiFestival'

import ContentFestival from '../../../src/components/festival/content/contentFestival'

const ContentFestivalIndex = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return <ContentFestival dataContentFestival={props.dataContentFestival} />
}

export default ContentFestivalIndex

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
    const id = params?.id as string
    const dataContentFestival = await apiFestival.getFestivalContent(id)

    if (res.statusCode !== 200 || !dataContentFestival) {
        res.writeHead(302, {
            // or 301
            Location: '/',
        })
        res.end()
    }

    return {
        props: { dataContentFestival }, // queried data
    }
}
