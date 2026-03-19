import Router, { useRouter } from 'next/router'
import page, { menuItemType, specialPath } from './page'

const UsePageRouter = () => {
    const router = useRouter()

    const getPagePath = (
        pageTree: menuItemType[],
        searchComponentKey: string,
        passByRef: { current: string | null },
    ): void => {
        const thisStopRecursive = 0
        if (pageTree?.length === thisStopRecursive) return //stop recursive

        pageTree.every((configItem) => {
            if (searchComponentKey === configItem.id) {
                if (configItem.pathRoute && configItem.component) {
                    passByRef.current = configItem.pathRoute
                }
                return false
            } else if (configItem.children?.length !== 0) {
                const listChilds: menuItemType[] = configItem?.children ?? []
                getPagePath(listChilds, searchComponentKey, passByRef)
            }

            return true
        })
    }

    const navigateTo = (componentKey: string): void => {
        const path: { current: string | null } = { current: null }
        getPagePath(page, componentKey, path)
        if (path.current) {
            //in layout
            Router.push(path.current)
        } else {
            //out side layout
            type listPageType = {
                id: string
                path: string
            }
            const listPage: listPageType[] = []
            Object.entries(specialPath).every(([, value]) => {
                if (value.id === componentKey) {
                    listPage.push(value)
                    return false
                }
                return true
            })
            if (listPage?.length > 0) {
                const currentPage: listPageType = listPage[0]
                Router.push(currentPage.path)
            }
        }
    }

    return {
        navigateTo,
    }
}

export default UsePageRouter
