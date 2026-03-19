import React from 'react'
import useMap from '../src/hook/map/useMap'

const Testmap = () => {
    const {} = useMap('viewMap')

    return (
        <div
            style={{ width: '100%', height: '1000px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <div id='viewMap' style={{ width: '500px', height: '500px' }}></div>
        </div>
    )
}

export default Testmap
