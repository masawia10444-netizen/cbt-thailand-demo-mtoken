import React from 'react'
import * as apiAttraction from './apiAttraction'
import { useTranslation } from 'react-i18next'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const ic_detail_location = process.env.NEXT_PUBLIC_WEB_URL + '/images/icon/ic_detail_location.png'

export type RenderCardContentProps = {
    dataItem: apiAttraction.TResSearchAttraction
}

const RenderCardContent: React.FC<RenderCardContentProps> = ({ dataItem }) => {
    const classes = useStyles()
    const { t, i18n } = useTranslation()
    const lang = i18n.language.toUpperCase()

    let title = lang === 'TH' ? dataItem.titleTH : dataItem.titleEN
    let commuName = lang === 'TH' ? dataItem.communNameTH : dataItem.communNameEN
    let provName = lang === 'TH' ? dataItem.provNameTH : dataItem.provNameEN
    let type = lang === 'TH' ? dataItem.typeTH : dataItem.typeEN

    return (
        <>
            <Grid container alignItems='center' justify='center'>
                <Grid item xs={12}>
                    <Typography gutterBottom variant='h3' color='primary' className={classes.title}>
                        {title}
                    </Typography>
                </Grid>
            </Grid>

            <Grid container justify='center' alignItems='center'>
                <Grid item xs={12} style={{ paddingBottom: '10px' }}>
                    <Typography variant='h5' className={classes.commuName}>
                        {commuName}
                    </Typography>
                </Grid>

                <Grid container alignItems='center'>
                    <Grid item xs={1}>
                        <img loading='lazy' src={ic_detail_location} alt='ic_detail_location' className={classes.imgLocation} />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='h5' color='textSecondary' className={classes.prov} noWrap>
                            {(lang === 'TH' && provName !== 'กรุงเทพมหานคร' ? t('SEASON.PROVINCE') : '') + (provName || '')}
                        </Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant='h5' color='textSecondary' className={classes.type}>
                            {type}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default RenderCardContent

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            minHeight: 66,
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
        },
        commuName: {
            color: theme.colors.textBlack,
            fontWeight: 'bold',
            minHeight: 42,
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
        },
        imgLocation: {
            color: theme.colors.gray,
            height: '15px',
        },
        prov: {
            color: theme.colors.textBlack,
        },
        type: {
            color: theme.colors.textBlack,
            textAlign: 'end'
        },
    }),
)
