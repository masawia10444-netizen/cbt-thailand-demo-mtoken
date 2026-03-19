import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import * as apiAttraction from '../apiAttraction'
import Grid from '@material-ui/core/Grid'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

import ColorWeb from '../../../constants/colorWeb'
import { pin } from '../../../constants/map'

import useMapContent from '../../../controls/mapContent/useMapContent'
import MapContent from '../../../controls/mapContent/MapContent'
import Meta from '../../../controls/meta/meta'
import Share from '../../../controls/share/share'
import useBreadcrumbs from '../../../hook/useBreadcrumbs'
import ImageSlider from '../../../controls/imageslider/imageSlider'
import drop from 'lodash/drop'

const publicPath = process.env.NEXT_PUBLIC_WEB_URL
const no_image = publicPath + '/images/defaultBannerImg/Activity_banner.png'
//import photo
const ic_detail_location = publicPath + '/images/icon/ic_detail_location.png'
const ic_detail_activity = publicPath + '/images/icon/ic_detail_activity.png'
import { formatAddress } from '../../../utilities/formatTextUtils'

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
    payments: {
        1: publicPath + '/images/icon/ic_fac_cash@2x.png',
        2: publicPath + '/images/icon/ic_fac_payonline@2x.png',
        3: publicPath + '/images/icon/ic_fac_atm@2x.png',
        4: publicPath + '/images/icon/ic_fac_yes@2x.png',
    },
}

import { convertToDisplayMonth, TMonthProps, convertToDisplayDay, TDayProps } from '../../../utilities/dateTimeUtils'

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
        imageHeader_noImage: {
            position: 'relative',
            justifyContent: 'center',
            backgroundColor: theme.colors.white,
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
            // color: theme.colors.textBlack,
            // lineHeight: 1.6,
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
    }),
)

type UsecontentActivityProps = {}
type ReturnTypeUsecontentActivity = ReturnType<typeof usecontentActivity>
function usecontentActivity(props: UsecontentActivityProps) {
    const {} = props
    return {}
}

