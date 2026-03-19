import React from 'react'
import { observer } from 'mobx-react-lite'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import { List, IconButton } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import LoginDialog from '../../components/user/login/loginDialog'
import RelatedSystem from '../../components/relatedSystem/relatedSystem'

import { MenuType } from '../../stores/lookupStore'
import { UserInfoType } from '../../stores/userStore'

import useBadgeNew from '../hooks/useBadgeNew'
import Badge from '@material-ui/core/Badge'

const CloseIcon = process.env.NEXT_PUBLIC_WEB_URL + '/images/layout/close2.svg'

type SideMenuType = {
    menuList: MenuType[]
    currentPath?: string
    handleClickMenuSideBar: (path: string) => void
    toggleDrawer: (open: boolean) => void
    open: boolean
    handleChangeLanguage: (lang: string) => void
    userInfo: UserInfoType
}
const SideMenu: React.FC<SideMenuType> = ({
    menuList,
    handleClickMenuSideBar,
    toggleDrawer,
    open,
    handleChangeLanguage,
    userInfo,
}) => {
    const classes = useStyles()
    const { t, i18n } = useTranslation()
    const router = useRouter()
    let arrPathname = router.pathname.split('/')
    let pathname = '/' + arrPathname[1]

    let lang = i18n.language

    const { isShowBadge } = useBadgeNew()

    const list = () => (
        <div className={classes.list} role='presentation'>
            <div className={classes.closeIconDiv}>
                <IconButton aria-label='CloseIcon' className={classes.closeBtnIcon} onClick={() => toggleDrawer(false)}>
                    <img loading='lazy' src={CloseIcon} alt='CloseIcon' className={classes.closeIcon} />
                </IconButton>
            </div>
            <List>
                {menuList.map((item, index) => (
                    < div key={index} >
                        <ListItem
                            className={pathname === '/' + item.menuPath ? classes.highlight : classes.normal}
                            button
                            key={index}
                            onClick={() => {
                                // handleClickMenuSideBar('/' + item.menuPath)
                                if (item.menuPath === 'Home') handleClickMenuSideBar('/')
                                else handleClickMenuSideBar('/' + item.menuPath)
                            }}
                        >
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
                                <ListItemText
                                    primary={
                                        <Typography variant='h5' className={classes.pageListText}>
                                            {lang === 'th' ? item.menuNameTH : item.menuNameEN}
                                        </Typography>
                                    }
                                />
                            </Badge>
                        </ListItem>
                        <Divider className={classes.divider} />
                    </div>
                ))}

                {!userInfo.firstName && (
                    <LoginDialog
                        btnStyle={{ alignItems: 'flex-start' }}
                        customLabel={
                            <ListItem button>
                                <ListItemText
                                    primary={
                                        <Typography variant='h5' className={classes.pageListText}>
                                            {t(`HOME.LOGIN.TITLE`)} {t(`HOME.LOGIN.TITLE_USER`)}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        }
                    />
                )}

                <Divider className={classes.divider} />

                <RelatedSystem
                    btnStyle={{ alignItems: 'flex-start' }}
                    customLabel={
                        <ListItem button>
                            <ListItemText
                                primary={
                                    <Typography variant='h5' className={classes.pageListText}>
                                        {t('FOOTER.SYSTEM_REF_TEXT')}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    }
                />

                <Divider className={classes.divider} />

                <ListItem
                    button
                    onClick={() => {
                        handleChangeLanguage(i18n.language === 'th' ? 'en' : 'th')
                    }}
                >
                    <ListItemText
                        primary={
                            <Typography variant='h5' className={classes.pageListText}>
                                {' '}
                                {t(`HOME.CHANGE_LANGUAGE`)}{' '}
                            </Typography>
                        }
                    />
                    <Typography variant='h5' className={classes.pageListText} style={{ color: '#FFFFFF' }}>
                        {' '}
                        {i18n?.language?.toUpperCase()}
                    </Typography>
                </ListItem>

                <Divider className={classes.divider} />
            </List>
        </div >
    )
    return (
        <SwipeableDrawer
            anchor={'right'}
            open={open}
            onClose={() => toggleDrawer(false)}
            onOpen={() => toggleDrawer(true)}
            disableSwipeToOpen={true}
            PaperProps={{ className: classes.swipe }}
            BackdropProps={{ style: { background: 'none' } }}
        >
            {list()}
        </SwipeableDrawer>
    )
}

export default observer(SideMenu)

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            width: 250,
        },
        fullList: {
            width: 'auto',
        },
        swipe: {
            background: 'rgba(255,255,255,0.25)',
            backdropFilter: 'blur(30px)',
            width: 250,
        },
        divider: {
            background: 'rgba(255,255,255,0.1)',
        },
        pageListText: {
            color: '#093018',
        },
        closeIconDiv: {
            height: 90,
            width: '100%',
            position: 'relative',
        },
        closeBtnIcon: {
            position: 'absolute',
            top: 5,
            right: 6,
        },
        closeIcon: {
            color: '#FFFFFF',
            width: 14,
            height: 14,
        },
        highlight: {
            background: theme.colors.yellow,
        },
        normal: {},
        badge: {
            width: 30,
            height: 12,
            fontSize: 10,
        },
        anchorOriginTopRightRectangle: {
            top: 4,
            right: -15,
            transform: 'scale(1) translate(50%, -50%)',
            transformOrigin: '100% 0%',
        },
    }),
)
