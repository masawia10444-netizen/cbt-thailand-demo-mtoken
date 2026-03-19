
import { useCallback, useState ,useEffect } from 'react'
import useFormManageAttraction  from '../form/useFormManageAttraction'
import useStore from '../../../stores/rootStore'
type HookCreateTripProps = {}
const useCreateTrip =(props : HookCreateTripProps)=>{
    const [renderCurrentPage , setRenderCurrentPage] = useState<'search-attraction'|'route-preview'>('search-attraction')
    // const stateHookFormManageAttraction  = useFormManageAttraction({renderCurrentPage , setRenderCurrentPage})

 const {TripStore}  =useStore()
    const initialState = useCallback(() => {
        TripStore.setInitialValuesDayOfTripData({
            tripName: null,
            days: [
                {
                    dayOfTrip: 1,
                    attractionSelect: [],
                    community: [],
                    isDisplaySearched: false,
                },
            ],
        })
        TripStore.setInitialValuesDayOfTripPreviewData({
            tripName: null,
            days: [
                {
                    dayOfTrip: 1,
                    attractionSelect: [],
                    community: [],
                    isDisplaySearched: false,
                },
            ],
        })
    }, [])


    useEffect(()=>{
        return ()=>{
            initialState()
        }
    },[])



    return {renderCurrentPage , setRenderCurrentPage}
}
export default useCreateTrip