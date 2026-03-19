import React, { FC, ChangeEvent } from 'react'
import { FieldProps } from 'formik'
import Selects, { SelectPropsType } from './selects'
import useFormikControls from '../useFormikControls'
import { CSSProperties } from '@material-ui/core/styles/withStyles'

type SelectFieldType = SelectPropsType & FieldProps

const FormikTextField: FC<SelectFieldType> = (props) => {
    const { handleChange, error, errorText } = useFormikControls(props)
    return (
        <Selects
            {...props}
            value={props.field.value}
            handleChange={handleChange}
            error={error}
            helperText={errorText}
        />
    )
}

export default FormikTextField
