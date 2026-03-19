import React from 'react'

type TMapContentProps = {
    mapID: string
}
const MapContent = ({ mapID = Math.random.toString() }: TMapContentProps) => {
    return <div id={mapID} style={{ height: '448px', marginBottom: '50px' }} />
}

export default MapContent
