import React from 'react'
import ContentRelattraction from '../../../src/components/relattraction/content/contentRelattraction'

import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import * as apiRelattraction from '../../../src/components/relattraction/apiRelattraction'

const ContentRelattractionIndex = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return <ContentRelattraction dataContentRelAttraction={props.dataContentRelattraction} />
}

export default ContentRelattractionIndex

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
    // you also have access to the param postId from the context
    const id = params?.id as string
    const dataContentRelattraction = await apiRelattraction.getRelattractionContent(id)

    if (res.statusCode !== 200 || !dataContentRelattraction) {
        res.writeHead(302, {
            // or 301
            Location: '/',
        })
        res.end()
    }

    return {
        props: { dataContentRelattraction }, // queried data
    }
}
