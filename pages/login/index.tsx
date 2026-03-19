import { useEffect } from 'react'
import LoginPage from '../../src/components/user/login/loginPage'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Router from 'next/router'

const LoginIndex = () => {
    // const mobileSize = useMediaQuery('(max-width:600px)')

    // useEffect(() => {
    //     console.log('mobileSize', mobileSize)
    //     !mobileSize && Router.replace('/')
    // }, [mobileSize])

    return <LoginPage />
}

export default LoginIndex
