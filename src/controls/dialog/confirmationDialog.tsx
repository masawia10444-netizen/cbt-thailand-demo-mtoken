import React, { useState, createContext, useContext, useCallback } from 'react'
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import Button from '../button/button'

type ConfirmationDialogProps = {
    title?: string
    message?: string
    component?: any
    okText?: string
    cancelText?: string
    actionCallbackOk?: () => void
    actionCallbackCancel?: () => void
    onConfirm: () => void
    onDismiss: () => void
    open: boolean
    showButtonOk?: boolean
    showButtonCancel?: boolean
    customClassName?: {
        paper?: string
    }
    customStyleContent?: {}
    buttonOkProps?: {}
}

const ConfirmationDialog = ({
    open,
    title,
    message,
    okText = 'ตกลง',
    cancelText = 'ยกเลิก',
    onConfirm,
    onDismiss,
    component,
    showButtonOk = true,
    showButtonCancel = true,
    customClassName = {},
    customStyleContent = {},
    buttonOkProps = {},
}: ConfirmationDialogProps) => {
    const classes = useStyles()
    const theme = useTheme()
    const isMobileView = useMediaQuery(theme.breakpoints.down('xs'))
    return (
        <Dialog
            open={open}
            aria-labelledby='form-dialog-title'
            PaperProps={{
                className: customClassName?.paper || classes.paper,
            }}
        >
            {title && (
                <DialogTitle>
                    <Typography variant='h2' className={classes.title}>
                        {title}
                    </Typography>
                </DialogTitle>
            )}
            {component && (
                <DialogContent
                    style={{
                        marginBottom: 50,
                        display: 'flex',
                        alignItems: 'flex-start',
                        padding: 0,
                        ...customStyleContent,
                    }}
                >
                    <div style={{ flexGrow: 1 }}> {component}</div>
                </DialogContent>
            )}

            {message && (
                <DialogContent>
                    <DialogContentText>
                        <Typography variant='body1' className={classes.message}>
                            {message}
                        </Typography>
                    </DialogContentText>
                </DialogContent>
            )}

            {showButtonOk && (
                <DialogActions
                    style={{
                        alignContent: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Button
                        className={classes.button}
                        label={okText}
                        btnType='save'
                        onClick={onConfirm}
                        fontSize={isMobileView ? 14 : 16}
                        {...buttonOkProps}
                    />
                </DialogActions>
            )}

            {showButtonCancel && (
                <DialogActions>
                    <Button
                        className={classes.button}
                        label={cancelText}
                        btnType='cancel'
                        onClick={onDismiss}
                        fontSize={isMobileView ? 14 : 16}
                    />
                </DialogActions>
            )}
        </Dialog>
    )
}

const ConfirmationDialogContext = createContext({})

type DialogConfigProps = {
    title?: string
    message?: string
    component?: any
    okText?: string
    cancelText?: string
    actionCallbackOk?: () => void
    actionCallbackCancel?: () => void
    showButtonOk?: boolean
    showButtonCancel?: boolean
    customClassName?: {
        paper?: string
    }
    customStyleContent?: {}
    buttonOkProps?: {}
}

const ConfirmationDialogProvider = ({ children }: any) => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogConfig, setDialogConfig] = useState<DialogConfigProps>({})

    const openDialog = useCallback((props: DialogConfigProps) => {
        setDialogOpen(true)
        setDialogConfig(props)
    }, [])

    const resetDialog = useCallback(() => {
        setDialogOpen(false)
        setDialogConfig({})
    }, [])

    const onConfirm = useCallback(() => {
        resetDialog()
        if (dialogConfig.actionCallbackOk) {
            dialogConfig.actionCallbackOk()
        }
    }, [dialogConfig])

    const onDismiss = useCallback(() => {
        resetDialog()
        if (dialogConfig.actionCallbackCancel) {
            dialogConfig.actionCallbackCancel()
        }
    }, [dialogConfig])

    return (
        <ConfirmationDialogContext.Provider value={{ openDialog, resetDialog }}>
            {Object.keys(dialogConfig)?.length > 0 && (
                <ConfirmationDialog open={dialogOpen} onConfirm={onConfirm} onDismiss={onDismiss} {...dialogConfig} />
            )}

            {children}
        </ConfirmationDialogContext.Provider>
    )
}

const useConfirmationDialog = () => {
    const { openDialog, resetDialog } = useContext<any>(ConfirmationDialogContext)

    const openDialogConfirmation = (options: DialogConfigProps) => openDialog(options)
    const closeDialogConfirmation = () => resetDialog()

    return { openDialogConfirmation, closeDialogConfirmation }
}

export { ConfirmationDialogProvider, useConfirmationDialog, ConfirmationDialog }

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            boxShadow: '0px 10px 20px #1669365C',
            borderRadius: 10,
            textAlign: 'center',
            padding: '5px 15px',
            minWidth: 200,
            minHeight: 200,
            maxWidth: 320,
            [theme.breakpoints.up('sm')]: {
                padding: '15px 60px',
                minWidth: 480,
                minHeight: 390,
                width: 'unset',
            },
            [theme.breakpoints.up('lg')]: {
                padding: '20px 65px',
                minWidth: 560,
                minHeight: 400,
                width: 'unset',
            },
        },
        title: {
            color: '#166936',
            fontSize: 20,
            marginTop: 10,
            [theme.breakpoints.up('sm')]: {
                fontSize: 28,
                marginTop: 60,
            },
        },
        message: {
            color: '#6B716B',
            fontSize: 12,
            [theme.breakpoints.up('sm')]: {
                fontSize: 14,
            },
        },
        button: {
            height: 28,
            fontSize: 14,
            [theme.breakpoints.up('sm')]: {
                height: 48,
                fontSize: 16,
            },
            [theme.breakpoints.up('lg')]: {
                height: 48,
                fontSize: 16,
            },
        },
    }),
)
