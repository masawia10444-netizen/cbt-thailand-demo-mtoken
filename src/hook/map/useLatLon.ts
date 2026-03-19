import React from 'react'

const useLatLon = (initialLatLon?: [number, number]) => {
    const [latLon, setLatLon] = React.useState<[number, number]>()

    React.useEffect(() => {
        setLatLon(initialLatLon)
    }, [initialLatLon])

    const handleLat = (value: string | number) => {
        const newLat = Number(value)
        if (!latLon) return
        if (!value) return
        if (isNaN(newLat)) return
        const oldLon = latLon[0]
        setLatLon([oldLon, newLat])
    }

    const handleLon = (value: string | number) => {
        const newLon = Number(value)
        if (!latLon) return
        if (!value) return
        if (isNaN(newLon)) return
        const oldLat = latLon[1]
        setLatLon([newLon, oldLat])
    }

    return { latLon, setLatLon, handleLat, handleLon }
}

export default useLatLon
