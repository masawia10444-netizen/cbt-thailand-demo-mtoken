import { FieldAttributes, FieldProps } from 'formik'
import React from 'react'
import useAutocompleteCheckbox from './useAutocompleteCheckbox'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { TextFieldProps } from '@material-ui/core/TextField'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'
import RadioButtonUncheckedOutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import SvgIcon from '@material-ui/core/SvgIcon'

const icon = <RadioButtonUncheckedOutlinedIcon fontSize='small' />
const checkedIcon = <CheckCircleIcon fontSize='small' />

function DeleteIcon(props: any) {
    return (
        <SvgIcon {...props} size='' style={{ marginTop: 5 }}>
            <circle id='Ellipse_426' data-name='Ellipse 426' cx='8' cy='8' r='8' fill='#fff' />
            <g id='Group_2188' data-name='Group 2188' transform='translate(-1121.285 615.904) rotate(-45)'>
                <line
                    id='Line_297'
                    data-name='Line 297'
                    y2='7.65'
                    transform='translate(1228.325 365.5)'
                    fill='none'
                    stroke='#009687'
                    stroke-linecap='round'
                    stroke-width='2'
                />
                <line
                    id='Line_298'
                    data-name='Line 298'
                    y2='7.65'
                    transform='translate(1232.15 369.325) rotate(90)'
                    fill='none'
                    stroke='#009687'
                    stroke-linecap='round'
                    stroke-width='2'
                />
            </g>
        </SvgIcon>
    )
}

type AutocompleteCheckboxViewProps = {
    textFieldProps?: TextFieldProps
    displayField: { id: string; name: string }
    dataSource: any[]
    name: string
    initialValue?: any
    limitTags?: number
} & FieldProps<string[] | number[]> &
    ReturnType<typeof useAutocompleteCheckbox>

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        input: {
            width: '100%',
            padding: '3px !important',
            margin: '0px !important',
            minHeight: '35px !important',
            // height: '35px !important',
        },
    }),
)

const AutocompleteCheckboxView: React.FC<AutocompleteCheckboxViewProps> = ({
    textFieldProps,
    dataSource,
    displayField,
    field,
    form,
    initialValue,
    limitTags = 4,
    ...props
}) => {
    const fieldMeta = form.getFieldMeta<number>(field.name)
    const classes = useStyles()

    return (
        <>
            <Autocomplete
                // style={{
                //     width: '100%',
                //     padding: '0px !important',
                //     margin: '0px !important',
                //     height: '20px !important',
                // }}
                classes={{
                    inputRoot: classes.input,
                }}
                size='small'
                value={initialValue}
                multiple
                limitTags={limitTags}
                disableCloseOnSelect
                options={dataSource}
                ListboxProps={{ style: { maxHeight: 200 } }}
                getOptionLabel={(option: { [key: string]: any }) => option[displayField.name]}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip
                            // variant='outlined'
                            style={{
                                backgroundColor: '#D4E8DC',
                                fontWeight: 600,
                                height: 18,
                            }}
                            label={option[displayField.name]}
                            size='small'
                            {...getTagProps({ index })}
                            deleteIcon={<DeleteIcon />}
                        />
                    ))
                }
                onChange={(evt: React.ChangeEvent<{}>, values: any) => {
                    const valuesForm = values.map((item: { [key: string]: any }) => item[displayField.id])
                    form.setFieldValue(field.name, valuesForm)
                }}
                renderOption={(option, { selected }) => (
                    <React.Fragment>
                        <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                        {option[displayField.name]}
                    </React.Fragment>
                )}
                renderInput={(params) => (
                    <TextField
                        // inputProps={{
                        //     style: {
                        //         height: '20px !important',
                        //     },
                        // }}
                        {...params}
                        color='secondary'
                        variant='outlined'
                        InputLabelProps={{ shrink: true }}
                        {...textFieldProps}
                        SelectProps={{
                            native: true,
                        }}
                    />
                )}
            />
            {fieldMeta.error && fieldMeta.touched && (
                <Typography
                    variant='body1'
                    style={{
                        color: 'red',
                    }}
                >
                    {fieldMeta.error}
                </Typography>
            )}
        </>
    )
}

type AutocompleteCheckboxProps = {
    name: string
    textFieldProps?: TextFieldProps
    displayField: { id: string; name: string }
    dataSource: any[]
    limitTags?: number
} & FieldProps<string[] | number[]>

const AutocompleteCheckbox: React.FC<AutocompleteCheckboxProps> = ({ ...props }) => {
    const { dataSource = [], displayField, field } = props

    const getValue = () => {
        const fieldValue = field?.value ?? []

        //@ts-ignore
        const dataSourceMatch = fieldValue.map((value: string | number) => {
            const getObjValue = dataSource.find(
                (optionItem: { [key: string]: any }) => optionItem[displayField.id] === value,
            )

            return getObjValue
        })

        return dataSourceMatch
    }

    const state = useAutocompleteCheckbox()
    return <AutocompleteCheckboxView {...state} {...props} initialValue={getValue()} />
}

export default AutocompleteCheckbox
