import React, { FC, ChangeEvent, useState } from 'react'
import { makeStyles, withStyles, fade } from '@material-ui/core/styles'
import { TextField, createStyles, Theme, Typography } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormHelperText from '@material-ui/core/FormHelperText'

import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import HighlightOff from '@material-ui/icons/HighlightOff'
import OutlinedInput from '@material-ui/core/OutlinedInput'

import { CSSProperties } from '@material-ui/core/styles/withStyles'
import clsx from 'clsx'
import useTextField from './useTextField'
import { useTranslation } from 'react-i18next'
import ClearIcon from '@material-ui/icons/Clear'
import { FieldArrayRenderProps, FieldInputProps, FormikProps } from 'formik'
import FilledInput from '@material-ui/core/FilledInput'

const OutlinedTextInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        marginTop: 10,
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        width: '100%',
        padding: '10px 12px',
        color: theme.palette.common.black,
        fontFamily: theme.fontStyle.prompt.h5.fontFamily,
        '&:focus': {
            // boxShadow: `${fade(theme.palette.secondary.main, 0.25)} 0 0 0 0.2rem`,
            border: '2px solid ' + theme.palette.secondary.main,
        },
    },
}))(InputBase)

export type TextFieldProps = {
    id?: string
    label?: string
    value?: string
    defaultValue?: string
    placeholder?: string
    required?: boolean
    disabled?: boolean
    error?: boolean
    type?: string
    leftIcon?: JSX.Element
    rightIcon?: JSX.Element
    variant?: 'filled' | 'outlined' | 'standard'
    helperText?: string
    handleChange?: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
    clearable?: boolean
    name?: string
    style?: CSSProperties
    labelStyle?: CSSProperties
    handleTextChange?: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
    form: FormikProps<any>
    field: FieldInputProps<any>
}

