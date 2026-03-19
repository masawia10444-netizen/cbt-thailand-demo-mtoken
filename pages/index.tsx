import React from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Home from '../src/components/home/views/home'
import { fetchGet } from '../src/utilities/request'
import { Highlight } from '../src/stores/homeStore'
import { apiConfig } from '../src/configs/webAPIConfig'

export const getHighlight = async () => {
    try {
        const res = await fetchGet<Highlight>({
            url: apiConfig.resource.home.highlight,
        })
        return res
    } catch (err) {
        return null
    }
}

const Index = ({ highlight }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return <Home highlight={highlight} />
}

export default Index

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const highlight: Highlight = await getHighlight()

    if (res.statusCode !== 200 || !highlight) {
        res.writeHead(302, {
            // or 301
            Location: '/',
        })
        res.end()
    }

    return {
        props: { highlight },
    }
}
