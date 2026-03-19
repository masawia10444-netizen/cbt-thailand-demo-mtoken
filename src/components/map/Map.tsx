import React from 'react'
// import styled from 'styled-components'
import _ from 'lodash'
// import { Spin } from 'antd'

import SearchingField from './SearchingField'
import usePrevious from '../../hook/usePrevious'
import useMap from '../../hook/map/useMap'
import useClick from '../../hook/map/useClick'
import useSearch from '../../hook/map/useSearch'
import useGoto from '../../hook/map/useGoto'
import useDrawPoint from '../../hook/map/useDrawPoint'
import useIdentity, { AdminpolyType } from '../../hook/map/useIdentify'
// import appLoading from '../loading/appLoading'

/** [long, lat] */
export const victoryMonument: [number, number] = [100.5383167740645, 13.764955275785015]

export type MapPointType = {
    proveCode: string
    ampCode: string
    tamCode: string
    latitude: number
    longitude: number
    postcode: string
}

type MapPropsType = {
    handleChange?: (value: MapPointType) => void
    mapRef?: any
    view?: any
    latLon?: [number, number]
    initialLatLon?: [number, number]
    disabled?: boolean
}

// const SpinWrapper = styled.div`
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     background-color: #000;
//     opacity: 0.3;
// `

// const SpinItem = styled(Spin)`
//     position: absolute;
// `

const Map: React.FC<MapPropsType> = ({ handleChange, latLon, initialLatLon, disabled }) => {
    const { view } = useMap('formMap')

    useClick(view, handleClick)
    const { setTarget } = useGoto(view, victoryMonument)
    const { setLatLong } = useDrawPoint(view, victoryMonument)

    const { setKeyword, options, setOptions, setValue, isLoading: isSearching, keyword } = useSearch(view)
    const { setIdenLatLon, callIdentify, isLoading } = useIdentity(view, victoryMonument)

    const prevLatLon = usePrevious(latLon)
    const prevInitialLatLon = usePrevious(initialLatLon)

    React.useEffect(() => {
        if (!initialLatLon) return
        if (!_.isEqual(initialLatLon, prevInitialLatLon)) {
            setLatLong(initialLatLon)
            setTarget(initialLatLon)
        }
    }, [initialLatLon])

    React.useEffect(() => {
        if (!latLon) return
        if (!view) return

        // const fetch = async () => {
        //     setLatLong(latLon)
        //     setTarget(latLon)
        //     const result = await callIdentify(latLon)
        //     console.log(result)
        // }

        if (!_.isEqual(latLon, prevLatLon)) {
            // fetch()
            setLatLong(latLon)
            setTarget(latLon)
        }
    }, [latLon])

    const handleInputChange = (value: any) => {
        setKeyword(value)
    }

    const handleSelect = (value: any) => {
        if (_.isEmpty(value)) return
        const latLon = convertStrArrToNumArr(convertStrToArray(value.LatLon))
        const [latitude, longitude] = latLon
        setTarget([longitude, latitude])
        setLatLong([longitude, latitude])
        setIdenLatLon([longitude, latitude])
        setMapPoint(value, [longitude, latitude])
    }

    const convertStrToArray = (latLonStr: string = ''): string[] => {
        return latLonStr.split(',')
    }

    const convertStrArrToNumArr = (data: string[] = []): number[] => {
        return data.map((item) => Number(item))
    }

    async function handleClick(mapPoint: any) {
        if (!disabled) {
            const { latitude, longitude } = mapPoint
            setLatLong([longitude, latitude])
            const identity = await callIdentify([longitude, latitude])
            setMapPoint(identity, [longitude, latitude])
        }
    }

    function setMapPoint(adminpoly: AdminpolyType, latLon: [number, number]) {
        const longitude = latLon[0].toFixed(6)
        const latitude = latLon[1].toFixed(6)
        if (handleChange) {
            handleChange({
                proveCode: adminpoly.AdminLevel1Code,
                ampCode: adminpoly.AdminLevel2Code,
                tamCode: adminpoly.AdminLevel3Code,
                postcode: adminpoly.PostCode,
                //
                longitude: Number(longitude),
                latitude: Number(latitude),
            })
        }
    }

    return (
        <>
            <div id="formMap" style={{ height: '100%' }} />
            {/* {isLoading && (
                <appLoading />
            )} */}
            <SearchingField
                handleInputChange={handleInputChange}
                handleSelect={handleSelect}
                options={options}
                setOptions={setOptions}
                setValue={setValue}
                isSearching={isSearching}
                keyword={keyword}
                disabled={disabled}
            />
        </>
    )
}

export default Map