const TextFieldView: FC<TextFieldProps> = ({
    handleChange,
    leftIcon,
    rightIcon,
    variant,
    label,
    helperText,
    required,
    type,
    clearable = false,
    style,
    error,
    labelStyle,
    handleTextChange,
    form,
    field,
    ...props
}) => {
    const { t } = useTranslation()
    const classes = useStyles()
    const {
        values,
        focused,
        setFocused,
        handleClickShowPassword,
        handleMouseDownPassword,
        handleClearInput,
        calType,
        inputProps,
    } = useTextField({ classes, type, variant, leftIcon, rightIcon })

    const fieldMeta = form.getFieldMeta(field.name)

    const genAdornment = () => {
        let endAdornment

        if (type === 'password') {
            endAdornment = (
                <InputAdornment position='end'>
                    <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge='end'>
                        {values.showPassword ? (
                            <Visibility style={{ color: '#B8B6B6' }} fontSize='small' />
                        ) : (
                            <VisibilityOff style={{ color: '#B8B6B6' }} fontSize='small' />
                        )}
                    </IconButton>
                </InputAdornment>
            )
        } else if (clearable) {
            endAdornment = (
                <InputAdornment position='end'>
                    <IconButton edge='end' size='small' onClick={handleClearInput}>
                        <ClearIcon style={{ color: '#B8B6B6' }} fontSize='small' />
                    </IconButton>
                </InputAdornment>
            )
        } else {
            endAdornment = <div></div>
        }

        return endAdornment
    }

    return (
        <>
            {variant === 'outlined' ? (
                <FormControl variant='outlined' fullWidth>
                    <InputLabel shrink htmlFor={props.id || props.name}>
                        <Typography variant='body2' className={classes.label} style={labelStyle}>
                            {label}
                            {required && <span className={classes.labelRequired}>{' *'}</span>}
                        </Typography>
                    </InputLabel>
                    <OutlinedInput
                        {...props}
                        {...inputProps}
                        error={error}
                        required={required}
                        id={props.id || props.name}
                        type={calType()}
                        classes={{ input: classes.inputBase }}
                        style={{
                            marginTop: label ? 15 : 0,
                            background: props.disabled ? '#F6F6F6' : 'white',
                            ...style,
                        }}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                            handleChange && handleChange(e)
                            handleTextChange && handleTextChange(e)
                        }}
                        color='secondary'
                        // endAdornment={rightIcon || (!props.disabled && focused && genAdornment())}
                        endAdornment={
                            <InputAdornment position='end'>
                                {(() => {
                                    if (rightIcon) {
                                        return (
                                            <>
                                                <Typography
                                                    display='inline'
                                                    component='div'
                                                    style={{
                                                        paddingRight: 5,
                                                    }}
                                                >
                                                    {clearable && field.value && !props.disabled && (
                                                        <IconButton
                                                            edge='end'
                                                            size='small'
                                                            onClick={() => {
                                                                form.setFieldValue(field.name, '')
                                                            }}
                                                        >
                                                            <ClearIcon style={{ color: '#B8B6B6' }} fontSize='small' />
                                                        </IconButton>
                                                    )}
                                                </Typography>

                                                {rightIcon}
                                            </>
                                        )
                                    }
                                    if (type === 'password') {
                                        return (
                                            <>
                                                <Typography
                                                    display='inline'
                                                    component='div'
                                                    style={{
                                                        paddingRight: 5,
                                                    }}
                                                >
                                                    {clearable && field.value && !props.disabled && (
                                                        <IconButton
                                                            edge='end'
                                                            size='small'
                                                            onClick={() => {
                                                                form.setFieldValue(field.name, '')
                                                            }}
                                                        >
                                                            <ClearIcon style={{ color: '#B8B6B6' }} fontSize='small' />
                                                        </IconButton>
                                                    )}
                                                </Typography>
                                                <IconButton
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge='end'
                                                    size='small'
                                                >
                                                    {values.showPassword ? (
                                                        <Visibility style={{ color: '#B8B6B6' }} fontSize='small' />
                                                    ) : (
                                                        <VisibilityOff style={{ color: '#B8B6B6' }} fontSize='small' />
                                                    )}
                                                </IconButton>
                                            </>
                                        )
                                    }

                                    if (clearable && field.value && !props.disabled) {
                                        return (
                                            <IconButton
                                                edge='end'
                                                size='small'
                                                onClick={() => {
                                                    form.setFieldValue(field.name, '')
                                                }}
                                            >
                                                <ClearIcon style={{ color: '#B8B6B6' }} fontSize='small' />
                                            </IconButton>
                                        )
                                    }
                                })()}
                            </InputAdornment>
                        }
                        labelWidth={0}
                        onFocus={() => {
                            form.setFieldTouched(field.name, true)
                            setFocused(false)
                        }}
                        onBlur={() => {
                            form.setFieldTouched(field.name, true)
                            setFocused(false)
                        }}
                    />
                    <FormHelperText className={classes.formHelperText}>
                        {fieldMeta.error && fieldMeta.touched && t(fieldMeta.error as string)}
                    </FormHelperText>
                </FormControl>
            ) : (
                <TextField
                    {...props}
                    error={error}
                    label={label}
                    variant={variant}
                    fullWidth
                    color='primary'
                    required={required}
                    // InputProps={inputProps}
                    classes={{ root: classes.root }}
                    onChange={handleChange}
                    helperText={t(helperText) || helperText}
                    style={style}
                    InputLabelProps={{
                        style: labelStyle,
                    }}
                    type={calType()}
                    InputProps={{
                        ...inputProps,
                        endAdornment: (
                            <InputAdornment position='end'>
                                {(() => {
                                    if (rightIcon) {
                                        return (
                                            <>
                                                <Typography
                                                    display='inline'
                                                    component='div'
                                                    style={{
                                                        paddingRight: 5,
                                                    }}
                                                >
                                                    {clearable && field.value && !props.disabled && (
                                                        <IconButton
                                                            edge='end'
                                                            size='small'
                                                            onClick={() => {
                                                                form.setFieldValue(field.name, '')
                                                            }}
                                                        >
                                                            <ClearIcon style={{ color: '#B8B6B6' }} fontSize='small' />
                                                        </IconButton>
                                                    )}
                                                </Typography>

                                                {rightIcon}
                                            </>
                                        )
                                    }
                                    if (type === 'password') {
                                        return (
                                            <>
                                                <Typography
                                                    display='inline'
                                                    component='div'
                                                    style={{
                                                        paddingRight: 5,
                                                    }}
                                                >
                                                    {clearable && field.value && !props.disabled && (
                                                        <IconButton
                                                            edge='end'
                                                            size='small'
                                                            onClick={() => {
                                                                form.setFieldValue(field.name, '')
                                                            }}
                                                        >
                                                            <ClearIcon style={{ color: '#B8B6B6' }} fontSize='small' />
                                                        </IconButton>
                                                    )}
                                                </Typography>
                                                <IconButton
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge='end'
                                                    size='small'
                                                >
                                                    {values.showPassword ? (
                                                        <Visibility style={{ color: '#B8B6B6' }} fontSize='small' />
                                                    ) : (
                                                        <VisibilityOff style={{ color: '#B8B6B6' }} fontSize='small' />
                                                    )}
                                                </IconButton>
                                            </>
                                        )
                                    }

                                    if (clearable && field.value && !props.disabled) {
                                        return (
                                            <IconButton
                                                edge='end'
                                                size='small'
                                                onClick={() => {
                                                    form.setFieldValue(field.name, '')
                                                }}
                                            >
                                                <ClearIcon style={{ color: '#B8B6B6' }} fontSize='small' />
                                            </IconButton>
                                        )
                                    }
                                })()}
                            </InputAdornment>
                        ),
                    }}
                    autoComplete='on'
                />
            )}
        </>
    )
}

