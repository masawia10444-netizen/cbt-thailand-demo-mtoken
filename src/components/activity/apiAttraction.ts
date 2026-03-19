import { fetchGet, fetchPost } from '../../utilities/request'
import { apiConfig } from '../../configs/webAPIConfig'

export type TResAttractionSearchParams = {
    keyword?: string
    provID?: string
    communID?: string
    attracTypeID?: string
}

export type TResSearchAttraction = {
    ID: number
    titleTH: string
    titleEN: string
    communNameTH: string
    communNameEN: string
    image: string
    typeTH: string
    typeEN: string
    provNameTH: string
    provNameEN: string
    updateDate: string
}

export const searchAttraction = async (params: TResAttractionSearchParams = {}) => {
    try {
        const resSearchAttraction = await fetchPost<TResSearchAttraction[]>({
            url: apiConfig.search.attraction,
            data: params,
        })
        // console.log('resSearchAttraction', resSearchAttraction)
        return resSearchAttraction
    } catch (err) {
        console.log('Error searchAttraction: ', err)
        return null
    }
}

export type TResLookupAttraction = {
    attracTypeID: string
    attracTypeTH: string
    attracTypeEN: string
}

export const getLookupAttractionType = async () => {
    try {
        const resLookupAttractionType = await fetchGet<TResLookupAttraction[]>({ url: apiConfig.lookup.attractionType })
        return resLookupAttractionType
    } catch (err) {
        console.log('Error getLookupAttractionType: ', err)
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

export type TResGetAttractionContent = {
    attracID: number
    attracNameTH: string
    attracNameEN: string
    bannerImage: string
    attracTypeTH: string
    attracTypeEN: string
    communNameTH: string
    communNameEN: string
    descTH: string
    descEN: string
    attracWebsite: string
    attracTel: string
    landmarkTH: string
    landmarkEN: string
    privateTransNameTH: string
    privateTransNameEN: string
    publicTransNameTH: string
    publicTransNameEN: string
    attracTimePeriod: number
    attracFee: number
    csr: boolean
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
    latitude: number
    longitude: number
    facilities: Facility[]
    images: Image[]
    month: Month[]
    openDay: OpenDay[]
    tags: string[]
}

export type OpenDay = {
    opendayOrder: number
    startDayTH: string
    startDayEN: string
    endDayTH: string
    endDayEN: string
    startHour: string
    startMin: string
    endHour: string
    endMin: string
}

export type Month = {
    monthID: string
    order: number
    monthNameTH: string
    monthNameEN: string
}

export type Image = {
    imgID: number
    imgOrder: number
    imgPath: string
}

export type Facility = {
    facID: 'AIR' | 'ATM' | 'DR' | 'FAN' | 'MR' | 'PA' | 'PK' | 'PRY' | 'RE' | 'SM' | 'WA' | 'WC' | 'WI' | 'ic_fac_accom'
    facExist: boolean
    facAmount: number
    facNameTH: string
    facNameEN: string
    facUnitTH?: string
    facUnitEN?: string
}

export const getAttractionContent = async (id: string) => {
    try {
        const resAttractionContent = await fetchGet<TResGetAttractionContent[]>({
            url: `${apiConfig.resource.attraction.content}${id}`,
        })
        return resAttractionContent
    } catch (err) {
        console.log('Error getAttractionContent: ', err)
        return null
    }
}

export type TResProvinceAttraction = {
    provID: string
    provNameTH: string
    provNameEN: string
}

export const getProvinceAttraction = async (id: string) => {
    try {
        let url = apiConfig.lookup.provinceAttractionType + id
        let result: TResLookupProvince[] = await fetchGet({ url })
        return result
    } catch (err) {
        console.log('Error getProvinceAttraction: ', err)
    }
}
