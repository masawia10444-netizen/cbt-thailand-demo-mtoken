import { UserInfoType } from '../../stores/userStore'

const useBadegNew = () => {
    const isShowBadge = (userInfo: UserInfoType, menuID: number | string) => {
        let interestMenuIdList = []

        userInfo?.listInterestMenuID?.forEach((item) => {
            if (item.badge) {
                interestMenuIdList.push(Number(item.menuID))
            }
        })

        if (interestMenuIdList.includes(Number(menuID))) {
            return true
        } else {
            return false
        }
    }

    return {
        isShowBadge,
    }
}
export default useBadegNew
