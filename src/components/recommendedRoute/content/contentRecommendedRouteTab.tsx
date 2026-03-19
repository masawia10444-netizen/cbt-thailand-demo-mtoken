import { Grid, Typography, makeStyles, Theme, createStyles } from '@material-ui/core'
import TimelineContent from '@material-ui/lab/TimelineContent'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator'
import React from 'react'
import { useTranslation } from 'react-i18next'
import ContentRecommendedRouteItem from './contentRecommendedRouteItem'
import { TContentRoute, TRouteByDay } from './ContentRecomStructure'
import MapTrip from '../../trip/map/mapTrip'
import { DayTripAttractionStructure } from '../../trip/form/FormDayTripStructure'
import useScreenSize from '../../../hook/useScreenSize'

const pinImagePurple = process.env.NEXT_PUBLIC_WEB_URL + '/images/pin/pin_purple_activity.png'
const pinImageYellow = process.env.NEXT_PUBLIC_WEB_URL + '/images/pin/pin_LinkTravel.png'
// const ic_switch = process.env.NEXT_PUBLIC_WEB_URL + '/images/icon/ic_switch.png'
// const ic_switch_press = process.env.NEXT_PUBLIC_WEB_URL + '/images/icon/ic_switch_press.png'
// const activityNoImage = process.env.NEXT_PUBLIC_WEB_URL + '/images/trip/Activity@2x.png'

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
    }),
)

type ContentRecommendedRouteTabProps = {} & TRouteByDay
const ContentRecommendedRouteTab: React.FC<ContentRecommendedRouteTabProps> = ({ dayOfTrip, routes = [] }) => {
    const { t, i18n } = useTranslation()
    const classes = useStyles()
    const { isMobileSize } = useScreenSize()

    return (
        <Grid container spacing={2}>
            {/* <Grid item xs={3} sm={2} md={2} xl={1} lg={1} container justify='center'> */}
            <Grid item style={{ width: '70px' }} container justify='center'>
                {routes.map((attraction: TContentRoute, index: number) => {
                    const distanceDisplay = attraction?.distance && (attraction?.distance / 1000).toFixed(1)
                    return (
                        <Grid item>
                            <div
                                key={index}
                                style={{
                                    marginTop: isMobileSize ? (index === 0 ? 50 : -150) : index === 0 ? 50 : -100,
                                }}
                                data-aos='fade-up'
                                data-aos-duration={600}
                            >
                                {index > 0 && (
                                    <Typography variant='body1' style={{ color: '#009687' }}>
                                        {distanceDisplay + ' ' + t('TRIP.UNIT_KM_TEXT')}
                                    </Typography>
                                )}
                                <TimelineSeparator>
                                    <div
                                        className={
                                            attraction.isRelAttraction ? classes.timelineDotPurple : classes.timelineDot
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
                                {routes?.length - 1 !== index && (
                                    <TimelineContent>
                                        <div
                                            style={{
                                                textAlign: 'center',
                                                width: 5,
                                                marginLeft: 10,
                                                marginRight: 10,
                                            }}
                                        >
                                            <span className={classes.dot}></span>
                                            <div
                                                style={{
                                                    // padding: 1,
                                                    // height: index === 0 ? 80 : 85,
                                                    height: isMobileSize
                                                        ? index === 0
                                                            ? 200
                                                            : 210
                                                        : index === 0
                                                        ? 80
                                                        : 85,
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
            {/* <Grid item xs={8} sm={8} md={8} xl={11} lg={11}> */}
            <Grid item style={{ width: 'calc(100% - 70px)' }}>
                {routes.map((route: TContentRoute) => {
                    return (
                        <React.Fragment key={route.attracID}>
                            <ContentRecommendedRouteItem {...route} />
                        </React.Fragment>
                    )
                })}
            </Grid>
            <Grid item xs={12} style={{ height: '448px' }}>
                <MapTrip
                    dataMap={[
                        {
                            dayOfTrip,
                            attractionSelect: routes.map((item: TContentRoute) => ({
                                ...item,
                                geometry: item.path,
                            })) as DayTripAttractionStructure[],
                        },
                    ]}
                />
            </Grid>
        </Grid>
    )
}

export default ContentRecommendedRouteTab
