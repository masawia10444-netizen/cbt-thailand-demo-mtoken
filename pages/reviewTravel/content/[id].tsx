import ContentCommunityView from '../../../src/components/community/contents/contentCommunity'
import { fetchGet } from '../../../src/utilities/request'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { apiConfig } from '../../../src/configs/webAPIConfig'

export const getDataContentCommunity = async (id: string | string[]) => {
    try {
        const dataContentCommunity = await fetchGet({
            url: apiConfig.resource.reviewTravel.reviewTravelContent + id,
        })
        return dataContentCommunity
    } catch (err) {
        console.log('Error getDataContentCommunity: ', err)
        return null
    }
}

const CommunityContent = ({ dataContentCommunity }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return <ContentCommunityView {...dataContentCommunity} />
}

export default CommunityContent

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
    // you also have access to the param postId from the context
    const id = params?.id
    const dataContentCommunity = await getDataContentCommunity(id)

    if (res.statusCode !== 200 || !dataContentCommunity) {
        res.writeHead(302, {
            // or 301
            Location: '/',
        })
        res.end()
    }

    return {
        props: { dataContentCommunity }, // queried data
    }
}
