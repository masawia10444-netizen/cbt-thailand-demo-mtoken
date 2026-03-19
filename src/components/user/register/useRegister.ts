import { useEffect, useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Store from '../../../stores/rootStore'
import { encrypt } from '../../../utilities/registerUltility'
import { useConfirmationDialog } from '../../../controls/dialog/confirmationDialog'
import { useRouter } from 'next/router'
import Router from 'next/router'

export type UseRegisterProps = {}

type RegisterFormType = {
    confirmPassword: string
    email: string
    firstName: string
    lastName: string
    password: string
}
type ValuesDialogFormAcceptPolicyType = {
    isAcceptPolicy: boolean
    isAcceptPDPA: string
}

const useRegister = ({}) => {
    const { PolicyStore, UserStore, LayoutStore } = Store()
    const router = useRouter()
    const [success, setSuccess] = useState(false)
    const { openDialogConfirmation, closeDialogConfirmation } = useConfirmationDialog()
    const { t, i18n } = useTranslation()

    const handleSubmit = async (params: RegisterFormType) => {
        try {
            const encryptedPassword = await encrypt(params.password)

            const isMTokenFlow = router.query.mtoken_flow === '1'
            const citizenId = router.query.citizenId as string || ''
            const userId = router.query.userId as string || ''

            const registerData = await UserStore.register({
                email: params.email,
                firstName: params.firstName,
                lastName: params.lastName,
                password: encryptedPassword,
                isAcceptPDPA: LayoutStore.isAcceptPDPA,
                isAcceptPDPA2: LayoutStore.isAcceptPDPA2,
                social: isMTokenFlow ? 'google' : undefined, 
                googleID: isMTokenFlow ? (citizenId || userId || `MTOKEN_${params.email}`) : undefined,
                googleName: isMTokenFlow ? `${params.firstName} ${params.lastName}` : undefined,
            })

            if (registerData.statusCode === 1) {
                if (isMTokenFlow) {
                    const loginData = await UserStore.login({ 
                        email: params.email, 
                        password: encryptedPassword 
                    }, true)

                    if (loginData.statusCode === 1) {
                        if (!UserStore.userInfo.isAcceptPolicy || UserStore.userInfo.isAcceptPDPA === null) {
                            await LayoutStore.setOpenPolicyDialog(true)
                        } else {
                            router.replace('/')
                        }
                        return
                    } else {
                        router.replace('/login')
                        return
                    }
                }

                // Normal Flow or MToken Login Fail (Show Success Dialog)
                openDialogConfirmation({
                    title: t('PROFILE.USER_REGISTER_SUCCESS_MAIN_TEXT'),
                    message: t('PROFILE.USER_REGISTER_SUCCESS_MINOR_TEXT'),
                    showButtonCancel: false,
                    actionCallbackOk: () => {
                        setSuccess(true)
                    },
                })
                PolicyStore.hidePolicy()
            } else if (registerData.statusCode === -1) {
                openDialogConfirmation({
                    title: t('PROFILE.USER_EXIST_EMAIL_MAIN_TEXT'),
                    message: t('PROFILE.USER_EXIST_EMAIL_MINOR_TEXT'),
                    showButtonCancel: false,
                })
            } else {
                openDialogConfirmation({
                    title: t('PROFILE.ERROR_SYSTEM_MAIN_TEXT'),
                    message: t('PROFILE.ERROR_SYSTEM_MINOR_TEXT'),
                    showButtonCancel: false,
                })
            }
        } catch (error) {
            openDialogConfirmation({
                title: t('PROFILE.ERROR_SYSTEM_MAIN_TEXT'),
                message: t('PROFILE.ERROR_SYSTEM_MINOR_TEXT'),
                showButtonCancel: false,
            })
        }
    }

    const handleCheckboxChange = (open: boolean) => {
        // MToken Fix: Don't open the dialog on checkbox click! 
        // We will open it once in handleSubmit after registration success 
        // so we have a userID to save the PDPA choices.
        // LayoutStore.setOpenPolicyDialog(open) 
        handleClosePolicyDialog()
    }

    const handleClosePolicyDialog = () => {
        // LayoutStore.setOpenPolicyDialog(false)
        LayoutStore.setDisabledButtonPolicyDialog(true)
        LayoutStore.setIsAcceptPolicy(false)
        LayoutStore.setIsAcceptPDPA(null)
        LayoutStore.setIsAcceptPDPA2(null)
    }

    const handleSubmitDialogForm = async (values: ValuesDialogFormAcceptPolicyType) => {}

    useEffect(() => {
        if (UserStore.userInfo.userID) {
            const isMTokenFlow = router.query.mtoken_flow === '1'
            if (isMTokenFlow) {
                router.replace('/')
            } else {
                router.replace('/')
            }
        }
    }, [UserStore.userInfo.userID, router.query.mtoken_flow])

    return {
        handleSubmit,
        success,
        openDialogConfirmation,
        closeDialogConfirmation,
        handleCheckboxChange,
        handleSubmitDialogForm,
    }
}
export default useRegister
