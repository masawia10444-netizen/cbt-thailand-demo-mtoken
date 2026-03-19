

import React,{ useMemo } from 'react';
import { TContentRecom ,TContentRoute } from './ContentRecomStructure';
import orderBy from 'lodash/orderBy'
import groupBy from 'lodash/groupBy'

type THookContentRecom ={
    dataContent: TContentRecom
}

const useContentRecommendedRoute = ({dataContent} : THookContentRecom) => {

    const renewContent = useMemo(() => {
        const  dayAllTrip = groupBy(dataContent.routes, 'day')
        const routeByDay = Object.entries(dayAllTrip).map(([key, value]) => {
            const sortAttractionSelect = orderBy(value as TContentRoute[], ['stopOrder'], ['asc'])
            return {
                dayOfTrip: Number(key),
                routes:sortAttractionSelect ,
            }
        }) 
        return {...dataContent,routeByDay }

    },[dataContent])
    return {dataContent : renewContent }
}

export default useContentRecommendedRoute;
