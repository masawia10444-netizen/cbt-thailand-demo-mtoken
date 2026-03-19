import React, { FC, ChangeEvent } from 'react'
import { FieldProps } from 'formik'
import TextField, { TextFieldProps } from './textField'
import useFormikControls from '../useFormikControls'
import { CSSProperties } from '@material-ui/core/styles/withStyles'

type textFieldProps = TextFieldProps & FieldProps

const FormikTextField: FC<textFieldProps> = (props) => {
    const { handleChange, error, errorText, form } = useFormikControls(props)

    return (
        <TextField
            {...props}
            value={props.field.value}
            handleChange={handleChange}
            handleTextChange={props.handleTextChange}
            error={error}
            helperText={errorText}
            form={form}
        />
    )
}

export default FormikTextField
