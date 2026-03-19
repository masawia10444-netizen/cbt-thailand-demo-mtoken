import React from 'react'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            marginBottom: '70px'
        }
    })
)
type UsenoImageViewProps = {}
type ReturnTypeUsenoImageView = ReturnType<typeof usenoImageView>
function usenoImageView(props: UsenoImageViewProps) {
    const { } = props
    return {}
}

type noImageViewViewProps = ReturnTypeUsenoImageView & {}
let NoImageViewView: React.FC<noImageViewViewProps> = ({ }) => {
    const classes = useStyles()
    const { t, i18n } = useTranslation()
    return (
        <Grid container className={classes.root} justify="center" alignItems="center">
            <Grid item xs={12} container justify="center">
                <img loading='lazy'
                    src={process.env.NEXT_PUBLIC_WEB_URL + '/images/icon/not_found.png'}
                    alt='not_found'
                    style={{ marginTop: 30, marginBottom: 30 }}
                />
                <Grid item sm={12} xs={12} container justify="center" >
                    <Typography variant='h5'>{t('HOME.SEARCH.NOT_FOUND')}</Typography>

                </Grid>
            </Grid>
        </Grid>
    )
}

type noImageViewProps = UsenoImageViewProps & Omit<noImageViewViewProps, keyof ReturnTypeUsenoImageView>
let NoImageView: React.FC<noImageViewProps> = ({ ...others }) => {
    const noImageView = usenoImageView({})
    return <NoImageViewView {...noImageView} {...others} />
}

export default NoImageView
