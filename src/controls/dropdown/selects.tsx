import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select, { SelectProps } from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { CSSProperties } from '@material-ui/core/styles/withStyles'

export type SelectPropsType = SelectProps & {
    handleChange?: (props1?: any, props2?: any) => void;
    labelStyle?: CSSProperties;
    options: any[];
    displayField: { id: string; name: string };
    placeholderValue?: any;
    helperText?: string;
}
const NativeSelects: React.FC<SelectPropsType> = ({
    handleChange,
    value,
    defaultValue,
    variant = 'outlined',
    color = 'secondary',
    fullWidth = true,
    placeholder = "",
    inputProps,
    label = "",
    required,
    labelStyle,
    options,
    displayField,
    placeholderValue,
    error,
    helperText,
    ...props
}) => {

    const classes = useStyles();

    return (
        <FormControl variant={variant} className={classes.formControl} fullWidth={fullWidth}>
            <InputLabel shrink >
                <Typography variant="body2" className={classes.label} style={labelStyle}>
                    {label}
                    {required && <span style={{ color: 'red' }}>{' *'}</span>}
                </Typography>
            </InputLabel>
            <Select
                native
                value={value}
                defaultValue={defaultValue}
                onChange={(e) => {
                    handleChange && handleChange(e);
                }}
                inputProps={{
                    className: classes.input,
                    ...inputProps
                }}
                color={color}
                className={classes.select}
                style={{
                    marginTop: label ? 15 : 0
                }}
            >
                {placeholder && <option value={placeholderValue || ''} >{placeholder}</option>}

                {
                    options.map((item, index) => (
                        <option value={item[displayField.id]} key={index}>
                            {item[displayField.name]}
                        </option>
                    ))
                }
            </Select>
            <FormHelperText style={{ textAlign: 'right', color: 'red' }}> {error && helperText}</FormHelperText>
        </FormControl>
    )
}

export default NativeSelects

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            minWidth: 120,
        },
        select: {

        },
        input: {
            height: 40,
            paddingTop: 0,
            paddingBottom: 0
        },
        label: {
            color: '#8A8A8A',
            marginLeft: -18,
        },
    }),
);

