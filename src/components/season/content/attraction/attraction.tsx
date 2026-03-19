import React from 'react'
import { observer } from 'mobx-react-lite'
import Store from '../../../../stores/rootStore'
import { Router, useRouter } from 'next/router'
import * as apiSeason from '../../apiSeason'
//Material UI
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import CircleIcon from '@material-ui/icons/Brightness1'

import { useTranslation } from 'react-i18next'
import ColorWeb from '../../../../constants/colorWeb'

//componenet
import Card from '../../../../controls/card/cardAttraction'
import Tabs from '../../../../controls/tabs/mapTabs'
import Meta from '../../../../controls/meta/meta'

//hooks
// import UseMap from './map/usemap'\
import UsePinPoint from './map/usePinPoint'
import AttractionViewLocated from './attractionViewLocated'
import useMap from '../../../../hook/map/useMap'
import useBreadcrumbs from '../../../../hook/useBreadcrumbs'

const publicPath = process.env.NEXT_PUBLIC_WEB_URL
const map_img = publicPath + '/images/community/260.png'
const no_image = publicPath + '/images/defaultImg/Community@2x.png'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            // height: '100%',
            backgroundColor: theme.colors.white,
            paddingTop: '0%',
            [theme.breakpoints.up('sm')]: {
                paddingTop: 60,
            },
            [theme.breakpoints.up('md')]: {
                paddingTop: 70,
            },
        },
        txt_title: {
            color: theme.palette.primary.main,
            margin: '40px 0px 40px 120px',
            [theme.breakpoints.down('md')]: {
                margin: '40px 0px 40px 60px',
                ...theme.typography.h2,
            },
            [theme.breakpoints.down('xs')]: {
                margin: '40px 0px 40px 30px',
                ...theme.typography.h3,
            },
        },
        circleLegend: {
            width: 50,
            height: 50,
            borderRadius: 40,

        },
        containerLegend1: {
            alignItems: 'center',
            width: '120px',
            [theme.breakpoints.down('xs')]: {
                width: '100%',
            },
        },
        containerLegend2: {
            alignItems: 'center',
            width: '190px',
            [theme.breakpoints.down('xs')]: {
                width: '100%',
            },
        },
    }),
)

type UseattractionInCommunityProps = {}
type ReturnTypeUseattractionInCommunity = ReturnType<typeof UseAttraction>
function UseAttraction(props: UseattractionInCommunityProps) {
    const { } = props
    return {}
}

type attractionInCommunityViewProps = ReturnTypeUseattractionInCommunity & {
    dataAttractionCommunity: apiSeason.TResCommuAttraction[]
}
let AttractionInCommunityView: React.FC<attractionInCommunityViewProps> = observer(({ dataAttractionCommunity }) => {
    const classes = useStyles()
    // const { view } = UseMap('divCommuAttracMap')
    const { view } = useMap('divCommuAttracMap', { zoom: true })

    const { setLatLong, getArryData } = UsePinPoint(view, [100.5383167740645, 13.764955275785015])
    const { t, i18n } = useTranslation()
    const lang = i18n.language.toUpperCase()
    const router = useRouter()
    // const { SeasonStore } = Store()
    // console.log('dataAttractionCommunity:::::::', dataAttractionCommunity)

    React.useEffect(() => {
        if (dataAttractionCommunity) {
            dataAttractionCommunity.map((item) => {
                setLatLong([item.longitude, item.latitude])
                getArryData(dataAttractionCommunity)
            })
        }
    }, [dataAttractionCommunity])

    const imageInfographic =
        dataAttractionCommunity[0]?.image && dataAttractionCommunity[0]?.image !== null
            ? process.env.NEXT_PUBLIC_UPLOAD_URL + dataAttractionCommunity[0]?.image
            : no_image

    useBreadcrumbs({
        contentName:
            lang === 'TH' ? dataAttractionCommunity[0]?.communNameTH : dataAttractionCommunity[0]?.communNameEN,
    })

    const renderTabMap = () => {
        return (
            <Tabs>
                <div style={{ marginTop: '25px' }}>
                    <div id='divCommuAttracMap' style={{ height: '448px' }}></div>
                </div>
                <div
                    style={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '25px',
                        height: 'calc(100% - 25px)',
                    }}
                >
                    <img loading='lazy' src={imageInfographic} alt='AttractionMap' style={{ height: '448px', width: 'auto' }} />
                </div>
            </Tabs>
        )
    }

    return (
        <Grid container className={classes.root}>
            <Meta
                data={{
                    title: t('SEASON.ATTRACTION.TITLE'),
                    description: t('SEASON.ATTRACTION.TITLE'),
                    //image: process.env.NEXT_PUBLIC_UPLOAD_URL + dataContentSeason?.images[0].communImagePath,
                }}
            />
            <Grid item xs={12}>
                <Grid container item sm={10} xs={11} justify='flex-start' alignItems='center'>
                    <Typography variant='h1' className={classes.txt_title}>
                        {t('SEASON.ATTRACTION.TITLE')}
                        {lang === 'TH'
                            ? dataAttractionCommunity[0]?.communNameTH
                            : ' ' + dataAttractionCommunity[0]?.communNameEN}
                    </Typography>
                </Grid>

                <Grid container justify='center' alignItems='center'>
                    <Grid item sm={10} xs={11}>
                        <AttractionViewLocated dataAttractionCommunity={dataAttractionCommunity} />
                    </Grid>
                </Grid>

                <Grid container justify='center' alignItems='center' style={{ margin: '80px 0px 100px 0px' }}>
                    <Grid item sm={10} xs={11}>
                        {renderTabMap()}
                    </Grid>

                    {/* map legend */}
                    <Grid container item sm={10} xs={11} justify='flex-end' alignItems='center' style={{ marginTop: '25px' }}>
                        <Grid container className={classes.containerLegend1}>
                            <Grid item>
                                <CircleIcon style={{ color: '#465FCD', marginRight: ' 10px', fontSize: '27px' }} />
                            </Grid>
                            <Grid item>
                                <Typography variant='h5'>{t('SEASON.CONTENT.ATTRACTION_LEGEND')}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container className={classes.containerLegend2}>
                            <Grid item>
                                <CircleIcon style={{ color: '#F5D01A', marginRight: ' 10px', fontSize: '27px' }} />
                            </Grid>
                            <Grid item>
                                <Typography variant='h5'>{t('SEASON.CONTENT.RELATTRACTION_LEGEND')}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
})

type attractionInCommunityProps = UseattractionInCommunityProps &
    Omit<attractionInCommunityViewProps, keyof ReturnTypeUseattractionInCommunity> & {
        dataAttractionCommunity: apiSeason.TResCommuAttraction[]
    }
let AttractionInCommunity: React.FC<attractionInCommunityProps> = ({ ...others }) => {
    const attractionInCommunity = UseAttraction({})

    return <AttractionInCommunityView {...attractionInCommunity} {...others} />
}

export default observer(AttractionInCommunity)
