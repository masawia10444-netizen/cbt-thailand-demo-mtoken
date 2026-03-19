import React from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

type RouteCardViewProps = {
    data: {
        id: number
        day?: string
        detail?: string
        location?: string
        image?: any
    }
    onClickCard?: (id: number) => void
}
let RouteCardView: React.FC<RouteCardViewProps> = ({ ...props }) => {
    const classes = useStyles()
    return (
        <>
            <Card className={classes.root} onClick={() => props.onClickCard && props.onClickCard(props.data.id)}>
                <CardMedia className={classes.cover} image={props.data.image} title={props.data.detail} />
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography variant='h3' className={classes.title}>
                            {props.data.detail}
                        </Typography>
                        <Typography variant='h5' className={classes.desc}>
                            {props.data.day}
                        </Typography>
                    </CardContent>

                    <div className={classes.location}>
                        <Typography variant='body1'>{props.data.location}</Typography>
                    </div>
                </div>
            </Card>
        </>
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
            cursor: 'pointer',
            transition: 'all .25s linear',
            '&:hover': {
                boxShadow: '0px 10px 20px #00000060',
            },
        },
        details: {
            // display: 'flex',
            // flexDirection: 'column',
            width: '100%',
            position: 'relative',
            [theme.breakpoints.up('md')]: {
                width: 300,
            },
            [theme.breakpoints.up('lg')]: {
                width: 320,
            },
        },
        content: {
            paddingTop: 20,
            [theme.breakpoints.between(0, 375)]: {
                padding: 10,
            },
        },
        cover: {
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
        controls: {
            display: 'flex',
            alignItems: 'center',
            paddingLeft: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        playIcon: {
            height: 38,
            width: 38,
        },
        location: {
            paddingLeft: 25,
            color: '#B8B6B6',
            bottom: 10,
            position: 'absolute',
            [theme.breakpoints.up('sm')]: {
                bottom: 15,
            },
        },
        title: {
            color: '#80BD01',
            paddingLeft: 10,
            lineHeight: 1.5,
            // height: 59,
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            overflowWrap: 'anywhere',
            [theme.breakpoints.up('xs')]: {
                fontSize: 18,
            },
        },
        desc: {
            color: '#090909',
            fontWeight: 'bold',
            width: '100%',
            paddingLeft: 10,
            paddingTop: 10,
        },
    }),
)
