import { ChangeEvent } from 'react'
import { FieldProps } from 'formik'

export type useFormikControlstype = FieldProps & {
    onTextChange?: (event: ChangeEvent<HTMLInputElement>) => void
    onCheckboxChange?: (checked: boolean) => void
    onRadioChange?: (checked: any) => void
}
const useFormikControls = ({ form, field, onTextChange, onCheckboxChange, onRadioChange }: useFormikControlstype) => {
    let error = form.errors[field.name] !== undefined && form.touched[field.name] !== undefined
    let errorText: string = ((form.errors[field.name] as unknown) as string) ?? ''

    if (field.checked !== undefined) {
        error = form.errors[field.name] !== undefined
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const type = event.target.type

        if (type !== 'checkbox') {
            form.setFieldValue(field.name, event.target.value)
            if (onTextChange) onTextChange(event)
        } else if (type === 'checkbox') {
            form.setFieldValue(field.name, event.target.checked)
            if (onCheckboxChange) onCheckboxChange(event.target.checked)
            if (onRadioChange) onRadioChange(event.target.value)
        }
    }

    return {
        error,
        errorText,
        handleChange,
        form,
    }
}

export default useFormikControls
