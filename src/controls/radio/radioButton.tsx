import React, { ChangeEvent, useState, MouseEvent } from 'react'

import { makeStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Radio } from '@material-ui/core'
import { RadioProps } from '@material-ui/core/Radio'
import RadioGroup, { RadioGroupProps } from '@material-ui/core/RadioGroup'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import useRadioButton from './useRadioButton'
import clsx from 'clsx'

const useStyles = makeStyles((theme: Theme) => ({
    checkedColor: {
        '&.MuiRadio-colorSecondary.Mui-checked': {
            color: '#80BD01',
        },
        '&.MuiCheckbox-colorSecondary.Mui-disabled': {
            color: 'rgba(0, 0, 0, 0.26)',
        },
    },
    label: {
        // color: theme.mainTheme.color1,
        // fontSize: theme.fontSize.body1,
    },
    styleMui: {
        '& svg': {
            width: '23px',
        },
    },
    fontLabel: {
        //fontSize: theme.fontSize.body1,
    },
    errorText: {
        //color: theme.mainTheme.color5,
        marginTop: '1px',
        marginLeft: '10px',
    },
    error: {
        //color: theme.mainTheme.color5,
    },
    formHelper: {
        color: 'red',
        marginTop: '1px',
        marginLeft: '10px',
    },
    fullWidth: {
        width: '100%',
    },
    colorErr: {
        //color: theme.mainTheme.color5,
    },
    asterisk: {
        color: 'red',
    },
}))

type option = {
    id: number | string
    name: string
}

export type RadioButtonProps = RadioGroupProps & {
    options: option[]
    defaultValue?: number[]
    label?: string
    disabled?: boolean
    isError?: boolean
    textError?: string
    required?: boolean
    //onChange: (event: ChangeEvent<HTMLInputElement>) => void | undefined
    onClick: (event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void
    fullWidth?: boolean
}

const RadioButton: React.FC<RadioProps & RadioButtonProps> = (props) => {
    const classes = useStyles()
    const asterisk = props.required ? <span className={classes.asterisk}>*</span> : ''

    const radioButtonModel = useRadioButton({
        value: props.value,
        onClick: props.onClick,
    })

    const defaultValue = String(props.defaultValue)

    return (
        <Grid container className={classes.fullWidth}>
            <FormControl className={classes.fullWidth} component='fieldset'>
                <FormLabel className={`${classes.label} ${classes.fullWidth}`}>
                    {props.label}
                    {asterisk}
                </FormLabel>
                <RadioGroup
                    defaultValue={defaultValue}
                    className={classes.fullWidth}
                    value={radioButtonModel.value.id}
                    //onChange={radioButtonModel.handleChange}
                >
                    <Grid container>
                        {props.options.map((item, index) => {
                            return (
                                <FormControlLabel
                                    key={index}
                                    value={String(item.id)}
                                    control={
                                        <Radio
                                            classes={{ checked: classes.checkedColor }}
                                            disabled={props.disabled}
                                            required={props.required}
                                            onClick={radioButtonModel.handleClick}
                                        />
                                    }
                                    label={item.name}
                                    classes={{ root: clsx(classes.fontLabel, props.fullWidth && classes.fullWidth) }}
                                />
                            )
                        })}
                    </Grid>
                </RadioGroup>
                <FormHelperText className={classes.formHelper}>{props.isError ? props.textError : ''}</FormHelperText>
            </FormControl>
        </Grid>
    )
}

export default RadioButton
