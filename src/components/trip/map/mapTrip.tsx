import React from 'react'
import useMapTrip, { ReturnTypeUseMapTrip } from './hook/useMapTrip'
import { MapDataRouteTripType } from './hook/useMapTrip'
import { DayTripStructure } from '../form/FormDayTripStructure'
// import { FormSpy } from 'react-final-form'

type MapTripViewProps = {} & ReturnTypeUseMapTrip
// const MapTripView: React.FC<MapTripViewProps> = ({ onChangeForm }) => {
const MapTripView: React.FC<MapTripViewProps> = ({}) => {
    return (
        <>
            {/* <FormSpy subscription={{ values: true }} onChange={onChangeForm} /> */}
            <div style={{ width: '100%', height: '100%' }}>
                <div id='formMapTrip' style={{ height: '100%' }} />
            </div>
        </>
    )
}

type MapTripProps = {
    dataMap: DayTripStructure[]
} & Omit<MapTripViewProps, keyof ReturnTypeUseMapTrip>
const MapTrip: React.FC<MapTripProps> = ({ dataMap }) => {
    const stateMap = useMapTrip('formMapTrip', dataMap)

    React.useEffect(() => {
        // console.log('dataMap', dataMap)
        if (dataMap) stateMap.onChangeRouteTrip(dataMap)
    }, [dataMap])

    return (
        <>
            <MapTripView {...stateMap} />
        </>
    )
}

export default MapTrip
