


export type TContentRoute = {
    attracDescEN:string
    attracDescTH: string
    attracFee: null | number
    attracID:number
    attracNameEN: string
    attracNameTH: string
    attracTime: number | null
    day: number
    distance: number
    image: null | string
    isRelAttraction: boolean
    latitude: number
    longitude: number
    path : number[][]
}


export type TRouteByDay ={
    dayOfTrip : number
    routes : TContentRoute[]
}


export type TContentRecom ={
    communID: number
    communNameEN: string 
    communNameTH: string
    estmExpense: number
    image: string | null
    provCode: string
    provNameEN:string
    provNameTH: string
    tripID:number
    tripInfoEN: string |null
    tripInfoTH: string |null
    tripNameEN: string
    tripNameTH: string
    routes: TContentRoute[]
    routeByDay? : TRouteByDay[]
}