export default TextFieldView

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            color: 'white',
            '& label.Mui-focused': {
                color: theme.palette.secondary.main,
            },
            '& .MuiInput-underline:before': {
                borderBottomColor: theme.colors.lightGreen,
            },
            '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                borderBottom: '2px solid ' + theme.colors.lightGreen,
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: theme.palette.secondary.main,
                boxShadow: '0px 3px 6px #80bd01d1',
            },
        },
        inputBase: {
            padding: 8,
        },
        disadled: {
            //backgroundColor: theme.palette.disabled,
        },
        textField: {
            color: 'white',
            height: 30,
        },
        textFieldDot: {
            color: 'white',
            // height: 30,
            // fontFamily: theme.fontStyle.prompt.h1.fontFamily,
            // fontSize: 24,
            // letterSpacing: 2.5
        },
        outlinedTextField: {
            color: theme.palette.common.black,
            fontFamily: theme.fontStyle.prompt.h5.fontFamily,
            fontSize: 16,
            height: 34,
            [theme.breakpoints.up('sm')]: {
                height: 48,
            },
        },
        outlinedTextFieldDot: {
            color: theme.palette.common.black,
            fontFamily: theme.fontStyle.prompt.h5.fontFamily,
            fontSize: 16,
            height: 34,
            [theme.breakpoints.up('sm')]: {
                height: 48,
            },
        },
        formControl: {
            display: 'flex',
            width: '100%',
        },
        inputRoot: {
            //fontSize: theme.typography.h5,
            height: 32,
            //color: theme.palette.black,
            //fontWeight: theme.fontWeight.Regular,
            borderRadius: 2,
        },
        label: {
            color: '#8A8A8A',
            marginLeft: -18,
        },
        labelRequired: {
            color: '#F30606',
        },
        withLeftIcon: {
            paddingLeft: 30,
        },
        formHelperText: {
            textAlign: 'right',
            color: 'red',
            fontSize: 9,
            marginRight: 5,
            [theme.breakpoints.up('sm')]: {
                fontSize: 10,
            },
            [theme.breakpoints.up('lg')]: {
                fontSize: 11,
            },
        },
    }),
)
