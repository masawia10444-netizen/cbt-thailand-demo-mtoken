import React from 'react'
import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { Formik, Form, Field } from 'formik'
import { useTranslation } from 'react-i18next'
import { checkboxRequired } from '../../../utilities/shareValidate'

import Checkbox from '../../../controls/checkbox/formikCheckbox'
import RadioButton from './radioButton'
import { detail } from './privacyPolicy/policyText'
import { personalData } from './personalData/personalData'

import PolicyView from './privacyPolicy/policyView'
import PersonalDataView from './personalData/personalDataView'

const logo = process.env.NEXT_PUBLIC_WEB_URL + '/images/icon/svg/logo_cbt.svg'

type PolicyDialogViewProps = {
    handleSubmitDialogForm: (values: any) => void
    handleCheckPolicy: (values: boolean) => void
    handleCheckPDPA_1: (values: string) => void
    handleCheckPDPA_2: (values: string) => void
}

let PolicyDialogView: React.FC<PolicyDialogViewProps> = observer(
    ({ handleSubmitDialogForm, handleCheckPolicy, handleCheckPDPA_1, handleCheckPDPA_2 }) => {
        const { t, i18n } = useTranslation()
        const classes = useStyles()

        const renderContent = (detail: any, key: number) => {
            if (typeof detail === 'string') {
                return (
                    <Typography
                        variant='h5'
                        align='left'
                        className={classes.detailContent}
                        style={{
                            paddingLeft: 19,
                        }}
                        key={key}
                    >
                        {detail}
                    </Typography>
                )
            } else if (typeof detail === 'object') {
                return (
                    <div
                        style={{
                            paddingLeft: 19,
                        }}
                        key={key}
                    >
                        <Typography variant='h5' align='left' className={classes.detailContent}>
                            {detail.title}
                        </Typography>
                        {Array.isArray(detail.content)
                            ? detail.content.map((item) => renderContent(item, key))
                            : renderContent(detail.content, key)}
                    </div>
                )
            } else {
                return <div>{detail}</div>
            }
        }

        return (
            <div className={classes.container}>
                <Grid container justify='center' alignItems='center'>
                    <img src={logo} alt='logo' className={classes.image} />
                </Grid>

                <Formik
                    initialValues={{
                        isAcceptPolicy: false,
                        isAcceptPDPA: null,
                        isAcceptPDPA2: null,
                    }}
                    onSubmit={handleSubmitDialogForm}
                >
                    {() => (
                        <Form>
                            <Grid container justify='flex-start' alignItems='flex-start' style={{ marginBottom: 50 }}>
                                {/* ---------------- Start Policy ---------------- */}
                                <PolicyView
                                    renderContent={renderContent}
                                    handleCheck={handleCheckPolicy}
                                    classes={classes}
                                />
                                {/* ---------------- End Policy ---------------- */}
                                <Grid item xs={12} style={{ marginTop: 10, marginBottom: 20 }}>
                                    <Divider />
                                </Grid>

                                {/*  */}
                                <PersonalDataView
                                    handleCheckPDPA_1={handleCheckPDPA_1}
                                    handleCheckPDPA_2={handleCheckPDPA_2}
                                    classes={classes}
                                />
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </div>
        )
    },
)

type PolicyDialogProps = PolicyDialogViewProps
//Omit<PolicyDialogViewProps, keyof ReturnUseType>
let PolicyDialog: React.FC<PolicyDialogProps> = ({ ...others }) => {
    return <PolicyDialogView {...others} />
}

export default observer(PolicyDialog)

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: '10px 20px 20px 20px',
            position: 'relative',
            [theme.breakpoints.up('md')]: {
                padding: '10px 50px 20px 50px',
            },
        },
        image: {
            width: 120,
            [theme.breakpoints.up('sm')]: {
                width: 150,
            },
            [theme.breakpoints.up('md')]: {
                width: 150,
            },
        },
        button: {
            width: '55%',
            height: 34,
        },
        policyTitle: {
            color: theme.colors.mint,
            marginTop: 10,
            marginBottom: 10,
            fontSize: 16,
            [theme.breakpoints.up('sm')]: {
                marginTop: 0,
                fontSize: 20,
            },
            [theme.breakpoints.up('md')]: {
                fontSize: 22,
            },
        },
        policyDesc: {
            fontFamily: 'Prompt-SemiBold',
            color: theme.colors.textBlack,
            marginBottom: 20,
            lineHeight: 1.5,
            fontSize: 12,
            [theme.breakpoints.up('md')]: {
                fontSize: 14,
            },
        },
        viewDetail: {
            color: theme.palette.secondary.main,
            marginTop: 20,
            marginBottom: 10,
            lineHeight: 1.5,
            textDecoration: 'underline',
            cursor: 'pointer',
            fontSize: 12,
            [theme.breakpoints.up('md')]: {
                fontSize: 14,
            },
        },
        detail: {
            marginBottom: 20,
            marginTop: 30,
        },
        checkbox: {
            color: theme.colors.textBlack,
            fontSize: 12,
            [theme.breakpoints.up('md')]: {
                fontSize: 14,
            },
        },
        gridButton: {},
        detailTitle: {
            fontFamily: 'Prompt-SemiBold',
            color: theme.colors.textBlack,
            marginBottom: 10,
            lineHeight: 1.5,
            fontSize: 12,
            textIndent: 20,
            [theme.breakpoints.up('md')]: {
                fontSize: 14,
            },
        },
        detailContent: {
            textIndent: 34,
            lineHeight: 1.5,
            marginTop: 20,
        },
        personalTitle: {
            marginTop: 30,
            textIndent: 34,
            fontFamily: 'Prompt-SemiBold',
        },
        personalDetail: {
            marginTop: 20,
            textIndent: 34,
        },
    }),
)
