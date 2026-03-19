import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import Store from '../../stores/rootStore'
import { encrypt } from '../../utilities/registerUltility'
import jwt from 'jsonwebtoken'

export type VerifyRegType = {
    token?: string
}

export const Landing = () => {
    const classes = useStyles()
    const { t } = useTranslation()
    const { UserStore, LayoutStore } = Store()
    const [isSuccess, setIsSuccess] = useState(false)

    const delay = (timeout: number) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(2)
            }, timeout)
        })
    }

    const fetchData = async ({ email }: { email: string }) => {
        await UserStore.verifyEmail({ email: email })
        const profile = await UserStore.getProfile({ email: email, userID: UserStore.userInfo.userID })

        let encryptedData = encrypt(JSON.stringify(profile))
        localStorage.setItem(process.env.NEXT_PUBLIC_LOCAL_STORAGE_USER_INFO, encryptedData)

        if (profile.userID) {
            setIsSuccess(true)
            if (profile.isFirstLogin) {
                await LayoutStore.setDisplayInterestDialog(true)
            } else {
                Router.push('/profile')
            }
        }
    }

    const verifyUser = async () => {
        await delay(2000)

        const params: VerifyRegType = typeof window !== 'undefined' && Router.query
        let email: string = jwt.decode(params.token, { json: true })?.email

        if (email) {
            let accessToken: string = jwt.decode(params.token, { json: true })?.accessToken
            let refreshToken: string = jwt.decode(params.token, { json: true })?.refreshToken
            const encryptedAccessToken = encrypt(JSON.stringify(accessToken))
            const encryptedRefreshToken = encrypt(JSON.stringify(refreshToken))
            sessionStorage.setItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN, encryptedAccessToken)
            sessionStorage.setItem(process.env.NEXT_PUBLIC_REFRESH_TOKEN, encryptedRefreshToken)

            fetchData({ email })
        } else {
            if (!isSuccess) {
                typeof window !== 'undefined' && Router.push('/')
            }
        }
    }

    useEffect(() => {
        verifyUser()
    }, [])

    useEffect(() => {
        if (isSuccess) {
            UserStore.insertLogLogin()
        }
    }, [isSuccess])

    return (
        <Grid className={classes.container} container justify='center' alignItems='flex-start'>
            <Grid item xs={8} sm={6} md={4} lg={3} container justify='center' alignItems='center'>
                <Typography variant='h2' className={classes.title}>
                    {t('REGISTER.VERIFY.VERIFY_SUCCESS')}
                </Typography>
            </Grid>

            <Grid item xs={12} container justify='center' alignItems='center' style={{ height: 300 }}>
                <img loading='lazy' src={process.env.NEXT_PUBLIC_WEB_URL + '/images/register/mail.svg'} alt='mail' />
            </Grid>
        </Grid>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: '100%',
            background: '#FFFFFF',
            paddingTop: '45%',
            paddingBottom: '40%',
            [theme.breakpoints.up('sm')]: {
                paddingTop: 200,
                paddingBottom: 200,
            },
        },
        title: {
            marginBottom: 0,
        },
    }),
)

export default Landing
