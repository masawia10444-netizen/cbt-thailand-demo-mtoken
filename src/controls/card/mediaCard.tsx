import React, { useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import clsx from 'clsx'
import Grow from '@material-ui/core/Grow'

type UsecardProps = {}
type CardViewProps = {
    imagePath?: string
    title?: string
    primaryText?: string
    secondaryText?: string
    cardStyle?: KeyValueType<any>
    cardClassName?: string
    mediaStyle?: KeyValueType<any>
    textPrimaryStyle?: KeyValueType<any>
    navigateNextIcon?: boolean
    textPosition?: 'top-left' | 'top' | 'top-right' | 'right' | 'bottom-right' | 'bottom' | 'bottom-left' | 'left'
    onClickCard?: (values?: any) => void
    values?: any
}
let MediaCardView: React.FC<CardViewProps> = ({
    imagePath,
    title,
    primaryText,
    secondaryText,
    cardStyle,
    cardClassName,
    navigateNextIcon = false,
    textPosition = 'bottom-left',
    mediaStyle,
    textPrimaryStyle,
    onClickCard,
    values,
}) => {
    const classes = useStyles()

    const genClassTextPosition = () => {
        switch (textPosition) {
            case 'top-left':
                return classes.mediaDescTopLeft
            case 'top':
                return classes.mediaDescTop
            case 'top-right':
                return classes.mediaDescTopRight
            case 'right':
                return classes.mediaDescRight
            case 'bottom-right':
                return classes.mediaDescBottomRight
            case 'bottom':
                return classes.mediaDescBottom
            case 'bottom-left':
                return classes.mediaDescBottomLeft
            case 'left':
                return classes.mediaDescLeft

            default:
                break
        }
    }

    const clickCard = () => {
        onClickCard && onClickCard(values)
    }

    return (
        <Card className={clsx(classes.root, cardClassName)} onClick={clickCard} style={cardStyle}>
            <CardActionArea className={classes.cardActionArea}>
                <div className={classes.backdrop}></div>
                <CardMedia className={classes.media} style={mediaStyle} image={imagePath} title={title} />

                <div className={genClassTextPosition()}>
                    <Typography
                        variant='h3'
                        style={textPrimaryStyle}
                        className={textPosition === 'bottom-left' ? classes.primalyText1 : classes.primalyText2}
                    >
                        {primaryText}
                    </Typography>
                    <Typography
                        variant='h5'
                        className={textPosition === 'bottom-left' ? classes.secondaryText1 : classes.secondaryText2}
                    >
                        {secondaryText}
                    </Typography>
                </div>

                {navigateNextIcon && <NavigateNextIcon className={classes.iconNext} fontSize='small' />}
            </CardActionArea>
        </Card>
    )
}

type cardProps = UsecardProps & CardViewProps
let MediaCard: React.FC<cardProps> = ({ ...others }) => {
    return <MediaCardView {...others} />
}

export default MediaCard

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: '100%',
            maxWidth: 400,
            boxShadow: 'none',
            borderRadius: 0,
            borderBottom: '4px solid #80BD01',
            position: 'relative',
            transition: 'all .25s linear',
            '&:hover': {
                boxShadow: '0px 10px 20px #00000060',
            },
            // [theme.breakpoints.up('sm')]: {
            //     height: 280,
            // },
            // [theme.breakpoints.up('md')]: {
            //     height: 300,
            // },
            // [theme.breakpoints.up('lg')]: {
            //     height: 345,
            // }
        },
        cardActionArea: {
            height: '100%',
        },
        media: {
            height: '100%',
        },
        mediaDescBottomLeft: {
            position: 'absolute',
            bottom: 25,
            left: 32,
        },
        mediaDescTopLeft: {
            position: 'absolute',
            top: 32,
            left: 32,
        },
        mediaDescTop: {
            position: 'absolute',
            top: 32,
            width: '100%',
            textAlign: 'center',
        },
        mediaDescTopRight: {
            position: 'absolute',
            top: 32,
            right: 32,
        },
        mediaDescRight: {
            position: 'absolute',
            right: 32,
            top: '50%',
            transform: 'translateY(-50%)',
            textAlign: 'end',
        },
        mediaDescBottomRight: {
            position: 'absolute',
            bottom: 25,
            right: 32,
        },
        mediaDescBottom: {
            position: 'absolute',
            bottom: 25,
            width: '100%',
            textAlign: 'center',
            [theme.breakpoints.down('xs')]: {
                bottom: 15,
            },
        },
        mediaDescLeft: {
            position: 'absolute',
            left: 32,
            top: '50%',
            transform: 'translateY(-50%)',
            textAlign: 'left',
        },
        backdrop: {
            backgroundImage: 'linear-gradient(to bottom, transparent,transparent,transparent, black)',
            width: '100%',
            height: '100%',
            position: 'absolute',
        },
        iconNext: {
            position: 'absolute',
            color: '#80BD01',
            right: 13,
            bottom: 40,
        },
        primalyText1: {
            color: theme.palette.secondary.main,
            marginBottom: 5,
            [theme.breakpoints.down('md')]: {
                fontSize: 16,
            },
        },
        secondaryText1: {
            color: '#FFFFFF',
            [theme.breakpoints.down('md')]: {
                fontSize: 14,
            },
        },
        primalyText2: {
            color: theme.palette.secondary.main,
            marginBottom: 5,
            [theme.breakpoints.down('md')]: {
                fontSize: 16,
            },
            [theme.breakpoints.down('sm')]: {
                fontSize: 14,
            },
        },
        secondaryText2: {
            color: '#FFFFFF',
            [theme.breakpoints.down('md')]: {
                fontSize: 12,
            },
            [theme.breakpoints.down('sm')]: {
                fontSize: 10,
            },
        },
    }),
)
