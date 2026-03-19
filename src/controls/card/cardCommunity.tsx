import React, { FC, Fragment, MouseEvent } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import { useTranslation } from 'react-i18next'
import { CSSProperties } from '@material-ui/core/styles/withStyles'

const no_image = process.env.NEXT_PUBLIC_WEB_URL + '/images/defaultImg/Activity@2x.png'
const arrNoImgFestival = [
    process.env.NEXT_PUBLIC_WEB_URL + '/images/defaultImg/Event.png',
    process.env.NEXT_PUBLIC_WEB_URL + '/images/defaultImg/Event2.png',
]
const arrNoImgAccommodation = [
    process.env.NEXT_PUBLIC_WEB_URL + '/images/defaultImg/homestay3_small@2x.png',
    process.env.NEXT_PUBLIC_WEB_URL + '/images/defaultImg/homestay4_small@2x.png',
]

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
    dataItem: {
        menu?: string
        ID?: number
        titleTH?: string
        titleEN?: string
        provinceTH?: string
        provinceEN?: string
        provNameEN?: string
        provNameTH?: string
        updateDate?: string
        image?: string
        communNameTH?: string
        communNameEN?: string
        accomNameEN?: string
        accomNameTH?: string
        typeNameEN?: string
        typeNameTH?: string
        accomID?: number
    }

    onClickCard?: (id: number) => void
    // cardContent: (dataItem: any[], index: number) => void,
    children?: any
    style?: CSSProperties
}

const Cards: FC<Props> = (props) => {
    const { dataItem, onClickCard, children, style } = props
    const classes = useStyles()
    const { t, i18n } = useTranslation()
    const lang = i18n.language.toUpperCase()

    const clickCard = (id: number) => {
        onClickCard && onClickCard(id)
    }
    const image = dataItem.image
        ? process.env.NEXT_PUBLIC_UPLOAD_URL + dataItem.image
        : dataItem.menu === 'festival'
        ? arrNoImgFestival[Math.floor(Math.random() * arrNoImgFestival?.length)]
        : dataItem.menu === 'accommodation'
        ? arrNoImgAccommodation[Math.floor(Math.random() * arrNoImgAccommodation?.length)]
        : no_image

    const itemID = dataItem.ID

    return (
        <Fragment>
            <div onClick={() => clickCard(itemID ?? 0)} style={{ width: '100%' }}>
                <Card className={classes.rootCard}>
                    <CardActionArea>
                        <CardMedia
                            component='img'
                            alt={lang === 'TH' ? dataItem.titleTH : dataItem.titleEN}
                            height='200'
                            image={image}
                        />
                        <CardContent style={style}>{children}</CardContent>
                    </CardActionArea>
                </Card>
            </div>
        </Fragment>
    )
}

export default Cards
