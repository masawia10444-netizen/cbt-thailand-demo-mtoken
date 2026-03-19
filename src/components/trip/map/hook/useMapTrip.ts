// import { path } from '@amcharts/amcharts4/core'
// import { AnyObject, FormState } from 'final-form'
import { useCallback, useEffect } from 'react'
import useDrawRouteTrip from '../../../../hook/map/useDrawRouteTrip'
import useMap from '../../../../hook/map/useMap'
import { DayTripStructure, FormDayTripStructure } from '../../form/FormDayTripStructure'

export type MapDataRouteTripType = {
    dayOfTrip: number
    attractions: attractionData[]
}
export type attractionData = {
    attracID: number
    attracNameTH: string
    attracNameEN: string
    attracDescTH?: string
    attracDescEN?: string
    attracTime?: number
    attracFee?: number
    communID: number
    communNameTH: string
    communNameEN: string
    latitude: number
    longitude: number
}

export type ReturnTypeUseMapTrip = ReturnType<typeof useMapTrip>
type UseMapTripProps = {
    // dataMap: RouteAttractionObj[]
}
const useMapTrip = (divMapID: string, data: DayTripStructure[]) => {
    const { view } = useMap(divMapID, { zoom: true })
    const { updateRouteTrip } = useDrawRouteTrip(view, [])

    const onChangeRouteTrip = useCallback(
        (values: DayTripStructure[]) => {
            const routeTrip =
                values.map(({ attractionSelect = [] }) => {
                    let paths: string[][] | number[][] = []
                    attractionSelect.forEach((item: any, index: number) => {
                        if (index > 0) {
                            if (item.geometry?.length > 0) {
                                paths = [...paths, ...item.geometry] as string[][] | number[][]
                            } else {
                                paths = [
                                    ...paths,
                                    ...[
                                        [
                                            [
                                                attractionSelect[index - 1]?.longitude,
                                                attractionSelect[index - 1]?.latitude,
                                            ],
                                            [item.longitude, item.latitude],
                                        ],
                                    ],
                                ] as string[][] | number[][]
                            }
                        }
                    })
                    const pins =
                        attractionSelect?.length > 0
                            ? attractionSelect.map((line, index) => ({
                                  lat: line?.latitude || null,
                                  lon: line?.longitude || null,
                                  isRelAttraction: line?.isRelAttraction || false,
                              }))
                            : []
                    return {
                        pins: pins,
                        paths: paths,
                    }
                }) || []

         

            updateRouteTrip(routeTrip)
        },
        [updateRouteTrip],
    )

    useEffect(() => {
        onChangeRouteTrip(data)
    }, [data])

    return { onChangeRouteTrip }
    // return { onChangeRouteTrip }
}
export default useMapTrip
