import React from 'react'
import { FieldProps } from 'formik'
import Checkbox from './checkbox'
import useFormikControls from '../useFormikControls'
import { CheckboxProps } from '@material-ui/core/Checkbox'

type FormikCheckboxProps = FieldProps &
    CheckboxProps & {
        label?: string
        required?: boolean
        disabled?: boolean
        id?: string
        value?: any
        noWrap?: boolean
        onCheckboxChange?: (check: boolean) => void
    }
let FormikCheckbox: React.FC<FormikCheckboxProps> = ({ onCheckboxChange, ...props }) => {
    const { handleChange, error, errorText } = useFormikControls({ ...props, onCheckboxChange })

    return <Checkbox {...props} {...props.field} handleChange={handleChange} error={error} helperText={errorText} />
}

export default FormikCheckbox
