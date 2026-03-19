import React from 'react'
import { observer } from 'mobx-react-lite'
import usePreviewTrip from './usePreviewTrip'
import { useTranslation } from 'react-i18next'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import PreviewMap from './previewMap'
import Grid from '@material-ui/core/Grid'
import TabPanel, { InitialTabObj } from './../../../controls/tabs/addableTabs'
import Button from '../../../controls/button/button'
import FormikTextField from '../../../controls/textField/formikTextField'

import { Formik, FormikProps, FastField, FieldArray, FieldArrayRenderProps } from 'formik'

import AttractionFieldArray from './attractionFieldArray'
import Typography from '@material-ui/core/Typography'
import { FormDayTripStructure, DayTripStructure } from '../form/FormDayTripStructure'
import { ConfirmationDialog } from '../../../controls/dialog/confirmationDialog'
import { formatNumberWithComma } from '../../../utilities/formatTextUtils'

const validateTripName = (messageError: string) => (value: any) => {
    if (value) {
        return undefined
    }
    return messageError
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '0px solid #000',
        },
        paper: {
            // position: 'absolute',
            width: 560,
            minHeight: 476,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            borderRadius: 10,
            border: '0px solid #000',
        },
        titleName: {
            color: '#166936',
            textAlign: 'center',
        },
        description: {
            color: '#009687',
            textAlign: 'left',
            // fontWeight: 600,
        },
    }),
)

type ReturnTypeUsePreviewTrip = ReturnType<typeof usePreviewTrip>

type PreviewTripViewProps = ReturnTypeUsePreviewTrip & {
    renderCurrentPage?: 'search-attraction' | 'route-preview'
    setRenderCurrentPage?: (value: 'search-attraction' | 'route-preview') => void
    activeMode?: 'create' | 'edit'
}

const BoxDailyCost = ({ dayName, cost }: { dayName: string; cost: string }) => {
    const classes = useStyles()
    return (
        <Typography
            component='div'
            style={{
                border: '1px solid #D4E8DC',
                minWidth: '88px',
                // float: 'left',
                textAlign: 'left',
                padding: 5,
            }}
        >
            <Typography variant='body1' component='div'>
                {dayName}
            </Typography>
            <Typography variant='h5' component='div' className={classes.description}>
                {cost}
            </Typography>
        </Typography>
    )
}

