import { Grid, makeStyles, Theme, createStyles } from '@material-ui/core'
import React from 'react'
import useFormManageAttraction from './useFormManageAttraction'
import { useTranslation } from 'react-i18next'
import Button from '../../../controls/button/button'
import { observer } from 'mobx-react-lite'
import { FormikProps, FieldArrayRenderProps, FieldArray, Formik } from 'formik'
import { FormDayTripStructure } from './FormDayTripStructure'
import TabPanel, { InitialTabObj } from '../../../controls/tabs/addableTabs'
import FormCreate from './formCreate'

type FormManageAttractionViewProps = {} & ReturnType<typeof useFormManageAttraction>

export let FormManageAttractionView: React.FC<FormManageAttractionViewProps> = ({
    onPreview,
    onCancel,
    initFormTrip,
    refFormDayOfTrip,
    onCallBackRemoveTab,
    onCallBackAddTab,
    ...props
}) => {
    const { t, i18n } = useTranslation()
    const classes = useStyles()

    return (
        <Grid className={classes.container} container alignItems='flex-start' justify='center'>
            <Grid item xs={11} sm={8} className={classes.content}>
                <Formik<FormDayTripStructure>
                    initialValues={initFormTrip}
                    onSubmit={() => {}}
                    enableReinitialize={true}
                >
                    {(formProps: FormikProps<FormDayTripStructure>) => {
                        const { values: formState } = formProps
                        refFormDayOfTrip.current = formProps

                        return (
                            <FieldArray name='days'>
                                {(fieldArrayProps: FieldArrayRenderProps) => {
                                    const {
                                        form: { values },
                                    } = fieldArrayProps

                                    return (
                                        <TabPanel
                                            activeKey={formState?.initialTabDay ?? 0}
                                            onCallBackRemoveTab={onCallBackRemoveTab(fieldArrayProps)}
                                            onCallBackAddTab={onCallBackAddTab(fieldArrayProps)}
                                            isRemoveTab={true}
                                            isAddTab={true}
                                            initialTab={
                                                formState.days.map((item, index) => {
                                                    return {
                                                        title: t('TRIP.UNIT_DAY_TEXT').replace(
                                                            '[{day}]',
                                                            String(index + 1),
                                                        ),
                                                        activeKey: index,
                                                        content: (
                                                            <FormCreate
                                                                formDayTripProps={formProps}
                                                                fieldDayTripArray={fieldArrayProps}
                                                                name={`days[${index}]`}
                                                                indexCurrentDay={index}
                                                                {...item}
                                                            />
                                                        ),
                                                    }
                                                }) as InitialTabObj[]
                                            }
                                        />
                                    )
                                }}
                            </FieldArray>
                        )
                    }}
                </Formik>
            </Grid>
            <Grid item xs={10} sm={8} container justify={'flex-end'} spacing={2} style={{ marginTop: 40 }}>
                <Grid item className={classes.containerButton}>
                    <Button
                        label={t('TRIP.BTN_CANCEL_TEXT')}
                        style={{
                            width: '100%',
                            height: 34,
                            // marginRight: 20,
                        }}
                        onClick={onCancel}
                        btnType='cancel'
                    />
                </Grid>
                <Grid item className={classes.containerButton}>
                    <Button label={t('TRIP.SELECT_TEXT')} style={{ width: '100%', height: 34 }} onClick={onPreview} />
                </Grid>
            </Grid>
        </Grid>
    )
}

FormManageAttractionView = observer(FormManageAttractionView)

export type FormManageAttractionProps = {
    renderCurrentPage?: 'search-attraction' | 'route-preview'
    setRenderCurrentPage?: (value: 'search-attraction' | 'route-preview') => void
}

let FormManageAttraction: React.FC<FormManageAttractionProps> = (props) => {
    const state = useFormManageAttraction(props)
    return <FormManageAttractionView {...state} />
}

FormManageAttraction = observer(FormManageAttraction)

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        iconRemove: {
            color: '#B8B6B6',
            marginLeft: 10,
            '&:hover': {
                color: '#80BD01',
            },
        },
        container: {
            width: '100%',
            background: '#FFFFFF',
            paddingTop: 0,
            paddingBottom: 100,
            [theme.breakpoints.up('sm')]: {
                paddingTop: 40,
            },
            [theme.breakpoints.up('md')]: {
                paddingTop: 60,
            },
            [theme.breakpoints.up('lg')]: {
                paddingTop: 70,
            },
        },
        content: {
            marginTop: 75,
        },
        accordionClassName: {
            background: theme.colors.lightGreen,
        },
        accordionContentClassName: {
            background: theme.palette.common.white,
        },
        accordionSummaryClassName: {
            background: theme.colors.lightGreen,
        },
        accordionSummaryExpandedClassName: {
            background: 'red',
        },
        containerButton: {
            width: '140px',
            [theme.breakpoints.down('sm')]: {
                width: '100%',
            },
        },
    }),
)

export default FormManageAttraction
