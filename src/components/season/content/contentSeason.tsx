import React, { useMemo, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import Store from '../../../stores/rootStore'
import ReactPlayer from 'react-player'
import drop from 'lodash/drop'
import { useRouter } from 'next/router'
import * as apiSeason from '../apiSeason'
//Material UI
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import RightIcon from '@material-ui/icons/ChevronRight'

//constant
import ColorWeb from '../../../constants/colorWeb'
import Button from '../../../controls/button/button'

import { useTranslation } from 'react-i18next'
import { Typography } from '@material-ui/core'
import ImageSlider from '../../../controls/imageslider/imageSlider'
import Meta from '../../../controls/meta/meta'
import Share from '../../../controls/share/share'
import useContentSeason, { ReturnTypeUsecontentSeason } from './useContentSeason'
import useBreadcrumbs from '../../../hook/useBreadcrumbs'
import Link from '@material-ui/core/Link'

const publicPath = process.env.NEXT_PUBLIC_WEB_URL

//img
const img_souvenir = publicPath + '/images/icon/ic_gift@2x.png'
const img_point = publicPath + '/images/icon/ic_outstanding@2x.png'
const img_touristConduct = publicPath + '/images/icon/ic_practice@2x.png'
const img_activity = publicPath + '/images/icon/ic_activity@2x.png'
const img_attraction = publicPath + '/images/icon/ic_travellinks@2x.png'
const no_image = publicPath + '/images/defaultBannerImg/Community_banner.png'

const facIcons = {
    PK: publicPath + '/images/icon/ic_fac_carpark.png',
    WC: publicPath + '/images/icon/ic_fac_toilet.png',
    WI: publicPath + '/images/icon/ic_fac_toilet.png',
    DR: publicPath + '/images/icon/ic_fac_eldtoilet.png',
    PA: publicPath + '/images/icon/ic_fac_pet.png',
    SM: publicPath + '/images/icon/ic_fac_smorkarea.png',
    WA: publicPath + '/images/icon/ic_fac_wheelchair.png',
    AIR: publicPath + '/images/icon/ic_fac_air.png',
    ATM: publicPath + '/images/icon/ic_fac_atm.png',
    FAN: publicPath + '/images/icon/ic_fac_fan.png',
    PRY: publicPath + '/images/icon/ic_fac_prayer.png',
    RE: publicPath + '/images/icon/ic_fac_diningroom.png',
    ic_fac_accom: publicPath + '/images/icon/ic_fac_accom.png',
    MR: publicPath + '/images/icon/ic_fac_meetingroom.png',
}

const facIconsPayments = {
    1: publicPath + '/images/icon/ic_fac_cash@2x.png',
    2: publicPath + '/images/icon/ic_fac_payonline@2x.png',
    3: publicPath + '/images/icon/ic_fac_atm@2x.png',
    4: publicPath + '/images/icon/ic_fac_yes@2x.png',
}

const ic_fac_yes = process.env.NEXT_PUBLIC_WEB_URL + '/images/icon/ic_fac_yes@2x.png'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: '100%',
            color: theme.colors.textBlack,
        },
        imageHeader: {
            position: 'relative',
            display: 'inline-block',
            // backgroundColor: theme.colors.white,
            backgroundColor: '#F9F9F9',
        },
        imageHeader_noImage: {
            position: 'relative',
            justifyContent: 'center',
            // backgroundColor: theme.colors.white,
            backgroundColor: '#F9F9F9',
        },
        responsive: {
            width: '100%',
            height: 'auto',
            maxHeight: '500px',
            opacity: 1,
            objectFit: 'cover',
        },
        responsive_noImage: {
            width: '100%',
            height: '100%',
            maxHeight: '500px',
            opacity: 1,
            objectFit: 'cover',
        },
        content: {
            backgroundColor: '#F9F9F9',
            paddingBottom: '50px',
        },
        txtTitle: {
            color: theme.palette.primary.main,
            [theme.breakpoints.down('xs')]: {
                fontSize: 28,
            },
        },
        txtDetail: {
            marginTop: '30px',
            fontFamily: 'Sarabun',
            lineHeight: '27px',
            [theme.breakpoints.down('xs')]: {
                fontSize: 14,
            },
        },
        imgResponsive: {
            width: '100%',
            height: 'auto',
            maxHeight: '324px',
            objectFit: 'cover',
        },
        txt_topic: {
            color: theme.colors.white,
            margin: '10px 0 30px 0',
            fontFamily: 'Prompt-Medium',
            [theme.breakpoints.down('xs')]: {
                fontSize: 24,
            },
        },
        txt_subTopic: {
            fontFamily: 'Sarabun-Bold',
            [theme.breakpoints.down('xs')]: {
                fontSize: 14,
            },
        },
        txt_topic_detail: {
            fontFamily: 'Sarabun',
            lineHeight: 1.6,
            marginTop: '-3px',
            [theme.breakpoints.down('xs')]: {
                fontSize: 14,
            },
        },
        img_topic: {
            width: '60px',
            height: '60px',
            [theme.breakpoints.down('xs')]: {
                width: '50px',
                height: '50px',
            },
        },
        container_topic_inBox: {
            margin: '30px 0px',
        },
        txt_detail_title: {
            color: ColorWeb.secondary.color1,
            margin: '20px 0px',
            [theme.breakpoints.down('xs')]: {
                fontSize: 20,
            },
        },
        txt_detail_subTitle: {
            fontFamily: 'Sarabun-Bold',

            color: ColorWeb.secondary.color1,
            margin: '20px 0',
        },
        txt_subTitle: {
            fontFamily: 'Sarabun-Bold',
            lineHeight: 1.6,
            [theme.breakpoints.down('xs')]: {
                fontSize: 14,
            },
        },
        txt_detail: {
            fontFamily: 'Sarabun',
            paddingBottom: 15,
            lineHeight: 1.6,
            overflowWrap: 'anywhere',
            [theme.breakpoints.down('xs')]: {
                fontSize: 14,
            },
        },
        ic_icon: {
            width: 33,
            height: 33,
            marginTop: '-3px',
            marginRight: '20px',
        },
        container_detail: {
            padding: 30,
            borderBottom: '1px solid',
            borderBottomColor: ColorWeb.secondary.color2,
        },
        btn_route_in_commu: {
            margin: '-40px',
            height: '60px',
            borderRadius: '60px',
            backgroundColor: '#80BD01',
            color: theme.colors.white,
            boxShadow: '0px 20px 20px #80BD012E',
            '&:hover': {
                background: '#87c20e',
            },
            [theme.breakpoints.up('xs')]: {
                width: 280,
            },
            [theme.breakpoints.up('sm')]: {
                width: 550,
            },
            [theme.breakpoints.up('md')]: {
                width: 550,
            },
        },
        content_vdo: {
            padding: '20px 0 60px 0',
            height: '600px',
            [theme.breakpoints.down('sm')]: {
                // height: '260px',
                maxHeight: 375,
            },
        },
        div_tag: {
            background: ColorWeb.secondary.color2,
            margin: '15px 20px 5px 0px',
            height: '30px',
            borderRadius: '20px',
            padding: '7px',
        },
        containerLocation: {
            color: theme.colors.white,
            padding: '60px 0 100px 0',
        },
        imgSlider: {
            color: theme.palette.primary.main,
            marginTop: -50,
        },
    }),
)

