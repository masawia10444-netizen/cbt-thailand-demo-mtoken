import { makeStyles, Theme, createStyles, Grid, Avatar, Typography } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { TContentRoute } from './ContentRecomStructure'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { useRouter } from 'next/router'
import IconButton from '@material-ui/core/IconButton'

const pinImagePurple = process.env.NEXT_PUBLIC_WEB_URL + '/images/pin/pin_purple_activity.png'
const pinImageYellow = process.env.NEXT_PUBLIC_WEB_URL + '/images/pin/pin_LinkTravel.png'
const activityNoImage = process.env.NEXT_PUBLIC_WEB_URL + '/images/trip/Activity@2x.png'

export const useStyles = makeStyles((theme: Theme) =>
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
        itemList: {
            border: '1px solid #D4E8DC',
            marginBottom: 25,
            cursor: 'pointer',
            // '&:hover': {
            //     boxShadow: '0px 3px 3px #D4E8DC',
            // },
        },
        containerImage: {
            width: '350px',
            [theme.breakpoints.down('sm')]: {
                width: '100%',
            },
        },
        containerContent: {
            width: 'calc(100% - 415px)',
            paddingTop: 15,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            [theme.breakpoints.down('sm')]: {
                width: 'calc(100% - 50px)',
                paddingLeft: 20,
            },
        },
        containerCheckbox: {
            width: '50px',
            height: 110,
        },
    }),
)

const ContentRecommendedRouteItem = ({ ...item }: TContentRoute) => {
    const { t, i18n } = useTranslation()
    const classes = useStyles()
    const router = useRouter()

    const handleClickCard = () => {
        let type = item.isRelAttraction ? 'relattraction' : 'attraction'
        let link = process.env.NEXT_PUBLIC_LINK + '/' + type + '/content/' + item.attracID
        if (process.browser) {
            window.open(link)
        } else {
            router.push(link)
        }
    }

    return (
        <Grid
            container
            alignItems='center'
            justify='space-between'
            className={classes.itemList}
            onClick={() => {
                handleClickCard()
                // if (item.isRelAttraction) {
                //     /** แหล่งท่องเที่ยวเชื่อมโยง */
                //     router.push('/relattraction/content/' + item.attracID)
                // } else {
                //     router.push('/attraction/content/' + item.attracID)
                // }
            }}
            data-aos='fade-up'
            data-aos-duration={600}
        >
            <Grid item className={classes.containerImage}>
                <Avatar
                    alt={item.attracNameEN}
                    src={item.image ? (process.env.NEXT_PUBLIC_UPLOAD_URL as string) + item.image : activityNoImage}
                    variant='square'
                    className={classes.square}
                />
            </Grid>
            <Grid item className={classes.containerContent}>
                <Grid container direction='column' justify={'space-between'}>
                    <Grid item xs={12}>
                        <Typography
                            variant='h5'
                            component='div'
                            style={{
                                fontFamily: 'Prompt-Bold',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                lineHeight: 1.5,
                            }}
                        >
                            {i18n.language === 'th' ? item.attracNameTH : item.attracNameEN}
                        </Typography>{' '}
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h5' component='div' className={classes.content}>
                            {i18n.language === 'th' ? item.attracDescTH : item.attracDescEN}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container direction='row' justify='space-between' alignItems='center' spacing={2}>
                            <Grid item>
                                <Typography
                                    variant='body1'
                                    style={{
                                        color: '#009687',
                                        fontFamily: 'Sarabun',
                                        letterSpacing: 0,
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {t('TRIP.ACTIVITY_DURATION_TEXT') + ' : '}
                                    {(item.attracTime || '-') + ' ' + t('TRIP.UNIT_MINUTE_TEXT')}
                                </Typography>
                            </Grid>
                            {/* <Grid item>
                                <Typography
                                    variant='body1'
                                    style={{
                                        color: '#009687',
                                        fontFamily: 'Sarabun',
                                        letterSpacing: 0,
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        marginRight: 20,
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {t('TRIP.ESTIMATE_COST_TEXT') + ' : '}
                                    {(item.attracFee || '-') + ' ' + t('TRIP.UNIT_BATH_TEXT')}
                                </Typography>
                            </Grid> */}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item className={classes.containerCheckbox} container alignItems='center'>
                <Grid item xs style={{ height: 30, width: 30 }}>
                    <ArrowForwardIosIcon />
                </Grid>
            </Grid>
            {/* <Grid item xs={2} md={1} lg={1}>
                <ArrowForwardIosIcon />
            </Grid> */}
        </Grid>
    )
}

export default ContentRecommendedRouteItem
