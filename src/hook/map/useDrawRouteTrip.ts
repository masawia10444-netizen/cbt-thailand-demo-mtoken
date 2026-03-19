import { useCallback, useState, useEffect } from 'react'
import { loadModules } from 'esri-loader'
import _ from 'lodash'

import { pin as pinImg } from '../../constants/map'

const useDrawRouteTrip = (view: any, initialRouteTrip: any[] = []) => {
    const [routeTrip, setRouteTrip] = useState(initialRouteTrip)
    useEffect(() => {
        if (!view) return

        loadModules([
            'esri/geometry/Point',
            'esri/geometry/Multipoint',
            'esri/geometry/Polyline',
            'esri/Graphic',
            'esri/geometry/geometryEngineAsync',
        ]).then(([Point, Multipoint, Polyline, Graphic, geometryEngine]) => {
            view.graphics.removeAll()
            let geometryRoute: any[] = []
            let multipoint = new Multipoint()

            routeTrip.forEach((item: any, day: number) => {
                let color: any[] = [94, 41, 188]

                item.paths.forEach((path: any, index: number) => {
                    const polyline = new Polyline({
                        paths: path,
                        spatialReference: { wkid: 4326 },
                    })

                    let lineSymbol = {
                        type: 'simple-line', // autocasts as new SimpleLineSymbol()
                        color: color, // RGB color values as an array
                        width: 4,
                    }
                    let dotSymbol = {
                        type: 'simple-line', // autocasts as new SimpleLineSymbol()
                        color: color, // RGB color values as an array
                        width: 4,
                        style: 'short-dot',
                    }

                    const lineGraphic = new Graphic({
                        geometry: polyline,
                        symbol: path?.length > 2 ? lineSymbol : dotSymbol,
                    })

                    let startฺฺPolyline = new Polyline({
                        paths: [[item.pins[index]?.lon, item.pins[index]?.lat], path[0]],
                        spatialReference: { wkid: 4326 },
                    })

                    const lineฺStartฺฺGraphic = new Graphic({
                        geometry: startฺฺPolyline,
                        symbol: dotSymbol,
                    })

                    let endฺฺPolyline = new Polyline({
                        paths: [[item.pins[index + 1]?.lon, item.pins[index + 1]?.lat], path[path?.length - 1]],
                        spatialReference: { wkid: 4326 },
                    })

                    const lineEndGraphic = new Graphic({
                        geometry: endฺฺPolyline,
                        symbol: dotSymbol,
                    })
                    //@ts-ignore
                    if (polyline.extent) geometryRoute.push(polyline.extent)

                    view.graphics.addMany([lineฺStartฺฺGraphic, lineGraphic, lineEndGraphic])
                })

                item.pins.forEach((pin: any, i: number) => {
                    const point = new Point({
                        type: 'point',
                        longitude: pin.lon,
                        latitude: pin.lat,
                    })
                    const markerSymbol = {
                        type: 'picture-marker', // autocasts as new SimpleMarkerSymbol()
                        url: pin.isRelAttraction ? pinImg.relAttrac : pinImg.attrac,
                        width: '36px',
                        height: '40px',
                        xoffset: 0,
                        yoffset: '20px',
                    }
                    const textSymbol = {
                        type: 'text', // autocasts as new TextSymbol()
                        color: 'white',
                        text: i + 1,
                        xoffset: 0,
                        yoffset: '18px',
                        font: {
                            // autocasts as new Font()
                            size: 10,
                            weight: 'bold',
                        },
                    }
                    const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: markerSymbol,
                    })
                    const textGraphic = new Graphic({
                        geometry: point,
                        symbol: textSymbol,
                    })
                    multipoint.addPoint(point)
                    view.graphics.addMany([pointGraphic, textGraphic])
                })
            })
            if (multipoint.extent) geometryRoute.push(multipoint.extent)
            geometryEngine.union(geometryRoute).then((response: any) => {
                if (response?.extent) {
                    view.goTo(response.extent)
                } else {
                    if (geometryRoute?.length > 0) {
                        if (geometryRoute[0]?.center) {
                            view.goTo({
                                center: geometryRoute[0]?.center,
                            })
                        }
                    }
                }
            })
        })
    }, [view, routeTrip])

    const updateRouteTrip = useCallback(
        (routeTripNew: any[]) => {
            if (!_.isEqual(routeTrip, routeTripNew)) {
                setRouteTrip(routeTripNew)
            }
        },
        [routeTrip],
    )

    return { updateRouteTrip }
}

export default useDrawRouteTrip