type contentActivityViewProps = ReturnTypeUsecontentActivity & {
    dataContentAttraction: apiAttraction.TResGetAttractionContent
}
let ContentActivityView: React.FC<contentActivityViewProps> = ({ dataContentAttraction }) => {
    const classes = useStyles()
    const pinPoint = [dataContentAttraction.longitude, dataContentAttraction.latitude] as [number, number]
    const mapID = 'mapActivity'
    const { t, i18n } = useTranslation()
    const lang = i18n.language.toUpperCase()
    useMapContent({ mapID, pin: pin.activity, pinPoint })
    useBreadcrumbs({
        contentName: lang === 'TH' ? dataContentAttraction?.attracNameTH : dataContentAttraction?.attracNameEN,
    })

    const images = useMemo(() => {
        if (dataContentAttraction.images.length > 1) {
            // console.log('==', drop(dataContentAttraction.images, 0))
            return drop(dataContentAttraction.images, 0).map(
                (image: any) => process.env.NEXT_PUBLIC_UPLOAD_URL + image.attracImagePath,
            )
        } else {
            console.log('>>>')
            return dataContentAttraction.images.map(
                (image: any) => process.env.NEXT_PUBLIC_UPLOAD_URL + image.attracImagePath,
            )
        }
    }, [dataContentAttraction?.images])

    const getValueByLang = React.useCallback(
        (key: string) => {
            // @ts-ignore
            return dataContentAttraction[`${key}${lang}`]
        },
        [dataContentAttraction, lang],
    )

    const image_banner = dataContentAttraction?.bannerImage
        ? process.env.NEXT_PUBLIC_UPLOAD_URL + dataContentAttraction?.bannerImage
        : no_image

    const attracName = lang === 'TH' ? dataContentAttraction?.attracNameTH : dataContentAttraction?.attracNameEN
    const address_detail = formatAddress(
        {
            hno: dataContentAttraction.hno,
            moo: dataContentAttraction.moo,
            villageName: getValueByLang('villageName'),
            soiName: getValueByLang('soiName'),
            roadName: getValueByLang('roadName'),
            tamName: getValueByLang('tamName'),
            ampName: getValueByLang('ampName'),
            provName: getValueByLang('provName'),
            postCode: dataContentAttraction.postCode,
            provCode: dataContentAttraction.provCode,
        },
        lang as 'TH' | 'EN',
    )

    // console.log('dataContentAttraction', dataContentAttraction)

    return (
        <Grid container className={classes.root} justify='center' alignItems='center'>
            <Meta
                data={{
                    title: lang === 'TH' ? dataContentAttraction?.attracNameTH : dataContentAttraction?.attracNameEN,
                    description: lang === 'TH' ? dataContentAttraction?.descTH : dataContentAttraction?.descEN,
                    image: image_banner,
                    isContent: true,
                }}
            />
            <Share
                data={{ lat: dataContentAttraction.latitude, long: dataContentAttraction.longitude, name: attracName }}
            />
            <Grid item xs={12}>
                <Grid
                    container
                    className={dataContentAttraction?.bannerImage ? classes.imageHeader : classes.imageHeader_noImage}
                >
                    <img
                        src={image_banner}
                        alt={attracName}
                        className={dataContentAttraction?.bannerImage ? classes.responsive : classes.responsive_noImage}
                    />

                    <Grid item xs={10} className={classes.headerField} style={{ width: '100%' }}>
                        <Typography
                            variant='h1'
                            color={dataContentAttraction?.bannerImage ? 'inherit' : 'primary'}
                            className={classes.txt_header}
                        >
                            {attracName}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Grid container className={classes.containerContent} justify='center' alignItems='center'>
                    <Grid item xs={12}>
                        <Grid container className={classes.containerContent} justify='center' alignItems='center'>
                            <Grid item sm={9} xs={10} style={{ marginTop: 70, marginBottom: '40px' }}>
                                <Typography variant='h1' className={classes.txt_title_header}>
                                    {lang === 'TH'
                                        ? dataContentAttraction?.attracNameTH
                                        : dataContentAttraction?.attracNameEN}
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
                                        {lang === 'TH'
                                            ? dataContentAttraction?.attracTypeTH
                                            : dataContentAttraction?.attracTypeEN}
                                    </Typography>
                                </Grid>

                                <Grid container item xs={12}>
                                    {/* <Grid item xs={1} style={{ marginRight: '15px', backgroundColor: 'coral' }}> */}
                                    <img
                                        loading='lazy'
                                        src={ic_detail_location}
                                        alt='ic_detail_location'
                                        className={classes.icon_style}
                                    />
                                    {/* </Grid> */}
                                    {/* <Grid item xs={10} style={{ marginBottom: 20, backgroundColor: 'wheat' }}> */}
                                    <Typography variant='h3' className={classes.txt_communityName}>
                                        {lang === 'TH'
                                            ? dataContentAttraction?.communNameTH
                                            : dataContentAttraction?.communNameEN}
                                    </Typography>
                                    {/* </Grid> */}
                                </Grid>
                            </Grid>

                            {
                                // (dataContentAttraction?.descTH !== null && dataContentAttraction?.descTH !== '') &&
                                <Grid container justify='center' alignItems='center'>
                                    <Grid item sm={9} xs={10}>
                                        <Typography variant='h3' className={classes.txt_title}>
                                            {t('ATTRACTION.CONTENT.ATTRACTION_DETAIL')}
                                        </Typography>
                                    </Grid>

                                    <Grid item sm={9} xs={10}>
                                        <Typography
                                            variant='h4'
                                            className={classes.txt_detail}
                                            style={{ lineHeight: '30px' }}
                                        >
                                            {(lang === 'TH'
                                                ? dataContentAttraction?.descTH
                                                : dataContentAttraction?.descEN) || '-'}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            }

                            <Grid container item sm={9} xs={10} style={{ marginBottom: '20px' }}>
                                {dataContentAttraction?.month?.length > 0 && (
                                    <>
                                        <Grid item lg={2} sm={4} xs={10}>
                                            <Typography variant='h4' className={classes.txt_subTitle}>
                                                {t('ATTRACTION.CONTENT.MONTH_PERIOD')}
                                            </Typography>
                                        </Grid>

                                        <Grid item lg={10} sm={8} xs={10}>
                                            <Typography variant='h4' className={classes.txt_detail}>
                                                {dataContentAttraction?.month?.length === 12
                                                    ? t('ATTRACTION.CONTENT.ALL_SEASON')
                                                    : convertToDisplayMonth(
                                                          (dataContentAttraction.month as unknown) as TMonthProps[],
                                                          lang,
                                                      )}
                                                {/* { } */}
                                                {/* {lang === 'TH'
                                                    ? ` ${dataContentAttraction?.month[0].monthNameTH} - ${dataContentAttraction?.month[
                                                        dataContentAttraction?.month?.length - 1
                                                    ].monthNameTH
                                                    }`
                                                    : ` ${dataContentAttraction?.month[0].monthNameEN} - ${dataContentAttraction?.month[
                                                        dataContentAttraction?.month?.length - 1
                                                    ].monthNameEN
                                                    }`} */}
                                            </Typography>
                                        </Grid>
                                    </>
                                )}

                                {dataContentAttraction?.openDay?.length > 0 && (
                                    <>
                                        <Grid item lg={2} sm={4} xs={10}>
                                            <Typography variant='h4' className={classes.txt_subTitle}>
                                                {t('ATTRACTION.CONTENT.OPEN_DAY')}
                                            </Typography>
                                        </Grid>

                                        <Grid item lg={10} sm={8} xs={10}>
                                            {dataContentAttraction?.openDay.map((item: any, index: number) => {
                                                if (item.startDayTH !== item.endDayTH) {
                                                    return (
                                                        <Typography
                                                            variant='h4'
                                                            className={classes.txt_detail}
                                                            key={index}
                                                        >
                                                            {lang === 'TH'
                                                                ? `${item.startDayTH} - ${item.endDayTH} ${
                                                                      item.startHour
                                                                  }:${item.startMin === '0' ? '00' : item.startMin} - ${
                                                                      item.endHour
                                                                  }:${item.endMin === '0' ? '00' : item.endMin}`
                                                                : `${item.startDayEN} - ${item.endDayEN} ${
                                                                      item.startHour
                                                                  }:${item.startMin === '0' ? '00' : item.startMin} - ${
                                                                      item.endHour
                                                                  }:${item.endMin === '0' ? '00' : item.endMin}`}
                                                        </Typography>
                                                    )
                                                } else {
                                                    return (
                                                        <Grid container item xs={12} key={index}>
                                                            <Typography variant='h4' className={classes.txt_detail}>
                                                                {lang === 'TH'
                                                                    ? `${item.startDayTH} ${item.startHour}:${
                                                                          item.startMin === '0' ? '00' : item.startMin
                                                                      } - ${item.endHour}:${
                                                                          item.endMin === '0' ? '00' : item.endMin
                                                                      }`
                                                                    : `${item.startDayEN} - ${item.endDayEN} ${
                                                                          item.startHour
                                                                      }:${
                                                                          item.startMin === '0' ? '00' : item.startMin
                                                                      } - ${item.endHour}:${
                                                                          item.endMin === '0' ? '00' : item.endMin
                                                                      }`}
                                                            </Typography>
                                                        </Grid>
                                                    )
                                                }
                                            })}
                                        </Grid>
                                    </>
                                )}

                                {((dataContentAttraction?.landmarkTH !== null &&
                                    dataContentAttraction?.landmarkTH !== '') ||
                                    (dataContentAttraction?.landmarkEN !== null &&
                                        dataContentAttraction?.landmarkEN !== '')) && (
                                    <>
                                        <Grid item lg={2} sm={4} xs={10}>
                                            <Typography variant='h4' className={classes.txt_subTitle}>
                                                {t('ATTRACTION.CONTENT.LANDMARK')}
                                            </Typography>
                                        </Grid>

                                        <Grid item lg={10} sm={8} xs={10}>
                                            <Typography variant='h4' className={classes.txt_detail}>
                                                {lang === 'TH'
                                                    ? dataContentAttraction?.landmarkTH
                                                    : dataContentAttraction?.landmarkEN}
                                            </Typography>
                                        </Grid>
                                    </>
                                )}
                                {dataContentAttraction?.attracFee && (
                                    <>
                                        <Grid item lg={2} sm={4} xs={10}>
                                            <Typography variant='h4' className={classes.txt_subTitle}>
                                                {t('ATTRACTION.CONTENT.FEE')}
                                            </Typography>
                                        </Grid>

                                        <Grid item lg={10} sm={8} xs={10}>
                                            <Typography variant='h4' className={classes.txt_detail}>
                                                {dataContentAttraction?.attracFee}{' '}
                                                {t('ATTRACTION.CONTENT.BAHTPERPERSON')}
                                            </Typography>
                                        </Grid>
                                    </>
                                )}
                                {(dataContentAttraction?.attracTimePeriod ||
                                    dataContentAttraction?.attracTimePeriod === 0) && (
                                    <>
                                        <Grid item lg={2} sm={4} xs={10}>
                                            <Typography variant='h4' className={classes.txt_subTitle}>
                                                {t('ATTRACTION.CONTENT.ATTRACTION_PEIOD')}
                                            </Typography>
                                        </Grid>

                                        <Grid item lg={10} sm={8} xs={10}>
                                            <Typography variant='h4' className={classes.txt_detail}>
                                                {dataContentAttraction?.attracTimePeriod}{' '}
                                                {t('ATTRACTION.CONTENT.MINUTE')}
                                            </Typography>
                                        </Grid>
                                    </>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>

                    {images.length > 0 &&
                        (images.length === 1 ? (
                            <Grid
                                item
                                sm={9}
                                xs={12}
                                container
                                justify='center'
                                alignItems='center'
                                style={{ margin: '50px 0px 80px 0px' }}
                            >
                                <img
                                    src={images[0]}
                                    alt={attracName}
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
                                sm={12}
                                xs={12}
                                container
                                justify='center'
                                alignItems='center'
                                style={{ margin: '50px 0px 80px 0px' }}
                            >
                                <ImageSlider imageData={images} />
                            </Grid>
                        ))}

                    {dataContentAttraction?.facilities?.length > 0 && (
                        <Grid container item sm={9} xs={10} alignItems='center' style={{ marginBottom: 40 }}>
                            <Grid item xs={12}>
                                <Typography variant='h3' className={classes.txt_title}>
                                    {t('ATTRACTION.CONTENT.FACILITIES')}
                                </Typography>
                            </Grid>
                            {dataContentAttraction?.facilities.map((item: any, index: number) => {
                                if (index + 1 < Math.ceil(dataContentAttraction?.facilities?.length / 2)) {
                                    return (
                                        <Grid item sm={6} xs={10} key={index}>
                                            <Grid container item xs={12} style={{ margin: '5px 0' }}>
                                                <img
                                                    loading='lazy'
                                                    //@ts-ignore
                                                    src={facIcons[item.facID]}
                                                    alt={facIcons[item.facID]}
                                                    className={classes.ic_icon}
                                                />
                                                <Typography variant='h4' className={classes.txt_detail}>
                                                    {lang === 'TH'
                                                        ? `${item.facNameTH} ${
                                                              item.facAmount !== null && item.facAmount !== 0
                                                                  ? item.facAmount + ' ' + item.facUnitTH
                                                                  : ''
                                                          }`
                                                        : `${item.facNameEN} ${
                                                              item.facAmount !== null && item.facAmount !== 0
                                                                  ? item.facAmount + ' ' + item.facUnitEN
                                                                  : ''
                                                          }`}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    )
                                } else {
                                    return (
                                        <Grid item sm={6} xs={10}>
                                            <Grid container item xs={12} style={{ margin: '5px 0' }}>
                                                <img
                                                    loading='lazy'
                                                    //@ts-ignore
                                                    src={facIcons[item.facID]}
                                                    alt={facIcons[item.facID]}
                                                    className={classes.ic_icon}
                                                />
                                                <Typography variant='h4' className={classes.txt_detail}>
                                                    {lang === 'TH'
                                                        ? `${item.facNameTH} ${
                                                              item.facAmount !== null && item.facAmount !== 0
                                                                  ? item.facAmount + ' ' + item.facUnitTH
                                                                  : ''
                                                          }`
                                                        : // item.facNameTH + ((item.facAmount !== null) && `${item.facAmount || ''} ${item.facUnitTH || ''}`)

                                                          `${item.facNameEN} ${
                                                              item.facAmount !== null && item.facAmount !== 0
                                                                  ? item.facAmount + ' ' + item.facUnitEN
                                                                  : ''
                                                          }`}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    )
                                }
                            })}
                        </Grid>
                    )}

                    {((dataContentAttraction?.publicTransNameTH !== null &&
                        dataContentAttraction?.publicTransNameTH !== '') ||
                        (dataContentAttraction?.publicTransNameEN !== null &&
                            dataContentAttraction?.publicTransNameEN !== '') ||
                        (dataContentAttraction?.privateTransNameTH !== null &&
                            dataContentAttraction?.privateTransNameTH !== '') ||
                        (dataContentAttraction?.privateTransNameEN !== null &&
                            dataContentAttraction?.privateTransNameEN !== '')) && (
                        <Grid container item sm={9} xs={10} alignItems='center' style={{ marginBottom: 40 }}>
                            <Grid item xs={12}>
                                <Typography variant='h3' className={classes.txt_title}>
                                    {t('ATTRACTION.CONTENT.TRAVELING')}
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item sm={6} xs={12}>
                                        <Grid container item xs={12}>
                                            <Typography variant='h4' className={classes.txt_subTitle}>
                                                {t('ATTRACTION.CONTENT.PRIVATE_TRANSITION')}
                                            </Typography>
                                        </Grid>

                                        <Grid container item xs={11}>
                                            <Typography variant='h4' className={classes.txt_detail}>
                                                {lang === 'TH'
                                                    ? dataContentAttraction?.privateTransNameTH
                                                    : dataContentAttraction?.privateTransNameEN}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid item sm={6} xs={12}>
                                        <Grid container item xs={12}>
                                            <Typography variant='h4' className={classes.txt_subTitle}>
                                                {t('ATTRACTION.CONTENT.PUBLIC_TRANSITION')}
                                            </Typography>
                                        </Grid>

                                        <Grid container item xs={11}>
                                            <Typography variant='h4' className={classes.txt_detail}>
                                                {lang === 'TH'
                                                    ? dataContentAttraction?.publicTransNameTH
                                                    : dataContentAttraction?.publicTransNameEN}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}

                    <Grid container item sm={9} xs={10} alignItems='center' style={{ marginBottom: 40 }}>
                        <Grid item xs={12}>
                            <Typography variant='h3' className={classes.txt_title}>
                                {t('ATTRACTION.CONTENT.CONTACTS')}
                            </Typography>
                        </Grid>

                        <Grid container item xs={12}>
                            <Grid item sm={2} xs={3}>
                                <Typography variant='h4' className={classes.txt_subTitle}>
                                    {t('ATTRACTION.CONTENT.TEL')}
                                </Typography>
                            </Grid>

                            <Grid item sm={10} xs={9}>
                                {dataContentAttraction?.attracTel ? (
                                    <a
                                        href={`tel:${dataContentAttraction?.attracTel}`}
                                        style={{ color: '#80BD01', textDecorationColor: '#80BD01' }}
                                    >
                                        <Typography variant='h4' className={classes.txt_detail}>
                                            {dataContentAttraction?.attracTel}
                                        </Typography>
                                    </a>
                                ) : (
                                    <Typography variant='h4' className={classes.txt_detail}>
                                        {'-'}
                                    </Typography>
                                )}
                            </Grid>

                            <Grid item sm={2} xs={3}>
                                <Typography variant='h4' className={classes.txt_subTitle}>
                                    {t('ATTRACTION.CONTENT.WEBSITE')}
                                </Typography>
                            </Grid>

                            <Grid item sm={10} xs={9}>
                                <Typography variant='h4' className={classes.txt_detail}>
                                    {dataContentAttraction?.attracWebsite || '-'}
                                </Typography>
                            </Grid>
                            <Grid item sm={2} xs={3}>
                                <Typography variant='h4' className={classes.txt_subTitle}>
                                    {t('ATTRACTION.CONTENT.ADDRESS')}
                                </Typography>
                            </Grid>

                            <Grid item sm={10} xs={9}>
                                <Typography variant='h4' className={classes.txt_detail}>
                                    {address_detail}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={10}>
                        <MapContent mapID={mapID} />
                    </Grid>

                    {dataContentAttraction?.tags?.length > 0 && (
                        <Grid container item sm={9} xs={10} alignItems='center' style={{ marginBottom: 40 }}>
                            <Grid item xs={12}>
                                <Typography variant='h3' className={classes.txt_title}>
                                    {t('ATTRACTION.CONTENT.TAG')}
                                </Typography>
                            </Grid>
                            {dataContentAttraction?.tags.map((item: any, index: number) => {
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
    )
}

type contentActivityProps = UsecontentActivityProps &
    Omit<contentActivityViewProps, keyof ReturnTypeUsecontentActivity> & {
        dataContentAttraction: apiAttraction.TResGetAttractionContent
    }
let ContentActivity: React.FC<contentActivityProps> = ({ ...others }) => {
    const contentActivity = usecontentActivity({})
    return <ContentActivityView {...contentActivity} {...others} />
}

export default ContentActivity
