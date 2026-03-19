import React, { useMemo } from 'react'
import drop from 'lodash/drop'
import * as apiAccommodation from '../apiAccommodation'
//Material UI
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import ColorWeb from '../../../constants/colorWeb'
import { pin } from '../../../constants/map'
import Meta from '../../../controls/meta/meta'

const publicPath = process.env.NEXT_PUBLIC_WEB_URL
const no_image = publicPath + '/images/defaultBannerImg/Accommodation_banner.png'
const ic_detail_accom = publicPath + '/images/icon/ic_detail_accom.png'

import ImageSlider from '../../../controls/imageslider/imageSlider'

import { formatAddress, formatNumberWithComma } from '../../../utilities/formatTextUtils'

//custom hook
import useMapContent from '../../../controls/mapContent/useMapContent'
import MapContent from '../../../controls/mapContent/MapContent'
import Share from '../../../controls/share/share'
import useBreadcrumbs from '../../../hook/useBreadcrumbs'

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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        imageHeader: {
            position: 'relative',
            display: 'inline-block',
        },
        imageHeader_noImage: {
            position: 'relative',
            justifyContent: 'center',
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
            // margin: '70px 0px 150px 0px',
            // marginBottom: '150px',
        },
        txt_title_header: {
            color: theme.palette.primary.main,
            overflowWrap: 'anywhere',
            [theme.breakpoints.down('xs')]: {
                fontSize: 28,
            },
        },
        icon_style: {
            marginRight: '15px',
            height: '23px',
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
            lineHeight: 1.6,
            [theme.breakpoints.down('xs')]: {
                fontSize: 14,
            },
        },
        txt_detail: {
            fontFamily: 'Sarabun',
            // color: theme.colors.textBlack,
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
        div_tag: {
            background: ColorWeb.secondary.color2,
            margin: '15px 20px 5px 0px',
            height: '30px',
            borderRadius: '20px',
            padding: '7px',
        },
        typeName: {
            color: theme.colors.textBlack,
            [theme.breakpoints.down('xs')]: {
                fontSize: 18,
            },
        },
    }),
)

const mockDataContentAccommodation = {
    bannerImage: null,
    accommodationTH: 'บ้านไร่กองขิงโฮมสเตย์',
    accommodationEN: 'บ้านไร่กองขิงโฮมสเตย์_EN',
}

type UsecontentAccommodationProps = {}
type ReturnTypeUsecontentAccommodation = ReturnType<typeof usecontentAccommodation>
function usecontentAccommodation(props: UsecontentAccommodationProps) {
    const {} = props
    return {}
}

