import React, { FC, Fragment } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import ColorWeb from '../../constants/colorWeb'
import { convertToDisplayDate } from '../../utilities/dateTimeUtils'
import Grow from '@material-ui/core/Grow'

const no_image = process.env.NEXT_PUBLIC_WEB_URL + '/images/defaultImg/Activity@2x.png'
const ic_detail_location = process.env.NEXT_PUBLIC_WEB_URL + '/images/icon/ic_detail_location.png'
const ic_detail_date = process.env.NEXT_PUBLIC_WEB_URL + '/images/icon/ic_detail_date.png'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        rootCard: {
            width: '100%',
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
        imgDetailLocation: {
            color: theme.colors.gray,
            height: '17px',
        },
        prov: {
            color: theme.colors.textBlack,
        },
    }),
)
type Props = {
    data: {
        ID: number
        titleTH: string
        titleEN: string
        provinceTH?: string
        provinceEN?: string
        updateDate?: string
        isHighlight?: boolean
        image?: any
    }[]

    onClickCard?: (id: number) => void
}

const Cards: FC<Props> = (props) => {
    const classes = useStyles()
    const { t, i18n } = useTranslation()
    const lang = i18n.language.toUpperCase()

    const clickCard = (id: number) => {
        props.onClickCard && props.onClickCard(id)
    }

    return (
        <Fragment>
            {props.data?.map((item, index) => {
                return (
                    <Grid
                        container
                        item
                        lg={3}
                        sm={6}
                        xs={12}
                        justify='center'
                        alignItems='center'
                        key={index}
                        data-aos='zoom-in-up'
                        data-aos-duration={(index + 1) * 150}
                        data-aos-offset={50}
                    >
                        <Card className={classes.rootCard} onClick={() => clickCard(item.ID)}>
                            <CardActionArea>
                                <CardMedia
                                    component='img'
                                    alt={item[`title` + lang]}
                                    height='200'
                                    image={
                                        item.image !== null ? process.env.NEXT_PUBLIC_UPLOAD_URL + item.image : no_image
                                    }
                                    title={item[`title` + lang]}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant='h3' style={{ color: ColorWeb.primary.color1 }}>
                                        {item[`title` + lang]}
                                    </Typography>
                                    <Grid container alignItems='center' style={{ margin: '10px 0px' }}>
                                        <Grid item xs={1}>
                                            <img
                                                loading='lazy'
                                                src={ic_detail_location}
                                                alt='ic_detail_location'
                                                className={classes.imgDetailLocation}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography
                                                variant='h5'
                                                color='textSecondary'
                                                className={classes.prov}
                                                noWrap
                                            >
                                                {
                                                    // @ts-ignore
                                                    (lang === 'TH' ? `จังหวัด ` : ``) + item[`provName` + lang]
                                                }
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <img
                                                loading='lazy'
                                                src={ic_detail_date}
                                                alt='ic_detail_date'
                                                className={classes.imgDetailLocation}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography
                                                variant='h5'
                                                color='textSecondary'
                                                className={classes.prov}
                                                noWrap
                                            >
                                                {item?.updateDate
                                                    ? convertToDisplayDate({ date: item?.updateDate, lang: lang })
                                                    : '-'}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                )
            })}
        </Fragment>
    )
}

export default Cards
