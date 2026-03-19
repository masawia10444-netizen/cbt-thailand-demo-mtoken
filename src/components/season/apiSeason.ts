import { fetchGet, fetchPost } from '../../utilities/request'
import { apiConfig } from '../../configs/webAPIConfig'

export type TResCommunityHighlight = {
    ID: number
    titleTH: string
    titleEN: string
    image: string
    monthID: string
    provNameTH: string
    provNameEN: string
    createDate: string
    updateDate: string
}

export const getCommuHighlight = async () => {
    try {
        const resCommuHighlight = await fetchGet<TResCommunityHighlight[]>({
            url: apiConfig.resource.community.highlight,
        })
        return resCommuHighlight
    } catch (err) {
        console.log('Error resCommuHighlight: ', err)
        return null
    }
}

export type TResLookupMonth = {
    monthID: string
    monthNameTH: string
    monthNameEN: string
    monthAbbreviatedTH: string
    monthOrderNo: string
}

export const getLookupMonth = async () => {
    try {
        const resLookupMonth = await fetchGet<TResLookupMonth[]>({ url: apiConfig.lookup.month })
        return resLookupMonth
    } catch (err) {
        console.log('Error getLookupMonth: ', err)
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

export type TResGetCommuTravelPeriod = {
    ID: number
    titleTH: string
    titleEN: string
    image: string
    provNameTH: string
    provNameEN: string
    updateDate: string
    isHighlight?: boolean
}

export const getCommuTravelPeriod = async (id: string) => {
    try {
        const resCommuTravelPeriod = await fetchGet<TResGetCommuTravelPeriod[]>({
            url: `${apiConfig.resource.community.travelPeriod}${id}`,
        })
        return resCommuTravelPeriod
    } catch (err) {
        console.log('Error getCommuTravelPeriod: ', err)
        return null
    }
}

export type TResGetCommuContent = {
    communID: number
    communNameTH: string
    communNameEN: string
    locationNameTH: string
    locationNameEN: string
    descTH: string
    descEN: string
    activityTH: string
    activityEN: string
    lifeStyleTH: string
    lifeStyleEN: string
    dressingTH: string
    dressingEN: string
    artTH: string
    artEN: string
    cultureTH: string
    cultureEN: string
    foodTH: string
    foodEN: string
    sourvenirTH: string
    sourvenirEN: string
    outstandingTH: string
    outstandingEN: string
    mentorUnitNameTH: string
    mentorUnitNameEN: string
    remarkTH: string
    remarkEN: string
    website: string
    line: string
    facebook: string
    email: string
    shaStandard: boolean
    safetyPerson: boolean
    closeDayTH: string
    closeDayEN: string
    isLocalguideExist: boolean
    numberOfLocalguide: number
    localguideExperience: number
    localguideDescTH: string
    localguideDescEN: string
    groupSize: string
    privateTransNameTH: string
    privateTransNameEN: string
    publicTransNameTH: string
    publicTransNameEN: string
    yearOpr: number
    yearEst: number
    yearCount: number
    touristRuleTH: string
    touristRuleEN: string
    tamNameTH: string
    tamNameEN: string
    ampNameTH: string
    ampNameEN: string
    provNameTH: string
    provNameEN: string
    latitude: number
    longitude: number
    hasRelAttrac: boolean
    facilities: Facility[]
    contacts: Contact[]
    rewardsStandards: RewardStandard[]
    payments: Payment[]
    languages: Language[]
    touristTarget: TouristTarget[]
    accommodations: Accommodation[]
    images: Image[]
    travelPeriod: TravelPeriod[]
    attraction: Attraction[]
    openDay: OpenDay[]
    tags: string[]
    langEN?: string
    langTH?: string
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

export type TouristTarget = {
    targetID: string
    targetNameTH: string
    targetNameEN: string
}
export type Attraction = {
    attracID: number
    attracNameTH: string
    attracNameEN: string
}

export type TravelPeriod = {
    monthID: string
    monthNameTH: string
    monthNameEN: string
}

export type Image = {
    communImageID: number
    communImageOrder: number
    communImagePath: string
}

export type Accommodation = {
    accommodationID: number
    accommodationNameTH: string
    accommodationNameEN: string
}

export type Language = {
    languageID: string
    languageNameTH: string
    languageNameEN: string
}

export type Payment = {
    paymentID: 1 | 2 | 3 | 4
    paymentTH: string
    paymentEN: string
}

export type RewardStandard = {
    nameTH: string
    nameEN: string
    receiveYear: number
    groupType: string
}

export type Contact = {
    contactNameTH: string
    contactNameEN: string
    contactEmail: string
    contactFacebook: string
    contactLine: string
    contactTel: string
    contactPos: string
}

export type Facility = {
    facID: 'AIR' | 'ATM' | 'DR' | 'FAN' | 'MR' | 'PA' | 'PK' | 'PRY' | 'RE' | 'SM' | 'WA' | 'WC' | 'WI' | 'ic_fac_accom'
    facAmount: number
    facNameTH: string
    facNameEN: string
    facUnitTH: string
    facUnitEN: string
    subFac: SubFac[]
}

export type SubFac = {
    facID: string
    facAmount: number
    facNameTH: string
    facNameEN: string
    facUnitTH: string
    facUnitEN: string
}

export const getCommuContent = async (id: string) => {
    // console.log('id', id)
    try {
        const resCommuContent = await fetchGet<TResGetCommuContent[]>({
            url: `${apiConfig.resource.community.content}${id}`,
        })
        // console.log('resCommuContent', resCommuContent)
        return resCommuContent
    } catch (err) {
        console.log('Error getCommuContent: ', err)
        return null
    }
}

export type TResSearchCommu = {
    ID: number
    titleTH: string
    titleEN: string
    provNameTH: string
    provNameEN: string
    image: string
    monthID: string
    updateDate: string
}

export type TResCommuSearchParams = {
    keyword?: string
    provID?: string
    communID?: string
    monthID?: string
}

export const searchCommu = async (params: TResCommuSearchParams = {}) => {
    try {
        const resSearchCommu = await fetchPost<TResSearchCommu[]>({ url: apiConfig.search.community, data: params })
        return resSearchCommu
    } catch (err) {
        console.log('Error searchCommu')
    }
}

export type TResCommuAttraction = {
    ID: number
    titleTH: string
    titleEN: string
    descTH: string
    descEN: string
    image: string
    time: number
    isRelAttraction: boolean
    latitude: number
    longitude: number
    communNameTH: string
    communNameEN: string
    attracTime: number | null
    attracFee: number | null
}

export const getCommuAttraction = async (id: string) => {
    try {
        const resCommuAttraction = await fetchGet<TResCommuAttraction[]>({
            url: `${apiConfig.resource.community.attraction}${id}`,
        })
        return resCommuAttraction
    } catch (err) {
        console.log('Error getCommuAttraction: ', err)
        return null
    }
}

export const insertLogCommu = async (communID: number, userID: number) => {
    try {
        const param = {
            communID: communID,
            userID: userID ? userID : null,
        }
        const resLogCommu = await fetchPost({ url: apiConfig.log.community, data: param })
        return resLogCommu
    } catch (err) {
        console.log('Error insertLogCommu')
        return null
    }
}
