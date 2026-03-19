import React, { useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import drop from 'lodash/drop'
import ImageSlider from '../../../controls/imageslider/imageSlider'

import ColorWeb from '../../../constants/colorWeb'
import { formatAddress, formatNumberWithComma } from '../../../utilities/formatTextUtils'
import { pin } from '../../../constants/map'
import * as apiRelattraction from '../apiRelattraction'
import MapContent from '../../../controls/mapContent/MapContent'
import useMapContent from '../../../controls/mapContent/useMapContent'
import { convertToDisplayMonth, TMonthProps, convertToDisplayDay, TDayProps } from '../../../utilities/dateTimeUtils'
import Meta from '../../../controls/meta/meta'
import Share from '../../../controls/share/share'
import useBreadcrumbs from '../../../hook/useBreadcrumbs'

const publicPath = process.env.NEXT_PUBLIC_WEB_URL
const ic_detail_location = publicPath + '/images/icon/ic_detail_location.png'
const ic_detail_activity = publicPath + '/images/icon/ic_detail_activity.png'
const activityNoImage = publicPath + '/images/trip/Activity@2x.png'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: theme.colors.white,
        },
        imageHeader: {
            position: 'relative',
            display: 'inline-block',
            backgroundColor: theme.colors.white,
        },
        responsive: {
            width: '100%',
            height: 'auto',
            maxHeight: '500px',
            opacity: 1,
            objectFit: 'cover',
        },
        headerField: {
            position: 'absolute',
            top: '55%',
            left: '50%',
            transform: 'translate( -50%, -50% )',
            textAlign: 'center',
            color: theme.colors.white,
            [theme.breakpoints.down('sm')]: {
                top: '60%',
            },
        },
        txt_header: {
            fontFamily: 'Prompt-Regular',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            overflowWrap: 'anywhere',
            lineHeight: 1.4,
            [theme.breakpoints.down('sm')]: {
                fontSize: '30px',
            },
            [theme.breakpoints.down('xs')]: {
                fontSize: '20px',
            },
        },
        containerContent: {
            // marginBottom: '150px',
            backgroundColor: theme.colors.white,
        },
        txt_title_header: {
            color: theme.palette.primary.main,
            overflowWrap: 'anywhere',
            [theme.breakpoints.down('xs')]: {
                fontSize: 28,
            },
        },
        txt_communityName: {
            color: theme.colors.textBlack,
            [theme.breakpoints.down('xs')]: {
                fontSize: 18,
            },
        },
        txt_title: {
            margin: '10px 0px',
            color: ColorWeb.secondary.color1,
            [theme.breakpoints.down('xs')]: {
                fontSize: 20,
            },
        },
        txt_subTitle: {
            fontWeight: 600,
            fontFamily: 'Sarabun',
            color: ColorWeb.secondary.color1,
            margin: '10px 0px',
            [theme.breakpoints.down('xs')]: {
                fontSize: 14,
            },
        },
        txt_detail: {
            fontFamily: 'Sarabun',
            color: theme.colors.textBlack,
            lineHeight: 1.6,
            margin: '10px 0px',
            overflowWrap: 'anywhere',
            [theme.breakpoints.down('xs')]: {
                fontSize: 14,
            },
        },
        ic_icon: {
            width: 33,
            height: 33,
            marginTop: '6px',
            marginRight: '20px',
        },
        icon_style: {
            marginRight: '15px',
            color: theme.colors.gray,
            height: '23px',
        },
        attracType_icon: {
            color: '#B8B6B6',
            marginRight: '15px',
            transform: 'rotate(40deg)',
        },
        div_tag: {
            background: ColorWeb.secondary.color2,
            margin: '15px 20px 5px 0px',
            height: '30px',
            borderRadius: '20px',
            padding: '7px',
        },
        contentImage: {
            color: theme.palette.primary.main,
            margin: '50px 0px 25px',
        },
    }),
)

