import { useEffect, useState, useMemo } from 'react'
import rootStore from '../../../stores/rootStore'

export type UseHomePropsType = {}
const useHome = ({ }: UseHomePropsType) => {

   const { HomeStore } = rootStore()

   useEffect(() => {

      // HomeStore.getHighlightList()

      return () => { }
   }, [])

   return {

   }
}
export default useHome
