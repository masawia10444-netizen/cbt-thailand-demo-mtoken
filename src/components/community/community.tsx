import React, { FC, useEffect, ChangeEvent, MouseEvent } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Pagination from '@material-ui/lab/Pagination'
// import Cards from '../../controls/card/card'
import Card from '../../controls/card/cardCommunity'
import usePagination from '../../hook/usePagination'

import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
//constants
import FontSize from '../../constants/fontSize'
import Meta from '../../controls/meta/meta'
import MainPageHeaderMenuList from '../../controls/mainPageTitle/mainPageHeaderMenuList'
import UseCommunity, { UseCommunityProps, TResCommunity } from './useCommunity'
import { convertToDisplayDate } from '../../utilities/dateTimeUtils'

const image = process.env.NEXT_PUBLIC_WEB_URL + '/images/community/10.png'
const ic_detail_location = process.env.NEXT_PUBLIC_WEB_URL + '/images/icon/ic_detail_location.png'
const ic_detail_date = process.env.NEXT_PUBLIC_WEB_URL + '/images/icon/ic_detail_date.png'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            //height: '100%',
            //height: 'calc(100% - 120px)',
        },
        rootCard: {
            maxWidth: '100%',
        },
        media: {
            height: 140,
        },
        imageHeader: {
            position: 'relative',
            display: 'inline-block',
        },
        responsive: {
            height: '500px',
            backgroundSize: 'cover',
            width: '100%',
            objectFit: 'cover',
        },
        caption: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate( -50%, -50% )',
            textAlign: 'center',
            color: 'white',
            fontSize: '36px',
            fontWeight: 'bold',
        },
        headerField: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate( -50%, -50% )',
            textAlign: 'center',
            color: theme.colors.white,
        },
        txt_headerField: {
            fontFamily: 'Prompt-Regular',
            [theme.breakpoints.down('xs')]: {
                fontSize: 22,
            },
        },
        content: {
            width: '90%',
            height: '100%',
            padding: '25px 0 60px 0',
            [theme.breakpoints.down('xs')]: {
                padding: '30px 0 60px 0',
            },
        },

        txtTitle: {
            fontSize: theme.fontStyle.prompt.h1.fontSize,
            fontWeight: FontSize.weight.semiBold,
            color: theme.palette.primary.main,
            marginBottom: 20,
            padding: '30px 0px 15px 0px',
        },
        detailLocation: {
            color: theme.colors.gray,
            height: '15px',
        },
        prov: {
            color: theme.colors.textBlack,
        },
        detailDate: {
            color: theme.colors.gray,
            height: '17px',
        },
        updateDate: {
            color: theme.colors.textBlack,
        },
    }),
)

type ReturnTypeUseCommunity = ReturnType<typeof UseCommunity>

type RenderCardContentProps = {
    dataItem: TResCommunity
}

const RenderCardContent: React.FC<RenderCardContentProps> = ({ dataItem }) => {
    const { t, i18n } = useTranslation()
    const lang = i18n.language.toUpperCase()
    const classes = useStyles()

    return (
        <>
            <Grid container alignItems='center' justify='center'>
                <Grid item xs={12}>
                    <Typography gutterBottom variant='h3' color='primary' noWrap>
                        {dataItem[`title` + lang]}
                    </Typography>
                </Grid>
            </Grid>

            <Grid container justify='center' alignItems='center'>
                <Grid container alignItems='center'>
                    <Grid item xs={1}>
                        <img
                            loading='lazy'
                            src={ic_detail_location}
                            alt='ic_detail_location'
                            className={classes.detailLocation}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='h5' color='textSecondary' className={classes.prov} noWrap>
                            {(lang === 'TH' && dataItem[`provName` + lang] !== 'กรุงเทพมหานคร'
                                ? t('SEASON.PROVINCE')
                                : '') + dataItem[`provName` + lang]}
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <img loading='lazy' src={ic_detail_date} alt='ic_detail_date' className={classes.detailDate} />
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant='h5' color='textSecondary' className={classes.updateDate} noWrap>
                            {dataItem && convertToDisplayDate({ date: dataItem?.updateDate, lang: lang })}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

type communityViewProps = {
    reviewTravelData: TResCommunity[]
    currentSortName: string
    handleSortByHighlight: () => void
    handleSortByUpdateDate: () => void
}

let CommunityView: React.FC<communityViewProps> = (props) => {
    const { reviewTravelData, currentSortName, handleSortByHighlight, handleSortByUpdateDate } = props
    const classes = useStyles()
    const { t } = useTranslation()
    const router = useRouter()
    const { dataPage, pageCount, currentPage, onChangePage } = usePagination<TResCommunity[]>({
        initDataSource: reviewTravelData,
        pageSize: 12,
    })

    const handleCardClick = (id: number) => {
        const link = process.env.NEXT_PUBLIC_LINK + `/reviewTravel/content/${id}`
        if (process.browser) {
            window.open(link)
        } else {
            router.push(link)
        }
    }

    return (
        <>
            <Meta
                data={{
                    title: t('COMMUNITY.TITLE'),
                    description: t('COMMUNITY.TITLE'),
                    image: image,
                }}
            />
            <Grid container className={classes.root} justify='flex-start' alignContent='flex-start'>
                <Grid item xs={12}>
                    <Grid container className={classes.imageHeader}>
                        <img loading='lazy' src={image} alt={t('COMMUNITY.TITLE')} className={classes.responsive} />
                        <Grid item sm={12} xs={11} className={classes.headerField} style={{ width: '100%' }}>
                            <Typography variant='h1' className={classes.txt_headerField}>
                                {t('COMMUNITY.TITLE')}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item xs={12} justify='center' alignContent='center'>
                    <Grid container className={classes.content} justify='center' alignContent='center'>
                        <MainPageHeaderMenuList
                            title={t('COMMUNITY.TITLE')}
                            menuList={[
                                {
                                    title: t('COMMUNITY.HIGHLIGHT'),
                                    onClickItem: handleSortByHighlight,
                                },
                                {
                                    title: t('COMMUNITY.LATEST'),
                                    onClickItem: handleSortByUpdateDate,
                                },
                            ]}
                            currentMenuName={t(currentSortName)}
                        />
                        <Grid container spacing={2} direction='row' justify='flex-start' alignItems='center'>
                            {dataPage.map((item, index) => {
                                item.menu = 'community'
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
                                            onClickCard={handleCardClick}
                                            style={{ height: 100, padding: '16px' }}
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
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

type communityProps = UseCommunityProps &
    Omit<communityViewProps, keyof ReturnTypeUseCommunity> & {
        reviewTravelData: TResCommunity[]
    }
let Community: React.FC<communityProps> = ({ ...others }) => {
    const community = UseCommunity({ reviewTravelData: others.reviewTravelData })
    return <CommunityView {...community} {...others} />
}

export default Community
