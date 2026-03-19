// @ts-nocheck
import React, { useEffect } from 'react'
import ReactPlayer from 'react-player'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
//constant
import ColorWeb from '../../../constants/colorWeb'
import { useTranslation } from 'react-i18next'
import { Typography } from '@material-ui/core'
import Meta from '../../../controls/meta/meta'
import Share from '../../../controls/share/share'
import useBreadcrumbs from '../../../hook/useBreadcrumbs'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'

const publicPath = process.env.NEXT_PUBLIC_WEB_URL

//img
const ic_review_cost = publicPath + '/images/icon/svg/ic_review_cost.svg'
const ic_review_noti = publicPath + '/images/icon/svg/ic_review_noti.svg'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: '100%',
            color: ColorWeb.primary.color4,
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
            filter: 'contrast(0.5)',
            objectFit: 'cover',
        },
        content: {
            backgroundColor: '#F9F9F9',
        },
        txtTitle: {
            fontFamily: 'Prompt-SemiBold',
            color: theme.colors.white,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            [theme.breakpoints.down('md')]: {
                top: '65%',
                width: '100%',
            },
            [theme.breakpoints.down('xs')]: {
                top: '80%',
                width: '80%',
                fontSize: '14px',
            },
        },
        txtDetail: {
            marginTop: '30px',
            fontFamily: 'Sarabun',
            lineHeight: '27px',
        },
        imgResponsive: {
            width: '100%',
            height: 'auto',
            maxHeight: '324px',
            objectFit: 'cover',
        },
        txt_topic: {
            color: theme.colors.white,
            textAlign: 'center',
            margin: '10px 0 25px 0',
            fontFamily: 'Prompt-SemiBold',
        },
        txt_subTopic: {
            fontFamily: 'Sarabun-Bold',
        },
        txt_topic_detail: {
            fontFamily: 'Sarabun',
            lineHeight: 1.6,
        },
        img_topic: {
            width: '60px',
            height: '60px',
            lineHeight: 1.6,
        },

        container_topic_inBox: {
            padding: '30px 0px',
            backgroundColor: '#D4E8DC',
            color: '#009687',
        },
        txt_detail_title: {
            color: ColorWeb.secondary.color1,
            margin: '20px 0px',
        },
        txt_detail_subTitle: {
            fontFamily: 'Sarabun-Bold',
            color: ColorWeb.secondary.color1,
            margin: '20px 0',
        },
        txt_detail: {
            fontFamily: 'Sarabun',
            paddingBottom: 15,
            lineHeight: 1.6,
            overflowWrap: 'anywhere',
        },
        txt_content_detail: {
            fontFamily: 'Sarabun',
            paddingBottom: 15,
            lineHeight: 1.6,
        },
        txt_content_cost: {
            fontFamily: 'Sarabun',
            // paddingBottom: 15,
            color: ColorWeb.secondary.color1,
        },
        container_detail: {
            padding: 30,
            borderBottom: '1px solid',
            borderBottomColor: ColorWeb.secondary.color2,
        },

        txt_topic_content: {
            color: theme.palette.primary.main,
            margin: '10px 0 25px 0',
            fontFamily: 'Prompt-SemiBold',
            lineHeight: 1.6,
        },
        txt_detail_content_bold: { fontFamily: 'Sarabun-Bold', paddingBottom: 15, lineHeight: 1.6 },
        txt_detail_content: {
            fontFamily: 'Sarabun',
            paddingBottom: 15,
            lineHeight: 1.6,
        },
        div_tag: {
            background: ColorWeb.secondary.color2,
            margin: '15px 20px 5px 0px',
            height: '30px',
            borderRadius: '20px',
            padding: '7px',
        },
        content_vdo: {
            padding: '20px 0 60px 0',
            height: '600px',
            [theme.breakpoints.down('sm')]: {
                // height: '260px',
                maxHeight: 375,
            },
        },
        ic_cost: {
            width: 25,
            height: 'auto',
        },
        ic_noti: {
            width: 35,
            height: 'auto',
        },
    }),
)

type UsecontentSeasonProps = {}
type ReturnTypeUsecontentSeason = ReturnType<typeof usecontentSeason>
function usecontentSeason(props: UsecontentSeasonProps) {
    const {} = props
    return {}
}

type contentSeasonViewProps = {
    reviewTravelID: number
    reviewTravelNameTH: string
    reviewTravelNameEN: string
    reviewTravelTitleTH: string
    reviewTravelTitleEN: string
    reviewTravelThumbnailURL?: string
    reviewTravelImgHeaderURL?: any
    provNameTH: string
    provNameEN: string
    acitivityHeaderTH: string
    acitivityHeaderEN: string
    acitivityRemarkTH: string
    acitivityRemarkEN: string
    updateDate: string
    detail: Detail[]
    images: any[]
    contents: Content[]
    connectLocations: ConnectLocation[]
    locations: Location[]
    journey: Journey[]
    contacts: Contact[]
    tags: string[]
    mediaURL: string
}

