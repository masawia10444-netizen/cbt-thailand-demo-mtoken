import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { FieldProps } from 'formik'
import Radio, { RadioProps } from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Grid from '@material-ui/core/Grid'

import useFormikControls from '../../../controls/useFormikControls'

type FormikRadioProps = FieldProps &
    RadioProps & {
        label?: string
        required?: boolean
        disabled?: boolean
        id?: string
        value?: any
        onRadioChange?: (value: any) => void
        options: {
            id?: number | string
            name?: string
            label?: string
            value: any
        }[]
    }
const RadioButton: React.FC<FormikRadioProps> = ({ onRadioChange, value, name, label, options, ...props }) => {
    const { handleChange, error, errorText } = useFormikControls({ ...props, onRadioChange })

    const classes = useStyles()

    return (
        <FormControl component='fieldset' style={{ width: '100%' }}>
            {label && <FormLabel component='legend'>{label}</FormLabel>}

            <RadioGroup aria-label={name} name={name} value={props.field.value} onChange={handleChange}>
                <Grid container>
                    {options.length &&
                        options.map((item, index) => (
                            <Grid item xs key={index}>
                                <FormControlLabel
                                    value={item.value.toString()}
                                    control={<Radio />}
                                    label={item.label}
                                    classes={{
                                        label: classes.label,
                                    }}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        onRadioChange && onRadioChange(e.target.value)
                                    }}
                                />
                            </Grid>
                        ))}
                </Grid>
            </RadioGroup>
        </FormControl>
    )
}

export default RadioButton

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        label: {
            fontSize: 12,
            [theme.breakpoints.up('md')]: {
                fontSize: 14,
            },
        },
    }),
)
