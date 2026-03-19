import { fetchGet, fetchPost } from '../../utilities/request'
import { apiConfig } from '../../configs/webAPIConfig'

export type TResAccommSearchParams = {
    keyword?: string
    provID?: string
    communID?: string
}

export type TResAccomSearch = {
    ID: number
    titleTH: string
    titleEN: string
    communNameTH: string
    communNameEN: string
    typeNameTH: string
    typeNameEN: string
    updateDate: string
    image: string
    menu: string
}

export const searchAccommodation = async (params: TResAccommSearchParams = {}) => {
    try {
        const resAccommodationSearch = await fetchPost<TResAccomSearch[]>({
            url: apiConfig.search.accommodation,
            data: params,
        })
        return resAccommodationSearch
    } catch (err) {
        console.log('Error searchAccommodation: ', err)
        return null
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
        return null
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
        return null
    }
}

export type TResAccomContent = {
    accomID: number
    accomNameTH: string
    accomNameEN: string
    typeNameTH: string
    typeNameEN: string
    hno: string
    moo: string
    villageNameTH: string
    villageNameEN: string
    soiNameTH: string
    soiNameEN: string
    roadNameTH: string
    roadNameEN: string
    tamNameTH: string
    tamNameEN: string
    ampNameTH: string
    ampNameEN: string
    provCode: string
    provNameTH: string
    provNameEN: string
    postCode: string
    updateDate: string
    descTH: string
    descEN: string
    groupSize: string
    serviceFee: number
    contactNameTH: string
    contactNameEN: string
    contactTel: string
    accomEmail: string
    accomFacebook: string
    accomLine: string
    accomTel: string
    accomWebsite: string
    tatRegisterID: string
    tatRegisterStartDate: string
    tatRegisterEndDate: string
    bannerImage: string
    facilities: Facility[]
    images: any[]
    latitude: number
    longitude: number
    courses: Course[]
    tags: string[]
}

export type Course = {
    courseNameTH: string
    courseNameEN: string
}

export type Facility = {
    facID: 'AIR' | 'ATM' | 'DR' | 'FAN' | 'MR' | 'PA' | 'PK' | 'PRY' | 'RE' | 'SM' | 'WA' | 'WC' | 'WI' | 'ic_fac_accom'
    facAmount: number
    facNameTH: string
    facNameEN: string
    facUnitTH: string
    facUnitEN: string
}

export const getAccomContent = async (id: string) => {
    try {
        const resAccomContent = await fetchGet<TResAccomContent[]>({
            url: `${apiConfig.resource.accommodation.content}${id}`,
        })
        return resAccomContent
    } catch (err) {
        console.log('Error getAccomContent: ', err)
        return null
    }
}
