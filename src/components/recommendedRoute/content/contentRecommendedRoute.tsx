import React from 'react'
import { TContentRecom } from './ContentRecomStructure'
import useContentRecommendedRoute from './useContentRecommendedRoute'
import TabPanel, { InitialTabObj } from '../../../controls/tabs/addableTabs'
import { useTranslation } from 'react-i18next'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Typography, Grid } from '@material-ui/core'
import ColorWeb from '../../../constants/colorWeb'
import ContentRecommendedRouteTab from './contentRecommendedRouteTab'
import Meta from '../../../controls/meta/meta'
import Share from '../../../controls/share/share'
import useBreadcrumbs from '../../../hook/useBreadcrumbs'

const no_image = process.env.NEXT_PUBLIC_WEB_URL + '/images/defaultBannerImg/Route_banner.png'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.colors.white,
            background: '#FFFFFF',
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
        headerField: {
            position: 'absolute',
            top: '55%',
            left: '50%',
            transform: 'translate( -50%, -50% )',
            textAlign: 'center',
            color: theme.colors.white,
            [theme.breakpoints.down('sm')]: {
                top: '60%',
            },
        },
        txt_headerField: {
            fontFamily: 'Prompt-Regular',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            overflowWrap: 'anywhere',
            lineHeight: 1.4,
            [theme.breakpoints.down('xs')]: {
                fontSize: 22,
            },
        },
        content: {
            marginTop: 75,
            // paddingTop: 160,
            paddingBottom: 160,
        },
    }),
)

type ContentRecommendedRouteViewProps = {} & ReturnType<typeof useContentRecommendedRoute>

const ContentRecommendedRouteView: React.FC<ContentRecommendedRouteViewProps> = ({ dataContent, ...props }) => {
    const classes = useStyles()
    const { t, i18n } = useTranslation()
    const { routeByDay = [] } = dataContent
    useBreadcrumbs({ contentName: i18n.language === 'th' ? dataContent.tripNameTH : dataContent.tripNameEN })

    const image_banner = dataContent.image ? process.env.NEXT_PUBLIC_UPLOAD_URL + dataContent.image : no_image

    return (
        <>
            <Meta
                data={{
                    title: i18n.language === 'th' ? dataContent.tripNameTH : dataContent.tripNameEN,
                    description:
                        i18n.language === 'th'
                            ? (dataContent.tripInfoTH as string)
                            : (dataContent.tripInfoEN as string),
                    image: image_banner,
                    isContent: true,
                }}
            />
            <Grid container className={classes.root} justify='center' alignItems='center'>
                <Share isShareLocation={false} />
                <Grid item xs={12}>
                    <Grid container className={dataContent.image ? classes.imageHeader : classes.imageHeader_noImage}>
                        <img
                            loading='lazy'
                            src={image_banner}
                            alt={dataContent.tripNameTH}
                            className={dataContent.image ? classes.responsive : classes.responsive_noImage}
                        />
                        <Grid item xs={10} className={classes.headerField} style={{ width: '100%' }}>
                            <Typography
                                variant='h1'
                                className={classes.txt_headerField}
                                color={dataContent?.image ? 'inherit' : 'primary'}
                            >
                                {i18n.language === 'th' ? dataContent.tripNameTH : dataContent.tripNameEN}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={8} className={classes.content}>
                    <TabPanel
                        initialTab={
                            routeByDay.map((item, index) => {
                                return {
                                    title: t('TRIP.UNIT_DAY_TEXT').replace('[{day}]', String(index + 1)),
                                    activeKey: index,
                                    content: <ContentRecommendedRouteTab {...item} />,
                                }
                            }) as InitialTabObj[]
                        }
                    />
                </Grid>
            </Grid>
        </>
    )
}

type ContentRecommendedRouteProps = {
    dataContent: TContentRecom
}

const ContentRecommendedRoute: React.FC<ContentRecommendedRouteProps> = (props) => {
    const state = useContentRecommendedRoute(props)
    return <ContentRecommendedRouteView {...state} />
}

export default ContentRecommendedRoute
