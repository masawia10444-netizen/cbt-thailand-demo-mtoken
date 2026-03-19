import React from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'

const no_image = process.env.NEXT_PUBLIC_WEB_URL + '/images/defaultImg/Route@2x.png'

type RouteCardViewProps = {
    data: {
        ID: number
        titleTH: string
        titleEN: string
        image: string
        provNameTH: string
        provNameEN: string
        day: number
        updateDate: string
    }
    onClickCard?: (id: number) => void
}
let RouteCardView: React.FC<RouteCardViewProps> = ({ ...props }) => {
    const classes = useStyles()
    const { t, i18n } = useTranslation()
    const lang = i18n.language.toUpperCase()
    const clickCard = (id: number) => {
        props.onClickCard && props.onClickCard(id)
    }
    return (
        <div
            onClick={() => clickCard(props.data.ID)}
            style={{
                cursor: 'pointer',
            }}
        >
            <Card className={classes.root}>
                <CardMedia
                    className={classes.img_cover}
                    image={props.data.image !== null ? process.env.NEXT_PUBLIC_UPLOAD_URL + props.data.image : no_image}
                    title={props.data.titleTH}
                />
                <div className={classes.card_detail}>
                    <CardContent className={classes.card_content}>
                        <Typography variant='h3' className={classes.txt_title}>
                            {lang === 'TH' ? props.data.titleTH : props.data.titleEN}
                        </Typography>
                        <Typography variant='h5' className={classes.txt_day}>
                            {(props.data.day &&
                                props.data.day + (lang === 'TH' ? ' วัน' : props.data.day === 1 ? ' Day' : ' Days')) ||
                                '-'}
                        </Typography>
                    </CardContent>

                    <div className={classes.txt_province}>
                        <Typography variant='body1'>
                            {(lang === 'TH' && props.data[`provName` + lang] !== 'กรุงเทพมหานคร'
                                ? t('SEASON.PROVINCE')
                                : '') + props.data[`provName` + lang]}
                        </Typography>
                    </div>
                </div>
            </Card>
        </div>
    )
}

type RouteCardProps = {} & RouteCardViewProps
let RouteCard: React.FC<RouteCardProps> = ({ ...others }) => {
    return <RouteCardView {...RouteCard} {...others} />
}

export default RouteCard

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            width: '100%',
            height: 140,
            boxShadow: '0px 0px 20px #00000024',
            borderRadius: 0,
            [theme.breakpoints.up('md')]: {
                height: 155,
            },
            [theme.breakpoints.between(0, 375)]: {
                height: 120,
            },
            transition: 'all .25s linear',
            '&:hover': {
                boxShadow: '0px 10px 20px #00000060',
            },
        },

        card_detail: {
            display: 'flex',
            flexDirection: 'column',
            width: 200,
            position: 'relative',
            [theme.breakpoints.up('md')]: {
                width: 300,
            },
            [theme.breakpoints.up('lg')]: {
                width: 320,
            },
        },
        card_content: {
            paddingTop: 20,
            [theme.breakpoints.between(0, 375)]: {
                padding: 10,
            },
        },
        img_cover: {
            width: 140,
            [theme.breakpoints.between(0, 375)]: {
                width: 100,
            },
            [theme.breakpoints.up('md')]: {
                width: 155,
            },
            [theme.breakpoints.up('lg')]: {
                width: 180,
            },
            [theme.breakpoints.up('lg')]: {
                width: 200,
            },
        },
        txt_province: {
            paddingLeft: 25,
            color: '#B8B6B6',
            bottom: 10,
            position: 'absolute',
            [theme.breakpoints.up('sm')]: {
                bottom: 15,
            },
        },
        txt_title: {
            paddingLeft: 10,
            color: theme.colors.darkGreen,
            textOverflow: 'ellipsis',
            lineHeight: 1.4,
            height: 59,
            wordWrap: 'break-word',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            overflowWrap: 'anywhere',
            [theme.breakpoints.down('md')]: {
                lineHeight: 1.4,
            },
            [theme.breakpoints.down('sm')]: {
                fontSize: 18,
                lineHeight: 1.6,
                height: 57,
            },
        },
        txt_day: {
            color: '#090909',
            fontWeight: 'bold',
            width: '100%',
            paddingLeft: 10,
            paddingTop: 10,
        },
    }),
)
