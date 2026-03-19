import React, { FC } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

type metaType = {
    data: {
        title?: string
        description?: string
        image?: string
        isContent?: boolean
    }
}

const meta: FC<metaType> = (props) => {
    const router = useRouter()
    const data = props.data
    data.title = data.title !== null ? data.title + ' | CBT Thailand' : 'CBT Thailand'
    data.description =
        data.description !== null
            ? data.description
            : 'สัมผัสประสบการณ์การท่องเที่ยวสุดพิเศษ ผ่านกิจกรรมการท่องเที่ยวโดยชุมชนสุดสร้างสรรค์ เรียนรู้ความหลากหลายของวิถีชีวิต ผู้คน ผ่านวัฒนธรรมและประเพณีอันสวยงาม'

    if (data.isContent && data.image !== null && data.image !== '') {
        const arrFilePath = data.image.split('/')
        const arrFileName = arrFilePath.pop().split('.')
        const newFileName = `${arrFileName[0]}_resize.jpg`
        const newFilePath = arrFilePath.concat(newFileName).join('/')

        data.image = newFilePath
    }

    return (
        <Head>
            <link rel='shortcut icon' href={process.env.NEXT_PUBLIC_WEB_URL + '/favicon.ico'} />
            <title>{data.title}</title>
            <meta name='title' content={data.title} />
            <meta name='description' content={data.description} />

            <meta property='fb:app_id' content='3896560693691930' />
            <meta property='og:image' content={data.image} />
            <meta property='og:image:url' content={data.image} />
            <meta property='og:image:secure_url' content={data.image} />
            <meta property='og:site_name' content='cbt' />
            <meta property='og:url' content={`${process.env.NEXT_PUBLIC_LINK}${router.asPath}/`} />
            <meta property='og:type' content='website' />
            <meta property='og:title' content={data.title} />
            <meta property='og:description' content={data.description} />
            <meta property='og:locale' content='en_US' />

            <meta property='og:image:width' content='1200' />
            <meta property='og:image:height' content='628' />

            <meta name='twitter:title' content={data.title} />
            <meta name='twitter:description' content={data.description} />
            <meta name='twitter:image' content={data.image} />
            <meta name='twitter:card' content='summary' />
            <meta name='twitter:site' content='cbt' />
            <meta name='twitter:url' content={`${process.env.NEXT_PUBLIC_LINK}${router.asPath}/`} />
        </Head>
    )
}

export default meta
