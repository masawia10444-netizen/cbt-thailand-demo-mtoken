import React, { useState, useEffect, useCallback } from 'react'
import Router, { useRouter } from 'next/router'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { AppBar, Toolbar, Grid, Typography } from '@material-ui/core'
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton'
import Hidden from '@material-ui/core/Hidden'

import LoginDialog from '../../components/user/login/loginDialog'
import PageMenuList from './pageMenuList'
import UserMenu from '../../controls/dropdown/menuList'
import useAppbar from '../hooks/useAppbar'
import AppPolicy from '../../components/policy/appPolicy'
import useAppPolicy from '../../components/policy/useAppPolicy'
import { MenuType } from '../../stores/lookupStore'
import { UserInfoType } from '../../stores/userStore'
import useBadgeNew from '../hooks/useBadgeNew'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import RelatedSystem from '../../components/relatedSystem/relatedSystem'

const Logo = process.env.NEXT_PUBLIC_WEB_URL + '/images/icon/svg/logo_cbt.svg'
const MenuIconPath = process.env.NEXT_PUBLIC_WEB_URL + '/images/layout/menu.svg'

const useModeDisplay = () => {
    const [isVisuallyImpaired, setVisuallyImpaired] = useState(false)
    const onToggleMode = () => {
        setVisuallyImpaired(!isVisuallyImpaired)
    }

    const onManageClass = useCallback(() => {
        const element = document.getElementsByTagName('html')[0]
        if (isVisuallyImpaired) {
            element.classList.add('invert')
        } else {
            element.classList.remove('invert')
        }
    }, [isVisuallyImpaired])

    useEffect(() => {
        onManageClass()
    }, [onManageClass])

    return { isVisuallyImpaired, onToggleMode }
}

