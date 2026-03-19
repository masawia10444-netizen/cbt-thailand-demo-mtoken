import React from 'react'
import { loadModules } from 'esri-loader'
import { pin } from '../../constants/map'

const defaultPin = pin.default

type LatLongType = number

const useDrawPoint = (view: any, initialLatLon?: [LatLongType, LatLongType], pin = defaultPin) => {
    const [latLon, setLatLon] = React.useState(initialLatLon)

    const setLatLong = (latLon: [LatLongType, LatLongType]) => {
        setLatLon(latLon)
    }

    React.useEffect(() => {
        if (!view) return

        loadModules(['esri/geometry/Point', 'esri/Graphic']).then(([Point, Graphic]) => {
            const point = new Point({
                type: 'point',
                longitude: latLon && latLon[0],
                latitude: latLon && latLon[1],
            })

            const markerSymbol = {
                type: 'picture-marker', // autocasts as new SimpleMarkerSymbol()
                url: pin,
                width: '54px',
                height: '61px',
                xoffset: 0,
                yoffset: '30px',
            }

            const pointGraphic = new Graphic({
                id: 'pin',
                geometry: point,
                symbol: markerSymbol,
            })

            view.graphics.items = []
            view.graphics.add(pointGraphic)
        })
    }, [view, latLon])

    return { setLatLong }
}

export default useDrawPoint
