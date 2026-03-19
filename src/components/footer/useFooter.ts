import { useEffect, useState, useMemo, useCallback } from 'react'
import { menuItemType } from '../../configs/routes/page'
import { useRouter } from 'next/router'
import { PageListType } from '../../configs/menuConfig'
import Store from '../../stores/rootStore'

const useFooter = () => {
    const router = useRouter()
    const { UserStore } = Store()
    const [showBtnScrollToTop, setShowBtnScrollToTop] = useState<boolean>(false)

    const checkScrollTop = () => {
        if (process.browser) {
            if (!showBtnScrollToTop && window.pageYOffset > 700) {
                setShowBtnScrollToTop(true)
            } else if (showBtnScrollToTop && window.pageYOffset <= 700) {
                setShowBtnScrollToTop(false)
            }
        }
    }

    const handleClickMenu = async (data: PageListType) => {
        // console.log('handleClickMenu',data);
        if (UserStore?.userInfo?.email) {
            await UserStore.getProfile({
                email: UserStore.userInfo.email,
                userID: UserStore.userInfo.userID,
            })
        }

        if (data.path) {
            router.push(data.path)
        }
    }

    const handleClickGoToTop = () => {
        if (process.browser) window.scrollTo(0, 0)
    }

    if (process.browser) window.addEventListener('scroll', checkScrollTop)

    useEffect(() => {
        handleClickGoToTop()
    }, [router.pathname])

    const onClickLink = useCallback(
        (link: string) => () => {
            if (process.browser) window.open(link)
        },
        [],
    )

    return {
        showBtnScrollToTop,
        handleClickMenu,
        handleClickGoToTop,
        onClickLink,
    }
}
export default useFooter
