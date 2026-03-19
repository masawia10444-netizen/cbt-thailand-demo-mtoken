/// <reference types="react-scripts" />

type KeyValueType<T> = {
    [key: string]: T
}

type SvgType = React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
        title?: string | undefined
    }
>

type UserSettingType = {
    Permissions?: Array<string>
    ProfileSetting?: KeyValueType<string> | null
    CompanySetting?: KeyValueType<string> | null
    UtilityFunction: Array<Function>
    ApplicationTheme: string
}

type ThemeConfigType = {
    primary: string
    secondary: string

    tertiary: string
    quaternary: string
    quinary: string

    new: string
    arrivedAtHub: string
    confirmed: string
    outForDelivery: string
    cancelled: string
    complete: string
    completeWithPartial: string

    black: string
    white: string
    lightGrey: string
    lightGreen: string
    grey: string
    error: string
    controlBorder: string
}
