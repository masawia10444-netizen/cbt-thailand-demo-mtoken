import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import Button from '../../../controls/button/button'
import Router from 'next/router'
import Meta from '../../../controls/meta/meta'

type FailViewProps = {}
let FailView: React.FC<FailViewProps> = ({}) => {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <>
            <Meta
                data={{
                    title: t('LOGIN.PASSWORD.RESET'),
                    description: t('LOGIN.PASSWORD.RESET'),
                    image: '',
                }}
            />
            <Grid className={classes.container} container justify='center' alignItems='flex-start'>
                <Grid item xs={8} sm={6} md={4} container justify='flex-start' alignItems='center'>
                    <Typography variant='h2' className={classes.title}>
                        {t('REGISTER.RESET_PASSWORD.TOKEN_FAIL')}
                    </Typography>
                </Grid>

                <Grid className={classes.gridImage} item xs={12} container justify='center' alignItems='center'>
                    <img
                        loading='lazy'
                        src={process.env.NEXT_PUBLIC_WEB_URL + '/images/icon/svg/ic_noti_alert.svg'}
                        className={classes.imgFail}
                        alt='fail'
                    />
                </Grid>

                <Grid item xs={8} sm={6} md={4} container justify='flex-start' alignItems='center'>
                    <Typography variant='h5' className={classes.desc}>
                        {t('REGISTER.RESET_PASSWORD.DESCRIPTION_FAIL')}
                    </Typography>

                    <Grid item xs={12} className={classes.button}>
                        <Button
                            label={t('REGISTER.VERIFY.BACK_TO_HOMEPAGE')}
                            btnType='save'
                            type='submit'
                            onClick={() => {
                                Router.push('/')
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default FailView

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: '100%',
            background: '#FFFFFF',
            paddingTop: '10vh',
            paddingBottom: 100,
            [theme.breakpoints.up('sm')]: {
                paddingTop: 110,
            },
        },
        title: {
            marginBottom: 20,
            fontSize: 26,
            [theme.breakpoints.up('sm')]: {
                fontSize: 28,
            },
        },
        desc: {
            marginBottom: 40,
            height: 48,
            fontSize: 12,
            [theme.breakpoints.up('sm')]: {
                fontSize: 14,
            },
        },
        button: {
            height: 48,
            marginTop: 20,
        },
        imgFail: {
            height: 130,
            [theme.breakpoints.up('sm')]: {
                height: 150,
            },
        },
        gridImage: {
            height: 200,
            [theme.breakpoints.up('sm')]: {
                height: 300,
            },
        },
    }),
)
