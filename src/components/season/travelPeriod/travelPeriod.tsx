import React, { useEffect } from 'react'
import * as apiSeason from '../apiSeason'
import { Router, useRouter } from 'next/router'
//Material UI
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import Button from '@material-ui/core/Button'
import LeftIcon from '@material-ui/icons/ArrowBackIos'

import { useTranslation } from 'react-i18next'
import usePagination from '../../../hook/usePagination'

import ColorWeb from '../../../constants/colorWeb'
import { monthParams } from '../../../constants/month'
import Meta from '../../../controls/meta/meta'

//control
import Card from '../../../controls/card/cardCommunity'
import useBreadcrumbs from '../../../hook/useBreadcrumbs'
import MainPageHeaderMenuList from '../../../controls/mainPageTitle/mainPageHeaderMenuList'
import UseTravelPeriod, { UseTravelPeriodProps } from './useTravelPeriod'
import { TResGetCommuTravelPeriod } from '../apiSeason'

//img
const ic_detail_location = process.env.NEXT_PUBLIC_WEB_URL + '/images/icon/ic_detail_location.png'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            // backgroundColor: theme.colors.white,
            paddingTop: 90,
            [theme.breakpoints.down('md')]: {
                paddingTop: 60,
            },
            [theme.breakpoints.down('xs')]: {
                paddingTop: 30,
            },
        },
        txt_title: {
            color: theme.palette.primary.main,
            margin: '40px 0px 40px 10px',
            [theme.breakpoints.down('md')]: {
                margin: '40px 0px 40px 00px',
                ...theme.typography.h2,
            },
            [theme.breakpoints.down('xs')]: {
                margin: '40px 0px 40px 0px',
                ...theme.typography.h3,
            },
        },
        detailLocation: {
            color: theme.colors.gray,
            height: '17px',
        },
        prov: {
            color: theme.colors.textBlack,
        },
        btnSeeAll: {
            color: theme.palette.primary.main,
            // fontSize: 14,
            width: 'auto',
            marginTop: -25,
            // [theme.breakpoints.down('md')]: {
            //     marginTop: 3,
            // },
            [theme.breakpoints.down('xs')]: {
                marginTop: -35,
            },
        },
    }),
)

export type RenderCardContentProps = {
    dataItem: TResGetCommuTravelPeriod
}

