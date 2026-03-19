import { i18n } from 'i18next'
import { useState, useEffect, useMemo } from 'react'
import Router, { useRouter } from 'next/router'
import returnConfig, { menuItemType } from '../../configs/routes/page'
import Store from '../../stores/rootStore'
import { decrypt } from '../../utilities/registerUltility'
import { findMenuID } from '../../utilities/menuUltility'
import { insertLogMenu } from '../apiLayout'
import { useTranslation } from 'react-i18next'
import { isJsonString } from '../../utilities/formatTextUtils'
import { updateAcceptPolicy, updateAcceptPDPA } from '../apiLayout'
import { UserInfoType } from '../../stores/userStore'

export type ValuesDialogFormAcceptPolicyType = {
    isAcceptPolicy: boolean
    isAcceptPDPA: string
}
export type UseLayoutProps = {}
export type ReturnLayout = ReturnType<typeof useLayout>
const useLayout = (props: UseLayoutProps) => {
    const { LayoutStore, UserStore, LookupStore } = Store()

    const [state, setState] = useState(false)
    const [opacity, setOpacity] = useState(0)

    const router = useRouter()
    const { i18n } = useTranslation()

    let list = useMemo(() => {
        return returnConfig.filter((itm) => itm?.isDisplayMenu && itm)
    }, [returnConfig])

    const toggleDrawer = () => {
        setState(!state)
    }

    const handleClickMenu = async (pathRoute: string) => {
        if (UserStore?.userInfo?.email) {
            await UserStore.getProfile({
                email: UserStore.userInfo.email,
                userID: UserStore.userInfo.userID,
            })
        }
        if (pathRoute) Router?.push(pathRoute)
    }

    useEffect(() => {
        LayoutStore.setPage(router.pathname)

        return () => {}
    }, [router.pathname])

    const onScroll = () => {
        if (process.browser) {
            let opa = window.scrollY / 20
            setOpacity(opa)
        }
    }

    const checkUserLogin = async () => {
        let localData = await localStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_STORAGE_USER_INFO)
        let sessionData = await sessionStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_STORAGE_USER_INFO)
        let userInfo: UserInfoType

        if (localData && isJsonString(decrypt(localData))) {
            userInfo = await JSON.parse(decrypt(localData))
        } else if (sessionData && isJsonString(decrypt(sessionData))) {
            userInfo = await JSON.parse(decrypt(sessionData))
        }

        if (userInfo?.userID) {
            await UserStore.getProfile({
                email: userInfo.email,
                userID: userInfo.userID,
            })
        }
    }

    const handleChangeLanguage = (lang: string) => {
        i18n?.changeLanguage(lang)
        localStorage.setItem(process.env.NEXT_PUBLIC_LANGUAGE, lang)
    }

    useMemo(() => {
        if (process.browser) {
            window.addEventListener('scroll', onScroll, true)
        }

        return () => {
            if (process.browser) {
                window.removeEventListener('scroll', onScroll)
            }
        }
    }, [process.browser])

    useEffect(() => {
        const menuID: number = findMenuID(router.pathname)
        if (
            UserStore.userInfo.userID &&
            !UserStore.userInfo.isFirstLogin &&
            (!UserStore.userInfo.isAcceptPolicy ||
                UserStore.userInfo.isAcceptPDPA === null ||
                UserStore.userInfo.isAcceptPDPA2 === null)
        ) {
            LayoutStore.setOpenPolicyDialog(true)
        } else {
            LayoutStore.setOpenPolicyDialog(false)
        }

        if (menuID) {
            insertLogMenu(menuID, UserStore.userInfo.userID)
        }
    }, [router.pathname, UserStore.userInfo])

    useEffect(() => {
        let lang = localStorage.getItem(process.env.NEXT_PUBLIC_LANGUAGE)
        lang && handleChangeLanguage(lang)
        checkUserLogin()
        LookupStore.getMenuList()
        UserStore.getProfile({
            email: UserStore?.userInfo?.email,
            userID: UserStore.userInfo.userID,
        })

        return () => {}
    }, [])

    const handleSubmitDialogForm = async (values: ValuesDialogFormAcceptPolicyType) => {
        // if (UserStore.userInfo.userID) {
        //     await updateAcceptPolicy({
        //         userID: UserStore.userInfo.userID,
        //     })
        //     await updateAcceptPDPA({
        //         userID: UserStore.userInfo.userID,
        //         isAcceptPDPA: values.isAcceptPDPA === 'true',
        //     })
        //     await UserStore.getProfile({
        //         email: UserStore.userInfo.email,
        //         userID: UserStore.userInfo.userID,
        //     })
        // }
        // await LayoutStore.setOpenPolicyDialog(false)
        // UserStore.userInfo.userID && Router.push('/profile')
    }

    return {
        toggleDrawer,
        state,
        list,
        handleClickMenu,
        opacity,
        currentPath: LayoutStore.currentPath,
        userInfo: UserStore.userInfo,
        openInterestDialog: LayoutStore.displayInterestDialog,
        handleChangeLanguage,
        menuList: LookupStore.menuList,
        openPolicyDialog: LayoutStore.openPolicyDialog,
        handleSubmitDialogForm,
    }
}
export default useLayout
