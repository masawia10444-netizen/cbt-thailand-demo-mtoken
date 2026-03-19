import { decrypt, encrypt } from './registerUltility'
import { apiConfig } from '../configs/webAPIConfig'
import { isJsonString } from './formatTextUtils'

export type TokenType = {
    accessToken?: string
    refreshToken?: string
    status?: number
}
export type RequestParameter = {
    url: string
    data?: { [key: string]: any } | null
}

type RequestGETParameter = Omit<RequestParameter, 'data'>

const getCurrentToken = async (tokenName: string) => {
    let localData = await localStorage.getItem(tokenName)
    let sessionData = await sessionStorage.getItem(tokenName)
    let token = ''

    if (sessionData && isJsonString(decrypt(sessionData))) {
        token = await JSON.parse(decrypt(sessionData))
    } else if (localData && isJsonString(decrypt(localData))) {
        token = await JSON.parse(decrypt(localData))
    }

    return token
}

const createRequestAuthorization = async (reqType: string) => {
    if (process.browser) {
        const bearerKey: string = await getCurrentToken(process.env.NEXT_PUBLIC_ACCESS_TOKEN)

        const headers =
            bearerKey === ''
                ? {
                      'Content-Type': 'application/json',
                  }
                : {
                      'Content-Type': 'application/json',
                      Authorization: 'Bearer ' + bearerKey,
                  }

        return {
            method: reqType,
            headers: headers,
        }
    } else {
        return {
            method: reqType,
            headers: {
                'Content-Type': 'application/json',
            },
        }
    }
}

const createRequestHeadersDelete = async () => {
    if (process.browser) {
        const bearerKey: string = await getCurrentToken(process.env.NEXT_PUBLIC_ACCESS_TOKEN)

        let myHeaders = new Headers()
        bearerKey !== '' && myHeaders.append('Authorization', 'Bearer ' + bearerKey)

        let requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow' as RequestRedirect,
        }
        return requestOptions
    } else {
        return {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    }
}

const logout = () => {
    if (process.browser) {
        localStorage.removeItem(process.env.NEXT_PUBLIC_LOCAL_STORAGE_USER_INFO)
        localStorage.removeItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN)
        localStorage.removeItem(process.env.NEXT_PUBLIC_REFRESH_TOKEN)

        sessionStorage.removeItem(process.env.NEXT_PUBLIC_LOCAL_STORAGE_USER_INFO)
        sessionStorage.removeItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN)
        sessionStorage.removeItem(process.env.NEXT_PUBLIC_REFRESH_TOKEN)
        sessionStorage.removeItem(process.env.NEXT_PUBLIC_ACCEPT_POLICY)

        location.replace(process.env.NEXT_PUBLIC_LINK + '/')
    }
}

const refreshToken = async () => {
    const url = apiConfig.user.authentication.renewToken
    const refreshToken = await getCurrentToken(process.env.NEXT_PUBLIC_REFRESH_TOKEN)

    if (refreshToken === '') {
        logout()
    }

    // refresh token
    const refreshTokenResult: TokenType = await fetchPost({
        url: url,
        data: {
            refreshToken: refreshToken,
        },
    })

    if (refreshTokenResult.status === 403) {
        logout()
        return null
    } else {
        const encryptedAccessToken = await encrypt(JSON.stringify(refreshTokenResult.accessToken))
        const encryptedRefreshToken = await encrypt(JSON.stringify(refreshTokenResult.refreshToken))

        await sessionStorage.setItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN, encryptedAccessToken)
        await sessionStorage.setItem(process.env.NEXT_PUBLIC_REFRESH_TOKEN, encryptedRefreshToken)

        return refreshTokenResult
    }
}

const authenticationFetch = async (params, resHandler: Response, method: string) => {
    let resJson
    let requestParams: RequestInit = {
        method: method,
        cache: 'no-cache',
        mode: 'cors',
    }

    if (method === 'POST' || method === 'PUT') {
        Object.assign(requestParams, {
            body: params.data ? JSON.stringify(params.data) : '{}',
        })
    }

    if (resHandler.status === 401) {
        const refreshTokenResult = await refreshToken()

        Object.assign(requestParams, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + refreshTokenResult?.accessToken,
            },
        })

        // ยิงใหม่
        const resHandler = await fetch(params.url, requestParams)

        if (resHandler.status !== 500 && resHandler.status !== 400) {
            resJson = await resHandler.json()
        } else {
            resJson = { statusCode: resHandler.status }
        }
    } else if (resHandler.status === 403) {
        logout()
    } else {
        if (resHandler.status !== 500 && resHandler.status !== 400) {
            resJson = await resHandler.json()
        } else {
            resJson = { statusCode: resHandler.status }
        }
    }

    return resJson
}

