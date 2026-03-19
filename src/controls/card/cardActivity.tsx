import React, { FC, Fragment, MouseEvent } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Grow from '@material-ui/core/Grow'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        rootCard: {
            maxWidth: '100%',
            borderRadius: 0,
            boxShadow: '0px 0px 20px #00000024;',
            transition: 'all .25s linear',
            '&:hover': {
                boxShadow: '0px 10px 20px #00000060',
            },
        },
        contentCard: {
            padding: '30px',
        },
    }),
)
type Props = {
    data: {
        id: number
        title: string
        community?: string
        province?: string
        activity?: string
        image?: any
    }[]
    onClickCard?: (id: number) => void
}

const CardActivity: FC<Props> = (props) => {
    const classes = useStyles()

    const clickCard = (id: number) => {
        props.onClickCard && props.onClickCard(id)
    }

    return (
        <Fragment>
            {props.data.map((item, index) => {
                return (
                    <Grid container item lg={3} sm={6} xs={12} justify='center' alignItems='center' key={index}>
                        {' '}
                        <div onClick={() => clickCard(item.id)}>
                            <Card className={classes.rootCard}>
                                <CardActionArea>
                                    <CardMedia component='img' alt='' height='200' image={item.image} title='' />
                                    <CardContent>
                                        <Typography gutterBottom variant='h3' noWrap>
                                            {item.title}
                                        </Typography>
                                        <Grid item xs={12}>
                                            <Grid container direction='row'>
                                                <Grid item xs={12}>
                                                    <Typography variant='h5' color='textSecondary'>
                                                        {item.community}
                                                    </Typography>
                                                </Grid>
                                                <Grid item sm={6} xs={12}>
                                                    <Typography variant='h5' color='textSecondary'>
                                                        {item.province}
                                                    </Typography>
                                                </Grid>
                                                <Grid item container sm={6} xs={12} justify='flex-end'>
                                                    <Typography variant='h5' color='textSecondary'>
                                                        {item.activity}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                    </Grid>
                )
            })}
        </Fragment>
    )
}

export default CardActivity
