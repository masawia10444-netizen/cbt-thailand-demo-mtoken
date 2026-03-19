import React from 'react'

type TargetType = [number, number]
type ZoomType = number

const useGoto = (view: __esri.MapView | null, initialLatLon: TargetType | undefined) => {
    const [target, setTarget] = React.useState<TargetType | undefined>(initialLatLon)
    const [zoom, setZoom] = React.useState<ZoomType>(15)

    React.useEffect(() => {
        if (!view) return

        view.goTo({
            target: target,
            zoom,
        })
    }, [view, zoom, target])

    return { setTarget, setZoom }
}

export default useGoto
