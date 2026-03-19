import jsonp from 'jsonp'
import querystring from 'querystring'
import { apiConfig } from '../../configs/webAPIConfig'
import { DayTripAttractionStructure } from './form/FormDayTripStructure'
import {
    fetchGetWithAuthorization,
    fetchPutWithAuthorization,
    fetchDeleteWithAuthorization,
    fetchPostWithAuthorization,
} from '../../utilities/request'

export type ResponseTripCommon = {
    statusCode?: number
    message?: string
}

export type TRoute = Array<Array<number>>

type TDirection = {
    length: number
    maneuverType: string
    point: Array<Array<number>>
    text: string
    time: number
}

export type TStop = {
    name: string
    sequence: number
}

export type TResGetRoute = {
    directions: Array<TDirection>
    route: Array<Array<number>>
    stops: TStop
    totalLength: number
    totalTime: number
    useTollRoad: boolean
    distance: number
}

export type TPointParam = {
    lat: number
    lon: number
}

export type TRoutes = {
    dayOfTrip: number
    stopOrder: number
    attractionSeq?: number | null
    relAttractionID?: number | null
    distance: number
    path: number[][]
    expense: number | null | undefined
}

export type TAddRouteParam = {
    userID: number
    tripName: string
    estmExpense: number
    routes: TRoutes[]
}

export type TResGetTripRoute = {
    day: number
    attracID: number
    attracNameTH: string
    attracNameEN: string
    attracDescTH: string
    attracDescEN: string
    attracFee: number | null
    attracTime: string | number
    latitude: number
    longitude: number
    image: string | null
    tripPath: string
    tripDistance: number
    stopOrder: number
    path: number[][]
    expense: number | null | undefined
}

export type TResGetTrip = {
    tripID: number
    tripName: string
    day: number
    routes: TResGetTripRoute[]
}

export const getTrip = async (id: number) => {
    try {
        const response = await fetchGetWithAuthorization<TResGetTrip[]>({
            url: apiConfig.resource.trip.get.replace('{id}', String(id)),
        })
        return response as TResGetTrip[]
    } catch (error) {
        console.log('Error getTrip', error)
        return error
    }
}

export const deleteTrip = async (tripID: number) => {
    const data = await fetchDeleteWithAuthorization({
        url: apiConfig.resource.trip.delete.replace('{tripID}', String(tripID)),
    })
    return data
}

export const addTrip = async (params: TAddRouteParam) => {
    try {
        const data = await fetchPostWithAuthorization({
            url: apiConfig.resource.trip.add,
            data: params,
        })
        return data
    } catch (err) {
        console.log('Error addRoute', err)
        return err
    }
}

export const updateTrip = async (params: TAddRouteParam, tripID: number) => {
    try {
        const data = await fetchPutWithAuthorization({
            url: apiConfig.resource.trip.update.replace('{id}', String(tripID)),
            data: params,
        })
        return data
    } catch (err) {
        console.log('Error addRoute', err)
        return err
    }
}

export const getRoute = async (start: TPointParam, end: TPointParam) => {
    const config = {
        key: process.env.NEXT_PUBLIC_NOSTRA_MAP_KEY,
        stops: JSON.stringify([start, end]),
        country: 'TH',
        returnedAGSResult: false,
    }
    const querystr = querystring.encode(config)
    return new Promise<TResGetRoute>((resolve: any, reject: any) => {
        jsonp(`${process.env.NEXT_PUBLIC_NOSTRA_MAP_SERVICE_URL}/Network/Route?${querystr}`, (err, { results }) => {
            if (results) {
                resolve(results)
            } else {
                //@ts-ignore
                resolve()
            }
        })
    })
}

export const getRouteData = async (pointStart?: DayTripAttractionStructure, pointEnd?: DayTripAttractionStructure) => {
    const result = {
        geometry: [] as TRoute,
        distance: 0 as number,
    }
    if (pointStart?.latitude && pointStart?.longitude && pointEnd?.latitude && pointEnd?.longitude) {
        const route = (await getRoute(
            { lat: parseFloat(String(pointStart.latitude)), lon: parseFloat(String(pointStart.longitude)) },
            { lat: parseFloat(String(pointEnd.latitude)), lon: parseFloat(String(pointEnd.longitude)) },
        )) as TResGetRoute
        if (route) {
            result.geometry = route.route
            result.distance = route.totalLength
        }
    }

    return result
}
