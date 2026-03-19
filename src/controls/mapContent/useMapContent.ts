import useMap from '../../hook/map/useMap'
import useDrawPoint from '../../hook/map/useDrawPoint'
import useGoto from '../../hook/map/useGoto'

type TUseMapContentProps = {
    mapID: string
    pin: string
    pinPoint?: [number, number]
}
const useMapContent = (props: TUseMapContentProps) => {
    const { view } = useMap(props.mapID, { zoom: true })
    const {} = useDrawPoint(view, props.pinPoint, props.pin)
    const {} = useGoto(view, props.pinPoint)

    return { view }
}

export default useMapContent
