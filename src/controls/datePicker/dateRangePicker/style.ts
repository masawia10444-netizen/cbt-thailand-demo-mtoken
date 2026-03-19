import { makeStyles, createStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => {
    const focusedRangeColor = fade(theme.palette.secondary.main, 0.3)
    const focusedRangeGradient = `linear-gradient(to right, ${focusedRangeColor}, ${focusedRangeColor})`
    const transparentRangeGradient = `linear-gradient(to right, rgba(0,0,0,0.0), rgba(0,0,0,0.0))`
    return createStyles({
        root: {
            width: '100%',
        },
        dateRangePickerDialog: {
            '& .MuiPickersCalendar-transitionContainer': {
                minHeight: 218,
                marginTop: 10,
            },
        },
        isDisabled: {},
        day: {
            width: 40,
            height: 36,
            fontSize: theme.typography.caption.fontSize,
            margin: 0,
            color: theme.colors.textBlack,
            fontWeight: theme.typography.fontWeightMedium,
            padding: 0,
            transition: 'none',
            '&::after': {
                color: theme.palette.secondary.contrastText,
                borderRadius: '100%',
                bottom: 0,
                boxSizing: 'border-box',
                content: '""',
                height: 36,
                width: 36,
                left: 0,
                margin: 'auto',
                position: 'absolute',
                right: 0,
                top: 0,
                transform: 'scale(0)',
                zIndex: 2,
            },
            '&:hover': {
                backgroundColor: 'transparent',
                color: theme.palette.secondary.main,
                '&::after': {
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.secondary.main}`,
                    bottom: -2,
                    left: -2,
                    height: 36,
                    width: 36,
                    right: -2,
                    top: -2,
                    boxSizing: 'content-box',
                    transform: 'scale(1)',
                },
            },
            '& > .MuiIconButton-label': {
                zIndex: 3,
            },
        },
        dayDisabled: {
            width: 40,
            height: 36,
            fontSize: theme.typography.caption.fontSize,
            margin: 0,
            color: theme.colors.lightGray,
            pointerEvents: 'none',
            fontWeight: theme.typography.fontWeightMedium,
            padding: '8px !important',
            transition: 'none',
            '&::after': {
                borderRadius: '100%',
                bottom: 0,
                boxSizing: 'border-box',
                content: '""',
                height: 36,
                width: 36,
                left: 0,
                margin: 'auto',
                position: 'absolute',
                right: 0,
                top: 0,
                transform: 'scale(0)',
                zIndex: 2,
            },
            '& > .MuiIconButton-label': {
                zIndex: 3,
            },
        },
        hidden: {
            opacity: 0,
            pointerEvents: 'none',
        },
        current: {
            color: theme.palette.secondary.main,
            fontWeight: 600,
            '&::after': {
                color: theme.palette.secondary.main,
            },
        },
        focusedRange: {
            color: theme.palette.secondary.contrastText,
            background: `${focusedRangeGradient} no-repeat 0/20px 40px, ${focusedRangeGradient} no-repeat 20px 0/20px 40px`,
            fontWeight: theme.typography.fontWeightMedium,
            width: 40,
            marginRight: 0,
            marginLeft: 0,
            borderRadius: 0,
        },
        beginCap: {
            color: theme.palette.secondary.contrastText,
            '&::after': {
                transform: 'scale(1)',
                backgroundColor: theme.palette.secondary.main,
            },
        },
        endCap: {
            color: theme.palette.secondary.contrastText,
            '&::after': {
                transform: 'scale(1)',
                backgroundColor: theme.palette.secondary.main,
            },
        },
        focusedFirst: {
            background: `${transparentRangeGradient} no-repeat 0/20px 40px,${focusedRangeGradient} no-repeat 20px 0/20px 40px`,
        },
        focusedLast: {
            background: `${focusedRangeGradient} no-repeat 0/20px 40px,${transparentRangeGradient} no-repeat 20px 0/20px 40px`,
        },
    })
})
