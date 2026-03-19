/// <reference types="react-scripts" />

type UserInfo = {
    username: string
    firstName: string
    lastName: string
    email: string
    phone: string
    enable: boolean
    authenticationType: AuthenticationType
    expirationDate?: Date | null
    ipPermit: string | null
    isPrimaryCompanyAdmin: boolean
    token: string | null
    businessUnitId: number | null
    //businessUnit?: any;
    userPreferences: any[]
    accessibleCompanies: any[]
    accessibleBusinessUnits: any[]
    groups: any[]
    companyId?: any
    isDeliveryMan: boolean
    userType: number
    companyLanguage?: any
    companyThemeName: string
    remainingExpirationDays?: any
    driverId?: any
    technicianTeamId?: any
    technicianTeamLeader?: any
    permissionType: number
    autoAddCompany: boolean
    imageId?: any
    image?: any
    accountIsLock?: any
    remark?: any
    saleRequestUserType?: any
    uuids: any[]
    formatEnable: string
    formatExpirationDate?: any
    authenticationTypeDisplayName?: any
    permissionTypeDisplayName?: any
    infoStatus: InfoStatus
    id: number
    createDate?: Date | null
    updateDate?: Date | null
    createBy?: string | null
    updateBy?: string | null
    pageProperty: number | null
}
