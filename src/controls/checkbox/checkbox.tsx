import React, { ChangeEvent } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import MuiCheckbox, { CheckboxProps } from '@material-ui/core/Checkbox'
// import RadioButtonUncheckedOutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined'
import RadioButtonCheckedOutlinedIcon from '@material-ui/icons/RadioButtonCheckedOutlined'
import Typography from '@material-ui/core/Typography'
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded'
import { CSSProperties } from '@material-ui/core/styles/withStyles'
import { useTranslation } from 'react-i18next'
import RadioButtonUncheckedOutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

type CheckboxViewProps = CheckboxProps & {
    id?: string
    label?: string | JSX.Element
    formLabel?: string
    value?: any
    required?: boolean
    disabled?: boolean
    error?: boolean
    helperText?: string
    handleChange?: (event: ChangeEvent<HTMLInputElement>, value?: any) => void
    noWrap?: boolean
    filledIcon?: boolean
    iconStyle?: CSSProperties
    errorTextStyle?: CSSProperties
    pointerEvents?:
        | 'auto'
        | 'none'
        | 'visiblePainted'
        | 'visibleFill'
        | 'visibleStroke'
        | 'visible'
        | 'painted'
        | 'fill'
        | 'stroke'
        | 'all'
        | 'inherit'
}
let MyCheckbox: React.FC<CheckboxViewProps> = ({
    label,
    handleChange,
    error,
    helperText,
    formLabel,
    required,
    color = '',
    noWrap,
    filledIcon,
    iconStyle,
    pointerEvents = 'none',
    errorTextStyle,
    ...props
}) => {
    const { t } = useTranslation()
    const [checked, setChecked] = React.useState(false)
    const classes: any = useStyles()

    const onChangeChecked = () => {
        setChecked(!checked)
    }

    return (
        <FormControl required={required} error={error} component='fieldset' className={classes.formControl}>
            {formLabel && <FormLabel component='legend'>{formLabel}</FormLabel>}

            {filledIcon ? (
                <FormControlLabel
                    control={
                        <MuiCheckbox
                            icon={
                                // <RadioButtonUncheckedOutlinedIcon fontSize='large' />
                                <img
                                    loading='lazy'
                                    src={process.env.NEXT_PUBLIC_WEB_URL + '/images/icon/svg/checklist_normal.svg'}
                                    alt='uncheck'
                                    className={classes.unCheckedIconsecondaryfilledIcon}
                                    style={iconStyle}
                                />
                            }
                            checkedIcon={
                                // <CheckCircleIcon fontSize='large' />
                                <img
                                    loading='lazy'
                                    src={process.env.NEXT_PUBLIC_WEB_URL + '/images/icon/svg/checklist_selected.svg'}
                                    alt='checked'
                                    className={classes.checkedFilledIcon}
                                    style={iconStyle}
                                />
                            }
                            checked={checked}
                            {...props}
                            onChange={(e) => {
                                handleChange && handleChange(e, props.value)
                                onChangeChecked()
                            }}
                        />
                    }
                    label={
                        typeof label === 'string' ? (
                            <Typography variant='body1' noWrap={noWrap}>
                                {label}
                            </Typography>
                        ) : (
                            label
                        )
                    }
                    className={checked ? classes.labelsecondary : classes.labelfilledIconUncheck}
                />
            ) : (
                <FormControlLabel
                    control={
                        <MuiCheckbox
                            {...props}
                            icon={
                                <RadioButtonUncheckedOutlinedIcon
                                    className={classes['unCheckedIcon' + color]}
                                    style={{ ...iconStyle }}
                                />
                            }
                            checkedIcon={
                                <RadioButtonCheckedOutlinedIcon
                                    className={classes.checkedIcon}
                                    style={{ ...iconStyle }}
                                />
                            }
                            onChange={(e) => {
                                handleChange && handleChange(e)
                            }}
                            style={{ pointerEvents: 'auto' }}
                        />
                    }
                    label={
                        typeof label === 'string' ? (
                            <Typography variant='body1' noWrap={noWrap}>
                                {label}
                            </Typography>
                        ) : (
                            label
                        )
                    }
                    className={classes['label' + color]}
                    classes={{
                        label: classes.labelTop,
                    }}
                    style={{ pointerEvents: pointerEvents }}
                />
            )}

            <FormHelperText className={classes.formHelperText} style={errorTextStyle}>
                {error && (t(helperText) || helperText)}
            </FormHelperText>
        </FormControl>
    )
}

export default MyCheckbox

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        labelTop: {
            zIndex: 999,
        },
        formControl: {
            width: '100%',
        },
        label: {
            color: theme.colors.lightGreen,
        },
        labelsecondary: {
            color: theme.palette.secondary.main,
        },
        unCheckedIcon: {
            color: theme.colors.lightGreen,
            fontSize: 16,
        },
        unCheckedIconsecondary: {
            color: theme.palette.secondary.main,
            fontSize: 16,
        },
        unCheckedIconsecondaryfilledIcon: {
            color: '#A8A8A8',
            width: 20,
            height: 20,
        },
        checkedIcon: {
            fontSize: 16,
        },
        labelfilledIconUncheck: {
            color: '#A8A8A8',
        },
        checkedFilledIcon: {
            color: theme.palette.secondary.main,
            width: 20,
            height: 20,
        },
        formHelperText: {
            textAlign: 'right',
            color: 'red',
            fontSize: 9,
            marginRight: 5,
            [theme.breakpoints.up('sm')]: {
                fontSize: 12,
            },
        },
    }),
)
