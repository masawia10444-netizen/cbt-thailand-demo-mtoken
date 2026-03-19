import { fetchGet, fetchPost } from '../../utilities/request'
import { apiConfig } from '../../configs/webAPIConfig'

type TSearchFestivalParam = {
    keyword?: string
    provID?: string
    communID?: string
    startDate?: string
    endDate?: string
}

export type TResSearchFestival = {
    ID: number
    communNameEN: string
    communNameTH: string
    endDate: string
    image: string
    menu: string
    provNameEN: string
    provNameTH: string
    publishEndDate: string
    publishStartDate: string
    startDate: string
    titleEN: string
    titleTH: string
    updateDate: string
}

export const searchFestival = async (param: TSearchFestivalParam = {}) => {
    try {
        const resSearchFestival = await fetchPost<Array<TResSearchFestival>>({
            url: apiConfig.resource.festival.searchFestival,
            data: param,
        })
        return resSearchFestival
    } catch (err) {
        console.log('err searchFestival : ', err)
        return null
    }
}

export type TResLutProvince = {
    provID: string
    provNameTH: string
    provNameEN: string
}

export const getLutProvince = async () => {
    try {
        const resGetLutProvince = await fetchGet<Array<TResLutProvince>>({ url: apiConfig.lookup.province })
        return resGetLutProvince
    } catch (err) {
        console.log('err getLutProvince : ', err)
        return null
    }
}

export type TResLutCommunity = {
    communID: string
    communCode: string
    communNameTH: string
    communNameEN: string
}

export const getLutCommunity = async () => {
    try {
        const resGetLutCommunity = await fetchGet<Array<TResLutCommunity>>({ url: apiConfig.lookup.community })
        return resGetLutCommunity
    } catch (err) {
        console.log('err getLutCommunity : ', err)
        return null
    }
}

export type TResGetContentFestival = {
    festivalID: number
    festivalNameTH: string
    festivalNameEN: string
    bannerImage: string
    descTH: string
    descEN: string
    startDate: string
    endDate: string
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
    tamCode: string
    ampNameTH: string
    ampNameEN: string
    ampCode: string
    provNameTH: string
    provNameEN: string
    postCode: string
    proveCode: string
    email: string
    tel: string
    contactTel: string
    website: string
    latitude: 0
    longitude: 0
    months: Array<{ monthID: string; monthNameTH: string; monthNameEN: string }>
    images: Array<{
        imgID: number
        imgOrder: number
        imgPath: string
    }>
    tags: Array<string>
}

export const getFestivalContent = async (id: string) => {
    try {
        const resContentFestival = await fetchGet<Array<TResGetContentFestival>>({
            url: `${apiConfig.resource.festival.getFestivalContent}${id}`,
        })

        return resContentFestival
    } catch (err) {
        console.log('err getFestivalContent : ', err)
        return null
    }
}