type PropTypes = {
    toggleDrawer: (open?: boolean) => void
    handleClickMenu: (path: string) => void
    currentPath?: string
    open: boolean
    opacity: number
    userInfo: UserInfoType
    handleChangeLanguage?: (lang: string) => void
    menuList: MenuType[]
}
const AppBarView: React.FC<PropTypes> = ({
    toggleDrawer,
    handleClickMenu,
    opacity,
    open,
    userInfo,
    handleChangeLanguage,
    menuList,
}) => {
    const { i18n, t } = useTranslation()
    const classes = useStyles()
    const { handleLogout } = useAppbar()
    const policy = useAppPolicy()
    const router = useRouter()
    const modeDisplay = useModeDisplay()
    const theme = useTheme()
    const isHamburgerView = useMediaQuery(theme.breakpoints.down(1500))

    let arrPathname = router.pathname.split('/')
    let pathname = '/' + arrPathname[1]
    if (pathname === '/trip') pathname = '/' + arrPathname[1] + '/' + arrPathname[2]

    const calBackgroundColor = () => {
        if (pathname !== '/') {
            return '#166936'
        } else {
            return opacity > 0 ? 'rgba(22, 105, 54, 0.5)' : 'rgba(100,100,100,0)'
        }
    }

    const { isShowBadge } = useBadgeNew()

    return (
        <>
            <AppBar
                color='transparent'
                style={{
                    backdropFilter: 'blur(' + (opacity > 30 ? 30 : opacity) + 'px)',
                    WebkitBackdropFilter: 'blur(' + (opacity > 30 ? 30 : opacity) + 'px)',
                    backgroundColor: calBackgroundColor(),
                    transition: 'background 0.5s',
                    zIndex: 99,
                    boxShadow: pathname === '/' ? 'none' : '0px 0px 20px #00000060',
                }}
                className={classes.appBar}
            >
                <Toolbar style={{ justifyContent: 'space-between', height: '100%' }}>
                    <img
                        loading='lazy'
                        src={Logo}
                        alt='Logo'
                        className={classes.logo}
                        onClick={() => Router.push('/')}
                    />

                    <Grid className={classes.menuList} container justify='flex-end' alignItems='flex-end'>
                        <Grid className={classes.menusLg} item xs container justify='flex-end'>
                            {menuList.map((item, index) => {
                                return (
                                    <Badge
                                        color='error'
                                        badgeContent='new'
                                        invisible={!isShowBadge(userInfo, item.menuID)}
                                        classes={{
                                            badge: classes.badge,
                                            anchorOriginTopRightRectangle: classes.anchorOriginTopRightRectangle,
                                        }}
                                        key={index}
                                    >
                                        <Grid
                                            item
                                            onClick={() => {
                                                if (item.menuPath === 'Home') handleClickMenu('/')
                                                else handleClickMenu('/' + item.menuPath)
                                            }}
                                            className={classes.gridPage}
                                        >
                                            <Typography
                                                className={clsx(
                                                    classes.normal,
                                                    pathname === '/' + item.menuPath && classes.highlight,
                                                )}
                                                variant='body1'
                                            >
                                                {i18n.language === 'th' ? item.menuNameTH : item.menuNameEN}
                                            </Typography>
                                        </Grid>
                                    </Badge>
                                )
                            })}
                        </Grid>

                        <Grid item className={clsx(classes.menusMd, classes.hideOnSm, classes.login)}>
                            <PageMenuList menuList={menuList} currentPath={pathname} userInfo={userInfo} />
                        </Grid>

                        {userInfo.firstName ? (
                            <Grid item className={clsx(classes.login, pathname === '/profile' && classes.highlight)}>
                                <UserMenu
                                    menuText={userInfo.firstName}
                                    menuList={[
                                        {
                                            id: 1,
                                            name: 'Profile',
                                            handleClick: () => {
                                                Router.push('/profile')
                                            },
                                            isHighlight: pathname === '/profile',
                                        },
                                        {
                                            id: 2,
                                            name: 'Logout',
                                            handleClick: handleLogout,
                                        },
                                    ]}
                                    currentPath={pathname}
                                    isHighlight={pathname === '/profile'}
                                />
                            </Grid>
                        ) : (
                            <Grid item className={clsx(classes.hideOnSm, classes.loginBefore)}>
                                <LoginDialog btnStyle={{ alignItems: 'flex-start' }} />
                            </Grid>
                        )}

                        <Grid item className={clsx(classes.hideOnSm, classes.login, classes.normal)}>
                            <RelatedSystem btnStyle={{ alignItems: 'flex-start' }} />
                        </Grid>

                        <Grid item className={classes.language}>
                            <Typography
                                variant='body2'
                                onClick={() => handleChangeLanguage(i18n.language === 'th' ? 'en' : 'th')}
                                className={clsx(classes.btnLanguage, classes.hideOnSm)}
                            >
                                {i18n?.language?.toUpperCase()}
                            </Typography>
                        </Grid>

                        <Grid item className={classes.colorBlindMode}>
                            <IconButton
                                className={clsx(classes.btnLanguage)}
                                size='small'
                                onClick={modeDisplay.onToggleMode}
                            >
                                <img
                                    loading='lazy'
                                    src={
                                        process.env.NEXT_PUBLIC_WEB_URL +
                                        '/images/icon/svg/ic_visually_impaired_normal.svg'
                                    }
                                    alt='ic_visually_impaired_normal'
                                    style={{
                                        width: 24,
                                        height: 24,
                                    }}
                                />
                            </IconButton>
                        </Grid>

                        <Grid item className={classes.menusSm}>
                            <IconButton aria-label='MenuIcon' onClick={() => toggleDrawer(!open)}>
                                <img
                                    loading='lazy'
                                    src={MenuIconPath}
                                    alt='MenuIconPath'
                                    className={classes.menuIcon}
                                />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>

            {policy.infos.isShowPolicy && <AppPolicy />}
        </>
    )
}

