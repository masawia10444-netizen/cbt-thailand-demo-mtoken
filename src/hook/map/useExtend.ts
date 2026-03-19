import React from 'react'

const useExtend = (view: any) => {
    const [level] = React.useState()

    React.useEffect(() => {
        if (!view) return

        view.on('drag', (event: any) => {
            // console.log(event)
        })
    }, [view])

    React.useEffect(() => {
        if (!view) return

        view.on('mouse-wheel', (event: any) => {
            // console.log(event)
        })
    }, [view])

    return [level]
}

export default useExtend