const generateHeader = (includeHeader: boolean) => {
    const header = new Headers()
    header.append('Accept', 'application/json')
    header.append('Content-type', 'application/json')

    if (includeHeader) {
        /* 
        TODO :: add GISC Header
            if(!_.isNil(WebConfig.userSession.currentUserLanguage)) {
                ajaxHeader["GISC-UserLanguage"] = WebConfig.userSession.currentUserLanguage;
            }
            if(!_.isNil(WebConfig.companySettings.languageCode)) {
                ajaxHeader["GISC-CompanyLanguage"] = WebConfig.companySettings.languageCode;
            }
            if(!_.isNil(WebConfig.userSession.currentCompanyId)) {
                ajaxHeader["GISC-CompanyId"] = WebConfig.userSession.currentCompanyId;
            }
        */
    }

    return header
}

export const fetchGet = async <T>(params: RequestGETParameter, includeHeader: boolean = false): Promise<T> => {
    const resHandler = await fetch(params.url, {
        method: 'get',
        cache: 'no-cache',
        mode: 'cors',
        headers: generateHeader(includeHeader),
    })

    const resJson = await resHandler.json()
    return resJson
}

export const fetchPost = async <T>(params: RequestParameter, includeHeader: boolean = false): Promise<T> => {
    const resHandler = await fetch(params.url, {
        method: 'post',
        cache: 'no-cache',
        headers: generateHeader(includeHeader),
        body: params.data ? JSON.stringify(params.data) : '{}',
    })

    let resJson

    if (resHandler.status !== 500 && resHandler.status !== 400) {
        resJson = await resHandler.json()
    } else {
        resJson = { statusCode: resHandler.status }
    }

    return resJson
}

export const fetchPut = async <T>(params: RequestParameter, includeHeader: boolean = false): Promise<T> => {
    const resHandler = await fetch(params.url, {
        method: 'put',
        cache: 'no-cache',
        headers: generateHeader(includeHeader),
        body: params.data ? JSON.stringify(params.data) : '{}',
    })

    const resJson = await resHandler.json()
    return resJson
}

export const fetchDelete = async <T>(params: RequestGETParameter, includeHeader: boolean = false): Promise<T> => {
    const resHandler = await fetch(params.url, {
        method: 'delete',
        cache: 'no-cache',
        headers: generateHeader(includeHeader),
    })

    const resJson = await resHandler.json()
    return resJson
}

// ########################## With Authorization ##########################
export const fetchGetWithAuthorization = async <T>(
    params: RequestGETParameter,
    includeHeader: boolean = false,
): Promise<T> => {
    const req = await createRequestAuthorization('GET')
    const resHandler = await fetch(params.url, req)
    const resJson = await authenticationFetch(params, resHandler, 'GET')

    return resJson
}

export const fetchPostWithAuthorization = async <T>(
    params: RequestParameter,
    includeHeader: boolean = false,
): Promise<T> => {
    const req = await createRequestAuthorization('POST')
    const resHandler = await fetch(params.url, {
        body: params.data ? JSON.stringify(params.data) : '{}',
        ...req,
    })

    const resJson = await authenticationFetch(params, resHandler, 'POST')
    return resJson
}

export const fetchPutWithAuthorization = async <T>(
    params: RequestParameter,
    includeHeader: boolean = false,
): Promise<T> => {
    const req = await createRequestAuthorization('PUT')
    const resHandler = await fetch(params.url, {
        body: params.data ? JSON.stringify(params.data) : '{}',
        ...req,
    })

    const resJson = await authenticationFetch(params, resHandler, 'PUT')

    return resJson
}

export const fetchDeleteWithAuthorization = async <T>(
    params: RequestGETParameter,
    includeHeader: boolean = false,
): Promise<T> => {
    const req: RequestInit = await createRequestHeadersDelete()
    const resHandler = await fetch(params.url, req)
    const resJson = await authenticationFetch(params, resHandler, 'DELETE')

    return resJson
}
