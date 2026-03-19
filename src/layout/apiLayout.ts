import { fetchPost } from '../utilities/request'
import { apiConfig } from '../configs/webAPIConfig'

export const insertLogMenu = async (menuID: number, userID: number) => {
    try {
        const param = {
            menuID: menuID,
            userID: userID ? userID : null,
        }
        const resLogMenu = await fetchPost({ url: apiConfig.log.menu, data: param })
        return resLogMenu
    } catch (err) {
        console.log('Error insertLogMenu')
    }
}

type AcceptPolicyType = {
    userID: number
}
export const updateAcceptPolicy = async ({ userID }: AcceptPolicyType) => {
    try {
        const res = await fetchPost({ url: apiConfig.user.authentication.acceptPolicy, data: { userID } })
        return res
    } catch (err) {
        console.log('Error updateAcceptPolicy')
        return null
    }
}

type AcceptPDPAType = {
    userID: number
    isAcceptPDPA: boolean
    isAcceptPDPA2: boolean
}
export const updateAcceptPDPA = async ({ userID, isAcceptPDPA, isAcceptPDPA2 }: AcceptPDPAType) => {
    try {
        const res = await fetchPost({
            url: apiConfig.user.authentication.acceptPDPA,
            data: { userID, isAcceptPDPA, isAcceptPDPA2 },
        })
        return res
    } catch (err) {
        console.log('Error updateAcceptPolicy')
        return null
    }
}
