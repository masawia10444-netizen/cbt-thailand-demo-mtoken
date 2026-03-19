import { FC } from 'react'

import pathRoutes from './pathRoutes'
//#region  import Components
import Community from '../../components/community/community'
import Season from '../../components/season/season'
import ContentSeason from '../../components/season/content/contentSeason'
import attractionInCommunity from '../../components/season/content/attraction/attraction'
import Home from '../../components/home/views/home'
import Activity from '../../components/activity/activity'
import RecommendedRoute from '../../components/recommendedRoute/recommendedRoute'
import Festival from '../../components/festival/festival'
import ContentActivity from '../../components/activity/content/contentActivity'
import Accommodation from '../../components/accommodation/accommodation'
import RelatedPage from '../../components/relatedSystem/relatedPage'

//#endregion import Components

//#region  import Icon
// import { ReactComponent as LogoGIS } from '../images/logoGIS.svg'
//#endregion import Icon

export type menuItemType = {
    id: string //ต้องมี id
    name?: string //มีเมื่อต้องการแสดงเป็น Menu บนหน้าจอ
    permissionCode: string | null
    isDisplayMenu: boolean //true = แสดงบนหน้าจอ, false = ไม่แสดงบนหน้าจอ
    icon: SvgType | null
    component?: FC<any> | null //เป็น level เดียวต้องระบุ
    pathRoute?: string //เป็น level เดียว(ไม่มี Children) ต้องระบุ
    children?: menuItemType[]
}

export const specialPath = {
    login: {
        id: '$login',
        path: '/',
    },
    reviewTravel: {
        id: '$reviewTravel',
        path: '/reviewTravel',
    },
}

// const { t } = useTranslation();

export const  footerRoutesConfig = ['reviewTravel','season','activity','recommendedRoute','festival' ,'accommodation']

//#region  Config Contents
const returnConfig: menuItemType[] = [
    {
        id: `home`,
        name: ('HOME.HOME.TITLE'),
        permissionCode: null,
        isDisplayMenu: true,
        icon: null,
        pathRoute: pathRoutes.home.view,
        component: Home,
    },
    //รีวิวท่องเที่ยวโดยชุมชน
    {
        id: `reviewTravel`,
        name: ('HOME.REVIEW_TRAVEL.TITLE'),
        permissionCode: null,
        isDisplayMenu: true,
        icon: null,
        pathRoute: pathRoutes.reviewTravel.view,
        component: Community,
    },
    //เที่ยวชุมชนตามฤดู
    {
        id: `season`,
        name: ('HOME.COMMUNITY.TITLE'),
        permissionCode: null,
        isDisplayMenu: true,
        icon: null,
        pathRoute: pathRoutes.community.view,
        component: Season,
    },
    {
        id: `contentSeason`,
        name: 'content Season',
        permissionCode: null,
        isDisplayMenu: true,
        icon: null,
        children: [
            {
                id: `pyg_11`,
                name: 'content',
                permissionCode: null,
                pathRoute: pathRoutes.community.content,
                isDisplayMenu: false,
                icon: null,
                component: ContentSeason,
            },
        ],
    },
    //กิจกรรมน่าสนใจ
    {
        id: `activity`,
        name: ('HOME.ATTRACTION.TITLE'),
        permissionCode: null,
        isDisplayMenu: true,
        icon: null,
        pathRoute: pathRoutes.attraction.view,
        component: Activity,
    },
    {
        id: `contentActivity`,
        name: 'content Activity',
        permissionCode: null,
        isDisplayMenu: true,
        icon: null,
        children: [
            {
                id: `pyg_11`,
                name: 'content',
                permissionCode: null,
                pathRoute: pathRoutes.attraction.content,
                isDisplayMenu: false,
                icon: null,
                component: ContentActivity,
            },
        ],
    },
    //เส้นทางแนะนำ
    {
        id: `recommendedRoute`,
        name: ('HOME.RECOMMENDED_ROUTE.TITLE'),
        permissionCode: null,
        isDisplayMenu: true,
        icon: null,
        pathRoute: pathRoutes.recommendedRoute.view,
        component: RecommendedRoute,
    },
    //เทศกาลและประเพณี
    {
        id: `festival`,
        name: ('HOME.FESTIVAL_AND_TRADITIONAL.TITLE'),
        permissionCode: null,
        isDisplayMenu: true,
        icon: null,
        pathRoute: pathRoutes.festivalsAndTraditions.view,
        component: Festival,
    },
    // ที่พักชุมชน
    {
        id: `accommodation`,
        name: ('HOME.ACCOMMODATION.TITLE'),
        permissionCode: null,
        isDisplayMenu: true,
        icon: null,
        pathRoute: pathRoutes.accommodation.view,
        component: Accommodation,
    },
    {
        id: `contentRoute`,
        name: 'content Route',
        permissionCode: null,
        isDisplayMenu: true,
        icon: null,
        children: [
            {
                id: `pyg_11`,
                name: 'content',
                permissionCode: null,
                pathRoute: pathRoutes.festivalsAndTraditions.content,
                isDisplayMenu: false,
                icon: null,
                component: ContentSeason,
            },
        ],
    },
    {
        id: `login`,
        name: ('HOME.LOGIN.TITLE'),
        permissionCode: null,
        isDisplayMenu: true,
        icon: null,
        pathRoute: pathRoutes.login.view,
        component: Community,
    }
    ,
    {
        id: 'relatedSystem',
        name: 'FOOTER.SYSTEM_REF_TEXT',
        permissionCode: null,
        isDisplayMenu: false,
        icon: null,
        pathRoute: pathRoutes.relatedSystem.view,
        component: RelatedPage,
    }
]
//#endregion Config Contents

export default returnConfig
