import { menuBarPageList, PageListType } from '../configs/menuConfig'

export const findMenuID = (path: string): number => {
    let menuID = menuBarPageList.filter((item: PageListType) => path.includes(item.path))[0]?.id
    return menuID
}