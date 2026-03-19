import React from 'react'
import * as apiSeason from '../../components/season/apiSeason'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Grid } from '@material-ui/core'
import ArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import TimeIcon from '@material-ui/icons/AccessTime'
import ColorWeb from '../../constants/colorWeb'
import { useTranslation } from 'react-i18next'
import { pin as pinImg } from '../../constants/map'
import Grow from '@material-ui/core/Grow'
const no_image = process.env.NEXT_PUBLIC_WEB_URL + '/images/defaultImg/Route@2x.png'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        containerRoot: {
            width: '100%',
        },
        numberSection: {
            marginTop: '30px',
        },
        circleNumber: {
            width: 50,
            height: 50,
            borderRadius: 40,
        },
        pinImgContainer: {
            position: 'relative',
            textAlign: 'center',
        },
        txtNumber: {
            color: theme.colors.white,
            // textAlign: 'center',
            // paddingTop: 12,
            fontFamily: 'Prompt-Regular',
            fontSize: 22,
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        },
        dot: {
            width: 12,
            height: 12,
            borderRadius: 12,
            backgroundColor: '#B8B6B6',
            marginTop: 20,
        },
        dashed: {
            height: 60,
            border: '1px dashed #B8B6B6',
            marginTop: 10,
        },
        cardRoot: {
            display: 'flex',
            width: '100%',
            height: 190,
            boxShadow: '0px 10px 20px #00000005;',
            border: '1px solid #D4E8DC',
            borderRadius: 0,
            margin: '20px 0px',
            cursor: 'pointer',
            transition: 'all .25s linear',
            '&:hover': {
                boxShadow: '0px 10px 20px #00000060',
            },
        },
        details: {
            position: 'relative',
            width: '100%',
        },
        content: {
            [theme.breakpoints.down('xs')]: {
                padding: '0px !important',
            },
        },
        cover: {
            width: 272,
            height: 'auto',
        },
        title: {
            lineHeight: 1.6,
            color: theme.colors.textBlack,
            paddingLeft: 20,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            [theme.breakpoints.down('xs')]: {
                ...theme.typography.h5,
                fontWeight: 'bold',
                paddingLeft: 0,
            },
            minHeight: 35,
        },
        desc: {
            color: theme.colors.textBlack,
            fontFamily: 'Sarabun',
            width: '100%',
            paddingLeft: 20,
            paddingTop: 5,
            lineHeight: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            [theme.breakpoints.down('xs')]: {
                paddingLeft: 0,
                paddingTop: 5,
                ...theme.typography.body1,
                fontFamily: 'Sarabun',
            },
        },
        timePeriod: {
            color: ColorWeb.secondary.color1,
            fontFamily: 'Sarabun',
            paddingLeft: 20,
            paddingTop: 15,
            [theme.breakpoints.down('xs')]: {
                paddingLeft: 0,
                marginTop: 20,
                ...theme.typography.body1,
                fontFamily: 'Sarabun',
            },
        },
        icon: {
            paddingRight: 20,
            [theme.breakpoints.down('sm')]: {
                paddingRight: 0,
            },
            [theme.breakpoints.down('xs')]: {
                display: 'none',
            },
        },
    }),
)

