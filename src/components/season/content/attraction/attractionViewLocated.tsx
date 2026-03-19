import React from 'react'
import * as apiSeason from '../../apiSeason'

import { Grid, makeStyles, Theme, createStyles, Avatar } from '@material-ui/core'
import { Router, useRouter } from 'next/router'
import TimelineContent from '@material-ui/lab/TimelineContent'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import ArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import TimeIcon from '@material-ui/icons/AccessTime'

import { useTranslation } from 'react-i18next'

import { pin as pinImg } from '../../../../constants/map'
const no_image = process.env.NEXT_PUBLIC_WEB_URL + '/images/defaultImg/Route@2x.png'

const pinImagePurple = process.env.NEXT_PUBLIC_WEB_URL + '/images/pin/pin_purple_activity.png'
const pinImageYellow = process.env.NEXT_PUBLIC_WEB_URL + '/images/pin/pin_LinkTravel.png'

import ColorWeb from '../../../../constants/colorWeb'
import useScreenSize from '../../../../hook/useScreenSize'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            marginTop: 5,
            lineHeight: 2,
            maxHeight: 58,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            marginRight: 15,
        },
        square: {
            height: 190,
            width: '100%',
        },
        timelineDot: {
            width: 55,
            height: 55,
            backgroundColor: 'transparent',
            textAlign: 'center',
            backgroundImage: `url(${pinImagePurple})`,
            marginLeft: -17,
            marginRight: -16,
        },
        timelineDotPurple: {
            width: 55,
            height: 60,
            backgroundColor: 'transparent',
            textAlign: 'center',
            backgroundImage: `url(${pinImageYellow})`,
            marginLeft: -17,
            marginRight: -16,
        },
        dot: {
            height: '12px',
            width: '12px',
            backgroundColor: '#bbb',
            borderRadius: '50%',
            display: 'inline-block',
            marginLeft: -5,
        },
        cardRoot: {
            display: 'flex',
            width: '100%',
            height: 'auto',
            minHeight: 190,
            // height: 190,
            boxShadow: '0px 10px 20px #00000005;',
            border: '1px solid #D4E8DC',
            borderRadius: 0,
            margin: '20px 0px',
            cursor: 'pointer',
        },
        details: {
            position: 'relative',
            width: '100%',
        },
        cover: {
            width: 272,
            height: 'auto',
        },
        title: {
            lineHeight: 1.6,
            color: theme.colors.textBlack,
            // paddingLeft: 20,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            [theme.breakpoints.down('xs')]: {
                ...theme.typography.h5,
                fontWeight: 'bold',
                paddingLeft: 0,
            },
        },
        desc: {
            color: theme.colors.textBlack,
            fontFamily: 'Sarabun',
            width: '100%',
            paddingTop: 15,
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            [theme.breakpoints.down('xs')]: {
                paddingLeft: 0,
                paddingTop: 5,
                ...theme.typography.body1,
                fontFamily: 'Sarabun',
            },
        },
        timePeriod: {
            color: ColorWeb.secondary.color1,
            fontFamily: 'Sarabun',
            paddingTop: 15,
            [theme.breakpoints.down('xs')]: {
                marginTop: 20,
                ...theme.typography.body1,
                fontFamily: 'Sarabun',
            },
        },
        icon: {
            paddingRight: 20,
            [theme.breakpoints.down('sm')]: {
                paddingRight: 0,
            },
            [theme.breakpoints.down('xs')]: {
                display: 'none',
            },
        },
        containerImage: {
            width: '350px',
            [theme.breakpoints.down('sm')]: {
                width: '100%',
            },
        },
        containerContent: {
            width: 'calc(100% - 350px)',
            paddingTop: 15,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            [theme.breakpoints.down('sm')]: {
                width: '100%'
            },
        },
        containerCheckbox: {
            width: '50px',
            height: 110,
        },
    }),
)

type UseattractionViewLocatedProps = {}
type ReturnTypeUseattractionViewLocated = ReturnType<typeof useattractionViewLocated>
function useattractionViewLocated(props: UseattractionViewLocatedProps) {
    const { } = props
    return {}
}

