import { useEffect, useState, useMemo } from 'react'

export type UseTextFieldType = {
    classes: string
    type: string
    variant: 'filled' | 'outlined' | 'standard'
    leftIcon?: JSX.Element;
    rightIcon?: JSX.Element;
}
const useTextField = ({
    classes,
    type,
    variant,
    leftIcon,
    rightIcon
}) => {

    const [values, setValues] = useState({
        password: '',
        showPassword: false,
    });

    const [focused, setFocused] = useState(false)

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClearInput = (event) => {
        // handleChange()
    }



    const calType = () => {
        if (type === 'password') {
            return values.showPassword ? 'text' : 'password'
        } else {
            return type
        }
    }

    const genInputPropsClassName = () => {
        if (type === 'password' && variant === 'outlined') {
            return values.showPassword ? classes.outlinedTextField : classes.outlinedTextFieldDot
        }
        else if (type === 'password' && variant !== 'outlined') {
            return values.showPassword ? classes.textField : classes.textFieldDot
        }
        else if (type !== 'password' && variant === 'outlined') {
            return classes.outlinedTextField
        }
        else if (type !== 'password' && variant !== 'outlined') {
            return classes.textField
        }
    }

    let inputProps = { className: genInputPropsClassName() }
    if (leftIcon) {
        Object.assign(inputProps, {
            startAdornment: leftIcon,
            inputProps: {
                style: { paddingLeft: 8 }
            }
        })
    }
    rightIcon && Object.assign(inputProps, { endAdornment: rightIcon })


    return {
        values,
        focused,
        setFocused,
        handleClickShowPassword,
        handleMouseDownPassword,
        handleClearInput,
        calType,
        inputProps
    }
}
export default useTextField
