import pathRoutes from './routes/pathRoutes'

export type PageListType = {
    id: number
    name: string
    path: string
}

// export const  footerRoutesConfig = ['reviewTravel','season','activity','recommendedRoute','festival' ,'accommodation']

export const menuBarPageList = [
    {
        id: 1,
        name: 'HOME.REVIEW_TRAVEL.TITLE',
        path: pathRoutes.reviewTravel.view,
    },
    {
        id: 2,
        name: 'HOME.COMMUNITY.TITLE',
        path: pathRoutes.community.view,
    },
    {
        id: 3,
        name: 'HOME.ATTRACTION.TITLE',
        path: pathRoutes.attraction.view,
    },
    {
        id: 4,
        name: 'HOME.RECOMMENDED_ROUTE.TITLE',
        path: pathRoutes.recommendedRoute.view,
    },
    {
        id: 5,
        name: 'HOME.FESTIVAL_AND_TRADITIONAL.TITLE',
        path: pathRoutes.festivalsAndTraditions.view,
    },
    {
        id: 6,
        name: 'HOME.ACCOMMODATION.TITLE',
        path: pathRoutes.accommodation.view,
    },
]

export const allPageList = [
    {
        id: 1,
        name: 'HOME.HOME.PAGE',
        path: pathRoutes.home.view,
        breadcrumbs: [
            {
                path: pathRoutes.home.view,
                name: 'BREADCRUMBS.HOME',
                TH: 'หน้าแรก',
                EN: 'Home',
            },
        ],
    },
    {
        id: 2,
        name: '',
        path: pathRoutes.profile.view,
        breadcrumbs: [
            {
                path: pathRoutes.profile.view,
                name: 'BREADCRUMBS.PROFILE',
                TH: 'ข้อมูลส่วนตัว',
                EN: 'Profile',
            },
        ],
    },
    {
        id: 3,
        name: 'HOME.REVIEW_TRAVEL.TITLE',
        path: pathRoutes.reviewTravel.view,
        breadcrumbs: [
            {
                path: pathRoutes.reviewTravel.view,
                name: 'HOME.REVIEW_TRAVEL.TITLE',
                TH: 'รีวิวท่องเที่ยวโดยชุมชน',
                EN: 'Community Review',
            },
        ],
    },
    {
        id: 4,
        name: 'HOME.COMMUNITY.TITLE',
        path: pathRoutes.community.view,
        breadcrumbs: [
            {
                path: pathRoutes.community.view,
                name: 'HOME.COMMUNITY.TITLE',
                TH: 'ท่องเที่ยวชุมชนตามฤดู',
                EN: 'Season Travel',
            },
        ],
    },
    {
        id: 5,
        name: 'HOME.ATTRACTION.TITLE',
        path: pathRoutes.attraction.view,
        breadcrumbs: [
            {
                path: pathRoutes.attraction.view,
                name: 'HOME.ATTRACTION.TITLE',
                TH: 'สถานที่ท่องเที่ยว/กิจกรรมน่าสนใจ',
                EN: 'Travel and activities',
            },
        ],
    },
    {
        id: 6,
        name: 'HOME.RECOMMENDED_ROUTE.TITLE',
        path: pathRoutes.recommendedRoute.view,
        breadcrumbs: [
            {
                path: pathRoutes.recommendedRoute.view,
                name: 'HOME.RECOMMENDED_ROUTE.TITLE',
                TH: 'เส้นทางท่องเที่ยวชุมชนแนะนำ',
                EN: 'Community recommended routes',
            },
        ],
    },
    {
        id: 7,
        name: 'HOME.FESTIVAL_AND_TRADITIONAL.TITLE',
        path: pathRoutes.festivalsAndTraditions.view,
        breadcrumbs: [
            {
                path: pathRoutes.festivalsAndTraditions.view,
                name: 'HOME.FESTIVAL_AND_TRADITIONAL.TITLE',
                TH: 'เทศกาลและประเพณี',
                EN: 'Festivals and Traditions',
            },
        ],
    },
    {
        id: 8,
        name: 'HOME.ACCOMMODATION.TITLE',
        path: pathRoutes.accommodation.view,
        breadcrumbs: [
            {
                path: pathRoutes.accommodation.view,
                name: 'HOME.ACCOMMODATION.TITLE',
                TH: 'ที่พักชุมชน',
                EN: 'Accommodations',
            },
        ],
    },
    {
        id: 9,
        name: '',
        path: pathRoutes.trip.create,
        breadcrumbs: [
            {
                path: pathRoutes.profile.view,
                name: 'BREADCRUMBS.PROFILE',
                TH: 'ข้อมูลส่วนตัว',
                EN: 'Profile',
            },
            {
                path: pathRoutes.trip.create,
                name: 'BREADCRUMBS.TRIP.CREATE',
                TH: 'สร้างทริปใหม่',
                EN: 'Create New Trip',
            },
        ],
    },
    {
        id: 10,
        name: '',
        path: pathRoutes.trip.edit,
        breadcrumbs: [
            {
                path: pathRoutes.profile.view,
                name: 'BREADCRUMBS.PROFILE',
                TH: 'ข้อมูลส่วนตัว',
                EN: 'Profile',
            },
            {
                path: pathRoutes.trip.edit,
                name: 'BREADCRUMBS.TRIP.EDIT',
                TH: 'แก้ไขทริป',
                EN: 'Edit Trip',
            },
        ],
    },
    {
        id: 11,
        name: '',
        path: pathRoutes.searchResult.view,
        breadcrumbs: [
            {
                path: pathRoutes.searchResult.view,
                name: 'HOME.SEARCH.RESULT',
                TH: 'ผลการค้นหา',
                EN: 'Search Result',
            },
        ],
    },
    {
        id: 12,
        name: '',
        path: pathRoutes.register.view,
        breadcrumbs: [
            {
                path: pathRoutes.register.view,
                name: 'BREADCRUMBS.REGISTER',
                TH: 'ลงทะเบียน',
                EN: 'Register',
            },
        ],
    },
    {
        id: 13,
        name: '',
        path: pathRoutes.forgotPassword.view,
        breadcrumbs: [
            {
                path: pathRoutes.forgotPassword.view,
                name: 'BREADCRUMBS.FORGOT_PASSWORD',
                TH: 'ลืมรหัสผ่าน',
                EN: 'Forgot Password',
            },
        ],
    },
    {
        id: 14,
        name: '',
        path: pathRoutes.resetPassword.view,
        breadcrumbs: [
            {
                path: pathRoutes.resetPassword.view,
                name: 'BREADCRUMBS.RESET_PASSWORD',
                TH: 'เปลี่ยนรหัสผ่าน',
                EN: 'Reset Password',
            },
        ],
    },
]

export const specialPath = [
    '/register',
    '/profile',
    '/community/content/[id]/attraction',
    '/community/travelPeriod/[id]',
    '/trip/create',
    '/trip/preview',
    '/trip/edit',
    '/trip/edit/[id]',
    '/forgotpassword',
    '/resetpassword',
    '/searchResult',
]
