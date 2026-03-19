import React from 'react'
import { DayTripStructure } from '../form/FormDayTripStructure'
import MapTrip from '../map/mapTrip'
// import usePreviewMap from './usePreviewMap'

type UsePreviewMapType = {
    dataMap: DayTripStructure[]
}

const PreviewMapView: React.FC<UsePreviewMapType> = ({ dataMap }) => {
    // console.log('------', dataMap)
    return <MapTrip dataMap={dataMap} />
}

const PreviewMap: React.FC<UsePreviewMapType> = ({ dataMap }) => {
    // const stateMap = usePreviewMap()
    return <PreviewMapView dataMap={dataMap} />
}

export default PreviewMap
