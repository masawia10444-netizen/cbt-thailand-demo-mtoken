


export type DayTripAttractionStructure = {
    attracID: number
    attracNameTH: string
    attracNameEN: string
    attracDescTH: string
    attracDescEN: string
    attracTime: string | number
    attracFee: null | number 
    communID?: number
    communNameTH?: string
    communNameEN?: string
    latitude: number
    longitude: number
    geometry?: Array<Array<number>>
    distance?: number
    distanceDisplay?: string
    image: null | string
    isRelAttraction : boolean
    expense? : number
}

export type DayTripCommunityStructure = {
    communID: number
    communNameTH: string
    communNameEN: string
    attractionList: DayTripAttractionStructure[]
}

export type DayTripStructure = {
    dayOfTrip: number
    attractionSelect: DayTripAttractionStructure[]
    community?: DayTripCommunityStructure[]
    isDisplaySearched?: boolean
    provID? : number | null
    attractionTypeID?: string[] 
    budget? : string | null  | number
}

export type FormDayTripStructure = {
    isEditMode ?: boolean
    initialTabDay? : number
    tripName :string |null | undefined
    days: DayTripStructure[]
}