import { useEffect } from 'react'
import * as apiAttraction from './apiAttraction'
import { useTranslation } from 'react-i18next'
import usePagination from '../../hook/usePagination'
import Meta from '../../controls/meta/meta'
import Grid from '@material-ui/core/Grid'
import Pagination from '@material-ui/lab/Pagination'

import Card from '../../controls/card/cardCommunity'
import MainPageHeader from '../../controls/mainPageTitle/mainPageHeader'
import RenderCardContent from './renderCardContent'

const img_cover = process.env.NEXT_PUBLIC_WEB_URL + '/images/activity/7.3.png'

type RenderViewPropsType = {
    attractionData: apiAttraction.TResSearchAttraction[]
    classes: any
    handleClickCard: (id: number) => void
}
const RenderView = (props: RenderViewPropsType) => {
    const { attractionData, classes, handleClickCard } = props
    const { t } = useTranslation()
    const { dataPage, pageCount, currentPage, setDataSource, onChangePage } = usePagination({
        initDataSource: attractionData,
        pageSize: 12,
    })

    useEffect(() => {
        setDataSource(attractionData)
    }, [attractionData])

    return (
        <>
            <Meta
                data={{
                    title: t('ATTRACTION.ATTRACTION.HEADER'),
                    description: t('ATTRACTION.ATTRACTION.HEADER'),
                    image: img_cover,
                }}
            />
            <MainPageHeader title={t('ATTRACTION.ATTRACTION.TITLE')} />

            <Grid container spacing={2} direction='row' justify='flex-start' alignItems='center'>
                {dataPage.map((item, index) => {
                    return (
                        <Grid
                            item
                            lg={3}
                            sm={6}
                            xs={12}
                            key={index}
                            data-aos='zoom-in-up'
                            data-aos-duration={(index + 1) * 150}
                            data-aos-offset={50}
                        >
                            <Card
                                dataItem={item}
                                onClickCard={handleClickCard}
                                style={{ height: 170, padding: '16px' }}
                            >
                                <RenderCardContent dataItem={item} />
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>

            <Grid container justify='center' alignItems='center' style={{ margin: '70px 0px 40px 0px' }}>
                <Pagination
                    count={pageCount}
                    page={currentPage}
                    onChange={onChangePage}
                    showFirstButton
                    showLastButton
                    size='small'
                />
            </Grid>
        </>
    )
}

export default RenderView
