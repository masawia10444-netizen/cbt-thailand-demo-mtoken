import React from 'react'
import { observer } from 'mobx-react-lite'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import { Grid, Typography } from '@material-ui/core'
import Card from '../../../controls/card/mediaCard'
import { useTranslation } from 'react-i18next'
import { Attraction } from '../../../stores/homeStore'
import SeeAll from '../../../controls/btnSeeAll'
import useActivities from '../hooks/useActivities'

type ReturnTypeUseActivities = ReturnType<typeof useActivities>
type activitiesViewProps = {
    activityList: Attraction[]
}
let ActivitiesView: React.FC<activitiesViewProps & ReturnTypeUseActivities> = observer(
    ({ activityList, handleClickCard }) => {
        const classes = useStyles()
        const { t, i18n } = useTranslation()
        const lang = i18n.language.toUpperCase()
        const mediaStyle = {
            height: '100%',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-epeat',
        }

        const uploadUrl = process.env.NEXT_PUBLIC_UPLOAD_URL
        const defaultImage = process.env.NEXT_PUBLIC_WEB_URL + '/images/defaultImg/Activity.png'

        const imgCard1 = activityList[0].attracImage ? uploadUrl + activityList[0].attracImage : defaultImage
        const imgCard2 = activityList[1].attracImage ? uploadUrl + activityList[1].attracImage : defaultImage
        const imgCard3 = activityList[2].attracImage ? uploadUrl + activityList[2].attracImage : defaultImage
        const imgCard4 = activityList[3].attracImage ? uploadUrl + activityList[3].attracImage : defaultImage
        const imgCard5 = activityList[4].attracImage ? uploadUrl + activityList[4].attracImage : defaultImage

        return (
            <>
                <Grid item xs={12} container className={classes.activity}>
                    <Grid item xs={12} container className={classes.gridTitle}>
                        <Grid item xs={12} sm={6} data-aos='zoom-in-right' data-aos-offset='400'>
                            <Typography variant='h1' className={classes.title}>
                                {t('HOME.ATTRACTION.TITLE')}
                            </Typography>
                        </Grid>

                        <Grid item xs={6} container alignItems='center' justify='flex-end' data-aos='fade-up'>
                            <Hidden xsDown>
                                <Grid item>
                                    <SeeAll
                                        label={t('HOME.SEE_ALL')}
                                        btnClassName={classes.btnSeeAll}
                                        labelClassName={classes.seeAll}
                                        iconClassName={classes.seeAllIcon}
                                        href={process.env.NEXT_PUBLIC_LINK + '/attraction'}
                                    />
                                </Grid>
                            </Hidden>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4} data-aos='flip-left' data-aos-delay={0}>
                            <Card
                                imagePath={imgCard1}
                                title={activityList[0][`attracName` + lang]}
                                primaryText={activityList[0][`attracTypeName` + lang]}
                                cardClassName={classes.activity1}
                                mediaStyle={mediaStyle}
                                onClickCard={handleClickCard}
                                values={activityList[0].attracTypeID}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <div data-aos='flip-left' data-aos-delay={100}>
                                <Card
                                    imagePath={imgCard2}
                                    title={activityList[1][`attracName` + lang]}
                                    primaryText={activityList[1][`attracTypeName` + lang]}
                                    cardClassName={classes.activity2}
                                    mediaStyle={mediaStyle}
                                    onClickCard={handleClickCard}
                                    values={activityList[1].attracTypeID}
                                />
                            </div>
                            <div data-aos='flip-left' data-aos-delay={200}>
                                <Card
                                    imagePath={imgCard3}
                                    title={activityList[2][`attracName` + lang]}
                                    primaryText={activityList[2][`attracTypeName` + lang]}
                                    cardClassName={classes.activity3}
                                    mediaStyle={mediaStyle}
                                    onClickCard={handleClickCard}
                                    values={activityList[2].attracTypeID}
                                />
                            </div>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <div data-aos='flip-left' data-aos-delay={300}>
                                {' '}
                                <Card
                                    imagePath={imgCard4}
                                    title={activityList[3][`attracName` + lang]}
                                    primaryText={activityList[3][`attracTypeName` + lang]}
                                    cardClassName={classes.activity4}
                                    mediaStyle={mediaStyle}
                                    onClickCard={handleClickCard}
                                    values={activityList[3].attracTypeID}
                                />
                            </div>
                            <div data-aos='flip-left' data-aos-delay={400} data-aos-offset={200}>
                                {' '}
                                <Card
                                    imagePath={imgCard5}
                                    title={activityList[4][`attracName` + lang]}
                                    primaryText={activityList[4][`attracTypeName` + lang]}
                                    cardClassName={classes.activity5}
                                    mediaStyle={mediaStyle}
                                    onClickCard={handleClickCard}
                                    values={activityList[4].attracTypeID}
                                />
                            </div>
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        container
                        alignItems='center'
                        justify='flex-end'
                        className={classes.gridSeeAll}
                        data-aos='fade-up'
                    >
                        <Hidden smUp>
                            <Grid item>
                                <SeeAll
                                    label={t('HOME.SEE_ALL')}
                                    btnClassName={classes.btnSeeAll}
                                    labelClassName={classes.seeAll}
                                    iconClassName={classes.seeAllIcon}
                                    href={process.env.NEXT_PUBLIC_LINK + '/attraction'}
                                />
                            </Grid>
                        </Hidden>
                    </Grid>
                </Grid>
            </>
        )
    },
)

