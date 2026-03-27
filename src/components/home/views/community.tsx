import React from 'react'
import { observer } from 'mobx-react-lite'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import Hidden from '@material-ui/core/Hidden'
import Card from '../../../controls/card/mediaCard'
import MyTabs from '../../../controls/tabs/homeTabs'
import { useTranslation } from 'react-i18next'
import { Community as CommunityType } from '../../../stores/homeStore'
import SeeAll from '../../../controls/btnSeeAll'
import useCommunity from '../hooks/useCommunity'
import { useRouter } from 'next/router'

type UseCommunityTravelByCommunityProps = { communityList: CommunityType[] }
type ReturnTypeUseProps = ReturnType<typeof useCommunity>
type CommunityTravelByCommunityViewProps = {} & ReturnTypeUseProps

let CommunityTravelByCommunityView: React.FC<CommunityTravelByCommunityViewProps> = observer(
    ({ communityBySeasonList, monthTitles, defaultTab }) => {
        const classes = useStyles()
        const router = useRouter()
        const { t, i18n } = useTranslation()
        const lang = i18n.language.toUpperCase()

        const handleCardClick = (id: number) => {
            const link = `/community/content/${id}`
            router.push(link)
        }

        const uploadUrl = process.env.NEXT_PUBLIC_UPLOAD_URL
        const publicUrl = process.env.NEXT_PUBLIC_WEB_URL

        const cardItem = () => {
            let arrElem: JSX.Element[] = []

            communityBySeasonList?.map((elm, i) => {
                const elem = (
                    <Grid className={classes.card} item xs={12} container key={i}>
                        {elm?.map((item, j) => {
                            const primaryText = item[`communName` + lang]
                            const secondaryText = t('HOME.PROVINCE_TRAVEL') + item[`provName` + lang]
                            const title = primaryText + ' ' + secondaryText
                            const imgPath = item.communImage
                                ? uploadUrl + item.communImage
                                : publicUrl + '/images/defaultImg/Community.png'
                            return (
                                <Grid item xs={6} sm={3} key={j} className={classes.mediaCard}>
                                    <Card
                                        values={item.communID}
                                        imagePath={imgPath}
                                        title={title}
                                        primaryText={primaryText}
                                        secondaryText={secondaryText}
                                        cardStyle={{ maxWidth: 'unset', borderBottom: 'none' }}
                                        textPosition='bottom'
                                        onClickCard={handleCardClick}
                                        textPrimaryStyle={{ margin: '0px 20px 10px 20px' }}
                                    />
                                </Grid>
                            )
                        })}
                    </Grid>
                )

                arrElem.push(elem)
            })
            return arrElem
        }

        return (
            <>
                <Grid item xs={12} container>
                    <Grid item xs={12} className={classes.communityal} container>
                        <Grid item xs={12} sm={8} data-aos='zoom-in-right'>
                            <Typography variant='h1' className={classes.title}>
                                {t('HOME.COMMUNITY.TITLE')}
                            </Typography>
                        </Grid>

                        <Hidden xsDown>
                            <Grid item sm={4} container alignItems='center' justify='flex-end' data-aos='fade-up'>
                                <Grid item>
                                    <SeeAll
                                        label={t('HOME.SEE_ALL')}
                                        btnClassName={classes.btnSeeAll}
                                        labelClassName={classes.seeAll}
                                        iconClassName={classes.seeAllIcon}
                                        href={process.env.NEXT_PUBLIC_LINK + '/community'}
                                    />
                                </Grid>
                            </Grid>
                        </Hidden>
                    </Grid>
                    <div style={{ width: '100%' }} data-aos='zoom-out-up'>
                        <MyTabs elems={cardItem()} tabTitles={monthTitles} defaultTab={defaultTab} />
                    </div>

                    <Grid
                        data-aos='fade-up'
                        item
                        xs={12}
                        container
                        alignItems='center'
                        justify='flex-end'
                        className={classes.containerSeeAll}
                    >
                        <Hidden smUp>
                            <Grid item className={classes.gridSeeAll}>
                                <SeeAll
                                    label={t('HOME.SEE_ALL')}
                                    btnClassName={classes.btnSeeAll}
                                    labelClassName={classes.seeAll}
                                    iconClassName={classes.seeAllIcon}
                                    href={process.env.NEXT_PUBLIC_LINK + '/community'}
                                />
                            </Grid>
                        </Hidden>
                    </Grid>
                </Grid>
            </>
        )
    },
)

type CommunityTravelByCommunityProps = UseCommunityTravelByCommunityProps &
    Omit<CommunityTravelByCommunityViewProps, keyof ReturnTypeUseProps>
let CommunityTravelByCommunity: React.FC<CommunityTravelByCommunityProps> = ({ ...others }) => {
    const community = useCommunity({ communityList: others.communityList })
    return <CommunityTravelByCommunityView {...others} {...community} />
}

export default observer(CommunityTravelByCommunity)

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        communityal: {
            paddingLeft: 20,
            paddingRight: 40,
            color: '#166936',
            marginBottom: 20,
            [theme.breakpoints.up('sm')]: {
                paddingLeft: 60,
                paddingRight: 40,
            },
            [theme.breakpoints.up('md')]: {
                paddingLeft: 90,
                paddingRight: 70,
            },
            [theme.breakpoints.up('lg')]: {
                paddingLeft: 100,
                paddingRight: 80,
            },
        },
        title: {
            fontSize: 22,
            marginBottom: 10,
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
        card: {
            background: 'black',
        },
        seeAll: {
            [theme.breakpoints.down('xs')]: {
                color: 'white',
                fontSize: 14,
            },
        },
        seeAllIcon: {
            fontSize: '14px !important',
            marginLeft: 5,
            [theme.breakpoints.down('xs')]: {
                color: 'white',
                fontSize: 14,
            },
        },
        btnSeeAll: {
            color: theme.palette.primary.main,
            borderRadius: 0,
            height: 40,
            width: 122,
        },
        mediaCard: {
            height: 170,

            [theme.breakpoints.up('sm')]: {
                height: 200,
            },
            [theme.breakpoints.up('md')]: {
                height: 300,
            },
            [theme.breakpoints.up('lg')]: {
                height: 350,
            },
            [theme.breakpoints.between(500, 600)]: {
                height: 200,
            },
        },
        containerSeeAll: {
            position: 'relative',
            color: 'white',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            padding: '0px !important',
            marginRight: 12,
            marginTop: -40,
            bottom: 0,
            [theme.breakpoints.down('xs')]: {
                marginBottom: -40,
                fontSize: 14,
            },
        },
        gridSeeAll: {
            position: 'absolute',
            bottom: 0,
        },
    }),
)
