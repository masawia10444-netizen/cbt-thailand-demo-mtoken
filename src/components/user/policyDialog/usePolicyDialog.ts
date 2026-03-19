import { useState } from 'react'
import Store from '../../../stores/rootStore'
import { updateAcceptPolicy, updateAcceptPDPA } from '../../../layout/apiLayout'
import Router from 'next/router'

const usePolicyDialog = () => {
    const { LayoutStore, UserStore } = Store()

    const handleCheckPolicy = (checked: boolean) => {
        LayoutStore.setIsAcceptPolicy(checked)
        LayoutStore.setDisabledButtonPolicyDialog()
    }

    const handleCheckPDPA_1 = (values: string) => {
        LayoutStore.setIsAcceptPDPA(values === 'true')
        LayoutStore.setDisabledButtonPolicyDialog()
    }

    const handleCheckPDPA_2 = (values: string) => {
        LayoutStore.setIsAcceptPDPA2(values === 'true')
        LayoutStore.setDisabledButtonPolicyDialog()
    }

    const handleSubmitPolicyDialogForm = async () => {
        if (UserStore.userInfo.userID) {
            await updateAcceptPolicy({
                userID: UserStore.userInfo.userID,
            })
            await updateAcceptPDPA({
                userID: UserStore.userInfo.userID,
                isAcceptPDPA: LayoutStore.isAcceptPDPA,
                isAcceptPDPA2: LayoutStore.isAcceptPDPA2,
            })

            await handleCloseDialog()

            if (UserStore.userInfo.isFirstLogin) {
                LayoutStore.setDisplayInterestDialog(true)
            } else {
                await UserStore.getProfile({
                    email: UserStore.userInfo.email,
                    userID: UserStore.userInfo.userID,
                })
                UserStore.userInfo.userID && Router.push('/profile')
            }
        } else {
            LayoutStore.setOpenPolicyDialog(false)
            LayoutStore.setDisabledButtonPolicyDialog(true)
        }
    }

    const handleCloseDialog = () => {
        LayoutStore.setOpenPolicyDialog(false)
        LayoutStore.setDisabledButtonPolicyDialog(true)
        LayoutStore.setIsAcceptPolicy(false)
        //LayoutStore.setIsAcceptPDPA(null)
        //LayoutStore.setIsAcceptPDPA2(null)
    }

    const handleSubmitDialogRegister = async () => {
        LayoutStore.setOpenPolicyDialog(false)
    }

    return {
        handleCheckPolicy,
        handleCheckPDPA_1,
        handleCheckPDPA_2,
        disabled: LayoutStore.disabledButtonPolicyDialog,
        handleSubmitPolicyDialogForm,
        handleSubmitDialogRegister,
    }
}
export default usePolicyDialog
