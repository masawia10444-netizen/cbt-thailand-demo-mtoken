import React, { useEffect } from 'react'
import Router from 'next/router'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import ButtonContained from '../../controls/button/button'
import { useTranslation } from 'react-i18next'
import useAppPolicy from './useAppPolicy'
// import Dialog from '../../controls/dialog/dialog'
import { useConfirmationDialog } from '../../controls/dialog/confirmationDialog'

export const AppPolicy = () => {
    const policy = useAppPolicy()
    const classes = useStyles()
    const { t, i18n } = useTranslation()
    const { openDialogConfirmation } = useConfirmationDialog()

    return (
        <>
            <Grid className={classes.container} container justify='center' alignItems='center'>
                <Grid item xs={12} sm={10} container>
                    <Typography style={{ color: 'white' }}>
                        {t('POLICY.COOKIE.DESCRIPTION')}
                        <a
                            style={{
                                color: '#F5D01A',
                                textDecoration: 'underline',
                                cursor: 'pointer',
                            }}
                            onClick={() => {
                                // openDialogConfirmation({
                                //     title: t('POLICY.COOKIE.DIALOG_TITLE'),
                                //     message: t('POLICY.COOKIE.DIALOG_MSG'),
                                //     showButtonCancel: false,
                                // })
                                policy.functions.handleClickLink()
                            }}
                        >
                            {t('POLICY.COOKIE.LINK_MORE_DETAIL')}
                        </a>
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={2} container justify='center' alignItems='center' className={classes.btn}>
                    <ButtonContained
                        variant='contained'
                        onClick={() => {
                            policy.functions.onClickAcceptPolicy()
                        }}
                        btnType={'save'}
                        label={t('HOME.ACCEPT')}
                        style={{ height: '35px' }}
                    />
                </Grid>
            </Grid>
        </>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: '100%',
            background: '#009687E3',
            opacity: 0.9,
            position: 'fixed',
            bottom: 0,
            zIndex: 99,
            [theme.breakpoints.up('xs')]: {
                padding: '20px',
            },
            [theme.breakpoints.up('sm')]: {
                padding: '20px 40px',
            },
            [theme.breakpoints.up('md')]: {
                padding: '20px 50px',
            },
        },
        title: {
            marginBottom: 0,
        },
        btn: {
            [theme.breakpoints.up('xs')]: {
                padding: '0 25px',
            },
            [theme.breakpoints.down('xs')]: {
                padding: '10px 25px 0 25px',
            },
        },
    }),
)

export default AppPolicy