type contentAccommodationViewProps = ReturnTypeUsecontentAccommodation & {
    dataContentAccommodation: apiAccommodation.TResAccomContent
}
let ContentAccommodationView: React.FC<contentAccommodationViewProps> = ({ dataContentAccommodation }) => {
    const classes = useStyles()
    const { t, i18n } = useTranslation()
    const lang = i18n.language.toUpperCase()

    const mapID = 'mapAccommodation'
    const pinPoint = [dataContentAccommodation.longitude, dataContentAccommodation.latitude] as [number, number]
    useMapContent({ pinPoint, mapID, pin: pin.accom })
    useBreadcrumbs({ contentName: dataContentAccommodation?.['accomName' + lang] })

    const image_banner = dataContentAccommodation?.bannerImage
        ? process.env.NEXT_PUBLIC_UPLOAD_URL + dataContentAccommodation?.bannerImage
        : no_image

    const images = useMemo(() => {
        if (dataContentAccommodation?.images?.length > 1) {
            return drop(dataContentAccommodation?.images, 0).map(
                (image: any) => process.env.NEXT_PUBLIC_UPLOAD_URL + image.imgPath,
            )
        } else {
            return dataContentAccommodation.images.map(
                (image: any) => process.env.NEXT_PUBLIC_UPLOAD_URL + image.imgPath,
            )
        }
    }, [dataContentAccommodation?.images])

    const getValueByLang = React.useCallback(
        (key: string) => {
            // @ts-ignore
            return dataContentAccommodation[`${key}${lang}`]
        },
        [dataContentAccommodation, lang],
    )

    const accomName = lang === 'TH' ? dataContentAccommodation?.accomNameTH : dataContentAccommodation?.accomNameEN
    const address_detail = formatAddress(
        {
            hno: dataContentAccommodation.hno,
            moo: dataContentAccommodation.moo,
            villageName: getValueByLang('villageName'),
            soiName: getValueByLang('soiName'),
            roadName: getValueByLang('roadName'),
            tamName: getValueByLang('tamName'),
            ampName: getValueByLang('ampName'),
            provName: getValueByLang('provName'),
            postCode: dataContentAccommodation.postCode,
            provCode: dataContentAccommodation.provCode,
        },
        lang as 'TH' | 'EN',
    )
    // console.log('dataContentAccommodation', dataContentAccommodation)

    return (
        <Grid container className={classes.root} justify='center' alignItems='center'>
            <Meta
                data={{
                    title: dataContentAccommodation?.['accomName' + lang],
                    description: lang === 'TH' ? dataContentAccommodation?.descTH : dataContentAccommodation?.descEN,
                    image: image_banner,
                    isContent: true,
                }}
            />
            <Share
                data={{
                    lat: dataContentAccommodation.latitude,
                    long: dataContentAccommodation.longitude,
                    name: accomName,
                }}
            />
            <Grid item xs={12}>
                <Grid
                    container
                    className={
                        dataContentAccommodation?.bannerImage ? classes.imageHeader : classes.imageHeader_noImage
                    }
                >
                    <img
                        loading='lazy'
                        src={image_banner}
                        alt={accomName}
                        className={
                            dataContentAccommodation?.bannerImage ? classes.responsive : classes.responsive_noImage
                        }
                    />

                    <Grid item xs={10} className={classes.headerField} style={{ width: '100%' }}>
                        <Typography
                            variant='h1'
                            className={classes.txt_header}
                            color={dataContentAccommodation?.bannerImage ? 'inherit' : 'primary'}
                        >
                            {accomName}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Grid container className={classes.containerContent} justify='center' alignItems='center'>
                    <Grid item sm={9} xs={10} style={{ marginTop: 60, marginBottom: '40px' }}>
                        <Typography variant='h1' className={classes.txt_title_header}>
                            {lang === 'TH'
                                ? dataContentAccommodation?.accomNameTH
                                : dataContentAccommodation?.accomNameEN}
                        </Typography>
                    </Grid>

                    <Grid item sm={9} xs={10} style={{ marginBottom: '40px' }}>
                        <Grid container item xs={12} style={{ marginBottom: 20 }}>
                            <img
                                loading='lazy'
                                src={ic_detail_accom}
                                alt='ic_detail_accom'
                                className={classes.icon_style}
                            />
                            <Typography variant='h3' className={classes.typeName}>
                                {lang === 'TH'
                                    ? dataContentAccommodation?.typeNameTH
                                    : dataContentAccommodation?.typeNameEN}
                            </Typography>
                        </Grid>
                    </Grid>

                    {
                        <Grid container justify='center' alignItems='center'>
                            <Grid item sm={9} xs={12}>
                                <Typography variant='h3' className={classes.txt_title}>
                                    {t('ACCOMMODATION.CONTENT.ACCOMMODATION_DETAIL')}
                                </Typography>
                            </Grid>

                            <Grid item sm={9} xs={12}>
                                <Typography variant='h4' className={classes.txt_detail} style={{ lineHeight: '30px' }}>
                                    {(lang === 'TH'
                                        ? dataContentAccommodation?.descTH
                                        : dataContentAccommodation?.descEN) || '-'}
                                </Typography>
                            </Grid>
                        </Grid>
                    }

                    <Grid container item sm={9} xs={10} style={{ marginBottom: '50px' }}>
                        {dataContentAccommodation?.groupSize && (
                            <>
                                <Grid item lg={2} sm={4} xs={10}>
                                    <Typography variant='h4' className={classes.txt_subTitle}>
                                        {t('ACCOMMODATION.CONTENT.GROUP_SIZE')}
                                    </Typography>
                                </Grid>

                                <Grid item lg={10} sm={8} xs={10}>
                                    <Typography variant='h4' className={classes.txt_detail}>
                                        {formatNumberWithComma(dataContentAccommodation?.groupSize)}{' '}
                                        {t('ACCOMMODATION.CONTENT.PERSON')}
                                        {/* {lang === 'TH'
                                            ? t('ACCOMMODATION.CONTENT.PERSON')
                                            : t('ACCOMMODATION.CONTENT.PERSON')} */}
                                    </Typography>
                                </Grid>
                            </>
                        )}

                        {(dataContentAccommodation?.serviceFee || dataContentAccommodation?.serviceFee === 0) && (
                            <>
                                <Grid item lg={2} sm={4} xs={10}>
                                    <Typography variant='h4' className={classes.txt_subTitle}>
                                        {t('ACCOMMODATION.CONTENT.FEE')}
                                    </Typography>
                                </Grid>

                                <Grid item lg={10} sm={8} xs={10}>
                                    <Typography variant='h4' className={classes.txt_detail}>
                                        {formatNumberWithComma(dataContentAccommodation?.serviceFee)}{' '}
                                        {t('ACCOMMODATION.CONTENT.BATH_PER_PERSON')}
                                        {/* {lang === 'TH'
                                            ? t('ACCOMMODATION.CONTENT.BATH_PER_PERSON')
                                            : t('ACCOMMODATION.CONTENT.BATH_PER_PERSON')} */}
                                    </Typography>
                                </Grid>
                            </>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        {images.length > 0 &&
                            (images.length === 1 ? (
                                <Grid item xs={12} container justify='center' alignItems='center'>
                                    <img
                                        loading='lazy'
                                        src={images[0]}
                                        alt={accomName}
                                        style={{ maxHeight: 400, width: 'auto', objectFit: 'cover' }}
                                    />
                                </Grid>
                            ) : (
                                <Grid item xs={12} container justify='center' alignItems='center'>
                                    <ImageSlider imageData={images} />
                                </Grid>
                            ))}
                    </Grid>
                    {/* {images?.length > 0 && (
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
                        )} */}
                    <Grid container item sm={9} xs={10} style={{ marginBottom: '50px' }}>
                        {dataContentAccommodation?.facilities?.length > 0 ? (
                            <Grid container item sm={9} xs={10} alignItems='center' style={{ marginTop: 50 }}>
                                <Grid item xs={12}>
                                    <Typography variant='h3' className={classes.txt_title}>
                                        {t('ATTRACTION.CONTENT.FACILITIES')}
                                    </Typography>
                                </Grid>
                                {dataContentAccommodation?.facilities.map((item, index) => {
                                    if (index + 1 < Math.ceil(dataContentAccommodation?.facilities?.length / 2)) {
                                        return (
                                            <Grid item sm={6} xs={10} key={index}>
                                                <Grid container item xs={12} style={{ margin: '5px 0' }}>
                                                    <img
                                                        loading='lazy'
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
                                    }
                                })}
                            </Grid>
                        ) : null}

                        <Grid container item xs={12} alignItems='center' style={{ marginTop: 50 }}>
                            <Grid item xs={12}>
                                <Typography variant='h3' className={classes.txt_title}>
                                    {t('ACCOMMODATION.CONTENT.CONTACTS')}
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant='h4' className={classes.txt_detail}>
                                    {(lang === 'TH'
                                        ? dataContentAccommodation?.contactNameTH
                                        : dataContentAccommodation?.contactNameEN) || '-'}
                                </Typography>
                            </Grid>

                            <Grid container alignItems='center' item xs={12}>
                                <Grid item lg={3} md={4} sm={5} xs={12}>
                                    <Typography variant='h4' className={classes.txt_subTitle}>
                                        {t('ACCOMMODATION.CONTENT.TEL')}
                                    </Typography>
                                </Grid>

                                <Grid item lg={9} md={8} sm={7} xs={12}>
                                    {dataContentAccommodation?.accomTel ? (
                                        <a
                                            href={`tel:${dataContentAccommodation?.contactTel}`}
                                            style={{ color: '#80BD01', textDecorationColor: '#80BD01' }}
                                        >
                                            <Typography variant='h4' className={classes.txt_detail}>
                                                {dataContentAccommodation?.contactTel}
                                            </Typography>
                                        </a>
                                    ) : (
                                        <Typography variant='h4' className={classes.txt_detail}>
                                            {'-'}
                                        </Typography>
                                    )}
                                </Grid>
                                <Grid item lg={3} md={4} sm={5} xs={12}>
                                    <Typography variant='h4' className={classes.txt_subTitle}>
                                        {t('ACCOMMODATION.CONTENT.TRAINING_COURSE')}
                                    </Typography>
                                </Grid>

                                <Grid item lg={9} md={8} sm={7} xs={12}>
                                    <Typography variant='h4' className={classes.txt_detail}>
                                        {dataContentAccommodation?.courses?.length > 0
                                            ? dataContentAccommodation?.courses.map((item, index) => {
                                                  // console.log('item', item)
                                                  return (
                                                      <React.Fragment key={index}>
                                                          {lang === 'TH' ? item.courseNameTH : item.courseNameEN}
                                                      </React.Fragment>
                                                  )
                                              })
                                            : '-'}
                                    </Typography>
                                </Grid>
                                <Grid item lg={3} md={4} sm={5} xs={12}>
                                    <Typography variant='h4' className={classes.txt_subTitle}>
                                        {t('ACCOMMODATION.CONTENT.WEBSITE')}
                                    </Typography>
                                </Grid>

                                <Grid item lg={9} md={8} sm={7} xs={12}>
                                    <Typography variant='h4' className={classes.txt_detail}>
                                        {dataContentAccommodation?.accomWebsite || '-'}
                                    </Typography>
                                </Grid>
                                <Grid item lg={3} md={4} sm={5} xs={12}>
                                    <Typography variant='h4' className={classes.txt_subTitle}>
                                        {t('ACCOMMODATION.CONTENT.TAT_REGISTER')}
                                    </Typography>
                                </Grid>

                                <Grid item lg={9} md={8} sm={7} xs={12}>
                                    <Typography variant='h4' className={classes.txt_detail}>
                                        {dataContentAccommodation?.tatRegisterID || '-'}
                                    </Typography>
                                </Grid>
                                <Grid item lg={3} md={4} sm={5} xs={12}>
                                    <Typography variant='h4' className={classes.txt_subTitle}>
                                        {t('ACCOMMODATION.CONTENT.ADDRESS')}
                                    </Typography>
                                </Grid>

                                <Grid item lg={9} md={8} sm={7} xs={12}>
                                    <Typography variant='h4' className={classes.txt_detail}>
                                        {address_detail}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* <Grid
                            item
                            xs={10}
                            style={{ backgroundColor: 'whitesmoke', height: '200px', margin: '60px 0px' }}
                        >
                            map
                        </Grid> */}

                        <Grid item xs={12} style={{ marginTop: 50 }}>
                            <MapContent mapID={mapID} />
                        </Grid>

                        {dataContentAccommodation?.tags?.length > 0 && (
                            <Grid container item sm={9} xs={10} alignItems='center'>
                                <Grid item xs={12}>
                                    <Typography variant='h3' className={classes.txt_title}>
                                        {t('ACCOMMODATION.CONTENT.TAG')}
                                    </Typography>
                                </Grid>
                                {dataContentAccommodation?.tags.map((item, index) => {
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
    )
}

type contentAccommodationProps = UsecontentAccommodationProps &
    Omit<contentAccommodationViewProps, keyof ReturnTypeUsecontentAccommodation> & {
        dataContentAccommodation: apiAccommodation.TResAccomContent
    }

let ContentAccommodation: React.FC<contentAccommodationProps> = ({ ...others }) => {
    const contentAccommodation = usecontentAccommodation({})
    return <ContentAccommodationView {...contentAccommodation} {...others} />
}

export default ContentAccommodation
