import { useEffect, useState, useMemo } from 'react'
import Store from '../stores/rootStore'

export type UseBreadcrumbsType = {
    contentName: string
}
const useBreadcrumbs = ({ contentName }: UseBreadcrumbsType) => {
    const { LayoutStore } = Store()

    useEffect(() => {
        LayoutStore.setContentName(contentName)
        return () => {
            LayoutStore.setContentName('')
        }
    }, [contentName])

    return {}
}
export default useBreadcrumbs
