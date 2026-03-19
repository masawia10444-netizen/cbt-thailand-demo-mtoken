import { fetchGet } from '../../utilities/request'
import { apiConfig } from '../../configs/webAPIConfig'

export type TCommunity = {
    commID: number
    commNameTH: string
    commNameEN: string
}

export type TOpenDay = {
    dayNameTH: string
    dayNameEN: string
    startTime: string
    endTime: string
    order: number
}

export type TTravelPeriod = {
    mouthNameTH: string
    mouthNameEN: string
    order: number
}

export type TResRelattractionContent = {
    ID: 0
    nameTH: string
    nameEN: string
    typeTH: string
    typeEN: string
    hno: string
    moo: string
    villageNameTH: string
    villageNameEN: string
    soiNameTH: string
    soiNameEN: string
    roadNameTH: string
    roadNameEN: string
    provCode: string
    provNameTH: string
    provNameEN: string
    ampCode: string
    ampNameTH: string
    ampNameEN: string
    tamCode: string
    tamNameTH: string
    tamNameEN: string
    postCode: string
    latitude: number
    longitude: number
    statusID: string
    descTH: string
    descEN: string
    website: string
    tel: string
    fee: string
    otherCloseDayTH: string
    otherCloseDayEN: string
    communities: TCommunity[]
    openDays: TOpenDay[]
    images: string[]
    travelPeriod: TTravelPeriod[]
    tags: string[]
}

export const getRelattractionContent = async (id: string) => {
    try {
        const resRelattraction = await fetchGet<TResRelattractionContent>({
            url: apiConfig.resource.relattraction.content + id,
        })
        return resRelattraction
    } catch (err) {
        console.log('Error getRelattractionContent: ', err)
        return null
    }
}
