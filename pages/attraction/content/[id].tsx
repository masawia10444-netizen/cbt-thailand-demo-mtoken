import React from 'react'
import ContentActivity from '../../../src/components/activity/content/contentActivity'

import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import * as apiAttraction from '../../../src/components/activity/apiAttraction'

const ContentActivityIndex = ({ dataContentAttraction }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return <ContentActivity dataContentAttraction={dataContentAttraction} />
}

export default ContentActivityIndex

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
    // you also have access to the param postId from the context
    const id = params?.id as string
    const dataContentAttraction = await apiAttraction.getAttractionContent(id)

    if (res.statusCode !== 200 || !dataContentAttraction) {
        res.writeHead(302, {
            // or 301
            Location: '/',
        })
        res.end()
    }

    return {
        props: { dataContentAttraction }, // queried data
    }
}
