import { FC, useEffect, useState } from 'react'

type ScrollSensorType = {
    onWindowScroll: () => void
    children: FC<any>
}
const ScrollSensor: FC<ScrollSensorType> = (props) => {
    const reportWindowScroll = (event: any) => {
        if (props.onWindowScroll) props.onWindowScroll()
    }

    useEffect(() => {
        if (process.browser) window.addEventListener('resize', reportWindowScroll)
        return () => {
            if (process.browser) window.removeEventListener('resize', reportWindowScroll, false)
        }
    }, [])

    return props.children({})
}

export default ScrollSensor
