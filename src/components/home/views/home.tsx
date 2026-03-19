import React from 'react'
import { observer } from 'mobx-react-lite'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import ReviewTravel from './reviewTravel'
import Community from './community'
import Activity from './activity'
import RecomendedRoute from './recomendedRoute'
import SearchField from './searchField'

import useHome from '../hooks/useHome'
import { Highlight } from '../../../stores/homeStore'
import { useTranslation } from 'react-i18next'
import Meta from '../../../controls/meta/meta'
import useSearch from '../hooks/useSearch'

import Backdrop from '@material-ui/core/Backdrop'
import SearchFieldFakeView from './searchFieldFakeView'
import Fade from '@material-ui/core/Fade'

const Banner = process.env.NEXT_PUBLIC_WEB_URL + '/images/home/banner@2x.JPG'
const Logo = process.env.NEXT_PUBLIC_WEB_URL + '/images/home/logo.png'

type UsehomeProps = {}
type ReturnTypeUsehome = ReturnType<typeof useHome>

type homeViewProps = ReturnTypeUsehome & {
    highlight?: Highlight
}

export type ReturnTypeUseSearchField = ReturnType<typeof useSearch>

let HomeView: React.FC<homeViewProps> = observer(({ highlight }) => {
    const classes = useStyles()
    const { t } = useTranslation()
    const search = useSearch()

    return (
        <>
            <Meta
                data={{
                    title: t('HOME.HOME.TITLE'),
                    description: t('HOME.DESCRIPTION'),
                    image: Logo,
                }}
            />

            <Grid container className={classes.container}>
                <Grid item xs={12} className={classes.bannerGrid}>
                    <Grid container className={classes.pickgradient} alignItems='center' justify='center'>
                        <img loading='lazy' src={Banner} alt='Banner' className={classes.banner} />
                        <Grid item xs={12}>
                            <div className={search.focused ? classes.searchFocused : classes.search}>
                                {!search.focused && (
                                    <SearchFieldFakeView
                                        placeholder={t('HOME.SEARCH_PLACE_HOLDER')}
                                        setFocused={search.setFocused}
                                    />
                                )}
                            </div>
                        </Grid>
                    </Grid>
                </Grid>

                <Backdrop className={classes.backdrop} open={search.focused} style={{ position: 'absolute' }}>
                    <div className={search.focused ? classes.searchFocused : classes.search}>
                        <SearchField {...search} />
                    </div>
                </Backdrop>

                <Fade in={search.focused}>
                    <div
                        style={{
                            position: 'fixed',
                            backgroundColor: 'rgba(9, 9, 9, 0.8)',
                            width: '100%',
                            height: '100%',
                            zIndex: 10,
                        }}
                    />
                </Fade>

                <ReviewTravel reviewTravelList={highlight.reviewTravel} />

                <Community communityList={highlight.community} />

                <Activity activityList={highlight.attraction} />

                <RecomendedRoute routeList={highlight.routeRecommended} />
            </Grid>
        </>
    )
})

type homeProps = UsehomeProps & Omit<homeViewProps, keyof ReturnTypeUsehome>
let Home: React.FC<homeProps> = ({ ...others }) => {
    const home = useHome({})
    return <HomeView {...home} {...others} />
}

export default observer(Home)

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            background: '#F6F6F6',
        },
        lockScroll: {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
        },
        bannerGrid: {},
        pickgradient: {
            position: 'relative',
            width: '100%',
        },
        banner: {
            backgroundSize: 'cover',
            height: '100vh',
            width: '100%',
            objectFit: 'cover',
        },
        search: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            padding: 0,
            height: 40,
            [theme.breakpoints.up('sm')]: {
                padding: 20,
                width: 600,
                height: 50,
            },
            [theme.breakpoints.up('md')]: {
                padding: 20,
                width: 750,
                height: 55,
            },
            [theme.breakpoints.up('lg')]: {
                padding: 20,
                width: 850,
                height: 55,
            },
        },
        searchFocused: {
            position: 'absolute',
            top: '25%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            padding: 0,
            height: 40,
            [theme.breakpoints.up('sm')]: {
                top: '50%',
                padding: 20,
                width: 600,
                height: 50,
            },
            [theme.breakpoints.up('md')]: {
                top: '50%',
                padding: 20,
                width: 750,
                height: 55,
            },
            [theme.breakpoints.up('lg')]: {
                top: '50%',
                padding: 20,
                width: 850,
                height: 55,
            },
        },
        backdrop: {
            zIndex: 11,
            color: '#fff',
            padding: 20,
        },
    }),
)
