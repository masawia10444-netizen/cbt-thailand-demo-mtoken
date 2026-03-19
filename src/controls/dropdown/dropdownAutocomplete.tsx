import React from 'react'
import clsx from 'clsx'

import { FieldProps } from 'formik'
//Material UI
// import makeStyles from '@material-ui/core/styles/makeStyles';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import { useTranslation } from 'react-i18next'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import InputAdornment from '@material-ui/core/InputAdornment'
import DateIcon from '@material-ui/icons/DateRange'
//constanst
import FontSize from '../../constants/fontSize'
import ColorWeb from '../../constants/colorWeb'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        rootTextfieldSearch: {
            ...theme.typography.h5,
            width: '150px',
            color: theme.colors.textBlack,
            backgroundColor: theme.colors.white,
            padding: 0,
            [theme.breakpoints.up('sm')]: {
                width: '200px',
            },
            [theme.breakpoints.up('sm')]: {
                width: '150px',
            },
            [theme.breakpoints.up('lg')]: {
                width: '200px',
            },
        },
        inputRoot: {
            height: 35,
            padding: '0px !important',
            fontSize: '14px !important',
            paddingLeft: '6px !important',
            color: theme.colors.textBlack,
            fontWeight: 'bolder',
        },
        popupIndicator: {
            color: '#80BD01',
        },
        popupIndicatorRotate: {
            transform: 'rotate(0deg)',
        },
        input: {
            marginRight: 52
        }
    }),
)

export type otherPropsType = {
    dataSource: any[]
    displayField: { id: string; name: string }
    placeholder?: string
    onChange?: (value: string | null) => void
    icon?: React.ReactNode
    initialValue?: () => any
    disabled?: boolean
    // required?: {
    //     isRequired: boolean
    //     messageError: string
    // }
    // value: any,
} & FieldProps

type UsedropdownProps = {}
type ReturnTypeUsedropdown = ReturnType<typeof usedropdown>
function usedropdown(props: UsedropdownProps) {
    const { } = props
    return {}
}

type dropdownViewProps = ReturnTypeUsedropdown & otherPropsType
let DropdownView: React.FC<dropdownViewProps> = ({
    dataSource,
    form,
    field,
    displayField,
    placeholder,
    onChange,
    icon,
    disabled,
    initialValue,
    ...props
}) => {
    const fieldMeta = form.getFieldMeta<number>(field.name)
    const classes = useStyles()
    const { t } = useTranslation()

    const handleChange = (e: React.ChangeEvent<{}>, value: any) => {
        if (value) {

            form.setFieldValue(field.name, value[displayField.id])
            if (onChange) onChange(value[displayField.id])
        } else {
            form.setFieldValue(field.name, null)
            if (onChange) onChange(null)
        }
    }

    return (
        <>
            <Autocomplete
                id={`combo-box-${field.name}`}
                style={{ width: '100%', padding: '0px !important' }}
                ListboxProps={{ style: { maxHeight: 200 } }}
                options={dataSource.filter((item) => item[displayField.name] !== '')}
                getOptionLabel={(option) => option[displayField.name]}
                getOptionSelected={(option, value) => option[displayField.name] === value[displayField.name]}
                onChange={handleChange}
                value={initialValue}
                openOnFocus
                disabled={disabled}
                popupIcon={icon}
                classes={{
                    inputRoot: classes.inputRoot,
                    popupIndicator: clsx(icon && classes.popupIndicator, icon && classes.popupIndicatorRotate),
                    input: classes.input
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        color='secondary'
                        variant='outlined'
                        InputLabelProps={{ shrink: true }}
                        style={{ backgroundColor: '#fff', borderRadius: 4 }}
                        placeholder={placeholder} //ชื่อ dropdown ที่ต้องการค้นหา
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
                    {t(fieldMeta.error)}
                </Typography>
            )}
        </>
    )
}

type dropdownProps = UsedropdownProps & Omit<dropdownViewProps, keyof ReturnTypeUsedropdown> & otherPropsType

let Dropdown: React.FC<dropdownProps> = ({ ...others }) => {
    const dropdown = usedropdown({})

    const getValue = () => {
        const data = others.dataSource.find((item) => item[others.displayField.id] === others.field.value)
        // console.log('getValue', data)
        return data ?? null
    }
    return <DropdownView {...dropdown} {...others} initialValue={getValue()} />
}

export default Dropdown
