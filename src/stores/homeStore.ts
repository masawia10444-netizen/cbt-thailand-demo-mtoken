import { useContext, createContext } from 'react'
import { observable, action, runInAction } from 'mobx'
import { fetchGet } from '../utilities/request'

export type Highlight = {
    reviewTravel: ReviewTravel[]
    community: Community[]
    attraction: Attraction[]
    routeRecommended: RouteRecommended[]
} | null

export type RouteRecommended = {
    tripID: number
    tripDayTH: string
    tripDayEN: string
    tripNameTH: string
    tripNameEN: string
    communNameTH: string
    communNameEN: string
    provNameTH: string
    provNameEN: string
    tripImage: string
    order: number
}

export type Attraction = {
    attracID: number
    attracNameTH: string
    attracNameEN: string
    attracImage: string
    attracTypeNameTH: string
    attracTypeNameEN: string
    attracTypeID?: string
}

export type Community = {
    communID: number
    communNameTH: string
    communNameEN: string
    communImage: string
    monthID: string
    provNameTH: string
    provNameEN: string
}

export type ReviewTravel = {
    reviewTravelID: number
    reviewTravelNameTH: string
    reviewTravelNameEN: string
    reviewTravelImage: string
    provNameTH: string
    provNameEN: string
    order: number
}

class HomeStore {
    @observable highlightList: Highlight = null

    @action setState = (state, data) => {
        state = data
    }

    @action getHighlightList = async () => {
        const data: Highlight = await fetchGet({
            url: process.env.NEXT_PUBLIC_API_URL + '/highlight/getHighlight',
        })
        //console.log('data', data)
        runInAction(() => {
            this.highlightList = data
        })
    }
}

export default HomeStore
