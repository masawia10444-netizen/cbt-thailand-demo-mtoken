import { createMuiTheme, responsiveFontSizes, Theme } from '@material-ui/core/styles'

export const fontFamily = {
    prompt: {
        light: 'Prompt-Light',
        regular: 'Prompt-Regular',
        semiBold: 'Prompt-SemiBold',
        bold: 'Prompt-Bold',
    },
    sarabun: {
        regular: 'Sarabun-Regular',
        semiBold: 'Sarabun-SemiBold',
        bold: 'Sarabun-Bold',
    },
}

type fontStyleType = {
    fontFamily?: string
    fontSize?: number
    fontWeight?: number | '-moz-initial' | 'inherit' | 'initial' | 'revert' | 'unset' | 'normal' | 'bold'
    fontStyle?: string
}
type fontType = {
    h1: fontStyleType
    h2: fontStyleType
    h3: fontStyleType
    h4: fontStyleType
    h5: fontStyleType
    body1: fontStyleType
    body2: fontStyleType
    caption: fontStyleType
    subtitle1: fontStyleType
    subtitle2: fontStyleType
}

declare module '@material-ui/core/styles/createMuiTheme' {
    interface Theme {
        colors: {
            primary: string
            secondary: string
            darkGreen: string
            green: string
            mint: string
            lightGreen: string
            oliveGreen: string

            gray: string
            grey: string
            lightGray: string
            lightGrey: string

            black: string
            white: string
            textBlack: string

            yellow: string
            violet: string
        }
        fontStyle: {
            prompt: fontType
            sarabun: fontType
        }
    }
    interface ThemeOptions {
        colors: {
            primary: string
            secondary: string
            darkGreen: string
            green: string
            mint: string
            lightGreen: string
            oliveGreen: string

            gray: string
            grey: string
            lightGray: string
            lightGrey: string

            black: string
            white: string
            textBlack: string

            yellow: string
            violet: string
        }
        fontStyle: {
            prompt: fontType
            sarabun: fontType
        }
    }
}

let theme = createMuiTheme({
    overrides: {
        MuiBackdrop: {
            root: {
                backgroundColor: 'rgba(9, 9, 9, 0)',
            },
        },
    },
    typography: {
        fontFamily: fontFamily.prompt.light,
        button: { textTransform: 'none' },
        h1: {
            fontFamily: fontFamily.prompt.semiBold,
            fontSize: 36,
            fontStyle: 'normal',
        },
        h2: {
            fontFamily: fontFamily.prompt.semiBold,
            fontSize: 28,
            fontStyle: 'normal',
            fontWeight: 'normal',
        },
        h3: {
            fontFamily: fontFamily.prompt.semiBold,
            fontSize: 22,
            fontStyle: 'normal',
            fontWeight: 'bold',
        },
        h4: {
            fontSize: 16,
            fontStyle: 'normal',
            fontWeight: 'normal',
        },
        h5: {
            fontFamily: fontFamily.prompt.regular,
            fontSize: 14,
            fontStyle: 'normal',
            fontWeight: 'normal',
        },
        body1: {
            fontFamily: fontFamily.prompt.light,
            fontSize: 14,
            fontStyle: 'normal',
            fontWeight: 100,
        },
        body2: {
            fontFamily: fontFamily.prompt.light,
            fontSize: 12,
        },
        caption: {},
        subtitle1: {},
        subtitle2: {},
    },
    palette: {
        primary: {
            light: '#44875e',
            main: '#166936',
            dark: '#0f4925',
            contrastText: '#fff',
        },
        secondary: {
            light: '#598400',
            main: '#80BD01',
            dark: '#99ca33',
            contrastText: '#fff',
        },
    },
    colors: {
        primary: '#166936',
        secondary: '#80BD01',
        darkGreen: '#166936',
        green: '#80BD01',
        mint: '#009687',
        lightGreen: '#D4E8DC',
        oliveGreen: '#414D45',

        gray: '#B8B6B6',
        grey: '#B8B6B6',
        lightGray: '#F6F6F6',
        lightGrey: '#F6F6F6',

        black: '#333433',
        white: '#FFFFFF',
        textBlack: '#090909',

        yellow: '#F5D01A',
        violet: '#5E29BC',
    },
    fontStyle: {
        prompt: {
            h1: {
                fontFamily: fontFamily.prompt.semiBold,
                fontSize: 36,
            },
            h2: {
                fontFamily: fontFamily.prompt.semiBold,
                fontSize: 28,
            },
            h3: {
                fontFamily: fontFamily.prompt.semiBold,
                fontSize: 22,
            },
            h4: {
                fontSize: 16,
            },
            h5: {
                fontFamily: fontFamily.prompt.regular,
                fontSize: 14,
                fontStyle: 'normal',
                fontWeight: 'normal',
            },
            body1: {
                fontFamily: fontFamily.prompt.light,
                fontSize: 14,
                fontStyle: 'normal',
                fontWeight: 100,
            },
            body2: {
                fontFamily: fontFamily.prompt.light,
                fontSize: 14,
                fontStyle: 'normal',
                fontWeight: 100,
            },
            caption: {},
            subtitle1: {},
            subtitle2: {},
        },
        sarabun: {
            h1: {
                fontFamily: fontFamily.prompt.semiBold,
                fontSize: 36,
            },
            h2: {
                fontFamily: fontFamily.prompt.semiBold,
                fontSize: 28,
            },
            h3: {
                fontFamily: fontFamily.prompt.semiBold,
                fontSize: 22,
            },
            h4: {
                fontSize: 16,
            },
            h5: {
                fontFamily: fontFamily.prompt.regular,
                fontSize: 14,
            },
            body1: {
                fontFamily: fontFamily.prompt.light,
                fontSize: 14,
            },
            body2: {},
            caption: {},
            subtitle1: {},
            subtitle2: {},
        },
    },
})

// theme = responsiveFontSizes(theme);

export default theme
