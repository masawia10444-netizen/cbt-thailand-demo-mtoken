import React, { ReactElement } from 'react'
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core'
import Button, { ButtonProps } from '@material-ui/core/Button'
import clsx from 'clsx'

type Props = {
    label?: string
    leftIcon?: ReactElement
    rightIcon?: ReactElement
    onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined
    btnType?: 'save' | 'cancel' | 'add' | 'transparent' | 'rounded'
    disabled?: boolean
    fontSize?: number | string
}

const ButtonView: React.FC<ButtonProps & Props> = ({
    onClick,
    label,
    leftIcon,
    rightIcon,
    btnType = 'save',
    color = 'secondary',
    variant = 'contained',
    style,
    fontSize,
    className,
    ...props
}) => {
    const classes = useStyles()
    let btnIcon = {}

    leftIcon && Object.assign(btnIcon, { startIcon: leftIcon })
    rightIcon && Object.assign(btnIcon, { endIcon: rightIcon })

    const genButton = () => {
        switch (btnType) {
            case 'save':
                return (
                    <Typography
                        className={classes.h4}
                        variant='h4'
                        style={{ fontFamily: 'Prompt-Regular', fontSize: fontSize || '' }}
                    >
                        {' '}
                        {label}{' '}
                    </Typography>
                )
            case 'cancel':
                return (
                    <Typography
                        className={classes.h4}
                        variant='h4'
                        style={{ fontFamily: 'Prompt-Regular', fontSize: fontSize || '' }}
                    >
                        {' '}
                        {label}{' '}
                    </Typography>
                )
            case 'add':
                return (
                    <Typography className={classes.h5} variant='h5' style={{ fontSize: fontSize || '' }}>
                        {' '}
                        {label}{' '}
                    </Typography>
                )
            case 'transparent':
                return (
                    <Typography variant='body1' style={{ fontSize: fontSize || '' }}>
                        {' '}
                        {label}{' '}
                    </Typography>
                )
            case 'rounded':
                return (
                    <Typography variant='body1' style={{ fontSize: fontSize || '' }}>
                        {' '}
                        {label}{' '}
                    </Typography>
                )

            default:
                break
        }
    }

    return (
        <Button
            {...props}
            {...btnIcon}
            onClick={onClick}
            color={color}
            variant={variant}
            fullWidth
            className={clsx(classes.button, classes[btnType], className)}
            style={style}
        >
            {genButton()}
        </Button>
    )
}

export default ButtonView

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            fontSize: theme.typography.h4.fontSize,
            textTransform: 'capitalize',
            boxShadow: '0px 0px 0px 0px',
            height: '100%',
            borderRadius: 4,
            color: '#FFFFFF',
            '&:hover': {
                background: theme.palette.secondary.dark,
                boxShadow: '0px 0px 0px 0px',
            },
            '&:disabled': {
                backgroundColor: theme.colors.lightGray,
                color: theme.colors.grey,
            },
        },
        save: {},
        cancel: {
            background: 'transparent',
            color: theme.colors.gray,
            '&:hover': {
                background: theme.colors.lightGray,
                boxShadow: '0px 0px 0px 0px',
                // color: theme.colors.darkGreen,
            },
            '&:disabled': {
                backgroundColor: theme.colors.lightGray,
                color: theme.colors.grey,
            },
        },
        rounded: {
            borderRadius: 33,
            boxShadow: '0px 20px 20px #B1FF0D47',
            ...theme.fontStyle.prompt.body1,
            '&:disabled': {
                backgroundColor: theme.colors.lightGray,
                color: theme.colors.grey,
            },
        },
        transparent: {
            background: 'transparent',
            color: theme.colors.mint,
            '&:hover': {
                background: theme.colors.lightGreen,
                boxShadow: '0px 0px 0px 0px',
            },
            '&:disabled': {
                backgroundColor: theme.colors.lightGray,
                color: theme.colors.grey,
            },
        },
        add: {
            background: theme.colors.lightGreen,
            color: theme.colors.mint,
            height: 40,
            fontSize: '14px !important',
            borderRadius: 6,
            '&:hover': {
                background: '#dcece3',
                boxShadow: '0px 0px 0px 0px',
            },
            '&:disabled': {
                backgroundColor: theme.colors.lightGray,
                color: theme.colors.grey,
            },
        },
        h4: {
            fontSize: 14,
            [theme.breakpoints.up('sm')]: {
                fontSize: 16,
            },
        },
        h5: {
            fontSize: 12,
            [theme.breakpoints.up('sm')]: {
                fontSize: 14,
            },
        },
    }),
)
