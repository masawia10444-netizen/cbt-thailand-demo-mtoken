import React from 'react'
import ContentAccommodation from '../../../src/components/accommodation/content/contentAccommodation'

import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import * as apiAccommodation from '../../../src/components/accommodation/apiAccommodation'

const AccommodationContent = ({ dataContentAccommodation }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    // console.log('getDataContentAccommodation', dataContentAccommodation)
    return <ContentAccommodation dataContentAccommodation={dataContentAccommodation} />
}

export default AccommodationContent

export const getServerSideProps: GetServerSideProps = async (context) => {
    // you also have access to the param postId from the context
    const id = context?.params?.id as string
    const dataContentAccommodation = await apiAccommodation.getAccomContent(id)

    if (context.res.statusCode !== 200 || !dataContentAccommodation) {
        context.res.writeHead(302, {
            // or 301
            Location: '/',
        })
        context.res.end()
    }

    return {
        props: {
            dataContentAccommodation,
        }, // queried data
    }
}
