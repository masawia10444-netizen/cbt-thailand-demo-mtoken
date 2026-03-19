import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import useForgotPassword from './useForgotPassword'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import FormikTextField from '../../../controls/textField/formikTextField'
import { Formik, FormikHelpers, FormikProps, Form, Field, FieldProps } from 'formik'
import { useTranslation } from 'react-i18next'
import Button from '../../../controls/button/button'
import FormikCheckbox from '../../../controls/checkbox/formikCheckbox'
import * as Yup from 'yup'
import { validateEmail } from '../../../utilities/shareValidate'
import Link from '@material-ui/core/Link'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import Success from './success'
import Meta from '../../../controls/meta/meta'

const SignupSchema = Yup.object().shape({
    email: Yup.string().required('VALIDATE.REQUIRED'),
})

type ReturnTypeuseForgotPassword = ReturnType<typeof useForgotPassword>
type RegisterViewProps = ReturnTypeuseForgotPassword & {}
let RegisterView: React.FC<RegisterViewProps> = ({ handleSubmit, handleCancel, success }) => {
    const classes = useStyles()
    const { t } = useTranslation()
    const theme = useTheme()
    const isMobileView = useMediaQuery(theme.breakpoints.down('xs'))

    if (success) return <Success />

    return (
        <Formik
            initialValues={{
                email: '',
                firstName: '',
                lastName: '',
                password: '',
                confirmPassword: '',
                acceptTerms: false,
            }}
            onSubmit={handleSubmit}
            validationSchema={SignupSchema}
        >
            {({ errors, touched, values }) => (
                <Form>
                    <Grid className={classes.container} container justify='center' alignItems='flex-start'>
                        <Meta
                            data={{
                                title: t('LOGIN.PASSWORD.FORGOT'),
                                description: t('LOGIN.PASSWORD.FORGOT'),
                                image: '',
                            }}
                        />
                        <Grid item xs={8} sm={6} md={4} lg={3} container justify='flex-start' alignItems='center'>
                            <Typography variant='h2' className={classes.title}>
                                {t('LOGIN.PASSWORD.FORGOT')}
                            </Typography>
                            <Typography
                                variant='h5'
                                className={classes.title}
                                style={{
                                    position: 'absolute',
                                    // top: 235,
                                    marginRight: 20,
                                    marginTop: isMobileView ? 120 : 80,
                                }}
                            >
                                {t('LOGIN.PASSWORD.SEND_EMAIL_DESCRIPTION')}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}></Grid>

                        <Grid
                            item
                            xs={8}
                            sm={6}
                            md={4}
                            lg={3}
                            container
                            justify='flex-start'
                            alignItems='center'
                            style={{ marginTop: 50 }}
                        >
                            <Grid item xs={12} className={classes.textField} style={{ marginBottom: 150 }}>
                                <Field
                                    name='email'
                                    component={FormikTextField}
                                    variant='outlined'
                                    label={t('REGISTER.FORM.EMAIL')}
                                    type='email'
                                    validate={validateEmail}
                                    clearable={true}
                                />
                            </Grid>

                            <Grid item xs={12} className={classes.btn}>
                                <Button label={t('LOGIN.PASSWORD.SEND')} btnType='save' type='submit' />
                            </Grid>

                            <Grid item xs={12} className={classes.btn}>
                                <Button label={t('HOME.CANCEL')} btnType='cancel' onClick={handleCancel} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
}

type RegisterProps = {} & Omit<RegisterViewProps, keyof ReturnTypeuseForgotPassword>
let Register: React.FC<RegisterProps> = ({ ...others }) => {
    const forgot = useForgotPassword()
    return <RegisterView {...forgot} {...others} />
}

export default Register

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: '100%',
            background: '#FFFFFF',
            paddingTop: '10vh',
            paddingBottom: 100,
            [theme.breakpoints.up('sm')]: {
                paddingTop: 140,
            },
            [theme.breakpoints.up('md')]: {
                paddingTop: 180,
            },
        },
        title: {
            marginBottom: 40,
        },
        textField: {
            marginBottom: 50,
            height: 48,
            [theme.breakpoints.down('xs')]: {
                paddingTop: 30,
            },
        },
        btn: {
            marginBottom: 40,
            height: 35,
            [theme.breakpoints.down('xs')]: {
                marginBottom: 20,
            },
        },
    }),
)
