import React from 'react'
import { observer } from 'mobx-react-lite'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import { Grid, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { RouteRecommended } from '../../../stores/homeStore'
import CardRoute from './cardRoute'
import SeeAll from '../../../controls/btnSeeAll'
import { useRouter } from 'next/router'

const bg = process.env.NEXT_PUBLIC_WEB_URL + '/images/home/Rectangle_1954/Rectangle_1954@2x.png'

type UseseasonalTravelReviewProps = {}
type seasonalTravelReviewViewProps = {
    routeList: RouteRecommended[]
}
let CommunityTravelReviewView: React.FC<seasonalTravelReviewViewProps> = observer(({ routeList }) => {
    const classes = useStyles()
    const { t, i18n } = useTranslation()
    const router = useRouter()
    const lang = i18n.language.toUpperCase()

    const handleCardClick = (id: number) => {
        const link = `/recommendedRoute/content/${id}`
        router.push(link)
    }

    return (
        <div style={{ position: 'relative', backgroundImage: `url(${bg})`, backgroundSize: 'cover', paddingTop: 87 }}>
            <Grid item xs={12} container className={classes.recommended}>
                <Grid item xs={12} container style={{ marginBottom: 30 }}>
                    <Grid item xs={12} sm={8} data-aos='zoom-in-right' data-aos-offset='400'>
                        <Typography variant='h1' className={classes.title}>
                            {t('HOME.RECOMMENDED_ROUTE.TITLE')}
                        </Typography>
                    </Grid>

                    <Grid item xs container alignItems='center' justify='flex-end' data-aos='fade-up'>
                        <Hidden xsDown>
                            <Grid item>
                                <SeeAll
                                    label={t('HOME.SEE_ALL')}
                                    btnClassName={classes.btnSeeAll}
                                    labelClassName={classes.seeAll}
                                    iconClassName={classes.seeAllIcon}
                                    href={process.env.NEXT_PUBLIC_LINK + '/recommendedRoute'}
                                />
                            </Grid>
                        </Hidden>
                    </Grid>
                </Grid>

                <Grid item xs={12} style={{ zIndex: 2 }}>
                    <Grid container spacing={3} justify='flex-start' alignItems='flex-start'>
                        {routeList.map((item, index) => {
                            return (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    lg={4}
                                    key={index}
                                    data-aos='zoom-in'
                                    data-aos-duration={(index + 1) * 200}
                                >
                                    <CardRoute
                                        data={{
                                            id: item.tripID,
                                            day: item[`tripDay` + lang],
                                            detail: item[`tripName` + lang],
                                            location: item[`provName` + lang],
                                            image: process.env.NEXT_PUBLIC_UPLOAD_URL + item.tripImage,
                                        }}
                                        onClickCard={handleCardClick}
                                    />
                                </Grid>
                            )
                        })}
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
                                href={process.env.NEXT_PUBLIC_LINK + '/recommendedRoute'}
                            />
                        </Grid>
                    </Hidden>
                </Grid>
            </Grid>
        </div>
    )
})

type seasonalTravelReviewProps = UseseasonalTravelReviewProps & seasonalTravelReviewViewProps
let CommunityTravelReview: React.FC<seasonalTravelReviewProps> = ({ ...others }) => {
    return <CommunityTravelReviewView {...others} />
}

export default observer(CommunityTravelReview)

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        recommended: {
            paddingLeft: 20,
            paddingRight: 20,
            marginTop: 0,
            color: '#166936',
            marginBottom: 120,
            zIndex: 2,
            [theme.breakpoints.down('xs')]: {
                marginBottom: 80,
            },
            [theme.breakpoints.up('sm')]: {
                paddingLeft: 30,
                paddingRight: 30,
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
        seeAll: {},
        seeAllIcon: {
            fontSize: '14px !important',
            marginLeft: 5,
        },
        btnSeeAll: {
            color: theme.palette.primary.main,
            borderRadius: 0,
            height: 40,
            width: 122,
        },
        gridSeeAll: {
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            padding: '0px !important',
            marginTop: 20,
            zIndex: 1,
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
