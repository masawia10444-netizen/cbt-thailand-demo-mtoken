import React from 'react'
import ContentRecommendedRoute from '../../../src/components/recommendedRoute/content/contentRecommendedRoute'
import * as apiRoute from '../../../src/components/recommendedRoute/apiRoute'
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

// import { useRouter } from 'next/router'
import { apiConfig } from '../../../src/configs/webAPIConfig'
import { fetchGet } from '../../../src/utilities/request'
import { TContentRecom } from '../../../src/components/recommendedRoute/content/ContentRecomStructure'
import { ParsedUrlQuery } from 'querystring'

const ContentRecommendedRouteIndex = ({ dataContent }: { dataContent: TContentRecom }) => {
    return <ContentRecommendedRoute dataContent={dataContent} />
}

export default ContentRecommendedRouteIndex

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext<ParsedUrlQuery>) => {
    // you also have access to the param postId from the context
    const id = context?.params?.id as string
    const dataContent = await apiRoute.getRouteContent(id)

    if (context.res.statusCode !== 200 || !dataContent) {
        context.res.writeHead(302, {
            // or 301
            Location: '/',
        })
        context.res.end()
    }

    return {
        props: { dataContent }, // queried data
    }
}
