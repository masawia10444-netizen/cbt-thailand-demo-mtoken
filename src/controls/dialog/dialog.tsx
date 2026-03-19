import React, { FC } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import Button from '../button/button'

type DialogPropsType = {
    open: boolean
    handleOpen?: (params?: any) => void
    handleClose?: (params?: any) => void
    handleSubmit?: (params?: any) => void
    handleCancel?: (params?: any) => void
    content?: JSX.Element
    submitText?: string
    cancelText?: string
}
const FormDialog: FC<DialogPropsType> = ({
    open,
    handleOpen,
    handleClose,
    handleSubmit,
    handleCancel,
    content,
    submitText,
    cancelText,
}) => {
    const classes = useStyles()

    return (
        <Dialog
            open={open}
            onClose={() => {
                handleClose && handleClose()
                handleCancel && handleCancel()
            }}
            aria-labelledby='form-dialog-title'
            PaperProps={{
                className: classes.paper,
            }}
        >
            <DialogContent
                style={{
                    marginBottom: 50,
                    display: 'flex',
                    alignItems: 'flex-start',
                }}
            >
                <div style={{ flexGrow: 1, alignSelf: 'center' }}>{content}</div>
            </DialogContent>

            <DialogActions>
                <Button label={submitText || 'ตกลง'} btnType='save' style={{ height: 48 }} onClick={handleSubmit} />
            </DialogActions>

            <DialogActions>
                <Button label={cancelText || 'ยกเลิก'} btnType='cancel' style={{ height: 48 }} onClick={handleCancel} />
            </DialogActions>
        </Dialog>
    )
}

export default FormDialog

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            boxShadow: '0px 10px 20px #1669365C',
            borderRadius: 10,
            textAlign: 'center',
            padding: '5px 15px',
            minWidth: 200,
            minHeight: 100,
            [theme.breakpoints.up('sm')]: {
                padding: '15px 75px',
                minWidth: 480,
                minHeight: 390,
            },
            [theme.breakpoints.up('lg')]: {
                padding: '20px 97px',
                minWidth: 560,
                minHeight: 476,
            },
        },
    }),
)
