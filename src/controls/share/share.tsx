import { FC, useState, useEffect } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import CloseIcon from '@material-ui/icons/Close'
import { useTranslation } from 'react-i18next'

const publicPath = process.env.NEXT_PUBLIC_WEB_URL

let facebookIconPath = publicPath + '/images/icon/svg/btn_facebook.svg'
let lineIconPath = publicPath + '/images/icon/svg/btn_line.svg'
let mapIconPath = publicPath + '/images/icon/svg/btn_navigate.svg'
let googleMapIcon = publicPath + '/images/icon/svg/btn_googlemap.svg'
let nostraMapIcon = publicPath + '/images/icon/svg/btn_nostramap.svg'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        share: {
            position: 'fixed',
            top: '35%',
            right: 0,
            zIndex: 10,
            width: 48,
            height: 0,
        },
        shareIcon: {
            background: 'rgba(9, 9, 9, 0.3)',
            padding: '10px 0px',
        },
        location: {
            background: 'rgba(9, 9, 9, 0.3)',
            marginTop: 5,
        },
        button: {
            borderRadius: 0,
        },
        paper: {
            width: 290,
            height: 194,
            marginLeft: -300,
            marginTop: -48,
            background: '#F9F9F9',
            boxShadow: '0px 0px 6px #0000002E',
            borderRadius: 8,
            padding: '15px 15px',
        },
        iconButton: {
            padding: 0,
            marginBottom: 13,
        },
    }),
)

type props = {
    data?: {
        type?: string
        name?: string
        lat?: number
        long?: number
    }
    isShareLocation?: boolean
}

const shareControl: FC<props> = ({ data, isShareLocation = true } = {}) => {
    const classes = useStyles()
    const [ready, setReady] = useState(false)
    const [open, setOpen] = useState(false)
    const { t } = useTranslation()

    let hrefFacecbook = `https://www.facebook.com/dialog/feed?app_id=3896560693691930&link=${
        typeof window !== 'undefined' ? window.location.href : ''
    }`

    let hrefLine = `https://social-plugins.line.me/lineit/share?url=${
        typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''
    }`

    let hrefGoogleMap = `https://maps.google.com/?q=${data?.lat},${data?.long}`
    let hrefNostraMap = `https://map.nostramap.com/NostraMap/?place/@${data?.lat},${data?.long},13,${data?.name}/th`

    const navigateTo = (href: string) => {
        if (process.browser) {
            window.open(href)
        }
    }

    useEffect(() => {
        if (publicPath === undefined || !process.browser) {
            setReady(false)
        } else {
            setReady(true)
        }
    }, [])

    if (!ready) return <div></div>

    return (
        <div className={classes.share}>
            <div className={classes.shareIcon}>
                <IconButton aria-label='facebook' className={classes.button} onClick={() => navigateTo(hrefFacecbook)}>
                    <img loading='lazy' src={facebookIconPath} alt='facebookIconPath' />
                </IconButton>
                <br />
                <IconButton aria-label='line' className={classes.button} onClick={() => navigateTo(hrefLine)}>
                    <img loading='lazy' src={lineIconPath} alt='facebookIconPath' style={{ width: 28 }} />
                </IconButton>
            </div>
            {isShareLocation && (
                <div className={classes.location}>
                    <IconButton
                        aria-label='map'
                        className={classes.button}
                        onClick={() => {
                            setOpen(!open)
                        }}
                    >
                        <img loading='lazy' src={mapIconPath} alt='facebookIconPath' />
                    </IconButton>
                </div>
            )}
            <Grow in={open}>
                <Paper className={classes.paper}>
                    <Grid container justify='space-between' alignItems='center'>
                        <Typography variant='h5'>{t('SHARE.OPEN_WITH')}</Typography>

                        <IconButton
                            aria-label='map'
                            size='small'
                            style={{ marginTop: -5 }}
                            onClick={() => {
                                setOpen(false)
                            }}
                        >
                            <CloseIcon style={{ color: '#009687' }} fontSize='small' />
                        </IconButton>
                    </Grid>

                    <Divider style={{ margin: '15px 0' }} />

                    <Button className={classes.iconButton} fullWidth onClick={() => navigateTo(hrefGoogleMap)}>
                        <Grid container justify='flex-start' alignItems='center'>
                            <img loading='lazy' src={googleMapIcon} alt='Google Map' style={{ marginRight: 30 }} />
                            <Typography variant='h5'>{t('SHARE.GOOGLE_MAP')}</Typography>
                        </Grid>
                    </Button>

                    <Button className={classes.iconButton} fullWidth onClick={() => navigateTo(hrefNostraMap)}>
                        <Grid container justify='flex-start' alignItems='center'>
                            <img loading='lazy' src={nostraMapIcon} alt='NOSTRA Map' style={{ marginRight: 30 }} />
                            <Typography variant='h5'>{t('SHARE.NOSTRA_MAP')}</Typography>
                        </Grid>
                    </Button>
                </Paper>
            </Grow>
        </div>
    )
}

export default shareControl
