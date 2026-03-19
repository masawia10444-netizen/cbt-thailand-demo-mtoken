import React from 'react'

import { victoryMonument } from '../../components/map/Map'

const useClick = (view: any, callback: any) => {
    // const [latLon, setLatLon] = React.useState<[number, number]>(victoryMonument)
    const [latLon] = React.useState<[number, number]>(victoryMonument)
    // const [longitude, setLongitude] = React.useState<number>()
    React.useEffect(() => {
        if (!view) return
        const clickHandler = view.on('click', (event: any) => {
            // console.log(event.mapPoint)
            // const { latitude, longitude } = event.mapPoint
            callback(event.mapPoint)
            // setLatLon([latitude, longitude])
        })

        return () => {
            clickHandler.remove()
        }
    }, [view, callback])

    return { latLon }
}

export default useClick
