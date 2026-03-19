import { useState } from 'react'
import Router from 'next/router'
import Store from '../../stores/rootStore'

const useSideBar = () => {
    const { LayoutStore } = Store()
    // const [state, setState] = useState(false)

    const toggleDrawer = (open: boolean) => {
        // setState(open)
        LayoutStore.setOpenSideBar(open)
    }

    const handleClickMenuSideBar = (path: string) => {
        toggleDrawer(false)
        Router.push(path)
    }

    return {
        open: LayoutStore.openSideBar,
        toggleDrawer,
        handleClickMenuSideBar,
    }
}
export default useSideBar
