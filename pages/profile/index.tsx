import { useEffect } from 'react'
import Profile from '../../src/components/user/profile/profile'
import Router from 'next/router'
import { decrypt } from '../../src/utilities/registerUltility'
import { isJsonString } from '../../src/utilities/formatTextUtils'

const FestivalIndex = () => {
    const checkUserLogin = () => {
        if (process.browser) {
            let localData = localStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_STORAGE_USER_INFO)
            let sessionData = sessionStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_STORAGE_USER_INFO)
            let userInfo = null

            if (localData && isJsonString(decrypt(localData))) {
                userInfo = JSON.parse(decrypt(localData))
            } else if (sessionData && isJsonString(decrypt(sessionData))) {
                userInfo = JSON.parse(decrypt(sessionData))
            }
            return userInfo !== null
        } else {
            return false
        }
    }
    useEffect(() => {
        !checkUserLogin() && Router.replace('/')
    }, [])

    return <Profile />
}

export default FestivalIndex