type CardAttractionViewProps = {
    dataItem: apiSeason.TResCommuAttraction
    onClickCard?: (id: number, isRelAttraction: boolean) => void
    isMobileView?: boolean
    indexNumber: number // ลำดับ pin
    isLast: boolean //เช็ค dataItem ตัวสุดท้าย
}
let CardAttractionView: React.FC<CardAttractionViewProps> = ({ ...props }) => {
    //ใช้ใน community attraction
    // console.log('props', props)
    const { t, i18n } = useTranslation()
    const lang = i18n.language.toUpperCase()

    const classes = useStyles()

    const handleClickCard = (id: number | string, isRelAttraction: boolean) => {
        // @ts-ignore
        props.onClickCard && props.onClickCard(id, isRelAttraction)
    }

    return (
        <Grid container className={classes.containerRoot}>
            <Grid
                item
                sm={1}
                xs={2}
                className={classes.numberSection}
                container
                direction='column'
                justify='center'
                alignItems='center'
            >
                <div className={classes.pinImgContainer}>
                    <img loading='lazy' alt='pin' src={props.dataItem?.isRelAttraction ? pinImg.relAttrac : pinImg.attrac} />
                    <div className={classes.txtNumber}>{props.indexNumber + 1}</div>
                </div>

                <div className={classes.dot} style={{ backgroundColor: props.isLast && 'transparent' }}></div>
                <div className={classes.dashed} style={{ border: props.isLast && '1px dashed transparent' }}></div>
                <div
                    className={classes.dot}
                    style={{ marginTop: 10, backgroundColor: props.isLast && 'transparent' }}
                ></div>
            </Grid>

            <Grid item sm={11} xs={10}>
                <Card
                    className={classes.cardRoot}
                    onClick={() => handleClickCard(props.dataItem?.ID, props.dataItem?.isRelAttraction)}
                >
                    <CardMedia
                        className={classes.cover}
                        image={
                            props.dataItem?.image !== null
                                ? process.env.NEXT_PUBLIC_UPLOAD_URL + props.dataItem?.image
                                : no_image
                        }
                    // title={props.dataItem.detail}
                    />
                    <Grid container justify='center' alignItems='center' className={classes.details}>
                        <Grid item xs={11}>
                            <CardContent className={classes.content}>
                                {(props.dataItem?.titleTH !== null || props.dataItem?.titleEN !== null) && (
                                    <Typography variant='h3' className={classes.title}>
                                        {lang === 'TH' ? props.dataItem?.titleTH : props.dataItem?.titleEN}
                                    </Typography>
                                )}
                                {(props.dataItem?.descTH !== null || props.dataItem?.descEN !== null) && (
                                    <Typography variant='h4' className={classes.desc}>
                                        {lang === 'TH' ? props.dataItem?.descTH : props.dataItem?.descEN}
                                        {/* {props.dataItem?.descTH} */}
                                    </Typography>
                                )}

                                <Grid container>
                                    {props.dataItem?.time !== null && (
                                        <Grid item xs={12} container alignItems='flex-start'>
                                            {' '}
                                            {/* lg={6}  */}
                                            {props.isMobileView ? (
                                                <>
                                                    <Typography
                                                        variant='h5'
                                                        className={classes.timePeriod}
                                                        style={{ display: 'inline-flex' }}
                                                    >
                                                        <TimeIcon fontSize='small' style={{ display: 'inline-flex' }} />
                                                        {props.dataItem?.time}
                                                        {t('CONTROLS.CARD_ATTRACTION.MINUTE')}
                                                    </Typography>
                                                </>
                                            ) : (
                                                    <>
                                                        <Typography variant='h5' className={classes.timePeriod}>
                                                            {t('CONTROLS.CARD_ATTRACTION.TIME_PERIOD')}:{' '}
                                                            {props.dataItem?.time} {t('CONTROLS.CARD_ATTRACTION.MINUTE')}
                                                        </Typography>
                                                    </>
                                                )}
                                        </Grid>
                                    )}

                                    {/* <Grid item lg={6} xs={12} style={{ backgroundColor: 'yellow' }}>
                                    {'ค่าใช้จ่ายโดยประมาณ :'}
                                </Grid> */}
                                </Grid>
                            </CardContent>
                        </Grid>
                        <Grid item xs={1} container justify='flex-end' alignItems='center' className={classes.icon}>
                            <ArrowRightIcon fontSize='large' />
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    )
}

type CardAttractionProps = {} & CardAttractionViewProps
let CardAttraction: React.FC<CardAttractionProps> = ({ ...others }) => {
    const theme = useTheme()
    const isMobileView = useMediaQuery(theme.breakpoints.down('xs'))

    return <CardAttractionView {...CardAttraction} {...others} isMobileView={isMobileView} />
}

export default CardAttraction