interface Contact {
    contactID: number
    contactNameTH: string
    contactNameEN: string
    contactTel: string
}

interface Journey {
    journeyID: number
    journeyDescTH: string
    journeyDescEN: string
    isPublic: boolean
    isPublicAir: boolean
}

interface Location {
    locationID: number
    locationNameTH: string
    locationNameEN: string
    locationURL: string
}

interface ConnectLocation {
    connectLocationID: number
    connectLocationNameTH: string
    connectLocationNameEN: string
    connectLocationDistance: number
    connectLocationURL: string
}

interface Content {
    contentID: number
    contentTitleTH: string
    contentTitleEN: string
    contentDescTH: string
    contentDescEN: string
    contentCostTH?: string
    contentCostEN?: string
    image: any[]
}

interface Detail {
    detailID: number
    detailTH: string
    detailEN: string
}

let ContentCommunityView: React.FC<contentSeasonViewProps> = (data) => {
    const classes = useStyles()
    const { t, i18n } = useTranslation()
    const lang = i18n.language.toUpperCase()
    const theme = useTheme()
    const isIpadView = useMediaQuery(theme.breakpoints.down('md'))

    useBreadcrumbs({ contentName: data?.['reviewTravelName' + lang] })

    return (
        <div>
            <Meta
                data={{
                    title: data?.['reviewTravelTitle' + lang],
                    description: data?.detail?.length > 0 ? data?.detail?.[0]?.['detail' + lang] : '',
                    image: process.env.NEXT_PUBLIC_UPLOAD_URL + data?.reviewTravelImgHeaderURL,
                    isContent: true,
                }}
            />

            <Grid container justify='center' className={classes.root}>
                <Share isShareLocation={false} />
                <Grid item xs={12}>
                    {data?.reviewTravelImgHeaderURL != null ? (
                        <Grid container className={classes.imageHeader}>
                            <img
                                loading='lazy'
                                alt={data.reviewTravelImgHeaderURL}
                                src={process.env.NEXT_PUBLIC_UPLOAD_URL + data.reviewTravelImgHeaderURL}
                                className={classes.responsive}
                            />
                            <Typography
                                className={classes.txtTitle}
                                style={{ width: '90%' }}
                                variant={isIpadView ? 'h2' : 'h1'}
                            >
                                {data?.[`reviewTravelTitle` + lang]}
                            </Typography>
                        </Grid>
                    ) : (
                        <Grid container justify='center' alignContent='center' style={{ paddingTop: '100px' }}>
                            <Grid item xs={9}>
                                <Typography variant='h1'>{data?.[`reviewTravelTitle` + lang]}</Typography>
                            </Grid>
                        </Grid>
                    )}
                    <Grid container className={classes.content} justify='center'>
                        <Grid container justify='center' alignContent='center' style={{ padding: '25px 0px' }}>
                            {data?.detail.map((item, index) => {
                                const detail = item[`detail` + lang]
                                return (
                                    <Grid item xs={9} key={index}>
                                        <Typography variant='h4' className={classes.txtDetail}>
                                            {detail}
                                        </Typography>
                                    </Grid>
                                )
                            })}
                        </Grid>
                        {data?.images?.length > 0 && (
                            <Grid container justify='center' alignContent='center' style={{ padding: '25px 0px' }}>
                                <Grid item xs={12} container>
                                    {data?.images.map((item, index) => (
                                        <Grid item xs={12} md={6} key={index}>
                                            <img
                                                loading='lazy'
                                                alt={item.imgUR}
                                                src={process.env.NEXT_PUBLIC_UPLOAD_URL + item.imgURL}
                                                style={{ width: '100%', height: 'auto' }}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        )}

                        <Grid container justify='center' alignContent='center' style={{ padding: '25px 0px' }}>
                            <Grid item xs={9}>
                                <Typography
                                    variant='h3'
                                    className={classes.txt_topic}
                                    style={{ color: ColorWeb.primary.color4 }}
                                >
                                    {data?.[`acitivityHeader` + lang]}
                                </Typography>
                            </Grid>

                            {data?.contents?.length > 0 &&
                                data?.contents.map((item, index) => {
                                    return (
                                        <Grid item xs={9} style={{ marginBottom: 15 }} key={index}>
                                            <Typography variant='h4' className={classes.txt_topic_detail}>
                                                {item[`contentTitle` + lang]}
                                            </Typography>
                                        </Grid>
                                    )
                                })}
                        </Grid>

                        {data?.acitivityRemarkTH &&
                            data?.acitivityRemarkEN &&
                            data?.acitivityRemarkTH != '' &&
                            data?.acitivityRemarkEN != '' && (
                                <Grid
                                    container
                                    alignContent='center'
                                    justify='center'
                                    alignItems='center'
                                    className={classes.container_topic_inBox}
                                >
                                    <Grid item sm={1} xs={12}>
                                        <Grid container justify='center' alignContent='center'>
                                            <img
                                                loading='lazy'
                                                src={ic_review_noti}
                                                alt='ic_review_noti'
                                                className={classes.ic_noti}
                                            />
                                            {/* <img loading='lazy'src={img_point} className={classes.img_topic} /> */}
                                        </Grid>
                                    </Grid>
                                    <Grid item sm={8} xs={9}>
                                        <Typography variant='h4' className={classes.txt_topic_detail}>
                                            {data?.[`acitivityRemark` + lang]}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            )}

                        {data?.contents?.length > 0 &&
                            data?.contents.map((item, index) => {
                                return (
                                    <Grid
                                        key={index}
                                        container
                                        justify='center'
                                        alignContent='center'
                                        style={{ padding: '25px 0px' }}
                                    >
                                        {item.image?.length > 0 && (
                                            <Grid item xs={12} container>
                                                {item.image.map((itemImg, j) => {
                                                    return (
                                                        <Grid item xs={12} md={6} key={j}>
                                                            <img
                                                                loading='lazy'
                                                                src={
                                                                    process.env.NEXT_PUBLIC_UPLOAD_URL + itemImg.imgURL
                                                                }
                                                                alt={itemImg.imgURL}
                                                                style={{ width: '100%', height: 'auto' }}
                                                            />
                                                        </Grid>
                                                    )
                                                })}
                                            </Grid>
                                        )}
                                        <Grid item xs={9} style={{ paddingTop: '20px' }}>
                                            <Typography
                                                variant='h4'
                                                className={classes.txt_topic}
                                                style={{ color: ColorWeb.primary.color4 }}
                                            >
                                                {item[`contentTitle` + lang]}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <Typography variant='h4' className={classes.txt_content_detail}>
                                                {item[`contentDesc` + lang]}
                                            </Typography>
                                        </Grid>
                                        {item.contentCostTH &&
                                            item.contentCostEN &&
                                            item.contentCostTH !== '' &&
                                            item.contentCostEN !== '' && (
                                                <Grid
                                                    container
                                                    item
                                                    xs={9}
                                                    alignContent='center'
                                                    justify='flex-start'
                                                    alignItems='center'
                                                    style={{ marginTop: 20 }}
                                                >
                                                    <Grid item xs={1}>
                                                        <Grid container justify='center' alignContent='center'>
                                                            <img
                                                                loading='lazy'
                                                                src={ic_review_cost}
                                                                alt='ic_review_cost'
                                                                className={classes.ic_cost}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={8}>
                                                        <Typography variant='h4' className={classes.txt_content_cost}>
                                                            {item[`contentCost` + lang]}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            )}
                                    </Grid>
                                )
                            })}

                        {data?.mediaURL !== null && (
                            <Grid container item xs={12} justify='center' className={classes.content_vdo}>
                                <ReactPlayer controls width='75%' height='auto' url={data.mediaURL} />
                            </Grid>
                        )}

                        <Grid container justify='center' alignContent='center' style={{ padding: '25px 0px' }}>
                            <Grid item xs={9} style={{ borderBottom: '1px solid #D4E8DC' }}></Grid>
                        </Grid>

                        {data?.connectLocations?.length > 0 && (
                            <Grid container justify='center' alignContent='center' style={{ padding: '25px 0px' }}>
                                <Grid item xs={9}>
                                    <Typography variant='h4' className={classes.txt_topic_content}>
                                        {t('COMMUNITY.CONTENT.TRAVEL_LINK')}
                                    </Typography>
                                </Grid>
                                {data?.connectLocations.map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <Grid item xs={9}>
                                                <Typography variant='h4' className={classes.txt_detail_content_bold}>
                                                    {`${item[`connectLocationName` + lang]}
                                                (${item.connectLocationDistance} ${t('COMMUNITY.CONTENT.KILOMETER')}) `}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={9}>
                                                <Typography variant='h4' className={classes.txt_detail_content}>
                                                    {`${t('COMMUNITY.CONTENT.COORDINATES')}
                                                : `}
                                                    <a target='_blank' href={item.connectLocationURL}>
                                                        {item.connectLocationURL}
                                                    </a>
                                                </Typography>
                                            </Grid>
                                        </React.Fragment>
                                    )
                                })}
                            </Grid>
                        )}
                        {data?.locations?.length > 0 && (
                            <Grid container justify='center' alignContent='center' style={{ padding: '25px 0px' }}>
                                <Grid item xs={9}>
                                    <Typography variant='h4' className={classes.txt_topic_content}>
                                        {t('COMMUNITY.CONTENT.COORDINATES_TRAVEL')}
                                    </Typography>
                                </Grid>
                                {data?.locations.map((item, index) => {
                                    return (
                                        <Grid item xs={9} key={index}>
                                            <Typography variant='h4' className={classes.txt_detail_content}>
                                                {`${item[`locationName` + lang]}
                                                : `}
                                                <a target='_blank' href={item.locationURL}>
                                                    {item.locationURL}
                                                </a>
                                            </Typography>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        )}
                        {data?.journey?.length > 0 && (
                            <Grid container justify='center' alignContent='center' style={{ padding: '25px 0px' }}>
                                <Grid item xs={9}>
                                    <Typography variant='h4' className={classes.txt_topic_content}>
                                        {t('COMMUNITY.CONTENT.JOURNEY')}
                                    </Typography>
                                </Grid>
                                {data?.journey.map((item, index) => {
                                    return item.isPublic ? (
                                        <Grid item xs={9} key={index}>
                                            <Typography variant='h4' className={classes.txt_detail_content}>
                                                <label className={classes.txt_detail_content_bold}>
                                                    {item.isPublicAir
                                                        ? t('COMMUNITY.CONTENT.PUBLIC_TRAVEL_AIR')
                                                        : t('COMMUNITY.CONTENT.PUBLIC_TRAVEL')}
                                                </label>
                                                <label className={classes.txt_detail_content}>
                                                    {` ${item[`journeyDesc` + lang]}`}
                                                </label>
                                            </Typography>
                                        </Grid>
                                    ) : (
                                        <Grid item xs={9} key={index}>
                                            <Typography variant='h4' className={classes.txt_detail_content}>
                                                <label className={classes.txt_detail_content_bold}>
                                                    {t('COMMUNITY.CONTENT.PRIVATE_TRAVEL')}
                                                </label>
                                                <label className={classes.txt_detail_content}>
                                                    {` ${item[`journeyDesc` + lang]}`}
                                                </label>
                                            </Typography>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        )}
                        {data?.contacts?.length > 0 && (
                            <Grid container justify='center' alignContent='center' style={{ padding: '25px 0px' }}>
                                <Grid item xs={9}>
                                    <Typography variant='h4' className={classes.txt_topic_content}>
                                        {t('COMMUNITY.CONTENT.CONTACT')}
                                    </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant='h4' className={classes.txt_detail_content}>
                                        {data?.contacts.map((item, index) => {
                                            let detail = (
                                                <span>
                                                    {index !== 0 && `, `}
                                                    {item[`contactName` + lang]} {t('COMMUNITY.CONTENT.TEL')}
                                                    <a href='#'>{item.contactTel}</a>
                                                </span>
                                            )
                                            return detail
                                        })}
                                    </Typography>
                                </Grid>
                            </Grid>
                        )}
                        <Grid container justify='center' alignContent='center' style={{ padding: '25px 0px' }}>
                            <Grid item xs={9} style={{ borderBottom: '1px solid #D4E8DC' }}></Grid>
                        </Grid>
                        {/* {data.tags?.length > 0 && (
                            <Grid container justify='center' alignContent='center' style={{ padding: '25px 0px' }}>
                                <Grid item xs={9}>
                                    <Typography variant='h4' className={classes.txt_topic_content}>
                                        {t('COMMUNITY.CONTENT.TAG')}
                                    </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant='h4' className={classes.txt_detail_content}>
                                        {data.tags.map((item, index) => {
                                            return item
                                        })}
                                    </Typography>
                                </Grid>
                            </Grid>
                        )} */}

                        {data?.tags?.length > 0 && (
                            <Grid container justify='center' alignContent='center' style={{ marginBottom: '50px' }}>
                                <Grid item xs={9}>
                                    <Typography variant='h3' className={classes.txt_topic_content}>
                                        {t('COMMUNITY.CONTENT.TAG')}
                                    </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Grid container>
                                        {data?.tags.map((item, index) => {
                                            return (
                                                <div className={classes.div_tag} key={index}>
                                                    <Typography variant='h5' style={{ margin: '0px 10px' }}>
                                                        {item}
                                                    </Typography>
                                                </div>
                                            )
                                        })}
                                    </Grid>
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default ContentCommunityView
