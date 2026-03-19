import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import Button from '../../../controls/button/button'
import Router from 'next/router'
import Meta from '../../../controls/meta/meta'

type VerifyViewProps = {}
let VerifyView: React.FC<VerifyViewProps> = ({}) => {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <>
            <Meta
                data={{
                    title: t('LOGIN.PASSWORD.FORGOT'),
                    description: t('LOGIN.PASSWORD.FORGOT'),
                    image: '',
                }}
            />
            <Grid className={classes.container} container justify='center' alignItems='flex-start'>
                <Grid item xs={10} sm={6} md={4} lg={3} container justify='flex-start' alignItems='center'>
                    <Typography variant='h2' className={classes.title}>
                        {t('REGISTER.VERIFY.TITLE')}
                    </Typography>
                </Grid>

                <Grid item xs={12} container justify='center' alignItems='center' style={{ height: 300 }}>
                    <img
                        loading='lazy'
                        src={process.env.NEXT_PUBLIC_WEB_URL + '/images/register/mail.svg'}
                        alt='mail'
                    />
                </Grid>

                <Grid item xs={8} sm={6} md={4} lg={3} container justify='flex-start' alignItems='center'>
                    <Typography variant='h5' className={classes.desc}>
                        {t('REGISTER.VERIFY.DESCRIPTION')}
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

export default VerifyView

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: '100%',
            background: '#FFFFFF',
            paddingTop: '10vh',
            paddingBottom: 100,
            [theme.breakpoints.up('sm')]: {
                paddingTop: 120,
            },
        },
        title: {
            marginBottom: 0,
            fontSize: 24,
            [theme.breakpoints.up('sm')]: {
                fontSize: 28,
            },
        },
        desc: {
            fontSize: 12,
            [theme.breakpoints.up('sm')]: {
                fontSize: 14,
            },
        },
        button: {
            height: 48,
            marginTop: 60,
        },
    }),
)
