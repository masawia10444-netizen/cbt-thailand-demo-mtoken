import React from 'react'
import { loadModules } from 'esri-loader'

import useScreenSize from '../useScreenSize'

import { victoryMonument } from '../../components/map/Map'

type EsriModulesType = [
    typeof import('esri/Map'),
    typeof import('esri/Basemap'),
    typeof import('esri/views/MapView'),
    typeof import('esri/layers/TileLayer'),
    typeof import('esri/widgets/Zoom'),
]

type TTools = {
    zoom?: boolean
}

/**
 * create map view
 * @param elID element id ที่ต้องการ reference Map view
 */
let evtDragMap = null
const useMap = (elID: string, tools: TTools = {}) => {
    const { isMobileSize } = useScreenSize()
    const [view, setView] = React.useState<__esri.MapView | null>(null)
    const [isLoading, setLoading] = React.useState<boolean>(false)

    React.useEffect(() => {
        const initialLoad = async () => {
            const [Map, Basemap, MapView, TileLayer] = await (loadModules([
                'esri/Map',
                'esri/Basemap',
                'esri/views/MapView',
                'esri/layers/TileLayer',
            ]) as Promise<EsriModulesType>)

            const map = new Map({
                basemap: 'streets',
            })

            // load the map view at the ref's DOM node
            let view = new MapView({
                container: elID,
                map: map,
                center: victoryMonument,
                zoom: 7,
            })

            view.ui.components = []

            view.when(
                function () {
                    createTools(view)
                    setView(view)
                    setLoading(true)
                },
                function (error: any) {
                    console.log("The view's resources failed to load: ", error)
                },
            )
        }

        initialLoad()

        // return () => {
        //     if (view) {
        //         // destroy the map view
        //         // view.container = null
        //         // setView(null)
        //     }
        //     // setLoading(false)
        // }
    }, [])

    const createTools = React.useCallback(
        async (view: __esri.MapView) => {
            if (!view) {
                return
            }

            const [Zoom] = await (loadModules(['esri/widgets/Zoom']) as Promise<EsriModulesType>)

            if (tools?.zoom) {
                var zoom = new Zoom({
                    //@ts-ignore
                    view: view,
                })

                //@ts-ignore
                view.ui.add(zoom, {
                    position: 'top-right',
                })
            }
        },
        [tools],
    )

    React.useEffect(() => {
        if (view && isMobileSize) {
            evtDragMap = view.on('drag', (event: __esri.MapViewDragEvent) => {
                event.stopPropagation()
            })
        } else if (evtDragMap) {
            evtDragMap.remove()
        }
    }, [isMobileSize, view])

    return { view, isLoading }
}

export default useMap
