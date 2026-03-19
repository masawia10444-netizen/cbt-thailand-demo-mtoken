import React from 'react'
import jsonp from 'jsonp'
import querystring from 'querystring'
import _ from 'lodash'

export type AdminpolyType = {
    AdminLevel1Code: string
    AdminLevel1_E: string
    AdminLevel1_L: string
    AdminLevel2Code: string
    AdminLevel2_E: string
    AdminLevel2_L: string
    AdminLevel3Code: string
    AdminLevel3_E: string
    AdminLevel3_L: string
    AdminLevel4_E: string
    AdminLevel4_L: string
    PostCode: string
    LatLon: string
}

const useIdentify = (view: __esri.MapView | null, initialLatLon: [number, number]) => {
    const [latLon, setIdenLatLon] = React.useState<[number, number]>(initialLatLon)
    const [identity, setIdentity] = React.useState<any>([])
    const [isLoading, setLoading] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (!view) return

        setLoading(true)
        const fetch = async () => {
            const results = await callIdentify(latLon)

            setIdentity(results)
            setLoading(false)
        }

        fetch()
        return () => {
            setLoading(false)
        }
    }, [view, latLon])

    const callIdentify = (latLon: [number, number]) => {
        const config = {
            key: process.env.REACT_APP_NOSTRA_MAP_KEY,
            lat: latLon[1],
            lon: latLon[0],
            country: 'TH',
        }
        setLoading(true)
        const q = querystring.encode(config)
        return new Promise<AdminpolyType>((resolve, reject) => {
            jsonp(`${process.env.REACT_APP_NOSTRA_MAP_SERVICE_URL}/Location/Identify?` + q, (err, results) => {
                setLoading(false)
                if (_.isEmpty(results) || !results.results) return reject(results.errorMessage)
                resolve(results.results[0])
            })
        })
    }

    return { identity, isLoading, setIdenLatLon, callIdentify }
}

export default useIdentify