export default observer(AppBarView)

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            height: 60,

            [theme.breakpoints.up('sm')]: {
                height: 70,
            },
            [theme.breakpoints.up('md')]: {
                height: 80,
            },
            [theme.breakpoints.up('lg')]: {
                height: 90,
            },
        },
        gridPage: {
            marginRight: 20,
        },
        menuList: {
            height: '100%',
            paddingTop: 0,
            color: 'white',
            paddingLeft: 0,
            paddingRight: 0,
            [theme.breakpoints.up('sm')]: {
                paddingTop: 0,
                paddingRight: 0,
            },
            [theme.breakpoints.up('md')]: {
                paddingTop: 25,
                paddingRight: 10,
            },
            [theme.breakpoints.up('lg')]: {
                paddingTop: 35,
                paddingRight: 20,
            },
        },
        menusSm: {
            display: 'none',
            [theme.breakpoints.down('sm')]: {
                display: 'unset',
            },
        },
        menusMd: {
            [theme.breakpoints.up(1500)]: {
                display: 'none',
            },
        },
        menusLg: {
            [theme.breakpoints.down(1500)]: {
                display: 'none',
            },
        },
        logo: {
            marginLeft: 0,
            height: '100%',
            cursor: 'pointer',
            [theme.breakpoints.up('sm')]: {
                marginLeft: 20,
            },
            [theme.breakpoints.up('md')]: {
                marginLeft: 60,
            },
            [theme.breakpoints.up('lg')]: {
                marginLeft: 90,
            },
        },
        img: {
            backgroundColor: theme.colors.black,
            height: 64,
            width: 64,
            fontSize: theme.typography.h1.fontSize,
        },
        staticMenu: {
            color: theme.palette.primary.main,
        },
        titleName: {
            color: theme.palette.primary.main,
        },
        singleName: {
            color: theme.colors.lightGray,
        },
        swipeablePage: {
            '& .MuiDrawer-paperAnchorLeft': {
                backgroundColor: theme.palette.secondary,
            },
        },
        title: {
            flexGrow: 1,
        },
        small: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
        staticButton: {
            padding: '8px',
            backgroundColor: theme.colors.gray,
            '&:hover': {
                backgroundColor: theme.palette.primary.main,
            },
        },

        staticButtonIcon: {
            color: theme.colors.lightGray,
        },

        divider: {
            width: 2,
            height: 30,
            backgroundColor: theme.colors.gray,
        },

        pageTitle: {
            fontSize: theme.typography.h3.fontSize,
            color: theme.colors.lightGray,
        },
        highlight: {
            color: '#F5D01A',
            borderBottom: '4px solid #F5D01A',
            height: '37px !important',
        },
        normal: {
            cursor: 'pointer',
            height: 38,
            '&:hover': {
                color: '#F5D01A',
            },
            marginBottom: -2,
        },
        btnLanguage: {
            width: 25,
            height: 25,
            backdropFilter: 'blur(30px)',
            color: 'white',
            fontSize: 10,
            boxShadow: 'none',
            fontWeight: 'normal',
            cursor: 'pointer',
            background: 'rgba(255,255,255,0.3)',
            padding: '6px 6px 6px 6px',
            borderRadius: '50%',
            '&:hover': {
                color: theme.colors.yellow,
            },
        },
        menuIcon: {
            color: 'white',
            width: 25,
            height: 25,
        },
        hideOnSm: {
            [theme.breakpoints.down('sm')]: {
                display: 'none',
            },
        },
        login: {
            marginRight: 20,
            height: 37,
            marginBottom: -3,
            [theme.breakpoints.down(400)]: {
                marginRight: 5,
                height: 37,
            },
        },
        badge: {
            width: 30,
            height: 12,
            fontSize: 10,
        },
        anchorOriginTopRightRectangle: {
            top: 3,
            right: 12,
            transform: 'scale(1) translate(50%, -50%)',
            transformOrigin: '100% 0%',
        },
        colorBlindMode: {
            marginRight: 20,
            height: 39,
            marginBottom: -3,
            // [theme.breakpoints.down('sm')]: {
            //     height: 25,
            // },
            [theme.breakpoints.down(400)]: {
                display: 'none',
            },
        },
        language: {
            marginRight: 15,
            height: 39,
            marginBottom: -3,
            [theme.breakpoints.down('sm')]: {
                marginRight: 5,
                height: 37,
            },
        },
        loginBefore: {
            marginRight: 20,
            height: 39,
            marginBottom: 5,
            [theme.breakpoints.down(400)]: {
                marginRight: 5,
                height: 37,
            },
        },
    }),
)
