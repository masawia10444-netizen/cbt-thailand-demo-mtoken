import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStylesEditMode = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: '100%',
            background: '#FFFFFF',
            paddingTop: 0,
            [theme.breakpoints.up('sm')]: {
                paddingTop: 40,
            },
            [theme.breakpoints.up('md')]: {
                paddingTop: 60,
            },
            [theme.breakpoints.up('lg')]: {
                paddingTop: 65,
            },
        },
        title: {},
        gridContainer: {
            marginTop: -84,
            padding: 20,
            zIndex: 1,
            [theme.breakpoints.up('sm')]: {
                marginTop: -88,
            },
            [theme.breakpoints.up('md')]: {
                marginTop: -98,
            },
            [theme.breakpoints.up('lg')]: {
                marginTop: -98,
            },
            [theme.breakpoints.up('xl')]: {
                marginTop: -105,
            },
        },
        avatarImg: {
            width: 120,
            height: 120,
            [theme.breakpoints.up('sm')]: {
                width: 130,
                height: 130,
            },
            [theme.breakpoints.up('md')]: {
                width: 150,
                height: 150,
            },
            [theme.breakpoints.up('lg')]: {
                width: 156,
                height: 156,
            },
            [theme.breakpoints.up('xl')]: {
                width: 165,
                height: 165,
            },
        },
        avatar: {
            width: 'auto',
            [theme.breakpoints.down('xs')]: {
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
            },
        },
        smallAvatar: {
            width: 17,
        },
        uploadBadge: {
            width: 40,
            height: 40,
            background: 'white',
            boxShadow: '0px 3px 6px #00000029',
            '&:hover': {
                background: 'rgba(240,240,240,1)',
            },
        },
        userInfo: {
            marginTop: 20,
            marginBottom: 50,
        },
        userName: {
            marginBottom: 32,
            width: 367,
            height: 48,
            paddingTop: '0px !important',
        },
        icon: {
            color: theme.colors.lightGreen,
            fontSize: 18,
        },
        chip: {
            marginTop: 25,
        },
    }),
)

export const useStylesViewMode = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: '100%',
            background: '#FFFFFF',
            paddingTop: 0,
            [theme.breakpoints.up('sm')]: {
                paddingTop: 40,
            },
            [theme.breakpoints.up('md')]: {
                paddingTop: 60,
            },
            [theme.breakpoints.up('lg')]: {
                paddingTop: 65,
            },
        },
        title: {},
        gridContainer: {
            marginTop: -84,
            padding: 20,
            zIndex: 1,
            [theme.breakpoints.up('sm')]: {
                marginTop: -88,
            },
            [theme.breakpoints.up('md')]: {
                marginTop: -98,
            },
            [theme.breakpoints.up('lg')]: {
                marginTop: -98,
            },
            [theme.breakpoints.up('xl')]: {
                marginTop: -105,
            },
        },
        avatarImg: {
            width: '120px',
            height: '120px',
            [theme.breakpoints.up('sm')]: {
                width: '130px',
                height: '130px',
            },
            [theme.breakpoints.up('md')]: {
                width: '150px',
                height: '150px',
            },
            [theme.breakpoints.up('lg')]: {
                width: '156px',
                height: '156px',
            },
            [theme.breakpoints.up('xl')]: {
                width: '165px',
                height: '165px',
            },
        },
        avatar: {
            width: 'auto',
            [theme.breakpoints.down('xs')]: {
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
            },
        },
        userInfo: {
            marginTop: 30,
            marginBottom: 50,
            paddingLeft: 40,
            width: 'calc(100% - 120px)',
            [theme.breakpoints.down('xs')]: {
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                paddingLeft: 0,
            },
            [theme.breakpoints.up('sm')]: {
                width: 'calc(100% - 130px)',
                marginTop: 20,
            },
            [theme.breakpoints.up('md')]: {
                width: 'calc(100% - 150px)',
                marginTop: 30,
            },
            [theme.breakpoints.up('lg')]: {
                width: 'calc(100% - 156px)',
                marginTop: 30,
            },
            [theme.breakpoints.up('xl')]: {
                width: 'calc(100% - 165px)',
                marginTop: 30,
            },
        },
        icon: {
            color: theme.colors.lightGreen,
            fontSize: 18,
        },
        chip: {
            marginRight: 20,
            marginTop: 20,
            paddingLeft: 30,
            paddingRight: 30,
            borderColor: theme.colors.lightGreen,
            [theme.breakpoints.down('xs')]: {
                width: '100%',
            },
            ...theme.fontStyle.prompt.h5,
        },
        editInfoText: {
            marginTop: 25,
            marginBottom: 25,
            color: theme.colors.mint,
        },
        editInfoIcon: {
            fontSize: 20,
        },
        card: {
            width: '100%',
            height: 625,
            boxShadow: '0px 0px 6px #0000001A',
            // padding: 18,
            borderRadius: 8,
            position: 'relative',
            overflow: 'auto',
        },
        fabPinIcon: {
            background: theme.colors.lightGreen + '!important',
            width: 48,
            height: 48,
            display: 'inline-flex',
            marginRight: 22,
        },
        pinIcon: {
            color: theme.palette.common.white,
            fontSize: 32,
        },
        myTrip: {
            display: 'inline-flex',
            height: 35,
        },
        tripCount: {
            display: 'inline-flex',
            color: '#B8B6B6',
            fontFamily: 'Prompt-Light',
            marginLeft: 25,
            height: 25,
        },
        cardHeader: {
            padding: 18,
            paddingTop: 25,
            height: 110,
        },
        cardContent: {
            padding: 26,
            paddingTop: 0,
        },
        divider: {
            background: theme.colors.lightGreen,
            width: '100%',
        },
        cardTripDetails: {
            height: 74,
            marginTop: 20,
            marginBottom: 8,
            position: 'relative',
        },
        tripName: {
            fontFamily: 'Prompt-Regular',
            marginBottom: 10,
        },
        tripLocation: {
            color: theme.palette.common.black,
            fontSize: 18,
            fontFamily: 'Prompt-Regular',
        },
        containerMyTrip: {
            width: 'calc(100% - 150px)',
            [theme.breakpoints.down('xs')]: {
                width: '100%',
            },
        },
        containerBtnMyTrip: {
            width: '150x',
            [theme.breakpoints.down('xs')]: {
                width: '100%',
                marginTop: '15px',
            },
        },
    }),
)
