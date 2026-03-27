import { FC, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import Tooltip from '@material-ui/core/Tooltip'
import { useTranslation } from 'react-i18next'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'

import { useRouter } from 'next/router'

type CardResultPropsType = {
    title: string
    dataList: any[]
    defaultImg: string
    maxContent?: number
    contentPrefix?: string
}
const cardSearchResult: FC<CardResultPropsType> = ({
    dataList,
    defaultImg = '',
    title = '',
    maxContent = 5,
    contentPrefix,
}) => {
    const classes = useStyles()
    const { t, i18n } = useTranslation()
    const router = useRouter()

    const [displayAll, setDisplayAll] = useState(false)

    const preContent = dataList.slice(0, maxContent)
    const content = displayAll ? dataList : preContent

    const handleClickCard = (id: number | string) => {
        //console.log('id', id)
        if (contentPrefix) {
            router.push(`/${contentPrefix}/content/${id}`)
        }
    }

    const toggleDisplay = () => {
        setDisplayAll(!displayAll)
    }

    return (
        <Grid item xs={12}>
            <Typography variant='h3' style={{ marginTop: 50, marginBottom: 20 }}>
                {title}
            </Typography>

            {content?.length > 0 &&
                content.map((item, index) => {
                    const distanceDisplay =
                        typeof item?.distance === 'number'
                            ? (item?.distance / 1000).toFixed(1) + ' ' + t('TRIP.UNIT_KM_TEXT')
                            : ''

                    return (
                        <Paper
                            variant='outlined'
                            square
                            className={classes.paper}
                            key={index}
                            onClick={() => handleClickCard(item.ID)}
                        >
                            <Grid item xs={12} container>
                                <Grid
                                    item
                                    xs={12}
                                    sm={3}
                                    md={2}
                                    style={{
                                        backgroundImage: `url('${
                                            item.image ? process.env.NEXT_PUBLIC_UPLOAD_URL + item.image : defaultImg
                                        }')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                    className={classes.img}
                                ></Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={9}
                                    md={10}
                                    className={classes.container}
                                    container
                                    justify='space-between'
                                >
                                    <Typography variant='h3' className={classes.title} noWrap>
                                        {i18n.language === 'th' ? item.nameTH : item.nameEN}
                                    </Typography>

                                    <Typography variant='h5' className={classes.distance}>
                                        {distanceDisplay}
                                    </Typography>

                                    <Grid item xs={12}>
                                        <Typography variant='h5' className={classes.desc}>
                                            {i18n.language === 'th' ? item.descTH : item.descEN}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    )
                })}

            {dataList.length > maxContent && (
                <Grid item xs={12} container justify='center' style={{ marginTop: 20, cursor: 'pointer' }}>
                    <Tooltip title={t('HOME.MORE')} placement='top'>
                        {displayAll ? (
                            <ExpandLessIcon onClick={toggleDisplay} fontSize='default' />
                        ) : (
                            <ExpandMoreIcon onClick={toggleDisplay} fontSize='default' />
                        )}
                    </Tooltip>
                </Grid>
            )}
        </Grid>
    )
}

export default cardSearchResult

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            background: '#FFFFFF',
            height: 'auto',
            border: 'none',
            marginTop: 10,
            cursor: 'pointer',
            [theme.breakpoints.up('sm')]: {
                height: 145,
            },
            [theme.breakpoints.up('md')]: {
                height: 155,
            },
        },
        img: {
            height: 200,
            width: 'auto',
            [theme.breakpoints.up('sm')]: {
                height: 145,
            },
            [theme.breakpoints.up('md')]: {
                height: 155,
            },
        },
        container: {
            padding: '25px 20px 17px 20px',
            [theme.breakpoints.up('sm')]: {
                padding: '25px 55px 17px 20px',
            },
            [theme.breakpoints.up('md')]: {
                padding: '30px 60px 22px 24px',
            },
        },
        title: {
            fontSize: 16,
            lineHeight: 1.5,
            [theme.breakpoints.up('sm')]: {
                fontSize: 20,
            },
            [theme.breakpoints.up('md')]: {
                fontSize: 22,
            },
        },
        distance: {
            fontSize: 12,
            [theme.breakpoints.up('md')]: {
                fontSize: 14,
            },
        },
        desc: {
            display: '-webkit-box',
            '-webkit-line-clamp': 2,
            '-webkit-box-orient': 'vertical',
            textOverflow: 'ellipsis',
            lineHeight: 1.75,
            overflow: 'hidden',
            height: 42,
            marginTop: 10,
            fontSize: 12,
            [theme.breakpoints.up('sm')]: {
                fontSize: 14,
                height: 48,
            },
        },
    }),
)
