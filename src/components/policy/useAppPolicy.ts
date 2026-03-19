import Store from '../../stores/rootStore'
import { useEffect, useState } from 'react'

const UseAppPolicy = () => {
    const [isOpenDialog, setOpenDialog] = useState(false)
    const { PolicyStore, UserStore } = Store()

    useEffect(() => {
        let acceptPolicy = sessionStorage.getItem(process.env.NEXT_PUBLIC_ACCEPT_POLICY)

        if (UserStore?.userInfo?.userID && UserStore?.userInfo?.isAcceptPolicy) {
            PolicyStore.hidePolicy()
        } else if (!UserStore.userInfo.userID && acceptPolicy === 'true') {
            PolicyStore.hidePolicy()
        } else {
            PolicyStore.showPolicy()
        }
    }, [UserStore?.userInfo])

    const setShowPolicy = (): void => {
        PolicyStore.showPolicy()
    }

    const setHidePolicy = (): void => {
        PolicyStore.hidePolicy()
        setHideDialog()
    }

    const setShowDialog = (): void => {
        setOpenDialog(true)
    }

    const setHideDialog = (): void => {
        setOpenDialog(false)
    }

    const onClickAcceptPolicy = (): void => {
        if (UserStore?.userInfo?.userID) {
            const fetchData = async () => {
                const res = await UserStore.acceptPolicy({ userID: UserStore.userInfo.userID })
            }
            fetchData()
        }
        sessionStorage.setItem(process.env.NEXT_PUBLIC_ACCEPT_POLICY, 'true')
        PolicyStore.hidePolicy()
    }

    const handleClickLink = () => {
        if (process.browser) {
            window.open(process.env.NEXT_PUBLIC_WEBSITE_PRIVACY_POLICY_URL)
        }
    }

    return {
        infos: {
            isOpenDialog: isOpenDialog,
            isShowPolicy: PolicyStore.isShowPolicy || false,
        },
        functions: {
            setShowPolicy,
            setHidePolicy,
            setShowDialog,
            setHideDialog,
            onClickAcceptPolicy,
            handleClickLink,
        },
    }
}

export default UseAppPolicy
