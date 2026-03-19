import React from 'react'
import { loadModules } from 'esri-loader'

import { pin as pinImg } from '../../../../../constants/map'

type LatLongType = number

const useDrawPoint = (view: any, initialLatLon: [LatLongType, LatLongType]) => {
    const [latLon, setLatLon] = React.useState(initialLatLon)

    const [arryData, setArryData] = React.useState([])

    const setLatLong = (latLon: [LatLongType, LatLongType]) => {
        setLatLon(latLon)
    }

    const getArryData = (data: any[]) => {
        // @ts-ignore
        setArryData(data)
    }

    React.useEffect(() => {
        if (view) pinAttracLocation()
    }, [view, latLon, arryData])

    const pinAttracLocation = () => {

        loadModules([
            'esri/geometry/Point',
            "esri/geometry/Multipoint",
            'esri/Graphic',
        ]).then(([
            Point,
            Multipoint,
            Graphic,
        ]) => {

            let multipoint = new Multipoint()

            arryData?.forEach((item: any, index: number) => {
                const point = new Point({
                    type: 'point',
                    longitude: item.longitude,
                    latitude: item.latitude,
                })
                const markerSymbol = {
                    type: 'picture-marker', // autocasts as new SimpleMarkerSymbol()
                    url: item.isRelAttraction ? pinImg.relAttrac : pinImg.attrac,
                    width: '36px',
                    height: '40px',
                    xoffset: 0,
                    yoffset: '20px',
                }
                const textSymbol = {
                    type: 'text', // autocasts as new TextSymbol()
                    color: 'white',
                    text: index + 1,
                    xoffset: 0,
                    yoffset: '18px',
                    font: {
                        // autocasts as new Font()
                        size: 10,
                        weight: 'bold',
                    },
                }
                const pointGraphic = new Graphic({
                    id: 'pin',
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

            view.goTo(multipoint)

        })
    }

    return { setLatLong, getArryData }
}

export default useDrawPoint