const RenderCardContent: React.FC<RenderCardContentProps> = ({ dataItem }): any => {
    const { t, i18n } = useTranslation()
    const lang = i18n.language.toUpperCase()
    const classes = useStyles()

    return (
        <>
            <Typography
                gutterBottom
                variant='h3'
                color='primary'
                style={{
                    minHeight: 66,
                    lineHeight: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    marginBottom: 10,
                }}
            >
                {lang === 'TH' ? dataItem.titleTH : dataItem.titleEN}
            </Typography>
            <Grid container justify='center' alignItems='center'>
                <Grid item xs={1}>
                    <img
                        loading='lazy'
                        src={ic_detail_location}
                        alt={'ic_detail_location'}
                        className={classes.detailLocation}
                    />
                </Grid>
                <Grid item xs={11}>
                    <Typography variant='h5' color='textSecondary' className={classes.prov}>
                        {(lang === 'TH' && dataItem[`provName` + lang] !== 'กรุงเทพมหานคร'
                            ? t('SEASON.PROVINCE')
                            : '') + dataItem[`provName` + lang]}
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

type ReturnTypeUsetravelPeriod = ReturnType<typeof UseTravelPeriod>

type travelPeriodViewProps = ReturnTypeUsetravelPeriod & {
    communityTravelPeriodData: apiSeason.TResGetCommuTravelPeriod[]
    currentSortName: string
    handleSortByHighlight: () => void
    handleSortByUpdateDate: () => void
}
let TravelPeriodView: React.FC<travelPeriodViewProps> = ({
    communityTravelPeriodData,
    currentSortName,
    handleSortByHighlight,
    handleSortByUpdateDate,
}) => {
    const classes = useStyles()
    const router = useRouter()
    const { t, i18n } = useTranslation()
    const lang = i18n.language.toUpperCase()
    const {
        dataPage,
        pageCount,
        currentPage,

        setDataSource,
        onChangePage,
    } = usePagination({ initDataSource: communityTravelPeriodData, pageSize: 12 })

    useEffect(() => {
        setDataSource(communityTravelPeriodData)
    }, [communityTravelPeriodData])

    const monthTitles = [
        `${t('MONTH.JAN')} - ${t('MONTH.MAR')}`,
        `${t('MONTH.APR')} - ${t('MONTH.JUN')}`,
        `${t('MONTH.JUL')} - ${t('MONTH.SEP')}`,
        `${t('MONTH.OCT')} - ${t('MONTH.DEC')}`,
    ]

    const setTitleName = () => {
        let titleName = ''

        monthParams.forEach((item, index) => {
            if (router.query.id === item.name) {
                titleName = monthTitles[index]
            }
        })

        return titleName
    }

    const handleClickCard = (id: number) => {
        const link = process.env.NEXT_PUBLIC_LINK + '/community/content/' + id
        if (process.browser) {
            window.open(link)
        } else {
            router.push(link)
        }
    }

    useBreadcrumbs({ contentName: setTitleName() })

    const onClickBack = () => {
        router.push('/community')
    }

    return (
        <Grid container className={classes.root} justify='center' alignItems='center'>
            <Meta
                data={{
                    title: t('SEASON.SEASON.TITLE'),
                    description: 'ท่องเที่ยวชุมชนตามฤดู',
                }}
            />

            <Grid item sm={1} xs={1} container justify='flex-end' alignItems='center'>
                <Button className={classes.btnSeeAll} endIcon={<LeftIcon fontSize='large' />} onClick={onClickBack} />
            </Grid>
            <Grid
                item
                sm={11}
                xs={9}
                container
                justify='flex-start'
                alignItems='center'
                style={{ paddingRight: '60px' }}
            >
                {/* <Typography variant='h1' className={classes.txt_title}>
                    {setTitleName()}
                </Typography> */}
                <MainPageHeaderMenuList
                    title={setTitleName()}
                    menuList={[
                        {
                            title: t('SEASON.HIGHLIGHT'),
                            onClickItem: handleSortByHighlight,
                        },
                        {
                            title: t('SEASON.LATEST'),
                            onClickItem: handleSortByUpdateDate,
                        },
                    ]}
                    currentMenuName={t(currentSortName)}
                    titleTextStyle={{ marginTop: '5px' }}
                />
            </Grid>

            <Grid item xs={11}>
                <Grid
                    container
                    spacing={2}
                    direction='row'
                    justify='flex-start'
                    alignItems='center'
                    style={{ marginBottom: 20 }}
                >
                    {dataPage.map((item, index) => {
                        return (
                            <Grid
                                item
                                lg={3}
                                sm={6}
                                xs={12}
                                key={index}
                                data-aos='zoom-in-up'
                                data-aos-duration={(index + 1) * 300}
                                data-aos-offset={50}
                            >
                                <Card dataItem={item} onClickCard={handleClickCard} style={{ height: 125 }}>
                                    <RenderCardContent dataItem={item} />
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
                <Grid
                    container
                    justify='center'
                    alignItems='center'
                    style={{ margin: '70px 0px 60px 0px', width: '100%' }}
                >
                    <Pagination
                        count={pageCount}
                        page={currentPage}
                        onChange={onChangePage}
                        showFirstButton
                        showLastButton
                        size='small'
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}

type travelPeriodProps = UseTravelPeriodProps &
    Omit<travelPeriodViewProps, keyof ReturnTypeUsetravelPeriod> & {
        communityTravelPeriodData: apiSeason.TResGetCommuTravelPeriod[]
    }
let TravelPeriod: React.FC<travelPeriodProps> = ({ ...others }) => {
    const travelPeriod = UseTravelPeriod({ communityTravelPeriodData: others.communityTravelPeriodData })
    return <TravelPeriodView {...others} {...travelPeriod} />
}

export default TravelPeriod
