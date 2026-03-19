import React from 'react'
import { loadModules } from 'esri-loader'

type EsriModulesType = [
    typeof import('esri/Map'),
    typeof import('esri/Basemap'),
    typeof import('esri/views/MapView'),
    typeof import('esri/layers/TileLayer'),
]

export const victoryMonument: [number, number] = [100.5383167740645, 13.764955275785015]

/**
 * create map view
 * @param elID element id ที่ต้องการ reference Map view
 */
const useMap = (elID: string) => {
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

            // const layer = new TileLayer({
            //     url: 'https://apptest.cdg.co.th/arcgis/rest/services/NOSTRA_CACHE/MapServer',
            // })

            // const basemap = new Basemap({
            //     baseLayers: [layer],
            // })

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
        //         view.container = null
        //         // setView(null)
        //     }
        //     setLoading(false)
        // }
    }, [])

    return { view, isLoading }
}

export default useMap
