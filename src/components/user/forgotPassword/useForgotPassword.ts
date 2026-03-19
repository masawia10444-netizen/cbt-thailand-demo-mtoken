import { useEffect, useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Store from '../../../stores/rootStore'
import { encrypt } from '../../../utilities/registerUltility'
import { useConfirmationDialog } from '../../../controls/dialog/confirmationDialog'
import Router from 'next/router'

type ForgotPasswordFormType = {
    email: string
}

const useRegister = () => {
    const { UserStore } = Store()
    const [success, setSuccess] = useState(false)
    const { openDialogConfirmation } = useConfirmationDialog()
    const { t, i18n } = useTranslation()

    const handleSubmit = async (params: ForgotPasswordFormType) => {
        const forgotPasswordData = await UserStore.sendEmailForgotPassword({
            email: params.email,
        })

        if (forgotPasswordData.statusCode === 1) {
            openDialogConfirmation({
                title: t('PROFILE.USER_FORGOT_PASSWORD_MAIN_TEXT'),
                message: t('PROFILE.USER_FORGOT_PASSWORD_MINOR_TEXT'),
                showButtonCancel: false,
                actionCallbackOk: () => {
                    setSuccess(true)
                },
            })
        } else {
            if (forgotPasswordData.message === 'not found') {
                openDialogConfirmation({
                    title: t('PROFILE.USER_NOT_FOUND_EMAIL_MAIN_TEXT'),
                    message: t('PROFILE.USER_NOT_FOUND_EMAIL_MINOR_TEXT'),
                    showButtonCancel: false,
                })
            } else if (forgotPasswordData.message === 'not verify') {
                openDialogConfirmation({
                    title: t('PROFILE.USER_NOT_VERIFY_EMAIL_MAIN_TEXT'),
                    message: t('PROFILE.USER_NOT_VERIFY_EMAIL_MINOR_TEXT'),
                    showButtonCancel: false,
                })
            } else {
                openDialogConfirmation({
                    title: t('PROFILE.ERROR_SYSTEM_MAIN_TEXT'),
                    message: t('PROFILE.ERROR_SYSTEM_MINOR_TEXT'),
                    showButtonCancel: false,
                })
            }
        }
    }

    const handleCancel = () => {
        Router.push('/')
    }

    return {
        handleSubmit,
        handleCancel,
        success,
    }
}
export default useRegister
