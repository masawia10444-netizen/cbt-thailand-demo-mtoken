import { useEffect, useState, useMemo } from 'react'
import Store from '../../stores/rootStore'
import Router from 'next/router'

const useAppbar = () => {
    const { UserStore, LayoutStore } = Store()

    const handleLogout = async () => {
        await LayoutStore.clearStatePolicyDialog()
        await UserStore.logout()
        Router.push('/')
    }

    return {
        handleLogout,
    }
}
export default useAppbar
