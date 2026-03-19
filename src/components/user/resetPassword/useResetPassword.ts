import { useEffect, useState, useMemo } from 'react'
import Router, { useRouter } from 'next/router'
import Store from '../../../stores/rootStore'
import { encrypt } from '../../../utilities/registerUltility'
import jwt from 'jsonwebtoken'

type ResetPasswordFormType = {
    confirmPassword: string
    password: string
}
type ResetPasswordParamType = {
    token?: string
}

const useResetPassword = () => {
    const { UserStore, LoadingStore } = Store()
    const [success, setSuccess] = useState(false)
    const [tokenFail, setTokenFail] = useState(true)
    const router = useRouter()

    const checkToken = async () => {
        LoadingStore.setLoading(true)
        const params: ResetPasswordParamType = typeof window !== 'undefined' && router.query
        const userID: number = await jwt.decode(params.token, { json: true })?.userID
        const key: string = await jwt.decode(params.token, { json: true })?.key

        const res = await UserStore.checkTokenResetPassword({ userID: userID, token: key })

        if (res.statusCode === 1) {
            setTokenFail(false)
        } else {
            setTokenFail(true)
        }

        await setTimeout(() => {
            LoadingStore.setLoading(false)
        }, 1000)
    }

    useEffect(() => {
        checkToken()
    }, [router?.query])

    const handleSubmit = async (params: ResetPasswordFormType) => {
        const paramRouter: ResetPasswordParamType = typeof window !== 'undefined' && router.query
        const userID: number = jwt.decode(paramRouter.token, { json: true })?.userID
        const key: string = jwt.decode(paramRouter.token, { json: true })?.key

        const encryptedPassword = await encrypt(params.password)

        const resetData = await UserStore.resetPassword({
            userID: userID,
            token: key,
            password: encryptedPassword,
        })

        if (resetData.statusCode === 1) {
            setSuccess(true)
        }
    }

    return {
        handleSubmit,
        success,
        tokenFail,
        isLoading: LoadingStore.isLoading,
    }
}
export default useResetPassword
