
import { useContext, createContext } from 'react'
import { observable, action, runInAction } from 'mobx'
import { apiConfig } from '../configs/webAPIConfig'
import { fetchGet, fetchPost, fetchPut } from '../utilities/request'
import { FormDayTripStructure } from '../components/trip/form/FormDayTripStructure'

type provinceType ={
    provID: string;
    provNameTH: string;
    provNameEN: string;
} 

type AttractionType = {
    attracTypeID: string
    attracTypeTH: string
    attracTypeEN: string
}

type SearchAttraction = {
    attractionTypeID: string | null
    provID: number
}

export type Attraction = {
    attracID: number
    attracNameTH: string
    attracNameEN: string
    attracDescTH: string
    attracDescEN: string
    attracTime: string | number
    attracFee: string
    communID: number
    communNameTH: string
    communNameEN: string
    latitude: number
    longitude: number
}

export type AttractionGrorpByCommuType = {
    communID: number
    communNameTH: string
    communNameEN: string
    attractionList: Attraction[]
}

export type PreviewData = {
    dayOfTrip: number
    attractions: Attraction[] & { geometry: Array<Array<number>>; distance: number; distanceDisplay: string }[]
}
export type TripDataSetType = PreviewData & {
    others?: any
}
class TripStore {
    @observable attractionType: AttractionType[] = []
    @observable province: provinceType[] = []
    @observable attractionList: AttractionGrorpByCommuType[] =[]
    @observable tripPage: string = 'create'
    @observable numberOfTabs = 1

    @observable tripData: TripDataSetType[] = [

        {
            dayOfTrip: 1,
            attractions: [],
            others: {},
        },
    ]

    @observable previewData: PreviewData[] = []

    /** ตัวเก็บข้อมูลสำหรับการใช้ในการ   create ,edit ,preview */
    @observable dayOfTripData = {
        tripName: null,
        days: [
            {
                dayOfTrip: 1,
                attractionSelect: [],
                community: []
            }
        ]
    } as FormDayTripStructure



    @observable dayOfTripPreviewData = {
        tripName: null,
        days: [
            {
                dayOfTrip: 1,
                attractionSelect: [],
                community: []
            }
        ]
    } as FormDayTripStructure


    /** ตัวเก็บข้อมูลสำหรับการใช้ในการ   create ,edit ,preview */

    @action setPageTrip = (page: string) => (this.tripPage = page)

    @action setup = async () => {
        // const attractionType: AttractionType[] = await fetchGet({ url: apiConfig.lookup.attractionType })
        // const province: provinceType = await fetchGet({ url: apiConfig.lookup.province })

        const [attractionType, province] = await Promise.all([fetchGet<AttractionType[]>({ url: apiConfig.lookup.attractionType }), fetchGet<provinceType[]>({ url: apiConfig.lookup.province })])


        runInAction(() => {
            this.attractionType = attractionType
            this.province = province
        })
    }

    @action searchAttractions = async (params: SearchAttraction) => {
        const attractionList: AttractionGrorpByCommuType[] = await fetchPost({
            url: apiConfig.resource.trip.searchAttraction,
            data: params,
        })

        runInAction(() => {
            this.attractionList = attractionList
        })
        return attractionList
    }

    @action setTripData = (params: TripDataSetType) => {
        let arr = [...this.tripData]
        arr[params.dayOfTrip - 1] = params

        this.tripData = arr
    }

    @action setNumberOfTabs = (num: number) => (this.numberOfTabs = num)

    @action setPreviewData = () => {
        let arr = []

        this.tripData.forEach((item) => {
            arr.push({
                dayOfTrip: item.dayOfTrip,
                attractions: item.attractions,
            })
        })

        this.previewData = arr
    }

    @action setInitialValuesPreviewData = (data: PreviewData[]) => {
        this.previewData = data
    }

    @action setInitialValuesTripData = (data: TripDataSetType[]) => {
        this.tripData = data
    }

    @action setInitialValuesDayOfTripData = (data: FormDayTripStructure) => {
        this.dayOfTripData = data
    }

    @action setInitialValuesDayOfTripPreviewData = (data: FormDayTripStructure) => {
        this.dayOfTripPreviewData = data
    }

}

export default TripStore