type activitiesProps = {} & activitiesViewProps
let Activities: React.FC<activitiesProps> = ({ ...others }) => {
    const activities = useActivities()
    return <ActivitiesView {...activities} {...others} />
}

export default observer(Activities)

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        activity: {
            padding: 20,
            paddingTop: 90,
            paddingBottom: 105,
            color: 'white',

            background: 'transparent linear-gradient(0deg, #093018 0%, #000000 100%) 0% 0% no-repeat padding-box',
            [theme.breakpoints.up('sm')]: {
                paddingLeft: 60,
                paddingRight: 60,
            },
            [theme.breakpoints.up('md')]: {
                paddingLeft: 90,
                paddingRight: 90,
            },
            [theme.breakpoints.up('lg')]: {
                paddingLeft: 100,
                paddingRight: 100,
            },
        },
        gridTitle: {
            marginBottom: 50,
            [theme.breakpoints.up('sm')]: {
                marginBottom: 50,
            },
            [theme.breakpoints.up('md')]: {
                marginBottom: 100,
            },
        },
        card: {},
        media: {
            height: '100%',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-epeat',
        },
        activity1: {
            maxWidth: 'unset',
            borderBottom: 'none',
            height: 356,
            [theme.breakpoints.up('md')]: {
                height: 456,
            },
        },
        activity2: {
            maxWidth: 'unset',
            borderBottom: 'none',
            height: 171,
            [theme.breakpoints.up('md')]: {
                height: 272,
            },
        },
        activity3: {
            maxWidth: 'unset',
            borderBottom: 'none',
            height: 171,
            marginTop: 14,
            [theme.breakpoints.up('md')]: {
                height: 171,
            },
        },
        activity4: {
            maxWidth: 'unset',
            borderBottom: 'none',
            height: 173,
            [theme.breakpoints.up('md')]: {
                height: 173,
            },
        },
        activity5: {
            maxWidth: 'unset',
            borderBottom: 'none',
            height: 171,
            marginTop: 14,
            [theme.breakpoints.up('md')]: {
                height: 270,
            },
        },
        seeAll: {},
        seeAllIcon: {
            fontSize: '14px !important',
            marginLeft: 5,
        },
        btnSeeAll: {
            color: '#FFFFFF',
            borderRadius: 0,
            height: 40,
            width: 122,

            [theme.breakpoints.down('xs')]: {
                color: '#FFFFFF',
                fontSize: 14,
                background: 'rgba(0, 0, 0, 0.39)',
                borderRadius: 0,
                height: 46,
                width: 122,
            },

            // [theme.breakpoints.down('xs')]: {
            //     paddingBottom: 6,
            //     height: 46,
            //     marginTop: -12
            // }
        },
        gridSeeAll: {
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            padding: '0px !important',
            marginTop: -40,
            [theme.breakpoints.down('xs')]: {
                marginTop: 0,
            },
        },
        title: {
            fontSize: 22,
            [theme.breakpoints.up('sm')]: {
                fontSize: 24,
            },
            [theme.breakpoints.up('md')]: {
                fontSize: 30,
            },
            [theme.breakpoints.up('lg')]: {
                fontSize: 36,
            },
        },
    }),
)
