import { ProvinceType, CommunityType } from './../../pages/recommendedRoute/index'
import { observable, action, runInAction } from 'mobx'
import { fetchGet, fetchPost } from '../utilities/request'
import { apiConfig } from '../configs/webAPIConfig'
import { encrypt } from '../utilities/registerUltility'

export type MenuType = {
    menuID: string
    menuNameTH: string
    menuNameEN: string
    menuPath: string
}

type CoordsType = {
    latitude: number
    longitude: number
}

export type SeachAllParamsType = {
    menuID: number
    keyword: string
    provID: number
    communID: number
    chkRaidus: boolean
    latitude: number
    longitude: number
}

export type SearchResultType = {
    reviewTravel: any[]
    community: any[]
    attraction: any[]
    trip: any[]
    festival: any[]
    accommodation: any[]
}
export type SearchParamsType = {
    menuID?: number | string
    keyword?: string
    provID?: number | string
    communID?: number | string
    chkRaidus?: boolean
    latitude?: number | string
    longitude?: number | string
}
class LookupStore {
    @observable isActiveMyLocation = false
    @observable myLocation: CoordsType = {
        latitude: 0,
        longitude: 0,
    }
    @observable provinceList: ProvinceType[] = []
    @observable communityList: CommunityType[] = []
    @observable menuList: MenuType[] = []

    @observable searchParams: SearchParamsType = {
        menuID: '0',
        keyword: '',
        provID: '',
        communID: '0',
        chkRaidus: false,
    }
    @observable searchResult: SearchResultType = {
        reviewTravel: [],
        community: [],
        attraction: [],
        trip: [],
        festival: [],
        accommodation: [],
    }

    @action getProvince = async () => {
        const result: ProvinceType[] = await fetchGet({ url: apiConfig.lookup.province })

        runInAction(() => {
            this.provinceList = result
        })
    }

    @action getCommunity = async () => {
        const result: CommunityType[] = await fetchGet({ url: apiConfig.lookup.community })

        runInAction(() => {
            this.communityList = result
        })
    }

    @action getMenuList = async () => {
        const result: MenuType[] = await fetchGet({ url: apiConfig.lookup.menu })

        runInAction(() => {
            this.menuList = result
        })
    }

    @action setMyLocation = (params: CoordsType) => {
        this.myLocation = params
    }

    @action searchAll = async (values: SearchParamsType) => {
        const setParams = await {
            menuID: Number(values.menuID) ? Number(values.menuID) : null,
            keyword: values.keyword || null,
            provID: Number(values.provID) && !values.chkRaidus ? Number(values.provID) : null,
            communID: Number(values.communID) && !values.chkRaidus ? Number(values.communID) : null,
            chkRaidus: values.chkRaidus,
        }

        values.chkRaidus &&
            Object.assign(setParams, {
                latitude: this.myLocation.latitude,
                longitude: this.myLocation.longitude,
            })

        const result: SearchResultType = await fetchPost({
            url: apiConfig.search.searchAll + `?${new Date().getTime()}`,
            data: setParams,
        })

        runInAction(() => {
            this.searchResult = result
            this.searchParams = {
                menuID: (values.menuID as string) || '0',
                keyword: (values.keyword as string) || '',
                provID: (values.provID as string) || '',
                communID: (values.communID as string) || '0',
                chkRaidus: values.chkRaidus,
            }
        })
    }

    @action clearSearchParams = () => {
        this.searchParams = {
            menuID: '0',
            keyword: '',
            provID: '',
            communID: '0',
            chkRaidus: false,
        }
    }

    @action setSearchParamsByResult = (value: SearchParamsType) => {
        this.searchParams = value
    }

    @action clearSearchResult = () => {
        this.searchResult = {
            reviewTravel: [],
            community: [],
            attraction: [],
            trip: [],
            festival: [],
            accommodation: [],
        }
    }
}

export default LookupStore
