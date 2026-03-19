import { useEffect } from 'react'
import * as apiAttraction from './apiAttraction'
import { useTranslation } from 'react-i18next'
import usePagination from '../../hook/usePagination'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import LeftIcon from '@material-ui/icons/ArrowBackIos'
import Typography from '@material-ui/core/Typography'
import Pagination from '@material-ui/lab/Pagination'

import Card from '../../controls/card/cardCommunity'
import NoImageView from '../../controls/noImageView'
import RenderCardContent from './renderCardContent'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'

type RenderSearchViewPropsType = {
    attractionBySearchData: apiAttraction.TResSearchAttraction[]
    classes: any
    handleClickCard: (id: number) => void
    handleClickSetAttractionBySearchData: (params?: any) => void
}
const RenderSearchView = (props: RenderSearchViewPropsType) => {
    const { attractionBySearchData, classes, handleClickCard, handleClickSetAttractionBySearchData } = props
    const { t } = useTranslation()
    const { dataPage, pageCount, currentPage, setDataSource, onChangePage } = usePagination({
        initDataSource: attractionBySearchData,
        pageSize: 12,
    })
    const theme = useTheme()
    const isMobileView = useMediaQuery(theme.breakpoints.down('xs'))

    useEffect(() => {
        setDataSource(attractionBySearchData)
    }, [attractionBySearchData])

    const onClickBack = () => {
        if (handleClickSetAttractionBySearchData) handleClickSetAttractionBySearchData()
    }

    return (
        <>
            <Grid container direction='row' alignItems='center' style={isMobileView ? { marginLeft: '-25px', marginBottom: '-20px' } : { marginTop: '5px', marginLeft: '-25px' }}>
                <Grid item sm={1} xs={1} style={{ marginTop: isMobileView ? '-25px' : '-20px' }}>
                    <Button className={classes.btnBack} endIcon={<LeftIcon fontSize='large' />} onClick={onClickBack} />
                </Grid>
                <Grid item sm={11} xs={11} className={classes.txtTitle}>
                    <Typography variant={isMobileView ? 'h2' : 'h1'} color='primary' className={classes.searchTitle}>
                        {t('ATTRACTION.RESULT')}
                    </Typography>
                </Grid>
            </Grid>
            {attractionBySearchData?.length > 0 ? (
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
            ) : (
                    <NoImageView />
                )}

            {attractionBySearchData?.length === 0 ? null : (
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
            )}
        </>
    )
}

type renderSearchViewProps = {} & RenderSearchViewPropsType
let RenderSearch: React.FC<renderSearchViewProps> = ({ ...others }) => {
    return <RenderSearchView {...others} />
}

export default RenderSearch