type attractionViewLocatedViewProps = ReturnTypeUseattractionViewLocated & {
    dataAttractionCommunity: apiSeason.TResCommuAttraction[]
    isMobileView?: boolean
    onClickCard?: (id: number, isRelAttraction: boolean) => void
}
let AttractionViewLocatedView: React.FC<attractionViewLocatedViewProps> = ({
    dataAttractionCommunity,
    isMobileView,
    onClickCard,
}) => {
    const { t, i18n } = useTranslation()
    const lang = i18n.language.toUpperCase()
    const classes = useStyles()
    const router = useRouter()
    const { isMobileSize } = useScreenSize()

    // const handleClickCard = (id: number | string, isRelAttraction: boolean) => {
    //     // @ts-ignore
    //     onClickCard && onClickCard(id, isRelAttraction)
    // }

    const handleClickCard = (id: number, isRelAttraction: boolean) => {
        if (isRelAttraction) {
            router.push({
                pathname: '/relattraction/content/' + id,
            })
        } else {
            router.push({
                pathname: '/attraction/content/' + id,
            })
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={3} sm={2} md={2} xl={1} lg={1} container justify='center'>
                {dataAttractionCommunity.map((item, index) => {
                    return (
                        <Grid item style={{ width: '100%' }}>
                            <div
                                key={item.ID}
                                style={{
                                    marginTop: isMobileSize ? (index === 0 ? 50 : -160) : index === 0 ? 50 : -100,
                                    width: '100%',
                                }}
                            >
                                <TimelineSeparator>
                                    <div
                                        className={
                                            item.isRelAttraction ? classes.timelineDotPurple : classes.timelineDot
                                        }
                                    >
                                        <Typography
                                            component='div'
                                            style={{
                                                fontSize: 22,
                                                color: '#FFFFFF',
                                                marginLeft: -3,
                                                marginRight: -3,
                                                marginTop: 10,
                                            }}
                                        >
                                            {index + 1}
                                        </Typography>
                                    </div>
                                </TimelineSeparator>
                                {dataAttractionCommunity?.length - 1 !== index && (
                                    <TimelineContent>
                                        <div
                                            style={{
                                                textAlign: 'center',
                                                width: 5,
                                                position: 'relative',
                                                right: '50%',
                                                left: '48%',
                                            }}
                                        >
                                            <span className={classes.dot}></span>
                                            <div
                                                style={{
                                                    // padding: 1,
                                                    height: isMobileSize
                                                        ? index === 0
                                                            ? 306 - 50
                                                            : 306 - 50
                                                        : index === 0
                                                            ? 80
                                                            : 85,
                                                    // height: index === 0 ? 80 : 85,
                                                    marginTop: 2,
                                                    marginBottom: 5,
                                                    borderLeft: '3px dashed #B8B6B6',
                                                    textAlign: 'center',
                                                }}
                                            ></div>
                                            <span className={classes.dot}></span>
                                        </div>
                                    </TimelineContent>
                                )}
                            </div>
                        </Grid>
                    )
                })}
            </Grid>

            <Grid item xs={8} sm={8} md={8} xl={11} lg={11}>
                {dataAttractionCommunity.map((dataItem) => {
                    return (
                        <Card
                            className={classes.cardRoot}
                            onClick={() => handleClickCard(dataItem?.ID, dataItem?.isRelAttraction)}
                        >
                            <Grid container alignItems='center' spacing={2} justify='space-between'>
                                <Grid item className={classes.containerImage}>
                                    <Avatar
                                        alt={'attracNameEN'}
                                        src={
                                            dataItem?.image !== null
                                                ? process.env.NEXT_PUBLIC_UPLOAD_URL + dataItem?.image
                                                : no_image
                                        }
                                        variant='square'
                                        className={classes.square}
                                    />
                                    {/* <CardMedia
                                        // className={classes.cover}
                                        image={
                                            dataItem?.image !== null
                                                ? process.env.NEXT_PUBLIC_UPLOAD_URL + dataItem?.image
                                                : no_image
                                        }
                                    /> */}
                                </Grid>
                                <Grid item className={classes.containerContent}>
                                    <Grid container justify='center' alignItems='center' className={classes.details}>
                                        <Grid item xs={11}>
                                            <CardContent>
                                                <Typography variant='h3' className={classes.title}>
                                                    {lang === 'TH' ? dataItem?.titleTH : dataItem?.titleEN}
                                                </Typography>

                                                <Typography variant='h4' className={classes.desc}>
                                                    {lang === 'TH' ? dataItem?.descTH : dataItem?.descEN}
                                                    {/* {dataItem?.descTH} */}
                                                </Typography>

                                                <Grid container>
                                                    <Grid item xs={12} container alignItems='flex-start'>
                                                        {isMobileView ? (
                                                            <>
                                                                <Typography
                                                                    variant='h5'
                                                                    className={classes.timePeriod}
                                                                    style={{ display: 'inline-flex' }}
                                                                >
                                                                    <TimeIcon
                                                                        fontSize='small'
                                                                        style={{ display: 'inline-flex' }}
                                                                    />
                                                                    {dataItem?.attracTime || '-'}
                                                                    {t('CONTROLS.CARD_ATTRACTION.MINUTE')}
                                                                </Typography>
                                                            </>
                                                        ) : (
                                                                <>
                                                                    <Typography variant='h5' className={classes.timePeriod}>
                                                                        {t('CONTROLS.CARD_ATTRACTION.TIME_PERIOD')}:{' '}
                                                                        {dataItem?.attracTime || '-'}{' '}
                                                                        {t('CONTROLS.CARD_ATTRACTION.MINUTE')}
                                                                    </Typography>
                                                                </>
                                                            )}
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={1}
                                            container
                                            justify='flex-end'
                                            alignItems='center'
                                            className={classes.icon}
                                        >
                                            <ArrowRightIcon fontSize='large' />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Card>
                    )
                })}
            </Grid>
        </Grid>
    )
}

type attractionViewLocatedProps = UseattractionViewLocatedProps &
    Omit<attractionViewLocatedViewProps, keyof ReturnTypeUseattractionViewLocated> & {
        dataAttractionCommunity: apiSeason.TResCommuAttraction[]
    }
let AttractionViewLocated: React.FC<attractionViewLocatedProps> = ({ ...others }) => {
    const attractionViewLocated = useattractionViewLocated({})

    const theme = useTheme()
    const isMobileView = useMediaQuery(theme.breakpoints.down('xs'))

    return <AttractionViewLocatedView {...attractionViewLocated} {...others} isMobileView={isMobileView} />
}

export default AttractionViewLocated