type contentSeasonViewProps = ReturnTypeUsecontentSeason & {
    dataContentSeason: apiSeason.TResGetCommuContent
}

type TDisplayString = {
    isLast: boolean
    isComma: boolean
    nameTH: string
    nameEN: string
}
type GetDisplayResponse = (data: TDisplayString) => string
let ContentSeasonView: React.FC<contentSeasonViewProps> = observer(({ dataContentSeason, handleClickLink }) => {
    // console.log('dataContentSeason=======', dataContentSeason)

    const classes = useStyles()
    const { t, i18n } = useTranslation()
    const lang = i18n.language.toUpperCase()
    const router = useRouter()
    const { SeasonStore } = Store()

    const image_banner =
        dataContentSeason?.images?.length > 0
            ? process.env.NEXT_PUBLIC_UPLOAD_URL + dataContentSeason?.images[0]?.communImagePath
            : no_image

    useBreadcrumbs({
        contentName: lang === 'TH' ? dataContentSeason?.locationNameTH : dataContentSeason?.locationNameEN,
    })

    const checkIsComma = (data: any[]) => {
        return data.some((item) => item.monthID)
    }

    const getDisPlayString: GetDisplayResponse = ({ isLast, isComma, nameTH, nameEN }) => {
        let displayString = ''
        if (isComma) {
            const hasNext = isLast ? '' : ', '
            displayString += lang === 'TH' ? `${nameTH}${hasNext}` : `${nameEN}${hasNext}`
            return displayString
        } else {
            const hasNext = isLast ? '' : ' | '
            displayString += lang === 'TH' ? `${nameTH}${hasNext}` : `${nameEN}${hasNext}`
            return displayString
        }
    }

    const handleClickAttractionInCommu = () => {
        // console.log(router)
        let path = router.asPath
        const indexOfFirst = path.indexOf('?')
        if (indexOfFirst !== -1) {
            path = path.substring(0, indexOfFirst)
            router.push(`${path}attraction`)
        } else {
            router.push(`${router.asPath}attraction`)
        }
    }

    const images = useMemo(() => {
        if (dataContentSeason.images.length > 1) {
            return drop(dataContentSeason.images, 0).map(
                (image: any) => process.env.NEXT_PUBLIC_UPLOAD_URL + image.communImagePath,
            )
        } else {
            return dataContentSeason.images.map(
                (image: any) => process.env.NEXT_PUBLIC_UPLOAD_URL + image.communImagePath,
            )
        }
    }, [dataContentSeason.images])

    const preventDefault = (event: React.SyntheticEvent) => event.preventDefault()
    let rewardsStandardsList = dataContentSeason?.rewardsStandards
        ? [
              ...dataContentSeason?.rewardsStandards.filter((itm) => itm.groupType === 'REWARD'),
              ...dataContentSeason?.rewardsStandards.filter((itm) => itm.groupType === 'STANDARD'),
          ]
        : []

    return (
        <div>
            <Meta
                data={{
                    title: lang === 'TH' ? dataContentSeason?.locationNameTH : dataContentSeason?.locationNameEN,
                    description: lang === 'TH' ? dataContentSeason?.descTH : dataContentSeason?.descEN,
                    image: image_banner,
                    isContent: true,
                }}
            />
            <Grid container justify='center' className={classes.root}>
                <Share
                    data={{
                        type: 'community',
                        name: lang === 'TH' ? dataContentSeason?.locationNameTH : dataContentSeason?.locationNameEN,
                        lat: dataContentSeason.latitude,
                        long: dataContentSeason.longitude,
                    }}
                />
                <Grid item xs={12}>
                    <Grid
                        container
                        className={
                            dataContentSeason?.images?.length > 0 ? classes.imageHeader : classes.imageHeader_noImage
                        }
                    >
                        {/* <img src={img_111} className={classes.responsive} /> */}
                        <img
                            // src={process.env.NEXT_PUBLIC_UPLOAD_URL + dataContentSeason?.images[0]?.communImagePath}
                            src={image_banner}
                            alt={dataContentSeason?.locationNameTH}
                            className={
                                dataContentSeason?.images?.length > 0 ? classes.responsive : classes.responsive_noImage
                            }
                        />
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Grid container className={classes.content} justify='center'>
                        <Grid
                            container
                            justify='center'
                            className={classes.containerLocation}
                            style={{ padding: images?.length > 0 ? '60px 0 100px 0' : '60px 0 0px 0' }}
                        >
                            <Grid item xs={9}>
                                <Typography variant='h1' className={classes.txtTitle}>
                                    {/* {mockData.title} */}
                                    {lang === 'TH'
                                        ? dataContentSeason?.locationNameTH
                                        : dataContentSeason?.locationNameEN}
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography variant='h4' className={classes.txtDetail} style={{ color: '#090909' }}>
                                    {/* {mockData.detail} */}
                                    {lang === 'TH' ? dataContentSeason?.descTH : dataContentSeason?.descEN}
                                </Typography>
                            </Grid>
                        </Grid>

                        {images.length > 0 &&
                            (images.length === 1 ? (
                                <Grid
                                    item
                                    xs={12}
                                    container
                                    justify='center'
                                    alignItems='center'
                                    className={classes.imgSlider}
                                >
                                    <img
                                        src={images[0]}
                                        alt={dataContentSeason?.locationNameTH}
                                        style={{
                                            maxHeight: 400,
                                            width: 'auto',
                                            //objectFit: 'cover',
                                            objectFit: 'none',
                                            objectPosition: 'top',
                                        }}
                                    />
                                </Grid>
                            ) : (
                                <Grid
                                    item
                                    xs={12}
                                    container
                                    justify='center'
                                    alignItems='center'
                                    className={classes.imgSlider}
                                >
                                    <ImageSlider imageData={images} />
                                </Grid>
                            ))}
                        {/* 
                        <Grid item xs={12} container className={classes.imgSlider}>
                            <ImageSlider imageData={images} />
                        </Grid> */}

                        {/* {mockData.communityInformation.lifestyle && ( */}
                        <Grid container justify='center' alignContent='center' style={{ padding: '50px 0px' }}>
                            {(dataContentSeason?.lifeStyleTH !== null ||
                                dataContentSeason?.lifeStyleEN !== null ||
                                dataContentSeason?.artTH !== null ||
                                dataContentSeason?.artEN !== null ||
                                dataContentSeason?.langTH !== null ||
                                dataContentSeason?.langEN !== null ||
                                dataContentSeason?.dressingTH !== null ||
                                dataContentSeason?.dressingEN !== null ||
                                dataContentSeason?.cultureTH !== null ||
                                dataContentSeason?.cultureEN !== null ||
                                dataContentSeason?.foodTH !== null ||
                                dataContentSeason?.foodEN !== null) && (
                                <Grid item xs={9}>
                                    <Typography variant='h2' className={classes.txt_topic} style={{ color: '#090909' }}>
                                        {t('SEASON.CONTENT.WAY_OF_LIFE')}
                                    </Typography>
                                </Grid>
                            )}

                            {(dataContentSeason?.lifeStyleTH !== null || dataContentSeason?.lifeStyleEN !== null) && (
                                <>
                                    {/* <Grid item xs={9}>
                                        <Typography
                                            variant='h2'
                                            className={classes.txt_topic}
                                            style={{ color: '#090909' }}
                                        >
                                            {t('SEASON.CONTENT.WAY_OF_LIFE')}
                                        </Typography>
                                    </Grid> */}
                                    <Grid item xs={9} style={{ marginBottom: 15 }}>
                                        <Grid container alignItems='flex-start'>
                                            <Grid item sm={2} xs={4}>
                                                <Typography variant='h4' className={classes.txt_subTopic}>
                                                    {t('SEASON.CONTENT.LIFESTYLE')}:{/* {`${item.name}:`} */}
                                                </Typography>
                                            </Grid>
                                            <Grid item sm={10} xs={8}>
                                                <Typography variant='h4' className={classes.txt_topic_detail}>
                                                    {(lang === 'TH'
                                                        ? dataContentSeason?.lifeStyleTH
                                                        : dataContentSeason?.lifeStyleEN) || '-'}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </>
                            )}

                            {(dataContentSeason?.artTH !== null || dataContentSeason?.artEN !== null) && (
                                <Grid item xs={9} style={{ marginBottom: 15 }}>
                                    <Grid container>
                                        <Grid item sm={2} xs={4}>
                                            <Typography variant='h4' className={classes.txt_subTopic}>
                                                {t('SEASON.CONTENT.ART')}:{/* {`${item.name}:`} */}
                                            </Typography>
                                        </Grid>
                                        <Grid item sm={10} xs={8}>
                                            <Typography variant='h4' className={classes.txt_topic_detail}>
                                                {(lang === 'TH'
                                                    ? dataContentSeason?.artTH
                                                    : dataContentSeason?.artEN) || '-'}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )}

                            {(dataContentSeason?.langTH !== null || dataContentSeason?.langEN !== null) && (
                                <Grid item xs={9} style={{ marginBottom: 15 }}>
                                    <Grid container>
                                        <Grid item sm={2} xs={4}>
                                            <Typography variant='h4' className={classes.txt_subTopic}>
                                                {t('SEASON.CONTENT.LANGUAGE')}:
                                            </Typography>
                                        </Grid>
                                        <Grid item sm={10} xs={8}>
                                            <Typography variant='h4' className={classes.txt_topic_detail}>
                                                {(lang === 'TH'
                                                    ? dataContentSeason?.langTH
                                                    : dataContentSeason?.langEN) || '-'}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )}

                            {(dataContentSeason?.dressingTH !== null || dataContentSeason?.dressingEN !== null) && (
                                <Grid item xs={9} style={{ marginBottom: 15 }}>
                                    <Grid container>
                                        <Grid item sm={2} xs={4}>
                                            <Typography variant='h4' className={classes.txt_subTopic}>
                                                {t('SEASON.CONTENT.DRESS')}:
                                            </Typography>
                                        </Grid>
                                        <Grid item sm={10} xs={8}>
                                            <Typography variant='h4' className={classes.txt_topic_detail}>
                                                {(lang === 'TH'
                                                    ? dataContentSeason?.dressingTH
                                                    : dataContentSeason?.dressingEN) || '-'}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )}

                            {(dataContentSeason?.cultureTH !== null || dataContentSeason?.cultureEN !== null) && (
                                <Grid item xs={9} style={{ marginBottom: 15 }}>
                                    <Grid container>
                                        <Grid item sm={2} xs={4}>
                                            <Typography variant='h4' className={classes.txt_subTopic}>
                                                {t('SEASON.CONTENT.TRADITION')}:
                                            </Typography>
                                        </Grid>
                                        <Grid item sm={10} xs={8}>
                                            <Typography variant='h4' className={classes.txt_topic_detail}>
                                                {(lang === 'TH'
                                                    ? dataContentSeason?.cultureTH
                                                    : dataContentSeason?.cultureEN) || '-'}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )}

                            {(dataContentSeason?.foodTH !== null || dataContentSeason?.foodEN !== null) && (
                                <Grid item xs={9} style={{ marginBottom: 15 }}>
                                    <Grid container>
                                        <Grid item sm={2} xs={4}>
                                            <Typography variant='h4' className={classes.txt_subTopic}>
                                                {t('SEASON.CONTENT.FOOD')}:
                                            </Typography>
                                        </Grid>
                                        <Grid item sm={10} xs={8}>
                                            <Typography variant='h4' className={classes.txt_topic_detail}>
                                                {(lang === 'TH'
                                                    ? dataContentSeason?.foodTH
                                                    : dataContentSeason?.foodEN) || '-'}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )}
                        </Grid>
                        {/* )} */}

                        {(dataContentSeason?.sourvenirTH !== null ||
                            dataContentSeason?.sourvenirEN !== null ||
                            dataContentSeason?.outstandingTH !== null ||
                            dataContentSeason?.outstandingEN !== null ||
                            dataContentSeason?.touristRuleTH !== null ||
                            dataContentSeason?.touristRuleEN !== null ||
                            dataContentSeason?.activityTH !== null ||
                            dataContentSeason?.activityEN !== null ||
                            dataContentSeason?.attraction?.length > 0) && (
                            <>
                                <Grid
                                    container
                                    style={{ backgroundColor: '#70c4bc', minHeight: '400px', maxHeight: '1500px' }}
                                    justify='center'
                                >
                                    <Grid item xs={10} style={{ padding: '50px 0px 90px 0px' }}>
                                        {(dataContentSeason?.sourvenirTH !== null ||
                                            dataContentSeason?.sourvenirEN !== null) && (
                                            <Grid
                                                container
                                                alignContent='center'
                                                justify='center'
                                                alignItems='center'
                                                className={classes.container_topic_inBox}
                                                data-aos='fade-up'
                                                data-aos-duration={1000}
                                            >
                                                <Grid item sm={2} xs={12}>
                                                    <Grid container justify='center' alignContent='center'>
                                                        <img
                                                            src={img_souvenir}
                                                            alt='img_souvenir'
                                                            className={classes.img_topic}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid item sm={10} xs={12}>
                                                    {/* <Grid container> */}
                                                    <Grid item xs={12}>
                                                        <Typography variant='h2' className={classes.txt_topic}>
                                                            {t('SEASON.CONTENT.SOUVENIR')}
                                                        </Typography>
                                                    </Grid>

                                                    <Grid item xs={12}>
                                                        <Typography variant='h4' className={classes.txt_topic_detail}>
                                                            {lang === 'TH'
                                                                ? dataContentSeason?.sourvenirTH || '-'
                                                                : dataContentSeason?.sourvenirEN || '-'}
                                                        </Typography>
                                                    </Grid>
                                                    {/* </Grid> */}
                                                </Grid>
                                            </Grid>
                                        )}
                                        {(dataContentSeason?.outstandingTH !== null ||
                                            dataContentSeason?.outstandingEN !== null) && (
                                            <Grid
                                                container
                                                alignContent='center'
                                                justify='center'
                                                alignItems='center'
                                                className={classes.container_topic_inBox}
                                                data-aos='fade-up'
                                                data-aos-duration={1000}
                                            >
                                                <Grid item sm={2} xs={12}>
                                                    <Grid container justify='center' alignContent='center'>
                                                        <img
                                                            src={img_point}
                                                            alt='img_point'
                                                            className={classes.img_topic}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid item sm={10} xs={12}>
                                                    <Grid item xs={12}>
                                                        <Typography variant='h2' className={classes.txt_topic}>
                                                            {t('SEASON.CONTENT.POINT')}
                                                        </Typography>
                                                    </Grid>

                                                    <Grid item xs={12}>
                                                        <Typography variant='h4' className={classes.txt_topic_detail}>
                                                            {lang === 'TH'
                                                                ? dataContentSeason?.outstandingTH || '-'
                                                                : dataContentSeason?.outstandingEN || '-'}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        )}
                                        {(dataContentSeason?.touristRuleTH !== null ||
                                            dataContentSeason?.touristRuleEN !== null) && (
                                            <Grid
                                                container
                                                alignContent='center'
                                                justify='center'
                                                alignItems='center'
                                                className={classes.container_topic_inBox}
                                                data-aos='fade-up'
                                                data-aos-duration={1000}
                                            >
                                                <Grid item sm={2} xs={12}>
                                                    <Grid container justify='center' alignContent='center'>
                                                        <img
                                                            src={img_touristConduct}
                                                            alt='img_touristConduct'
                                                            className={classes.img_topic}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid item sm={10} xs={12}>
                                                    <Grid item xs={12}>
                                                        <Typography variant='h2' className={classes.txt_topic}>
                                                            {t('SEASON.CONTENT.TOURIST_CONDUCT')}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography variant='h4' className={classes.txt_topic_detail}>
                                                            {lang === 'TH'
                                                                ? dataContentSeason?.touristRuleTH || '-'
                                                                : dataContentSeason?.touristRuleEN || '-'}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        )}
                                        {(dataContentSeason?.activityTH !== null ||
                                            dataContentSeason?.activityEN !== null) && (
                                            <Grid
                                                container
                                                alignContent='center'
                                                justify='center'
                                                alignItems='center'
                                                className={classes.container_topic_inBox}
                                                data-aos='fade-up'
                                                data-aos-duration={1000}
                                            >
                                                <Grid item sm={2} xs={12}>
                                                    <Grid container justify='center' alignContent='center'>
                                                        <img
                                                            src={img_activity}
                                                            alt='img_activity'
                                                            className={classes.img_topic}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid item sm={10} xs={12}>
                                                    <Grid item xs={12}>
                                                        <Typography variant='h2' className={classes.txt_topic}>
                                                            {t('SEASON.CONTENT.ACTIVITIES')}
                                                        </Typography>
                                                    </Grid>

                                                    <Grid item xs={12}>
                                                        <Typography variant='h4' className={classes.txt_topic_detail}>
                                                            {lang === 'TH'
                                                                ? dataContentSeason?.activityTH || '-'
                                                                : dataContentSeason?.activityEN || '-'}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        )}
                                        {dataContentSeason?.attraction?.length > 0 && (
                                            <Grid
                                                container
                                                alignContent='center'
                                                justify='center'
                                                alignItems='center'
                                                className={classes.container_topic_inBox}
                                                data-aos='fade-up'
                                                data-aos-duration={1000}
                                            >
                                                <Grid item sm={2} xs={12}>
                                                    <Grid container justify='center' alignContent='center'>
                                                        <img
                                                            src={img_attraction}
                                                            alt='img_attraction'
                                                            className={classes.img_topic}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid item sm={10} xs={12}>
                                                    <Grid item xs={12}>
                                                        <Typography variant='h2' className={classes.txt_topic}>
                                                            {t('SEASON.CONTENT.ATTRACTION')}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography variant='h4' className={classes.txt_topic_detail}>
                                                            {dataContentSeason?.attraction.map((item, index) => {
                                                                return getDisPlayString({
                                                                    // data: dataContentSeason?.attraction,
                                                                    // index: index,
                                                                    isLast:
                                                                        dataContentSeason?.attraction?.length ===
                                                                        index + 1,
                                                                    isComma: true,
                                                                    nameTH: item.attracNameTH,
                                                                    nameEN: item.attracNameEN,
                                                                })
                                                            })}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        )}
                                    </Grid>
                                </Grid>

                                <Grid
                                    container
                                    item
                                    xs={12}
                                    justify='center'
                                    style={{ marginTop: '-30px' }}
                                    data-aos='flip-down'
                                    data-aos-duration={600}
                                >
                                    <Button
                                        label={t('SEASON.CONTENT.ATTRACTION_IN_COMMUNITY')}
                                        rightIcon={<RightIcon />}
                                        btnType={'rounded'}
                                        style={{ width: 550, height: 60 }}
                                        onClick={handleClickAttractionInCommu}
                                        disabled={!dataContentSeason?.hasRelAttrac}
                                        // className={classes.btn_route_in_commu}
                                    />
                                </Grid>
                            </>
                        )}

                        <Grid container justify='center' alignItems='center'>
                            <Grid item sm={9} xs={10} style={{ marginTop: '20px' }}>
                                {(dataContentSeason?.openDay?.length > 0 ||
                                    dataContentSeason?.touristTarget?.length > 0 ||
                                    dataContentSeason?.travelPeriod?.length > 0 ||
                                    dataContentSeason?.accommodations?.length > 0) && (
                                    <Grid container className={classes.container_detail}>
                                        <Grid item xs={12}>
                                            <Typography variant='h3' className={classes.txt_detail_title}>
                                                {t('SEASON.CONTENT.INFORMATION')}
                                            </Typography>
                                        </Grid>
                                        {dataContentSeason?.openDay?.length > 0 && (
                                            <React.Fragment>
                                                <Grid item sm={6} xs={12}>
                                                    <Grid container item xs={12}>
                                                        <Typography
                                                            variant='h4'
                                                            className={classes.txt_detail_subTitle}
                                                        >
                                                            {t('SEASON.CONTENT.DATE_TIME')}
                                                        </Typography>
                                                    </Grid>
                                                    {dataContentSeason?.openDay.map((item, index) => {
                                                        if (item.startDayTH !== item.endDayTH) {
                                                            return (
                                                                <Grid container item xs={12} key={index}>
                                                                    <Typography
                                                                        variant='h4'
                                                                        className={classes.txt_detail}
                                                                    >
                                                                        {lang === 'TH'
                                                                            ? `${item.startDayTH} - ${item.endDayTH} ${
                                                                                  item.startHour
                                                                              }:${
                                                                                  item.startMin === '0'
                                                                                      ? '00'
                                                                                      : item.startMin
                                                                              } - ${item.endHour}:${
                                                                                  item.endMin === '0'
                                                                                      ? '00'
                                                                                      : item.endMin
                                                                              }`
                                                                            : `${item.startDayEN} - ${item.endDayEN} ${
                                                                                  item.startHour
                                                                              }:${
                                                                                  item.startMin === '0'
                                                                                      ? '00'
                                                                                      : item.startMin
                                                                              } - ${item.endHour}:${
                                                                                  item.endMin === '0'
                                                                                      ? '00'
                                                                                      : item.endMin
                                                                              }`}
                                                                    </Typography>
                                                                </Grid>
                                                            )
                                                        } else {
                                                            return (
                                                                <Grid container item xs={12} key={index}>
                                                                    <Typography
                                                                        variant='h4'
                                                                        className={classes.txt_detail}
                                                                    >
                                                                        {lang === 'TH'
                                                                            ? `${item.startDayTH} ${item.startHour}:${
                                                                                  item.startMin === '0'
                                                                                      ? '00'
                                                                                      : item.startMin
                                                                              } - ${item.endHour}:${
                                                                                  item.endMin === '0'
                                                                                      ? '00'
                                                                                      : item.endMin
                                                                              }`
                                                                            : `${item.startDayEN} ${item.startHour}:${
                                                                                  item.startMin === '0'
                                                                                      ? '00'
                                                                                      : item.startMin
                                                                              } - ${item.endHour}:${
                                                                                  item.endMin === '0'
                                                                                      ? '00'
                                                                                      : item.endMin
                                                                              }`}
                                                                    </Typography>
                                                                </Grid>
                                                            )
                                                        }
                                                    })}
                                                </Grid>
                                            </React.Fragment>
                                        )}

                                        {dataContentSeason?.touristTarget?.length > 0 && (
                                            <Grid item sm={6} xs={12}>
                                                <Grid container item xs={12}>
                                                    <Typography variant='h4' className={classes.txt_detail_subTitle}>
                                                        {t('SEASON.CONTENT.TOURIST_GROUP')}
                                                    </Typography>
                                                </Grid>
                                                <Grid container item xs={12}>
                                                    <Typography variant='h4' className={classes.txt_detail}>
                                                        {dataContentSeason?.touristTarget.map((item, index) => {
                                                            return getDisPlayString({
                                                                // data: dataContentSeason?.touristTarget,
                                                                // index: index,
                                                                isLast:
                                                                    dataContentSeason?.touristTarget?.length ===
                                                                    index + 1,
                                                                isComma: true,
                                                                nameTH: item.targetNameTH,
                                                                nameEN: item.targetNameEN,
                                                            })
                                                        })}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        )}
                                        {dataContentSeason?.travelPeriod?.length > 0 && (
                                            <Grid item sm={6} xs={12}>
                                                <Grid container item xs={12}>
                                                    <Typography variant='h4' className={classes.txt_detail_subTitle}>
                                                        {t('SEASON.CONTENT.HIGH_SEASON')}
                                                    </Typography>
                                                </Grid>
                                                <Grid container item xs={11}>
                                                    <Typography variant='h4' className={classes.txt_detail}>
                                                        {dataContentSeason?.travelPeriod.length === 12
                                                            ? t('SEASON.CONTENT.ALL_SEASON')
                                                            : dataContentSeason?.travelPeriod.map((item, index) => {
                                                                  return getDisPlayString({
                                                                      // data: dataContentSeason?.travelPeriod,
                                                                      // index: index,
                                                                      isLast:
                                                                          dataContentSeason?.travelPeriod?.length ===
                                                                          index + 1,
                                                                      isComma: checkIsComma(
                                                                          dataContentSeason?.travelPeriod,
                                                                      ),
                                                                      nameTH: item.monthNameTH,
                                                                      nameEN: item.monthNameEN,
                                                                  })
                                                              })}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        )}
                                        {dataContentSeason?.accommodations?.length > 0 && (
                                            <Grid item sm={6} xs={12}>
                                                <Grid container item xs={12}>
                                                    <Typography variant='h4' className={classes.txt_detail_subTitle}>
                                                        {t('SEASON.CONTENT.ACCOMMODATION_TYPE')}
                                                    </Typography>
                                                </Grid>
                                                <Grid container item xs={12}>
                                                    <Typography variant='h4' className={classes.txt_detail}>
                                                        {dataContentSeason?.accommodations.map((item, index) => {
                                                            return getDisPlayString({
                                                                isLast:
                                                                    dataContentSeason?.accommodations?.length ===
                                                                    index + 1,
                                                                isComma: true,
                                                                nameTH: item.accommodationNameTH,
                                                                nameEN: item.accommodationNameEN,
                                                            })
                                                        })}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        )}
                                    </Grid>
                                )}

                                {(dataContentSeason?.facilities?.length > 0 ||
                                    dataContentSeason?.payments?.length > 0 ||
                                    dataContentSeason?.languages?.length > 0) && (
                                    <Grid container className={classes.container_detail} alignItems='center'>
                                        <Grid item xs={12}>
                                            <Typography variant='h3' className={classes.txt_detail_title}>
                                                {t('SEASON.CONTENT.FACILITIES')}
                                            </Typography>
                                        </Grid>
                                        {dataContentSeason?.facilities?.length > 0 &&
                                            dataContentSeason?.facilities.map((item, index) => {
                                                if (index + 1 < Math.ceil(dataContentSeason?.facilities?.length / 2)) {
                                                    return (
                                                        <Grid item sm={6} xs={12} key={index}>
                                                            {item.subFac?.length > 0 ? (
                                                                <Grid
                                                                    container
                                                                    item
                                                                    xs={12}
                                                                    style={{ margin: '5px 0' }}
                                                                >
                                                                    <img
                                                                        src={facIcons[item.facID]}
                                                                        alt={facIcons[item.facID]}
                                                                        className={classes.ic_icon}
                                                                        style={{ marginTop: '-2px' }}
                                                                    />
                                                                    <Grid item md={3} sm={9} xs={8}>
                                                                        {/* <img src={facIcons[item.facID]} className={classes.ic_icon} style={{ backgroundColor: 'red' }} /> */}
                                                                        <Typography
                                                                            variant='h4'
                                                                            className={classes.txt_detail}
                                                                        >
                                                                            {lang === 'TH'
                                                                                ? `${item.facNameTH} ${
                                                                                      item.facAmount !== null &&
                                                                                      item.facAmount !== 0
                                                                                          ? item.facAmount +
                                                                                            ' ' +
                                                                                            item.facUnitTH
                                                                                          : ''
                                                                                  }`
                                                                                : `${item.facNameEN} ${
                                                                                      item.facAmount !== null &&
                                                                                      item.facAmount !== 0
                                                                                          ? item.facAmount +
                                                                                            ' ' +
                                                                                            item.facUnitEN
                                                                                          : ''
                                                                                  }`}
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item md={7} sm={9} xs={12} container>
                                                                        <Typography
                                                                            variant='h4'
                                                                            className={classes.txt_detail}
                                                                        >
                                                                            {item.subFac.map((itmSubFac, index) => {
                                                                                let displayString = ''
                                                                                const hasNext =
                                                                                    item.subFac?.length === index + 1
                                                                                        ? ''
                                                                                        : ', '
                                                                                displayString +=
                                                                                    lang === 'TH'
                                                                                        ? `${itmSubFac.facNameTH} ${
                                                                                              itmSubFac.facAmount !==
                                                                                                  null &&
                                                                                              itmSubFac.facAmount !== 0
                                                                                                  ? itmSubFac.facAmount +
                                                                                                    ' ' +
                                                                                                    itmSubFac.facUnitTH
                                                                                                  : ''
                                                                                          }${hasNext}`
                                                                                        : `${itmSubFac.facNameEN} ${
                                                                                              itmSubFac.facAmount !==
                                                                                                  null &&
                                                                                              itmSubFac.facAmount !== 0
                                                                                                  ? itmSubFac.facAmount +
                                                                                                    ' ' +
                                                                                                    itmSubFac.facUnitEN
                                                                                                  : ''
                                                                                          }${hasNext}`
                                                                                return displayString
                                                                            })}
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            ) : (
                                                                <Grid
                                                                    container
                                                                    item
                                                                    xs={12}
                                                                    style={{ margin: '5px 0' }}
                                                                >
                                                                    <img
                                                                        src={facIcons[item.facID]}
                                                                        alt={facIcons[item.facID]}
                                                                        className={classes.ic_icon}
                                                                    />
                                                                    <Typography
                                                                        variant='h4'
                                                                        className={classes.txt_detail}
                                                                    >
                                                                        {lang === 'TH'
                                                                            ? `${item.facNameTH} ${
                                                                                  item.facAmount !== null &&
                                                                                  item.facAmount !== 0
                                                                                      ? item.facAmount +
                                                                                        ' ' +
                                                                                        item.facUnitTH
                                                                                      : ''
                                                                              }`
                                                                            : `${item.facNameEN} ${
                                                                                  item.facAmount !== null &&
                                                                                  item.facAmount !== 0
                                                                                      ? item.facAmount +
                                                                                        ' ' +
                                                                                        item.facUnitEN
                                                                                      : ''
                                                                              }`}
                                                                    </Typography>
                                                                </Grid>
                                                            )}
                                                        </Grid>
                                                    )
                                                } else {
                                                    return (
                                                        <Grid item sm={6} xs={12} key={index}>
                                                            {item.subFac?.length > 0 ? (
                                                                <Grid
                                                                    container
                                                                    item
                                                                    xs={12}
                                                                    style={{ margin: '5px 0' }}
                                                                >
                                                                    <img
                                                                        src={facIcons[item.facID]}
                                                                        alt={facIcons[item.facID]}
                                                                        className={classes.ic_icon}
                                                                        style={{ marginTop: '-2px' }}
                                                                    />
                                                                    <Grid item xs={3}>
                                                                        {/* <img src={facIcons[item.facID]} className={classes.ic_icon} style={{ backgroundColor: 'red' }} /> */}
                                                                        <Typography
                                                                            variant='h4'
                                                                            className={classes.txt_detail}
                                                                        >
                                                                            {lang === 'TH'
                                                                                ? `${item.facNameTH} ${
                                                                                      item.facAmount !== null &&
                                                                                      item.facAmount !== 0
                                                                                          ? item.facAmount +
                                                                                            ' ' +
                                                                                            item.facUnitTH
                                                                                          : ''
                                                                                  }`
                                                                                : `${item.facNameEN} ${
                                                                                      item.facAmount !== null &&
                                                                                      item.facAmount !== 0
                                                                                          ? item.facAmount +
                                                                                            ' ' +
                                                                                            item.facUnitEN
                                                                                          : ''
                                                                                  }`}
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={7}>
                                                                        <Typography
                                                                            variant='h4'
                                                                            className={classes.txt_detail}
                                                                        >
                                                                            {item.subFac.map((itmSubFac, index) => {
                                                                                let displayString = ''
                                                                                const hasNext =
                                                                                    item.subFac?.length === index + 1
                                                                                        ? ''
                                                                                        : ', '
                                                                                displayString +=
                                                                                    lang === 'TH'
                                                                                        ? `${itmSubFac.facNameTH} ${
                                                                                              itmSubFac.facAmount !==
                                                                                                  null &&
                                                                                              itmSubFac.facAmount !== 0
                                                                                                  ? itmSubFac.facAmount +
                                                                                                    ' ' +
                                                                                                    itmSubFac.facUnitTH
                                                                                                  : ''
                                                                                          }${hasNext}`
                                                                                        : `${itmSubFac.facNameEN} ${
                                                                                              itmSubFac.facAmount !==
                                                                                                  null &&
                                                                                              itmSubFac.facAmount !== 0
                                                                                                  ? itmSubFac.facAmount +
                                                                                                    ' ' +
                                                                                                    itmSubFac.facUnitEN
                                                                                                  : ''
                                                                                          }${hasNext}`
                                                                                return displayString
                                                                            })}
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            ) : (
                                                                <Grid
                                                                    container
                                                                    item
                                                                    xs={12}
                                                                    style={{ margin: '5px 0' }}
                                                                >
                                                                    <img
                                                                        src={facIcons[item.facID]}
                                                                        className={classes.ic_icon}
                                                                        alt={facIcons[item.facID]}
                                                                    />
                                                                    <Typography
                                                                        variant='h4'
                                                                        className={classes.txt_detail}
                                                                    >
                                                                        {lang === 'TH'
                                                                            ? `${item.facNameTH} ${
                                                                                  item.facAmount !== null &&
                                                                                  item.facAmount !== 0
                                                                                      ? item.facAmount +
                                                                                        ' ' +
                                                                                        item.facUnitTH
                                                                                      : ''
                                                                              }`
                                                                            : `${item.facNameEN} ${
                                                                                  item.facAmount !== null &&
                                                                                  item.facAmount !== 0
                                                                                      ? item.facAmount +
                                                                                        ' ' +
                                                                                        item.facUnitEN
                                                                                      : ''
                                                                              }`}
                                                                    </Typography>
                                                                </Grid>
                                                            )}
                                                        </Grid>
                                                    )
                                                }
                                            })}

                                        {dataContentSeason?.payments?.length > 0 && (
                                            <>
                                                <Grid item xs={12}>
                                                    <Typography variant='h4' className={classes.txt_detail_subTitle}>
                                                        {t('SEASON.CONTENT.PAYMENT')}
                                                    </Typography>
                                                </Grid>
                                                {dataContentSeason?.payments.map((item, index) => {
                                                    return (
                                                        <Grid item sm={6} xs={12} key={index}>
                                                            <Grid container item xs={12} style={{ margin: '5px 0' }}>
                                                                <img
                                                                    src={facIconsPayments[item.paymentID]}
                                                                    className={classes.ic_icon}
                                                                    alt={facIconsPayments[item.paymentID]}
                                                                />
                                                                <Typography variant='h4' className={classes.txt_detail}>
                                                                    {lang === 'TH' ? item.paymentTH : item.paymentEN}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    )
                                                })}
                                            </>
                                        )}

                                        {dataContentSeason?.languages?.length > 0 && (
                                            <Grid container item xs={12}>
                                                <Grid item xs={12}>
                                                    <Typography variant='h4' className={classes.txt_detail_subTitle}>
                                                        {t('SEASON.CONTENT.LOCAL_GUIDE_EXIST')}
                                                    </Typography>
                                                </Grid>
                                                {
                                                    <Grid item xs={12}>
                                                        <Grid container item xs={12} style={{ margin: '5px 0' }}>
                                                            <img
                                                                src={ic_fac_yes}
                                                                className={classes.ic_icon}
                                                                style={{ margin: '-1px 10px 0 0px' }}
                                                                alt={'ic_fac_yes'}
                                                            />
                                                            <Typography variant='h4' className={classes.txt_detail}>
                                                                {dataContentSeason?.languages.map(
                                                                    (item: apiSeason.Language, index: number) => {
                                                                        return getDisPlayString({
                                                                            isLast:
                                                                                dataContentSeason?.languages?.length ===
                                                                                index + 1,
                                                                            isComma: true,
                                                                            nameTH: item.languageNameTH,
                                                                            nameEN: item.languageNameEN,
                                                                        })
                                                                    },
                                                                )}
                                                                {dataContentSeason?.localguideExperience !== null &&
                                                                    (lang === 'TH'
                                                                        ? ` ประสบการณ์ ${dataContentSeason?.localguideExperience}  ปี`
                                                                        : ` ${dataContentSeason?.localguideExperience} years experience`)}
                                                            </Typography>
                                                        </Grid>
                                                        {(dataContentSeason?.localguideDescTH !== null ||
                                                            dataContentSeason?.localguideDescEN !== null) && (
                                                            <Grid container item xs={12} style={{ margin: '5px 0' }}>
                                                                <Typography
                                                                    variant='h4'
                                                                    className={classes.txt_detail}
                                                                    style={{ paddingLeft: 45 }}
                                                                >
                                                                    {lang === 'TH'
                                                                        ? dataContentSeason?.localguideDescTH
                                                                        : dataContentSeason?.localguideDescEN}
                                                                </Typography>
                                                            </Grid>
                                                        )}
                                                    </Grid>
                                                }
                                            </Grid>
                                        )}
                                    </Grid>
                                )}

                                {rewardsStandardsList.length > 0 && (
                                    <Grid container className={classes.container_detail}>
                                        <Grid item xs={12}>
                                            <Typography variant='h3' className={classes.txt_detail_title}>
                                                {t('SEASON.CONTENT.PRIZE_STANDARD')}
                                            </Typography>
                                        </Grid>
                                        {rewardsStandardsList.map((item, index) => {
                                            return (
                                                <Grid item xs={12} key={index}>
                                                    <Grid container item xs={12} style={{ margin: '5px 0' }}>
                                                        <img
                                                            src={ic_fac_yes}
                                                            className={classes.ic_icon}
                                                            alt={'ic_fac_yes'}
                                                            style={{ margin: '-1px 10px 0 0px' }}
                                                        />
                                                        <Typography variant='h4' className={classes.txt_detail}>
                                                            {lang === 'TH' ? item.nameTH : item.nameEN}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            )
                                        })}
                                    </Grid>
                                )}

                                {((dataContentSeason?.publicTransNameTH !== null &&
                                    dataContentSeason?.publicTransNameTH !== '') ||
                                    (dataContentSeason?.publicTransNameEN !== null &&
                                        dataContentSeason?.publicTransNameEN !== '') ||
                                    (dataContentSeason?.privateTransNameTH !== null &&
                                        dataContentSeason?.privateTransNameTH !== '') ||
                                    (dataContentSeason?.privateTransNameEN !== null &&
                                        dataContentSeason?.privateTransNameEN !== '')) && (
                                    <Grid container className={classes.container_detail}>
                                        <Grid item xs={12}>
                                            <Typography variant='h3' className={classes.txt_detail_title}>
                                                {t('SEASON.CONTENT.TRAVELING')}
                                            </Typography>
                                        </Grid>

                                        {((dataContentSeason?.privateTransNameTH !== null &&
                                            dataContentSeason?.privateTransNameTH !== '') ||
                                            (dataContentSeason?.privateTransNameEN !== null &&
                                                dataContentSeason?.privateTransNameEN !== '')) && (
                                            <>
                                                <Grid item xs={12}>
                                                    <Typography variant='h4' className={classes.txt_detail_subTitle}>
                                                        {t('SEASON.CONTENT.PRIVATE_TRANSITION')}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid container item xs={12}>
                                                        <Typography variant='h4' className={classes.txt_detail}>
                                                            {(lang === 'TH'
                                                                ? dataContentSeason?.privateTransNameTH
                                                                : dataContentSeason?.privateTransNameEN) || '-'}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </>
                                        )}

                                        {((dataContentSeason?.publicTransNameTH !== null &&
                                            dataContentSeason?.publicTransNameTH !== '') ||
                                            (dataContentSeason?.publicTransNameEN !== null &&
                                                dataContentSeason?.publicTransNameEN !== '')) && (
                                            <>
                                                <Grid item xs={12}>
                                                    <Typography variant='h4' className={classes.txt_detail_subTitle}>
                                                        {t('SEASON.CONTENT.PUBLIC_TRANSITION')}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid container item xs={12}>
                                                        <Typography variant='h4' className={classes.txt_detail}>
                                                            {lang === 'TH'
                                                                ? dataContentSeason?.publicTransNameTH
                                                                : dataContentSeason?.publicTransNameEN}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </>
                                        )}
                                    </Grid>
                                )}

                                {dataContentSeason?.contacts?.length > 0 && (
                                    <Grid
                                        container
                                        className={classes.container_detail}
                                        justify='flex-start'
                                        spacing={1}
                                    >
                                        <Grid item xs={12}>
                                            <Typography variant='h3' className={classes.txt_detail_title}>
                                                {t('SEASON.CONTENT.CONTACT')}
                                            </Typography>
                                        </Grid>
                                        {dataContentSeason?.contacts.map((item, index) => {
                                            return (
                                                <Grid item sm={6} xs={12} key={index} direction='row'>
                                                    <Grid item xs={12}>
                                                        <Typography
                                                            variant='h4'
                                                            className={classes.txt_detail_subTitle}
                                                        >
                                                            {t('SEASON.CONTENT.COMMUNITY_CONTACT')}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Grid
                                                            container
                                                            direction='row'
                                                            justify='flex-start'
                                                            spacing={1}
                                                        >
                                                            <Grid item lg={2} xs={4}>
                                                                <Typography
                                                                    variant='h4'
                                                                    className={classes.txt_subTitle}
                                                                >
                                                                    {t('SEASON.CONTENT.CONTACT_NAME')}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item lg={10} xs={8}>
                                                                <Typography variant='h4' className={classes.txt_detail}>
                                                                    {(lang === 'TH'
                                                                        ? item.contactNameTH
                                                                        : item.contactNameEN) || '-'}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid
                                                            container
                                                            direction='row'
                                                            justify='flex-start'
                                                            spacing={1}
                                                        >
                                                            <Grid item lg={2} xs={4}>
                                                                <Typography
                                                                    variant='h4'
                                                                    className={classes.txt_subTitle}
                                                                >
                                                                    {t('SEASON.CONTENT.CONTACT_TEL')}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item lg={10} xs={8}>
                                                                {item.contactTel ? (
                                                                    <a
                                                                        href={`tel:${item.contactTel}`}
                                                                        style={{
                                                                            color: '#80BD01',
                                                                            textDecorationColor: '#80BD01',
                                                                        }}
                                                                    >
                                                                        <Typography
                                                                            variant='h4'
                                                                            className={classes.txt_detail}
                                                                        >
                                                                            {item.contactTel}
                                                                        </Typography>
                                                                    </a>
                                                                ) : (
                                                                    <Typography
                                                                        variant='h4'
                                                                        className={classes.txt_detail}
                                                                    >
                                                                        {'-'}
                                                                    </Typography>
                                                                )}
                                                            </Grid>
                                                        </Grid>
                                                        {/* <Grid container direction='row' justify='flex-start'>
                                                            <Grid item lg={2} xs={4}>
                                                                <Typography
                                                                    variant='h4'
                                                                    className={classes.txt_subTitle}
                                                                >
                                                                    {t('SEASON.CONTENT.CONTACT_POSITION')}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item lg={10} xs={8}>
                                                                <Typography variant='h4' className={classes.txt_detail}>
                                                                    {item.contactPos || '-'}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid> */}
                                                        {/* <Grid container direction='row' justify='flex-start'>
                                                            <Grid item lg={2} xs={4}>
                                                                <Typography
                                                                    variant='h4'
                                                                    className={classes.txt_subTitle}
                                                                >
                                                                    {t('SEASON.CONTENT.CONTACT_LINE')}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item lg={10} xs={8}>
                                                                <Typography variant='h4' className={classes.txt_detail}>
                                                                    {item.contactLine || '-'}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid> */}
                                                        {item.contactFacebook && (
                                                            <Grid
                                                                container
                                                                direction='row'
                                                                justify='flex-start'
                                                                spacing={1}
                                                            >
                                                                <Grid item lg={2} xs={4}>
                                                                    <Typography
                                                                        variant='h4'
                                                                        className={classes.txt_subTitle}
                                                                    >
                                                                        {t('SEASON.CONTENT.CONTACT_FACEBOOK')}
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item lg={10} xs={8}>
                                                                    {item.contactFacebook !== null ? (
                                                                        <Typography
                                                                            variant='h4'
                                                                            className={classes.txt_detail}
                                                                            style={{
                                                                                // color: '#0000EE',
                                                                                textDecoration: 'underline',
                                                                                cursor: 'pointer',
                                                                                color: '#80BD01',
                                                                                textDecorationColor: '#80BD01',
                                                                            }}
                                                                            onClick={() => {
                                                                                handleClickLink(item.contactFacebook)
                                                                            }}
                                                                        >
                                                                            {item.contactFacebook}
                                                                        </Typography>
                                                                    ) : (
                                                                        <Typography
                                                                            variant='h4'
                                                                            className={classes.txt_detail}
                                                                        >
                                                                            {'-'}
                                                                        </Typography>
                                                                    )}
                                                                </Grid>
                                                            </Grid>
                                                        )}

                                                        {/* <Grid container direction='row' justify='flex-start'>
                                                            <Grid item lg={2} xs={4}>
                                                                <Typography
                                                                    variant='h4'
                                                                    className={classes.txt_subTitle}
                                                                >
                                                                    {t('SEASON.CONTENT.CONTACT_EMAIL')}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item lg={10} xs={8}>
                                                                <Typography variant='h4' className={classes.txt_detail}>
                                                                    {item.contactEmail || '-'}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid> */}
                                                    </Grid>
                                                </Grid>
                                            )
                                        })}
                                    </Grid>
                                )}

                                <Grid container className={classes.container_detail}>
                                    <Grid item xs={12}>
                                        <Typography variant='h3' className={classes.txt_detail_title}>
                                            {t('SEASON.CONTENT.COMMUNITY_DETAIL')}
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                        <Grid
                                            container
                                            direction='row'
                                            justify='flex-start'
                                            style={{ margin: '5px 0' }}
                                        >
                                            <Grid item md={4} xs={7}>
                                                <Typography variant='h4' className={classes.txt_subTitle}>
                                                    {t('SEASON.CONTENT.YEAR_OF_OPERATION')}
                                                </Typography>
                                            </Grid>
                                            <Grid item md={8} xs={5}>
                                                <Typography variant='h4' className={classes.txt_detail}>
                                                    {dataContentSeason?.yearOpr !== null
                                                        ? (lang === 'TH'
                                                              ? dataContentSeason?.yearOpr + 543
                                                              : dataContentSeason?.yearOpr) || '-'
                                                        : '-'}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid
                                            container
                                            direction='row'
                                            justify='flex-start'
                                            style={{ margin: '5px 0' }}
                                        >
                                            <Grid item md={4} xs={7}>
                                                <Typography variant='h4' className={classes.txt_subTitle}>
                                                    {t('SEASON.CONTENT.YEAR_OF_GROUP_ESTABLISHMENT')}
                                                </Typography>
                                            </Grid>
                                            <Grid item md={8} xs={5}>
                                                <Typography variant='h4' className={classes.txt_detail}>
                                                    {dataContentSeason?.yearEst !== null
                                                        ? (lang === 'TH'
                                                              ? dataContentSeason?.yearEst + 543
                                                              : dataContentSeason?.yearEst) || '-'
                                                        : '-'}
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                        <Grid
                                            container
                                            direction='row'
                                            justify='flex-start'
                                            style={{ margin: '5px 0' }}
                                        >
                                            <Grid item md={4} xs={7}>
                                                <Typography variant='h4' className={classes.txt_subTitle}>
                                                    {t('SEASON.CONTENT.YEAR_OF_ESTABLISHMENT')}
                                                </Typography>
                                            </Grid>
                                            <Grid item md={8} xs={5}>
                                                <Typography variant='h4' className={classes.txt_detail}>
                                                    {dataContentSeason?.yearCount || '-'}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item sm={6} xs={12}>
                                        <Grid
                                            container
                                            direction='row'
                                            justify='flex-start'
                                            style={{ margin: '5px 0' }}
                                        >
                                            <Grid item md={4} xs={7}>
                                                <Typography variant='h4' className={classes.txt_subTitle}>
                                                    {t('SEASON.CONTENT.MENTOR_UNIT')}
                                                </Typography>
                                            </Grid>
                                            <Grid item md={8} xs={5}>
                                                <Typography variant='h4' className={classes.txt_detail}>
                                                    {(lang === 'TH'
                                                        ? dataContentSeason?.mentorUnitNameTH
                                                        : dataContentSeason?.mentorUnitNameEN) || '-'}
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                        {/* <Grid
                                            container
                                            direction='row'
                                            justify='flex-start'
                                            style={{ margin: '5px 0' }}
                                        >
                                            <Grid item md={4} xs={7}>
                                                <Typography variant='h4' className={classes.txt_subTitle}>
                                                    {t('SEASON.CONTENT.REMARK')}
                                                </Typography>
                                            </Grid>
                                            <Grid item md={8} xs={5}>
                                                <Typography variant='h4' className={classes.txt_detail}>
                                                    {(lang === 'TH'
                                                        ? dataContentSeason?.remarkTH
                                                        : dataContentSeason?.remarkEN) || '-'}
                                                </Typography>
                                            </Grid>
                                        </Grid> */}
                                    </Grid>
                                </Grid>
                                {/* )} */}

                                {dataContentSeason?.tags?.length > 0 && (
                                    <Grid
                                        container
                                        className={classes.container_detail}
                                        // style={{ marginBottom: '50px' }}
                                    >
                                        <Grid item xs={12}>
                                            <Typography variant='h3' className={classes.txt_detail_title}>
                                                {t('SEASON.CONTENT.TAG')}
                                            </Typography>
                                        </Grid>

                                        {dataContentSeason?.tags.map((item, index) => {
                                            return (
                                                <div className={classes.div_tag} key={index}>
                                                    <Typography variant='h5' style={{ margin: '0px 10px' }}>
                                                        {item}
                                                    </Typography>
                                                </div>
                                            )
                                        })}
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
})

type contentSeasonProps = Omit<contentSeasonViewProps, keyof ReturnTypeUsecontentSeason> & {
    dataContentSeason: apiSeason.TResGetCommuContent
}
let ContentSeason: React.FC<contentSeasonProps> = ({ ...others }) => {
    const contentSeason = useContentSeason(others.dataContentSeason)
    return <ContentSeasonView {...contentSeason} {...others} />
}

export default observer(ContentSeason)
