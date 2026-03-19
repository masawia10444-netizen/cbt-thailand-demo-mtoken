import { fetchGet, fetchPost } from '../../utilities/request'
import { apiConfig } from '../../configs/webAPIConfig'

export type TResRouteSearchParams = {
    keyword?: string
    provID?: string
    communID?: string
    day?: number
}

export type TResSearchRoute = {
    ID: number
    titleTH: string
    titleEN: string
    provNameTH: string
    provNameEN: string
    image: string
    day: number
    communID: number
    communNameTH: string
    communNameEN: string
    isHighlight: boolean
    updateDate: string
}

export const searchRoute = async (params: TResRouteSearchParams = {}) => {
    try {
        const resRouteSearch = await fetchPost<TResSearchRoute[]>({
            url: apiConfig.search.trip,
            data: params,
        })
        return resRouteSearch
    } catch (err) {
        console.log('Error searchRoute: ', err)
    }
}

export type TResLookupProvince = {
    provID: string
    provNameTH: string
    provNameEN: string
}

export const getLookupProvince = async () => {
    try {
        const resLookupProvince = await fetchGet<TResLookupProvince[]>({ url: apiConfig.lookup.province })
        return resLookupProvince
    } catch (err) {
        console.log('Error getLookupProvince: ', err)
    }
}

export type TResLookupCommu = {
    communID: string
    communCode: string
    communNameTH: string
    communNameEN: string
}

export const getLookupCommu = async () => {
    try {
        const resLookupCommu = await fetchGet<TResLookupCommu[]>({ url: apiConfig.lookup.community })
        return resLookupCommu
    } catch (err) {
        console.log('Error getLookupCommu: ', err)
    }
}

export type TResRouteContent = {
    tripID: number
    tripNameTH: string
    tripNameEN: string
    tripInfoTH: string
    tripInfoEN: string
    provCode: string
    provNameTH: string
    provNameEN: string
    communID: number
    communNameTH: string
    communNameEN: string
    estmExpense: number
    image: string
    routes: Route[]
}

export type Route = {
    day: number
    stopOrder: number
    attracID: number
    attracNameTH: string
    attracNameEN: string
    path: number[][][]
    distance: number
    latitude: number
    longitude: number
    attracFee?: number
    attracTime: number
    attracDescTH: string
    attracDescEN: string
    image?: string
    isRelAttraction: boolean
}

export const getRouteContent = async (id: string) => {
    try {
        const resAccomContent = await fetchGet<TResRouteContent[]>({
            url: `${apiConfig.resource.recommendRoute.getContent}${id}`,
        })
        return resAccomContent
    } catch (err) {
        console.log('Error getRouteContent: ', err)
        return null
    }
}