type UsecontentRelattractionProps = { dataContentRelAttraction: apiRelattraction.TResRelattractionContent }
type ReturnTypeUsecontentActivity = ReturnType<typeof useContentRelattraction>
function useContentRelattraction(props: UsecontentRelattractionProps) {
    const { dataContentRelAttraction } = props
    const { t, i18n } = useTranslation()
    const lang = i18n.language.toUpperCase()
    const mapID = 'mapRelattraction'
    const pinPoint = [dataContentRelAttraction.longitude, dataContentRelAttraction.latitude] as [number, number]
    useMapContent({ mapID, pin: pin.activity, pinPoint })

    const getValueByLang = useCallback(
        (key: string) => {
            // @ts-ignore
            return dataContentRelAttraction[`${key}${lang}`]
        },
        [dataContentRelAttraction, lang],
    )

    useBreadcrumbs({ contentName: getValueByLang('name') })

    const getCommunity = useCallback(() => {
        return dataContentRelAttraction.communities
            .map(
                // @ts-ignore
                (community: apiRelattraction.TCommunity) => community[`commName${lang}`],
            )
            .join(', ')
    }, [dataContentRelAttraction, lang])

    const getTravelPeriod = useCallback(() => {
        return convertToDisplayMonth((dataContentRelAttraction.travelPeriod as unknown) as TMonthProps[], lang)
    }, [dataContentRelAttraction, lang])

    const getOpenDay = useCallback(() => {
        return convertToDisplayDay((dataContentRelAttraction.openDays as unknown) as TDayProps[], lang)
    }, [dataContentRelAttraction, lang])

    const content = useMemo(() => {
        const { fee, images, tags, tel, website, hno, moo, latitude, longitude, postCode } = dataContentRelAttraction

        const checkImageSlider = () => {
            if (images.length > 1) {
                return drop(images, 0).map((image: string) => process.env.NEXT_PUBLIC_UPLOAD_URL + image)
            } else {
                return images.map((image: any) => process.env.NEXT_PUBLIC_UPLOAD_URL + image)
            }
        }

        return {
            name: getValueByLang('name'),
            type: getValueByLang('type'),
            community: getCommunity(),
            desc: getValueByLang('desc'),
            travelPeriod: getTravelPeriod(),
            openDay: getOpenDay(),
            fee: fee,
            bannerImage: images?.length > 0 ? process.env.NEXT_PUBLIC_UPLOAD_URL + images[0] : activityNoImage,
            contentImage: checkImageSlider(), // pop เอารูปแรกออก
            tel: tel,
            website: website,
            tags: tags,
            lat: latitude,
            long: longitude,
            address: formatAddress(
                {
                    hno: hno,
                    moo: moo,
                    villageName: getValueByLang('villageName'),
                    soiName: getValueByLang('soiName'),
                    roadName: getValueByLang('roadName'),
                    tamName: getValueByLang('tamName'),
                    ampName: getValueByLang('ampName'),
                    provName: getValueByLang('provName'),
                    provCode: getValueByLang('provCode'),
                    postCode: postCode,
                },
                lang,
            ),
        }
    }, [dataContentRelAttraction, lang])

    return { content, t, mapID }
}

type contentActivityViewProps = ReturnTypeUsecontentActivity

const RowContentTwoColumnView = ({ title, value, classes }: { title: string; value: any; classes: any }) => {
    return (
        <>
            <Grid item lg={2} sm={4} xs={10}>
                <Typography variant='h4' className={classes.txt_subTitle}>
                    {title}
                </Typography>
            </Grid>

            <Grid item lg={10} sm={8} xs={10}>
                <Typography variant='h4' className={classes.txt_detail}>
                    {value ? value : '-'}
                </Typography>
            </Grid>
        </>
    )
}

