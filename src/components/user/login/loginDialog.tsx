import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import ReportProblemRoundedIcon from '@material-ui/icons/ReportProblemRounded'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { Formik, Form, Field } from 'formik'

import FormikTextField from '../../../controls/textField/formikTextField'
import FormikCheckbox from '../../../controls/checkbox/formikCheckbox'
import useLogin from './useLogin'
import Router from 'next/router'
//import FacebookLogin from 'react-facebook-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import * as Yup from 'yup'
import { CSSProperties } from '@material-ui/core/styles/withStyles'
import { GoogleLogin } from 'react-google-login'
import loginConfig from '../../../configs/loginConfig'
import Divider from '@material-ui/core/Divider'

import useSideBar from '../../../layout/hooks/useSideBar'
import { useConfirmationDialog } from '../../../controls/dialog/confirmationDialog'

const facebookIcon = process.env.NEXT_PUBLIC_WEB_URL + '/images/icon/btn_facebook.png'
const googleIcon = process.env.NEXT_PUBLIC_WEB_URL + '/images/icon/btn_google.png'

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('รูปแบบอีเมลไม่ถูกต้อง').required('กรุณากรอกอีเมล'),
    password: Yup.string().required('กรุณากรอกรหัสผ่าน'),
})

type RenderPropsType = {
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

type LoginDialogViewPropsType = {
    btnStyle?: CSSProperties
    customLabel?: JSX.Element
}
const LoginDialogView: React.FC<LoginDialogViewPropsType> = ({ btnStyle, customLabel }) => {
    const {
        anchorEl,
        setAnchorEl,
        handleClick,
        handleClose,
        handleSubmit,
        handleLoginFacebook,
        handleLoginGmail,
        isError,
        handleClickDiv,
        mobileSize,
    } = useLogin()

    const { t } = useTranslation()
    const classes = useStyles()

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    const { toggleDrawer } = useSideBar()

    let screenHeight = 0
    if (process.browser) {
        screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }

    return (
        <>
            {customLabel ? (
                <div
                    aria-describedby={id}
                    onClick={(e) => {
                        if (mobileSize) {
                            toggleDrawer(false)
                            Router.push('/login')
                        } else {
                            handleClickDiv(e)
                        }
                    }}
                >
                    {customLabel}
                </div>
            ) : (
                <Button
                    aria-describedby={id}
                    className={classes.btnOpenDialog}
                    onClick={(e) => {
                        if (mobileSize) {
                            toggleDrawer(false)
                            Router.push('/login')
                        } else {
                            handleClick(e)
                        }
                    }}
                    style={btnStyle}
                >
                    <Typography variant='body1'>{t(`HOME.LOGIN.TITLE`)}<br/>{t(`HOME.LOGIN.TITLE_USER`)}</Typography>
                </Button>
            )}
            <Popover
                anchorReference={mobileSize ? 'anchorPosition' : 'anchorEl'}
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    style: {
                        boxShadow: 'none',
                        background: 'rgba(22, 105, 54, 0.5)',
                        backdropFilter: 'blur(30px)',
                        marginTop: 20,
                        borderRadius: 0,
                    },
                }}
                anchorPosition={{ top: screenHeight > 0 ? screenHeight / 5 : 80, left: 0 }}
            >
                <Grid container className={mobileSize ? classes.containerFullPage : classes.containerDialog}>
                    <Grid item xs={12} className={clsx(classes.gridItem, classes.gridItem1)}>
                        <FacebookLogin
                            appId={loginConfig.key_facebook}
                            fields='name,email,picture'
                            callback={handleLoginFacebook}
                            disableMobileRedirect={true}
                            render={(renderProps: RenderPropsType) => (
                                <Button
                                    className={classes.btnFacebook}
                                    fullWidth
                                    // onClick={() => handleOpenPolicyDialog({ onClick: renderProps.onClick })}
                                    onClick={renderProps.onClick}
                                    startIcon={
                                        <img
                                            loading='lazy'
                                            src={facebookIcon}
                                            alt='facebookIcon'
                                            className={classes.startIcon}
                                        />
                                    }
                                >
                                    <Typography variant='h5' style={{ fontFamily: 'Prompt-Regular' }}>
                                        {'Login with Facebook'}
                                    </Typography>
                                </Button>
                            )}
                        />

                        <GoogleLogin
                            clientId={loginConfig.key_gmail}
                            onSuccess={handleLoginGmail}
                            render={(renderProps: { onClick: () => void; disabled?: boolean }) => (
                                <Button
                                    // onClick={() => handleOpenPolicyDialog({ onClick: renderProps.onClick })}
                                    onClick={renderProps.onClick}
                                    className={classes.btnGoogle}
                                    fullWidth
                                    startIcon={
                                        <img
                                            loading='lazy'
                                            src={googleIcon}
                                            alt='googleIcon'
                                            className={classes.startIcon}
                                        />
                                    }
                                >
                                    <Typography variant='h5' style={{ fontFamily: 'Prompt-SemiBold' }}>
                                        {'Login with Google'}
                                    </Typography>
                                </Button>
                            )}
                            cookiePolicy={'single_host_origin'}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Divider light style={{ height: 3 }} />
                    </Grid>

                    <Grid item xs={12} className={clsx(classes.gridItem, classes.gridItem2)}>
                        <Formik
                            initialValues={{ email: '', password: '', rememberMe: false }}
                            validationSchema={SignupSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ errors, touched, values }) => (
                                <Form>
                                    <Grid container>
                                        <Grid item xs={12} className={classes.gridEmail}>
                                            <Field
                                                id='email'
                                                name='email'
                                                component={FormikTextField}
                                                placeholder='E-mail'
                                                type='email'
                                                clearable={true}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                id='password'
                                                name='password'
                                                component={FormikTextField}
                                                placeholder='Password'
                                                type='password'
                                                clearable={true}
                                            />
                                        </Grid>

                                        <Grid
                                            item
                                            xs={12}
                                            container
                                            justify='center'
                                            alignItems='center'
                                            style={{
                                                height: 56,
                                                background: '#F30606',
                                                position: 'absolute',
                                                width: 273,
                                                marginLeft: -16,
                                                top: errors.email ? 280 : 256,
                                                display: !isError ? 'none' : 'inherit',
                                            }}
                                        >
                                            <ReportProblemRoundedIcon
                                                style={{ fontSize: 25, color: '#FFFFFF', marginRight: 20 }}
                                            />
                                            <Typography variant='body1' style={{ color: '#FFFFFF' }}>
                                                {t('VALIDATE.WRONG_EMAIL_OR_PASSWORD')}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12} style={{ marginTop: isError ? 60 : 0 }}>
                                            <Grid container justify='space-between' alignItems='center'>
                                                <Grid item xs={6} className={classes.gridRememberMe}>
                                                    <Field
                                                        name='rememberMe'
                                                        component={FormikCheckbox}
                                                        type='checkbox'
                                                        label={t('HOME.LOGIN.REMEMBER')}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} className={classes.forgotPassword}>
                                                    <Typography
                                                        variant='body1'
                                                        onClick={() => {
                                                            Router.push('/forgotpassword')
                                                            handleClose()
                                                        }}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        {t('HOME.LOGIN.FORGOT_PASSWORD')}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Button className={classes.btnSubmit} fullWidth type='submit'>
                                            <Typography variant='h5' style={{ fontFamily: 'Prompt-SemiBold' }}>
                                                {t('HOME.LOGIN.TITLE')}
                                            </Typography>
                                        </Button>

                                        <Button
                                            className={classes.btnRegister}
                                            fullWidth
                                            onClick={() => {
                                                Router.push('/register')
                                                handleClose()
                                            }}
                                        >
                                            <Typography variant='h5' style={{ fontFamily: 'Prompt-SemiBold' }}>
                                                {t('HOME.LOGIN.REGISTER')}
                                            </Typography>
                                        </Button>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                    </Grid>
                </Grid>
            </Popover>
        </>
    )
}
export default observer(LoginDialogView)

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        containerDialog: {
            width: 273,
            // marginTop: 30,
        },
        containerFullPage: {
            width: '100%',
            height: '100%',
        },
        typography: {
            padding: 0,
        },
        btnOpenDialog: {
            color: 'white',
            padding: 0,
            '&:hover': {
                color: '#F5D01A',
            },
        },
        hideOnSm: {
            [theme.breakpoints.down('sm')]: {
                display: 'none',
            },
        },

        gridItem: {
            // background: 'rgba(255,255,255,0.3)',
            // backdropFilter: 'blur(30px)',
            borderRadius: 0,
            padding: '20px 16px',
        },
        gridItem1: {
            height: 144,
            marginBottom: 2,
        },
        gridItem2: {
            // height: 272,
        },
        startIcon: {
            width: 20,
            marginLeft: -18,
            marginRight: 18,
        },
        btnFacebook: {
            // #2e4371
            // #4261A2
            // #6780b4
            height: 42,
            background: '#4261A2',
            color: '#FFFFFF',
            marginBottom: 12,
            '&:hover': {
                background: '#2e4371',
            },
        },
        textField: {},
        btnGoogle: {
            // #acacac
            // #F6F6F6
            // #f7f7f7
            height: 42,
            background: '#F6F6F6',
            color: theme.colors.oliveGreen,
            '&:hover': {
                background: '#acacac',
            },
        },
        btnSubmit: {
            height: 42,
            background: theme.colors.yellow,
            color: '#FFFFFF',
            marginBottom: 8,
            '&:hover': {
                background: '#ab9112',
            },
        },
        btnRegister: {
            color: '#FFFFFF',
            height: 42,
        },
        gridEmail: {
            marginBottom: 28,
        },
        gridRememberMe: {
            marginTop: 15,
            marginBottom: 15,
            height: 30,
            color: theme.colors.lightGray + ' !important',
        },
        forgotPassword: {
            marginTop: 15,
            marginBottom: 15,
            textAlign: 'right',
            color: theme.colors.lightGray,
            textDecoration: 'underline',
        },
    }),
)
