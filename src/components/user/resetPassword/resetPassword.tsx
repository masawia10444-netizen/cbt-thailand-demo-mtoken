import React from 'react'
import { observer } from 'mobx-react-lite'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import useResetPassword from './useResetPassword'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import FormikTextField from '../../../controls/textField/formikTextField'
import { Formik, FormikHelpers, FormikProps, Form, Field, FieldProps } from 'formik'
import { useTranslation } from 'react-i18next'
import Button from '../../../controls/button/button'
import FormikCheckbox from '../../../controls/checkbox/formikCheckbox'
import * as Yup from 'yup'
import { checkboxRequired, password, mustMatch } from '../../../utilities/shareValidate'
import Link from '@material-ui/core/Link'

import Success from './success'
import Fail from './fail'
import Meta from '../../../controls/meta/meta'

type ReturnTypeUseResetPassword = ReturnType<typeof useResetPassword>
type ResetPasswordViewProps = ReturnTypeUseResetPassword & {}
let ResetPasswordView: React.FC<ResetPasswordViewProps> = observer(
    ({ handleSubmit, success, tokenFail, isLoading }) => {
        const classes = useStyles()
        const { t } = useTranslation()

        if (tokenFail) {
            return <>{isLoading ? <div></div> : <Fail />}</>
        }

        if (success) return <Success />

        return (
            <Formik
                initialValues={{
                    password: '',
                    confirmPassword: '',
                }}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, values }) => (
                    <Form>
                        <Grid className={classes.container} container justify='center' alignItems='flex-start'>
                            <Meta
                                data={{
                                    title: t('LOGIN.PASSWORD.RESET'),
                                    description: t('LOGIN.PASSWORD.RESET'),
                                    image: '',
                                }}
                            />
                            <Grid item xs={8} sm={6} md={4} lg={3} container justify='flex-start' alignItems='center'>
                                <Typography variant='h2' className={classes.title}>
                                    {t('LOGIN.PASSWORD.RESET')}
                                </Typography>
                                <Typography variant='h5' className={classes.desc}>
                                    {t('LOGIN.PASSWORD.RESET_PASSWORD_DESCRIPTION')}
                                </Typography>
                            </Grid>

                            <Grid item xs={12}></Grid>

                            <Grid item xs={8} sm={6} md={4} lg={3} container justify='flex-start' alignItems='center'>
                                <Grid item xs={12} className={classes.textField}>
                                    <Field
                                        name='password'
                                        component={FormikTextField}
                                        variant='outlined'
                                        label={t('REGISTER.FORM.PASSWORD')}
                                        type='password'
                                        validate={password}
                                    />
                                </Grid>

                                <Grid item xs={12} className={classes.confirm}>
                                    <Field
                                        name='confirmPassword'
                                        component={FormikTextField}
                                        variant='outlined'
                                        label={t('REGISTER.FORM.CONFIRM_PASSWORD')}
                                        type='password'
                                        validate={(value) => mustMatch(values.password, value)}
                                    />
                                </Grid>

                                <Grid item xs={12} className={classes.button}>
                                    <Button label={t('HOME.SUBMIT')} btnType='save' type='submit' />
                                </Grid>

                                <Grid item xs={12} className={classes.button}>
                                    <Button label={t('HOME.CANCEL')} btnType='cancel' type='reset' />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        )
    },
)

type ResetPasswordProps = {} & Omit<ResetPasswordViewProps, keyof ReturnTypeUseResetPassword>
let ResetPassword: React.FC<ResetPasswordProps> = ({ ...others }) => {
    const register = useResetPassword()
    return <ResetPasswordView {...register} {...others} />
}

export default observer(ResetPassword)

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
        textField: {
            marginBottom: 50,
            height: 34,
            [theme.breakpoints.up('sm')]: {
                height: 48,
            },
        },
        confirm: {
            marginBottom: 80,
            height: 48,
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
            marginBottom: 20,
            height: 34,
            [theme.breakpoints.up('sm')]: {
                height: 48,
            },
        },
    }),
)