let ContentRelattractionView: React.FC<contentActivityViewProps> = ({ content, t, mapID }) => {
    const classes = useStyles()

    return (
        <Grid container className={classes.root} justify='center' alignItems='center'>
            <Meta
                data={{
                    title: content.name,
                    description: content.desc,
                    image: content.bannerImage,
                    isContent: true,
                }}
            />
            <Share data={{ lat: content.lat, long: content.long, name: content.name }} />
            <Grid item xs={12}>
                <Grid container className={classes.imageHeader}>
                    <img loading='lazy' src={content.bannerImage} alt={content.name} className={classes.responsive} />

                    <Grid item xs={10} className={classes.headerField} style={{ width: '100%' }}>
                        <Typography
                            variant='h1'
                            className={classes.txt_header}
                            color={content.bannerImage ? 'inherit' : 'primary'}
                        >
                            {content.name}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container className={classes.containerContent} justify='center' alignItems='center'>
                    <Grid item xs={12}>
                        <Grid container justify='center' alignItems='center'>
                            <Grid item sm={9} xs={10} style={{ marginTop: 70, marginBottom: '40px' }}>
                                <Typography variant='h1' className={classes.txt_title_header}>
                                    {content.name}
                                </Typography>
                            </Grid>

                            <Grid item sm={9} xs={10} style={{ marginBottom: '40px' }}>
                                <Grid container item xs={12} style={{ marginBottom: 20 }}>
                                    <img
                                        loading='lazy'
                                        src={ic_detail_activity}
                                        alt='ic_detail_activity'
                                        className={classes.icon_style}
                                    />
                                    <Typography variant='h3' className={classes.txt_communityName}>
                                        {content.type}
                                    </Typography>
                                </Grid>

                                <Grid container item xs={12}>
                                    <img
                                        loading='lazy'
                                        src={ic_detail_location}
                                        alt='ic_detail_location'
                                        className={classes.icon_style}
                                    />
                                    <Typography variant='h3' className={classes.txt_communityName}>
                                        {content.community}
                                    </Typography>
                                </Grid>
                            </Grid>

                            {content.desc && (
                                <Grid container justify='center' alignItems='center'>
                                    <Grid item sm={9} xs={10}>
                                        <Typography variant='h3' className={classes.txt_title}>
                                            {t('RELATTRACTION.CONTENT.ATTRACTION_DETAIL')}
                                        </Typography>
                                    </Grid>

                                    <Grid item sm={9} xs={10}>
                                        <Typography
                                            variant='h4'
                                            className={classes.txt_detail}
                                            style={{ lineHeight: '30px' }}
                                        >
                                            {content.desc}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            )}

                            {(content.travelPeriod || content.openDay || content.fee) && (
                                <Grid container item sm={9} xs={10} style={{ marginTop: '25px' }}>
                                    {content.travelPeriod && (
                                        <RowContentTwoColumnView
                                            title={t('RELATTRACTION.CONTENT.MONTH_PERIOD')}
                                            value={content.travelPeriod}
                                            classes={classes}
                                        />
                                    )}
                                    {content.openDay && (
                                        <RowContentTwoColumnView
                                            title={t('RELATTRACTION.CONTENT.OPEN_DAY')}
                                            value={content.openDay}
                                            classes={classes}
                                        />
                                    )}
                                    {content.fee && (
                                        <RowContentTwoColumnView
                                            title={t('RELATTRACTION.CONTENT.FEE')}
                                            value={
                                                content.fee
                                                    ? `${formatNumberWithComma(content.fee)} ${t(
                                                          'RELATTRACTION.CONTENT.BAHTPERPERSON',
                                                      )}`
                                                    : undefined
                                            }
                                            classes={classes}
                                        />
                                    )}
                                </Grid>
                            )}

                            {/* {content.contentImage?.length > 0 && (
                                <Grid item xs={10} container className={classes.contentImage}>
                                    <ImageSlider imageData={content.contentImage} />
                                </Grid>  )}*/}

                            {content.contentImage.length > 0 &&
                                (content.contentImage.length === 1 ? (
                                    <Grid
                                        item
                                        xs={12}
                                        container
                                        justify='center'
                                        alignItems='center'
                                        style={{ margin: '50px 0px 80px 0px' }}
                                    >
                                        <img
                                            loading='lazy'
                                            src={content.contentImage[0]}
                                            alt={content.name}
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
                                        style={{ margin: '50px 0px 80px 0px' }}
                                    >
                                        <ImageSlider imageData={content.contentImage} />
                                    </Grid>
                                ))}

                            <Grid container item sm={9} xs={10} style={{ margin: '25px 0px 50px' }}>
                                <Grid item sm={12} xs={12}>
                                    <Typography variant='h3' className={classes.txt_title}>
                                        {t('RELATTRACTION.CONTENT.CONTACT')}
                                    </Typography>
                                </Grid>
                                <RowContentTwoColumnView
                                    title={t('RELATTRACTION.CONTENT.TEL')}
                                    value={content.tel}
                                    classes={classes}
                                />
                                <RowContentTwoColumnView
                                    title={t('RELATTRACTION.CONTENT.WEBSITE')}
                                    value={content.website}
                                    classes={classes}
                                />
                                <RowContentTwoColumnView
                                    title={t('RELATTRACTION.CONTENT.ADDRESS')}
                                    value={content.address}
                                    classes={classes}
                                />
                            </Grid>

                            <Grid item xs={10}>
                                <MapContent mapID={mapID} />
                            </Grid>

                            {content.tags?.length > 0 && (
                                <Grid container item sm={9} xs={10} style={{ marginBottom: '50px' }}>
                                    <Grid item sm={12} xs={12}>
                                        <Typography variant='h3' className={classes.txt_title}>
                                            {t('RELATTRACTION.CONTENT.TAG')}
                                        </Typography>
                                    </Grid>
                                    {content.tags.map((tag: string, index: number) => {
                                        return (
                                            <div className={classes.div_tag} key={index}>
                                                <Typography variant='h5' style={{ margin: '0px 10px' }}>
                                                    {tag}
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
    )
}

type contentActivityProps = UsecontentRelattractionProps &
    Omit<contentActivityViewProps, keyof ReturnTypeUsecontentActivity> & {
        dataContentRelAttraction: apiRelattraction.TResRelattractionContent
    }
let ContentRelattraction: React.FC<contentActivityProps> = ({ ...others }) => {
    const contentRelattraction = useContentRelattraction({ dataContentRelAttraction: others.dataContentRelAttraction })
    return <ContentRelattractionView {...contentRelattraction} {...others} />
}

export default ContentRelattraction
