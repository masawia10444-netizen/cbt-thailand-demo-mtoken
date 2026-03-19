import { MouseEvent } from 'react'
import { observable, action, runInAction } from 'mobx'
import { fetchGet } from '../utilities/request'
import { apiConfig } from '../configs/webAPIConfig'

export type PageType = {
    name?: string
    path: string
}

export type menuType = {
    menuID: string
    menuNameTH: string
    menuNameEN: string
}

class LayoutStore {
    @observable page: PageType = {
        name: 'Home',
        path: '/',
    }
    @observable currentPath: string = '/'
    @observable menuList: menuType[] = []
    @observable currentContentName = ''
    @observable displayInterestDialog = false
    @observable openSideBar = false

    @observable openPolicyDialog = false
    @observable disabledButtonPolicyDialog = true
    @observable isAcceptPDPA = null
    @observable isAcceptPDPA2 = null
    @observable isAcceptPolicy = null

    @action setPage = (path: string) => {
        this.currentPath = path
    }

    @action setContentName = (name: string) => {
        this.currentContentName = name
    }

    @action getMunuList = async () => {
        const result: menuType[] = await fetchGet({ url: apiConfig.lookup.community })
        runInAction(() => {
            this.menuList = result
        })
    }

    @action setDisplayInterestDialog = (open: boolean) => {
        this.displayInterestDialog = open
    }

    @action setOpenSideBar = (isOpen: boolean) => {
        this.openSideBar = isOpen
    }

    @action setOpenPolicyDialog = (open: boolean) => {
        this.openPolicyDialog = open
    }

    @action setDisabledButtonPolicyDialog = (disabled?: boolean) => {
        if (disabled !== undefined) {
            this.disabledButtonPolicyDialog = disabled
        } else {
            this.disabledButtonPolicyDialog = !(
                this.isAcceptPolicy &&
                this.isAcceptPDPA !== null &&
                this.isAcceptPDPA2 !== null
            )
        }
    }

    @action setIsAcceptPolicy = (checked: boolean) => {
        this.isAcceptPolicy = checked
    }

    @action setIsAcceptPDPA = (accept: boolean | null) => {
        this.isAcceptPDPA = accept
    }
    @action setIsAcceptPDPA2 = (accept: boolean | null) => {
        this.isAcceptPDPA2 = accept
    }

    @action clearStatePolicyDialog = () => {
        this.openPolicyDialog = false
        this.disabledButtonPolicyDialog = true
        this.isAcceptPDPA = null
        this.isAcceptPDPA2 = null
        this.isAcceptPolicy = null
    }
}

export default LayoutStore
