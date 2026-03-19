import { Grid } from '@material-ui/core'
import { Field, FastField, FieldArrayRenderProps, FormikProps } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import DropdownAutocomplete from '../../../controls/dropdown/dropdownAutocomplete'
import FormikTextField from '../../../controls/textField/formikTextField'
// import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Button from '../../../controls/button/button'
import { observer } from 'mobx-react-lite'
import useFormSearch from './useFormSearch'
import { DayTripAttractionStructure, DayTripStructure, FormDayTripStructure } from './FormDayTripStructure'
import AutocompleteCheckbox from '../../../controls/autocomplete-checkbox/autocompleteCheckbox'
import { formatNumberWithComma } from '../../../utilities/formatTextUtils'

const requiredAutocomplete = (messageError: string) => (value: number) => {
    if (value) {
        return undefined
    }
    return messageError
}

type FormSearchViewProps = {
    formDayTripProps: FormikProps<FormDayTripStructure>
    fieldDayTripArray: FieldArrayRenderProps
    name: string
    indexCurrentDay: number
} & DayTripStructure &
    ReturnType<typeof useFormSearch>

let FormSearchView: React.FC<FormSearchViewProps> = ({
    province,
    attractionType,
    formDayTripProps,
    name,
    onSearch,
}) => {
    const { t, i18n } = useTranslation()
    //const isDisplaySearched = formDayTripProps?.getFieldProps(`${name}.isDisplaySearched`)?.value ?? false
    const budget = formDayTripProps?.getFieldProps(`${name}.budget`)?.value
    const totalCost = formDayTripProps
        ?.getFieldProps(`${name}.attractionSelect`)
        ?.value?.filter((item: DayTripAttractionStructure) => typeof item.attracFee === 'number')
        .map((item: DayTripAttractionStructure) => item.attracFee)
        .reduce((acc: any, crr: any) => acc + crr, 0)

    return (
        <>
            <Grid
                item
                xs={12}
                style={{ height: 40, background: '#D4E8DC', padding: '10px 20px ' }}
                container
                justify='space-between'
            >
                <Typography style={{ color: '#009687', fontSize: 14, fontFamily: 'Prompt-Regular' }}>
                    {t('TRIP.BTN_ADD_LOCATION_TEXT')}
                </Typography>
            </Grid>
            <Grid item xs={12} style={{ padding: 18, border: '2px solid #D4E8DC' }}>
                <Grid container alignItems='flex-start' spacing={2} style={{ paddingBottom: 20 }}>
                    <Grid item xs={12} md={3}>
                        <Grid item xs={12}>
                            <Typography variant='h5' style={{ color: '#009687', fontFamily: 'Prompt-Regular' }}>
                                {i18n.language === 'th' ? 'จังหวัด' : 'Province'}
                                {<span style={{ color: 'red' }}>{' *'}</span>}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                name={`${name}.provID`}
                                component={DropdownAutocomplete}
                                dataSource={province || []}
                                displayField={{
                                    id: 'provID',
                                    name: i18n.language === 'th' ? 'provNameTH' : 'provNameEN',
                                }}
                                placeholder={i18n.language === 'th' ? 'จังหวัด' : 'Province'}
                                validate={requiredAutocomplete(('TRIP.PLEASE_SELECT_TEXT'))}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Grid item xs={12}>
                            <Typography variant='h5' style={{ color: '#009687', fontFamily: 'Prompt-Regular' }}>
                                {i18n.language === 'th' ? 'ประเภท' : 'Type'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                name={`${name}.attractionTypeID`}
                                component={AutocompleteCheckbox}
                                dataSource={attractionType || []}
                                displayField={{
                                    id: 'attracTypeID',
                                    name: i18n.language === 'th' ? 'attracTypeTH' : 'attracTypeEN',
                                }}
                            // placeholder={i18n.language === 'th' ? 'ประเภท' : 'Type'}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={2} style={{ paddingTop: 26 }}>
                        <Button
                            label={t('TRIP.BTN_SEARCH_TEXT')}
                            btnType='save'
                            style={{ height: 34 }}
                            fontSize={14}
                            onClick={onSearch}
                        />
                    </Grid>

                    <Grid item xs={12} md={5} lg={3} style={{ marginTop: 20, marginRight: 5 }}>
                        <Grid item xs={12}>
                            <Typography variant='h5' style={{ color: '#009687', fontFamily: 'Prompt-Regular' }}>
                                {t('TRIP.BUDGET_TEXT')}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FastField
                                name={`${name}.budget`}
                                component={FormikTextField}
                                variant='outlined'
                                style={{ height: 34 }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={5} lg={7} style={{ marginTop: 20 }}>
                        <Grid item xs={12}>
                            <Typography variant='h5' style={{ color: '#009687', fontFamily: 'Prompt-Regular' }}>
                                {t('TRIP.TOTAL_COST_TEXT')}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} style={{ paddingTop: 8 }}>
                            <Typography
                                variant='h5'
                                style={{
                                    color: budget ? (totalCost > Number(budget) ? '#F30606' : '#090909') : '#090909',
                                    fontFamily: 'Prompt-Regular',
                                }}
                            >
                                {formatNumberWithComma(totalCost)}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
FormSearchView = observer(FormSearchView)

export type FormSearchProps = {
    formDayTripProps: FormikProps<FormDayTripStructure>
    fieldDayTripArray: FieldArrayRenderProps
    name: string
    indexCurrentDay: number
} & DayTripStructure

let FormSearch: React.FC<FormSearchProps> = (props) => {
    const state = useFormSearch(props)
    return <FormSearchView {...props} {...state} />
}

FormSearch = observer(FormSearch)

export default FormSearch
