import React from 'react'
import drop from 'lodash/drop'
import { Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import CalendarIcon from '@material-ui/icons/DateRange'
import { useTranslation } from 'react-i18next'
import { convertToDisplayDateRange } from '../../../utilities/dateTimeUtils'

import ImageSlider from '../../../controls/imageslider/imageSlider'
//custom hook
import useMapContent from '../../../controls/mapContent/useMapContent'

//constant
import ColorWeb from '../../../constants/colorWeb'
import { formatAddress } from '../../../utilities/formatTextUtils'
import { pin } from '../../../constants/map'
import * as apiFestival from '../apiFestival'

import MapContent from '../../../controls/mapContent/MapContent'
import Meta from '../../../controls/meta/meta'
import Share from '../../../controls/share/share'
import useBreadcrumbs from '../../../hook/useBreadcrumbs'
//image
const no_image = process.env.NEXT_PUBLIC_WEB_URL + '/images/defaultBannerImg/Festival_baner.png'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: theme.colors.white,
            // paddingBottom: '150px'
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
        containerContent: {
            margin: '70px 0px 0px 0px',
        },
        txt_title_header: {
            color: theme.palette.primary.main,
            overflowWrap: 'anywhere',
            [theme.breakpoints.down('sm')]: {
                fontSize: 28,
            },
        },
        txt_date: {
            color: theme.colors.textBlack,
            [theme.breakpoints.down('sm')]: {
                fontSize: 20,
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
            margin: '8px 0px',
            [theme.breakpoints.down('xs')]: {
                fontSize: 14,
            },
        },
        txt_detail: {
            fontFamily: 'Sarabun',
            // color: theme.colors.textBlack,
            margin: '8px 0px',
            overflowWrap: 'anywhere',
            [theme.breakpoints.down('xs')]: {
                fontSize: 14,
            },
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

type UsecontentFestivalProps = { dataContentFestival: apiFestival.TResGetContentFestival }
type ReturnTypeUsecontentFestival = ReturnType<typeof usecontentFestival>
function usecontentFestival(props: UsecontentFestivalProps) {
    const { dataContentFestival } = props
    const { i18n } = useTranslation()
    const lang = i18n.language.toUpperCase()
    const mapID = 'mapFestival'
    const pinPoint = [dataContentFestival.longitude, dataContentFestival.latitude] as [number, number]
    useMapContent({ pinPoint, mapID, pin: pin.festival })

    const getValueByLang = React.useCallback(
        (key: string) => {
            // @ts-ignore
            return dataContentFestival[`${key}${lang}`]
        },
        [dataContentFestival, lang],
    )
    const dataSource = React.useMemo(
        () => ({
            imageBanner: dataContentFestival?.bannerImage
                ? `${process.env.NEXT_PUBLIC_UPLOAD_URL}${dataContentFestival.bannerImage}`
                : no_image,
            festivalName: getValueByLang('festivalName'),
            date: convertToDisplayDateRange({
                startDate: dataContentFestival.startDate,
                endDate: dataContentFestival.endDate,
                lang: lang as 'TH' | 'EN',
            }),
            desc: getValueByLang('desc'),
            // @ts-ignore
            mount: dataContentFestival?.months.map((mount) => mount[`monthName${lang}`]).join(', '),
            tel: dataContentFestival.tel,
            email: dataContentFestival.email,
            website: dataContentFestival.website,
            tags: dataContentFestival.tags,
            lat: dataContentFestival.latitude,
            long: dataContentFestival.longitude,
            address: formatAddress(
                {
                    hno: dataContentFestival.hno,
                    moo: dataContentFestival.moo,
                    villageName: getValueByLang('villageName'),
                    soiName: getValueByLang('soiName'),
                    roadName: getValueByLang('roadName'),
                    tamName: getValueByLang('tamName'),
                    ampName: getValueByLang('ampName'),
                    provName: getValueByLang('provName'),
                    postCode: dataContentFestival.postCode,
                    provCode: dataContentFestival.proveCode,
                },
                lang as 'TH' | 'EN',
            ),
        }),
        [dataContentFestival, lang],
    )

    return { dataSource, getValueByLang, mapID, dataContentFestival }
}

type contentFestivalViewProps = ReturnTypeUsecontentFestival & {
    dataContentFestival: apiFestival.TResGetContentFestival
}
let ContentFestivalView: React.FC<contentFestivalViewProps> = ({
    dataSource,
    getValueByLang,
    mapID,
    dataContentFestival,
}) => {
    const classes = useStyles()
    const { t } = useTranslation()
    useBreadcrumbs({ contentName: dataSource.festivalName })

    const images = React.useMemo(() => {
        if (dataContentFestival?.images.length > 1) {
            return drop(dataContentFestival?.images, 0).map(
                (image: any) => process.env.NEXT_PUBLIC_UPLOAD_URL + image.imgPath,
            )
        } else {
            return dataContentFestival?.images.map((image: any) => process.env.NEXT_PUBLIC_UPLOAD_URL + image.imgPath)
        }
    }, [dataContentFestival?.images])

    // console.log('dataContentFestival', dataContentFestival)
    return (
        <Grid container className={classes.root} justify='center' alignItems='center'>
            <Meta
                data={{
                    title: dataSource.festivalName,
                    description: dataSource.desc,
                    image: dataSource.imageBanner,
                    isContent: true,
                }}
            />
            <Share data={{ lat: dataSource.lat, long: dataSource.long, name: dataSource.festivalName }} />
            <Grid item xs={12}>
                <Grid
                    container
                    className={dataContentFestival?.bannerImage ? classes.imageHeader : classes.imageHeader_noImage}
                    style={{ minHeight: '70px' }}
                >
                    <img
                        loading='lazy'
                        src={dataSource.imageBanner}
                        alt={dataSource.festivalName}
                        className={dataContentFestival?.bannerImage ? classes.responsive : classes.responsive_noImage}
                    />
                </Grid>
            </Grid>

            <Grid item sm={9} xs={10}>
                <Grid container justify='flex-start' alignItems='center' className={classes.containerContent}>
                    <Grid item xs={12} style={{ marginBottom: '40px' }}>
                        <Typography variant='h1' className={classes.txt_title_header}>
                            {dataSource.festivalName}
                        </Typography>
                    </Grid>

                    {dataSource.date && (
                        <Grid item xs={12} style={{ marginBottom: '50px' }}>
                            <Typography variant='h3' className={classes.txt_date}>
                                <CalendarIcon fontSize='small' /> {' ' + dataSource.date}
                            </Typography>
                        </Grid>
                    )}

                    {getValueByLang('desc') && (
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant='h3' className={classes.txt_title}>
                                    {t('FESTIVAL.CONTENT.FESTIVAL_TRADITIONAL_DETAIL')}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} style={{ marginBottom: '20px' }}>
                                <Typography variant='h4' className={classes.txt_detail} style={{ lineHeight: '30px' }}>
                                    {dataSource.desc}
                                </Typography>
                            </Grid>
                        </Grid>
                    )}
                    {/* {dataSource.mount && (
                        <Grid container>
                            <Grid item xs={10}>
                                <Typography variant='h3' className={classes.txt_title}>
                                    {t('FESTIVAL.CONTENT.MONTH_PERIOD')}
                                </Typography>
                            </Grid>

                            <Grid item xs={10} style={{ marginBottom: '50px' }}>
                                <Typography variant='h4' className={classes.txt_detail}>
                                    {dataSource.mount}
                                </Typography>
                            </Grid>
                        </Grid>
                    )} */}
                </Grid>
            </Grid>
            <Grid item xs={12}>
                {images.length > 0 &&
                    (images.length === 1 ? (
                        <Grid
                            item
                            xs={12}
                            container
                            justify='center'
                            alignItems='center'
                            style={{ margin: '0px 0px 80px 0px' }}
                        >
                            <img
                                src={images[0]}
                                alt={dataSource.festivalName}
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
                            style={{ margin: '0px 0px 80px 0px' }}
                        >
                            {/* <img loading='lazy'src={img_01} style={{ height: 630, width: 'auto' }} /> */}
                            <ImageSlider imageData={images} />
                        </Grid>
                    ))}
            </Grid>
            <Grid item sm={9} xs={10}>
                <Grid item xs={12}>
                    <Grid container item xs={12} style={{ marginBottom: '50px' }}>
                        <Grid item xs={12}>
                            <Typography variant='h3' className={classes.txt_title}>
                                {t('FESTIVAL.CONTENT.CONTACTS')}
                            </Typography>
                        </Grid>

                        <Grid item lg={2} xs={3}>
                            <Typography variant='h4' className={classes.txt_subTitle}>
                                {t('FESTIVAL.CONTENT.TEL')}
                            </Typography>
                        </Grid>

                        <Grid item lg={10} xs={9}>
                            {dataSource?.tel ? (
                                <a
                                    href={`tel:${dataSource?.tel}`}
                                    style={{ color: '#80BD01', textDecorationColor: '#80BD01' }}
                                >
                                    <Typography variant='h4' className={classes.txt_detail}>
                                        {dataSource?.tel}
                                    </Typography>
                                </a>
                            ) : (
                                <Typography variant='h4' className={classes.txt_detail}>
                                    {'-'}
                                </Typography>
                            )}
                        </Grid>

                        <Grid item lg={2} xs={3}>
                            <Typography variant='h4' className={classes.txt_subTitle}>
                                {t('FESTIVAL.CONTENT.EMAIL')}
                            </Typography>
                        </Grid>

                        <Grid item lg={10} xs={9}>
                            <Typography variant='h4' className={classes.txt_detail}>
                                {dataSource?.email ?? '-'}
                            </Typography>
                        </Grid>

                        <Grid item lg={2} xs={3}>
                            <Typography variant='h4' className={classes.txt_subTitle}>
                                {t('FESTIVAL.CONTENT.WEBSITE')}
                            </Typography>
                        </Grid>

                        <Grid item lg={10} xs={9}>
                            <Typography variant='h4' className={classes.txt_detail}>
                                {dataSource?.website ?? '-'}
                            </Typography>
                        </Grid>

                        <Grid item lg={2} xs={3}>
                            <Typography variant='h4' className={classes.txt_subTitle}>
                                {t('FESTIVAL.CONTENT.ADDRESS')}
                            </Typography>
                        </Grid>

                        <Grid item lg={10} xs={9}>
                            <Typography variant='h4' className={classes.txt_detail}>
                                {dataSource?.address ?? '-'}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <MapContent mapID={mapID} />
                    </Grid>

                    {dataSource.tags?.length > 0 && (
                        <Grid container style={{ marginBottom: '50px' }}>
                            <Grid item xs={12}>
                                <Typography variant='h3' className={classes.txt_title}>
                                    {t('FESTIVAL.CONTENT.TAG')}
                                </Typography>
                            </Grid>

                            {dataSource.tags.map((tag, index) => {
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
    )
}

type contentFestivalProps = UsecontentFestivalProps &
    Omit<contentFestivalViewProps, keyof ReturnTypeUsecontentFestival> & {
        dataContentFestival: apiFestival.TResGetContentFestival
    }
let ContentFestival: React.FC<contentFestivalProps> = ({ ...others }) => {
    const contentFestival = usecontentFestival({ dataContentFestival: others.dataContentFestival })
    return <ContentFestivalView {...contentFestival} {...others} />
}

export default ContentFestival
