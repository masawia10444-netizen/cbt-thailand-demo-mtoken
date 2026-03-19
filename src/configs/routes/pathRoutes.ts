export default {
    home: {
        view: '/',
    },
    profile: {
        view: '/profile',
    },
    reviewTravel: {
        //รีวิวท่องเที่ยวโดยชุมชน
        // view: '/community',
        view: '/reviewTravel',
    },
    community: {
        //ท่องเที่ยวตามฤดูกาล
        view: '/community',
        content: '/community/content',
        travelPeriod: '/community/travelPeriod/[id]',
    },
    attraction: {
        //กิจกรรมที่น่าสนใจ
        view: '/attraction',
        content: 'attraction/content',
    },
    recommendedRoute: {
        view: '/recommendedRoute',
        content: '/recommendedRoute/content',
    },
    festivalsAndTraditions: {
        view: '/festival',
        content: '/festival/content',
    },
    accommodation: {
        view: '/accommodation',
        content: '/accommodation/content',
    },
    login: {
        view: '/login',
    },
    trip: {
        create: '/trip/create',
        edit: '/trip/edit',
        preview: '/trip/preview',
    },
    searchResult: {
        view: '/searchResult',
    },
    register: {
        view: '/register',
    },
    forgotPassword: {
        view: '/forgotpassword',
    },
    resetPassword: {
        view: '/resetpassword',
    },
    relatedSystem: {
        view: '/relatedSystem'
    }
}
export const mainMenu = {
    playground: 'playground',
}
