import React from 'react'
import { observer } from 'mobx-react-lite'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import { Grid, Typography } from '@material-ui/core'
import Card from '../../../controls/card/mediaCard'
import { useTranslation } from 'react-i18next'
import SeeAll from '../../../controls/btnSeeAll'
import { ReviewTravel as ReviewTravelType } from '../../../stores/homeStore'
import { useRouter } from 'next/router'

type HooksType = {} //ReturnType<typeof useCommunity>
type CommunityViewProps = HooksType & {
    reviewTravelList: ReviewTravelType[]
}

let ReviewTravelView: React.FC<CommunityViewProps> = observer(({ reviewTravelList }) => {
    const classes = useStyles()
    const { t, i18n } = useTranslation()
    const lang = i18n.language.toUpperCase()
    const router = useRouter()

    const handleCardClick = (id: number) => {
        const link = `/reviewTravel/content/${id}`
        router.push(link)
    }

    return (
        <>
            <Grid container alignItems='center' justify='center' className={classes.review}>
                <Grid item xs={12}>
                    <Typography variant='h1' className={classes.title} data-aos='fade-up' data-aos-offset='250'>
                        {t('HOME.REVIEW_TRAVEL.TITLE')}
                    </Typography>
                </Grid>

                <Grid
                    item
                    xs={12}
                    container
                    alignItems='center'
                    justify='flex-end'
                    className={classes.gridSeeAll}
                    data-aos='fade-up'
                    data-aos-offset={200}
                >
                    <Hidden xsDown>
                        <Grid item>
                            <SeeAll
                                label={t('HOME.SEE_ALL')}
                                btnClassName={classes.btnSeeAll}
                                labelClassName={classes.seeAll}
                                iconClassName={classes.seeAllIcon}
                                href={process.env.NEXT_PUBLIC_LINK + '/reviewTravel'}
                            />
                        </Grid>
                    </Hidden>
                </Grid>

                <Grid item xs={12} container spacing={3} className={classes.items}>
                    {reviewTravelList.map((item, index) => {
                        const primaryText = item[`reviewTravelName` + lang]
                        const secondaryText = t('HOME.PROVINCE_TRAVEL') + item[`provName` + lang]
                        const title = primaryText + ' ' + secondaryText

                        return (
                            <Grid
                                key={index}
                                item
                                xs={12}
                                sm={6}
                                lg={3}
                                container
                                alignItems='center'
                                justify='center'
                                style={{ height: 334 }}
                                data-aos='fade-up'
                                data-aos-offset='250'
                                data-aos-easing='ease-in'
                                data-aos-duration={(index + 1) * 200}
                            >
                                <Card
                                    imagePath={process.env.NEXT_PUBLIC_UPLOAD_URL + item.reviewTravelImage}
                                    values={item.reviewTravelID}
                                    title={title}
                                    primaryText={primaryText}
                                    secondaryText={secondaryText}
                                    navigateNextIcon
                                    onClickCard={handleCardClick}
                                />
                            </Grid>
                        )
                    })}

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
                                    href={process.env.NEXT_PUBLIC_LINK + '/reviewTravel'}
                                />
                            </Grid>
                        </Hidden>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
})

type CommunityProps = {} & Omit<CommunityViewProps, keyof HooksType>
let ReviewTravel: React.FC<CommunityProps> = ({ ...others }) => {
    return <ReviewTravelView {...others} />
}

export default observer(ReviewTravel)

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        review: {
            paddingLeft: 10,
            paddingRight: 10,
            marginTop: -100,
            color: 'white',
            marginBottom: 87,
            zIndex: 2,
            [theme.breakpoints.between(500, 600)]: {
                paddingLeft: 88,
                paddingRight: 88,
            },
            [theme.breakpoints.up('sm')]: {
                paddingLeft: 60,
                paddingRight: 60,
                marginTop: -130,
            },
            [theme.breakpoints.up('md')]: {
                paddingLeft: 90,
                paddingRight: 90,
                marginTop: -130,
            },
            [theme.breakpoints.up('lg')]: {
                paddingLeft: 100,
                paddingRight: 100,
                marginTop: -140,
            },
        },
        title: {
            maxWidth: 400,
            width: '100%',
            fontSize: 22,
            paddingLeft: 15,
            [theme.breakpoints.up('sm')]: {
                fontSize: 32,
            },
            [theme.breakpoints.up('lg')]: {
                fontSize: 36,
            },
        },
        items: {
            marginTop: -25,
            [theme.breakpoints.down('xs')]: {
                marginTop: 0,
            },
        },
        gridSeeAll: {
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            padding: '0px !important',
            marginRight: 12,
            marginTop: -40,
            [theme.breakpoints.down('xs')]: {
                marginTop: 0,
            },
        },
        seeAll: {
            color: '#F9F9F9',
        },
        seeAllIcon: {
            fontSize: '14px !important',
            marginLeft: 5,
            color: '#F9F9F9',
        },
        btnSeeAll: {
            color: theme.palette.primary.main,
            fontSize: 14,
            background: 'rgba(0, 0, 0, 0.39)',
            borderRadius: 0,
            height: 65,
            width: 122,
            paddingBottom: 20,
            [theme.breakpoints.down('xs')]: {
                paddingBottom: 6,
                height: 46,
                marginTop: -12,
            },
        },
    }),
)