export let PreviewTripView: React.FC<PreviewTripViewProps> = ({
    onSubmit,
    handleClose,
    onCancel,
    onEdit,
    handleOpen,
    onCancelCreateTrip,
    onCallBackRemoveTab,
    onCreateTrip,
    open,
    initFormTrip,
    refFormDayOfTrip,
    activeMode = 'create',
    ...props
}) => {
    const classes = useStyles()
    const { t, i18n } = useTranslation()

    const concat = (x, y) => x.concat(y)
    const flatMap = (fx, arr) => arr.map(fx).reduce(concat, [])

    if (Array.prototype.flatMap === undefined) {
        Array.prototype.flatMap = function (f) {
            return flatMap(f, this)
        }
    }

    return (
        <Grid className={classes.container} container alignItems='flex-start' justify='center'>
            <Grid item xs={11} sm={8} className={classes.content}>
                <Formik<FormDayTripStructure>
                    initialValues={initFormTrip}
                    onSubmit={() => { }}
                    enableReinitialize={true}
                // validateOnBlur={false}
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

                                    const formStateDays = formState?.days ?? []

                                    const totalCostAlldays = formStateDays
                                        .flatMap((item) => item.attractionSelect)
                                        .filter((item) => typeof item?.attracFee === 'number')
                                        .map((item) => item?.attracFee)
                                        .reduce((acc: any, crr: any) => acc + crr, 0)

                                    const dailyCost = formStateDays.map(
                                        ({ attractionSelect = [] }: DayTripStructure, index: number) => ({
                                            dayName: index + 1,
                                            dailyCost: attractionSelect
                                                .filter((item) => typeof item?.attracFee === 'number')
                                                .map((item) => item?.attracFee)
                                                .reduce((acc: any, crr: any) => acc + crr, 0) as number,
                                        }),
                                    )

                                    return (
                                        <TabPanel
                                            isRemoveTab={true}
                                            onCallBackRemoveTab={onCallBackRemoveTab(fieldArrayProps)}
                                            initialTab={
                                                formStateDays.map((item: DayTripStructure, index: number) => {
                                                    return {
                                                        title: t('TRIP.UNIT_DAY_TEXT').replace(
                                                            '[{day}]',
                                                            String(index + 1),
                                                        ),
                                                        activeKey: index,
                                                        content: (
                                                            <React.Fragment key={index}>
                                                                <Grid container alignItems='flex-start'>
                                                                    <Grid container spacing={4}>
                                                                        <Grid item xs={12}>
                                                                            <Button
                                                                                style={{ width: 176 }}
                                                                                onClick={onEdit(index)}
                                                                                btnType='add'
                                                                                label={t('TRIP.BTN_EDIT_LOCATION_TEXT')}
                                                                            />
                                                                        </Grid>
                                                                        <Grid item xs={12}>
                                                                            <AttractionFieldArray
                                                                                formDayTripProps={formProps}
                                                                                fieldDayTripArray={fieldArrayProps}
                                                                                name={`days[${index}]`}
                                                                                {...item}
                                                                            />
                                                                        </Grid>
                                                                        <Grid item xs={12} style={{ height: '448px' }}>
                                                                            <PreviewMap dataMap={[item]} />
                                                                        </Grid>
                                                                        <Grid item xs={12}>
                                                                            <Grid
                                                                                container
                                                                                alignItems='center'
                                                                                justify='flex-end'
                                                                                spacing={2}
                                                                            >
                                                                                <Grid item xs={12} sm={4}>
                                                                                    <Button
                                                                                        label={t(
                                                                                            'TRIP.BTN_CANCEL_TEXT',
                                                                                        )}
                                                                                        style={{ height: 48 }}
                                                                                        btnType='cancel'
                                                                                        onClick={() => {
                                                                                            onCancel()
                                                                                        }}
                                                                                    />
                                                                                </Grid>
                                                                                <Grid item xs={12} sm={4}>
                                                                                    <Button
                                                                                        label={
                                                                                            activeMode === 'create'
                                                                                                ? t(
                                                                                                    'TRIP.BTN_ADD_TRIP_TEXT',
                                                                                                )
                                                                                                : t(
                                                                                                    'TRIP.BTN_EDIT_TRIP_TEXT',
                                                                                                )
                                                                                        }
                                                                                        style={{ height: 48 }}
                                                                                        onClick={onCreateTrip}
                                                                                    />
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <ConfirmationDialog
                                                                            open={open}
                                                                            onConfirm={onSubmit}
                                                                            onDismiss={onCancelCreateTrip}
                                                                            okText={t('TRIP.BTN_OK_TEXT')}
                                                                            cancelText={t('TRIP.BTN_CANCEL_TEXT')}
                                                                            component={
                                                                                <Grid
                                                                                    container
                                                                                    // className={classes.paper}
                                                                                    justify='flex-start'
                                                                                    spacing={4}
                                                                                >
                                                                                    <Grid item xs={12}>
                                                                                        <Typography
                                                                                            variant='h2'
                                                                                            className={
                                                                                                classes.titleName
                                                                                            }
                                                                                        >
                                                                                            {activeMode === 'create'
                                                                                                ? t(
                                                                                                    'TRIP.CREATE_NEW_TRIP_TEXT',
                                                                                                )
                                                                                                : t(
                                                                                                    'TRIP.UPDATE_TRIP_TEXT',
                                                                                                )}
                                                                                        </Typography>
                                                                                    </Grid>
                                                                                    <Grid item xs={12}>
                                                                                        <FastField
                                                                                            name='tripName'
                                                                                            component={FormikTextField}
                                                                                            variant='outlined'
                                                                                            label={t(
                                                                                                'TRIP.NAME_YOUR_TRIP_TEXT',
                                                                                            )}
                                                                                            validate={validateTripName(
                                                                                                t(
                                                                                                    'TRIP.PLEASE_ENTER_TEXT',
                                                                                                ),
                                                                                            )}
                                                                                        />
                                                                                    </Grid>
                                                                                    <Grid item xs={12}>
                                                                                        <Grid
                                                                                            container
                                                                                            justify='space-between'
                                                                                            spacing={2}
                                                                                        >
                                                                                            <Grid item>
                                                                                                <Typography variant='body1'>
                                                                                                    {t(
                                                                                                        'TRIP.COUNT_DAYS_TEXT',
                                                                                                    )}
                                                                                                </Typography>
                                                                                                <Typography
                                                                                                    variant='h3'
                                                                                                    className={
                                                                                                        classes.description
                                                                                                    }
                                                                                                >
                                                                                                    {
                                                                                                        formStateDays?.length
                                                                                                    }
                                                                                                </Typography>
                                                                                            </Grid>
                                                                                            <Grid item>
                                                                                                <Typography variant='body1'>
                                                                                                    {t(
                                                                                                        'TRIP.TOTAL_COST_TEXT_TWO',
                                                                                                    )}
                                                                                                </Typography>
                                                                                                <Typography
                                                                                                    variant='h3'
                                                                                                    className={
                                                                                                        classes.description
                                                                                                    }
                                                                                                >
                                                                                                    {`${formatNumberWithComma(totalCostAlldays)} ${t(
                                                                                                        'TRIP.UNIT_BATH_TEXT',
                                                                                                    )}`}
                                                                                                </Typography>
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                    <Grid item xs={12}>
                                                                                        <Grid
                                                                                            container
                                                                                            justify='flex-start'
                                                                                            spacing={2}
                                                                                        >
                                                                                            <Grid item>
                                                                                                <Typography variant='body1'>
                                                                                                    {t(
                                                                                                        'TRIP.TOTAL_COST_DAILY_TEXT',
                                                                                                    )}
                                                                                                </Typography>
                                                                                            </Grid>
                                                                                            <Grid
                                                                                                item
                                                                                                container
                                                                                                xs={12}
                                                                                                spacing={2}
                                                                                                justify='flex-start'
                                                                                            >
                                                                                                {dailyCost.map(
                                                                                                    (item, j) => {
                                                                                                        return (
                                                                                                            <Grid
                                                                                                                item
                                                                                                                key={j}
                                                                                                            >
                                                                                                                <BoxDailyCost
                                                                                                                    dayName={t(
                                                                                                                        'TRIP.UNIT_DAY_TEXT',
                                                                                                                    ).replace(
                                                                                                                        '[{day}]',
                                                                                                                        String(
                                                                                                                            item.dayName,
                                                                                                                        ),
                                                                                                                    )}
                                                                                                                    cost={`${formatNumberWithComma(item.dailyCost)
                                                                                                                        } ${t(
                                                                                                                            'TRIP.UNIT_BATH_TEXT',
                                                                                                                        )}`}
                                                                                                                />
                                                                                                            </Grid>
                                                                                                        )
                                                                                                    },
                                                                                                )}
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                </Grid>
                                                                            }
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </React.Fragment>
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
        </Grid>
    )
}

PreviewTripView = observer(PreviewTripView)

type PreviewTripProps = {
    renderCurrentPage?: 'search-attraction' | 'route-preview'
    setRenderCurrentPage?: (value: 'search-attraction' | 'route-preview') => void
    activeMode?: 'create' | 'edit'
}
let PreviewTrip: React.FC<PreviewTripProps> = (props) => {
    const previewTrip = usePreviewTrip(props)
    return <PreviewTripView {...previewTrip} {...props} />
}

PreviewTrip = observer(PreviewTrip)

export default PreviewTrip
