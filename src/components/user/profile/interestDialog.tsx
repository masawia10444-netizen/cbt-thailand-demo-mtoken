import React from 'react'
import { observer } from 'mobx-react-lite'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Checkbox from '../../../controls/checkbox/formikCheckbox'
import { Formik, Form, Field } from 'formik'
import Button from '../../../controls/button/button'

import useInterestDialog from '../../home/hooks/useInterest'
import { useTranslation } from 'react-i18next'

type UseInterestDialogProps = {}
type ReturnTypeUseInterestDialog = ReturnType<typeof useInterestDialog>

type InterestDialogViewProps = ReturnTypeUseInterestDialog & {}
let InterestDialogView: React.FC<InterestDialogViewProps> = observer(({ handleSubmit, handleCancel, interestList }) => {
    const { t, i18n } = useTranslation()
    const classes = useStyles()
    return (
        <>
            <Grid container
                justify='center'
                alignItems='center'
                // style={{ marginTop: 25, marginBottom: 75 }}
                className={classes.gridContent}
            >
                <Typography variant='h2' color='primary' style={{ padding: '20px 0px' }}>
                    {t('PROFILE.WHAT_IS_YOUR_INTERESTED')}
                </Typography>
                <Typography variant='h5' style={{ marginBottom: 20 }}>
                    {t('PROFILE.INTERESTED_DESC')}
                </Typography>

                <Formik
                    initialValues={{
                        interests: [false, false, false, false, false, false],
                    }}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        {interestList.map((item, index) => {
                            return (
                                <Grid item xs={12} key={index} style={{ marginBottom: 10, display: 'flex' }}>
                                    <Field
                                        name={`interests[${index}]`}
                                        component={Checkbox}
                                        type='checkbox'
                                        label={i18n.language === 'th' ? item.menuNameTH : item.menuNameEN}
                                        color='secondary'
                                        filledIcon
                                    />
                                </Grid>
                            )
                        })}

                        <Button
                            label={t('PROFILE.SUBMIT')}
                            btnType='save'
                            fullWidth
                            style={{ height: 48, position: 'absolute', left: '8%', width: '83%', marginTop: 20 }}
                            type='submit'
                        />
                        <Button
                            label={t('LOGIN.SKIP')}
                            btnType='cancel'
                            fullWidth
                            style={{ height: 48, position: 'absolute', left: '8%', width: '83%', marginTop: 80, marginBottom: 10 }}
                            onClick={handleCancel}
                        />
                    </Form>
                </Formik>
            </Grid>
        </>
    )
})

type InterestDialogProps = UseInterestDialogProps & Omit<InterestDialogViewProps, keyof ReturnTypeUseInterestDialog>
let InterestDialog: React.FC<InterestDialogProps> = ({ ...others }) => {
    const interestDialog = useInterestDialog()
    return <InterestDialogView {...interestDialog} {...others} />
}

export default observer(InterestDialog)

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        gridContent: {
            [theme.breakpoints.up('xl')]: {
                marginTop: 25, marginBottom: 75
            },
        },
        cancelButton: {
            [theme.breakpoints.up('xl')]: {
                marginBottom: 20
            },
        },
    }),
)
