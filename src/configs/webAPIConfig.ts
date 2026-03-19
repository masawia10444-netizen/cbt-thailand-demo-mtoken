const apiUrl = process.env.NEXT_PUBLIC_API_URL
const publicUrl = process.env.NEXT_PUBLIC_WEB_URL

export const apiConfig = {
    user: {
        authentication: {
            register: `${apiUrl}/authentication/register`,
            login: `${apiUrl}/authentication/login`,
            verifyEmail: `${apiUrl}/authentication/verifyEmail`,
            getProfile: `${apiUrl}/authentication/getProfile`,
            updateProfile: `${apiUrl}/authentication/updateProfile`,
            resetPassword: `${apiUrl}/authentication/resetPassword`,
            forgotPassword: `${apiUrl}/authentication/forgetPassword`,
            checkTokenResetPassword: `${apiUrl}/authentication/checkTokenResetPassword`,
            acceptPolicy: `${apiUrl}/authentication/acceptPolicy`,
            acceptPDPA: `${apiUrl}/authentication/acceptPDPA`,
            insertInterestMenu: `${apiUrl}/authentication/insertInterestMenu`,
            updateUserStatus: `${apiUrl}/authentication/updateUserStatus`,
            renewToken: `${apiUrl}/authentication/renewToken`,
        },
    },
    resource: {
        home: {
            highlight: `${apiUrl}/highlight/getHighlight`,
        },
        reviewTravel: {
            reviewTravel: `${apiUrl}/reviewTravel/getReviewTravel`,
            reviewTravelContent: `${apiUrl}/reviewTravel/`,
        },
        community: {
            //community
            highlight: `${apiUrl}/community/getHighlight`,
            content: `${apiUrl}/community/`,
            attraction: `${apiUrl}/community/attraction/`, //ข้อมูลที่กดจากปุ่มเขียวหน้า community
            travelPeriod: `${apiUrl}/community/travelperiod/`,
        },
        attraction: {
            getAttraction: `${apiUrl}/attraction/getAttraction`,
            content: `${apiUrl}/attraction/`,
        },
        relattraction: {
            content: `${apiUrl}/relattraction/`,
        },
        route: {
            getTrip: `${apiUrl}/trip/getTrip`,
        },
        festival: {
            getFestival: `${apiUrl}/festival/getFestival`,
            searchFestival: `${apiUrl}/festival/search`,
            getFestivalContent: `${apiUrl}/festival/`,
        },
        accommodation: {
            getAccommodation: `${apiUrl}/accommodation/getAccommodation`,
            content: `${apiUrl}/accommodation/`,
        },
        trip: {
            get: `${apiUrl}/myTrip/{id}`, //{id} GET
            add: `${apiUrl}/myTrip/add`,
            update: `${apiUrl}/myTrip/update/{id}`, //{id} PUT searchAttraction
            searchAttraction: `${apiUrl}/myTrip/searchAttraction`, //GET
            delete: `${apiUrl}/myTrip/delete/{tripID}`,
        },
        recommendRoute: {
            getContent: `${apiUrl}/trip/`,
        },
    },
    lookup: {
        province: `${apiUrl}/lookup/province`,
        month: `${apiUrl}/lookup/month`,
        community: `${apiUrl}/lookup/community`,
        attractionType: `${apiUrl}/lookup/attraction/type`,
        menu: `${apiUrl}/lookup/menu`,
        provinceAttractionType: `${apiUrl}/lookup/provinceAttractionType/`,
    },
    search: {
        community: `${apiUrl}/community/search`,
        attraction: `${apiUrl}/attraction/search`,
        accommodation: `${apiUrl}/accommodation/search`,
        trip: `${apiUrl}/trip/search`,
        searchAll: `${apiUrl}/highlight/searchAll`,
    },
    log: {
        menu: `${apiUrl}/authentication/log/menu`,
        login: `${apiUrl}/authentication/log/login`,
        community: `${apiUrl}/authentication/log/community`,
    },
    uploadFile: {
        toTemp: `${process.env.NEXT_PUBLIC_UPLOAD_FILE_API_URL}/to-temp`,
    },
    sitemap: `${apiUrl}/authentication/genSiteMap`,
}
