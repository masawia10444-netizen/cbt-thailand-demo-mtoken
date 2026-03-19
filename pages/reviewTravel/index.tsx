import React from 'react'
// import Community from '../../src/components/community/community'
import Community from '../../src/components/community/community'
import { fetchGet } from '../../src/utilities/request'
import { apiConfig } from '../../src/configs/webAPIConfig'

const CommunityIndex = ({ props }: any) => {
    //console.log(props)
    return <Community {...props} />
}

CommunityIndex.getInitialProps = async () => {
    const reviewTravelData = await fetchGet({ url: apiConfig.resource.reviewTravel.reviewTravel })

    return {
        props: { reviewTravelData },
    }
}

export default CommunityIndex
