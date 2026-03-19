import React from 'react'
import { withStyles, makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Menu, { MenuProps } from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import Router, { useRouter } from 'next/router'
import Badge from '@material-ui/core/Badge'
import { UserInfoType } from '../../stores/userStore'
import useBadgeNew from '../hooks/useBadgeNew'
import Store from '../../stores/rootStore'
import { MenuType } from '../../stores/lookupStore'
import clsx from 'clsx'

const StyledMenu = withStyles({
    paper: {
        marginTop: 5,
        background: 'rgba(22, 105, 54, 0.5)',
        backdropFilter: 'blur(30px)',
    },
})((props: MenuProps) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
))

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.colors.yellow,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem)

type UsePageMenuListProps = {}
type ReturnTypeUsePageMenuList = ReturnType<typeof usePageMenuList>
function usePageMenuList(props: UsePageMenuListProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const { UserStore } = Store()

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleClickMenu = async (path: string) => {
        handleClose()
        if (UserStore?.userInfo?.email) {
            await UserStore.getProfile({
                email: UserStore.userInfo.email,
                userID: UserStore.userInfo.userID,
            })
        }
        if (path) Router?.push(path)
    }

    return {
        anchorEl,
        handleClick,
        handleClose,
        handleClickMenu,
    }
}

type PageMenuListViewProps = ReturnTypeUsePageMenuList & {
    menuList: MenuType[]
    currentPath?: string
    userInfo: UserInfoType
}
let PageMenuListView: React.FC<PageMenuListViewProps> = ({
    anchorEl,
    handleClick,
    handleClose,
    menuList,
    handleClickMenu,
    userInfo,
}) => {
    const classes = useStyles()
    const { t, i18n } = useTranslation()
    const router = useRouter()
    let arrPathname = router.pathname.split('/')
    let pathname = '/' + arrPathname[1]

    const { isShowBadge } = useBadgeNew()

    return (
        <div>
            <Typography variant='body1' onClick={handleClick} className={classes.btnMenus}>
                {t(`HOME.MENU`)}
            </Typography>
            <StyledMenu
                id='customized-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                style={{ marginTop: 25 }}
                PaperProps={{
                    style: {
                        borderRadius: 0,
                    },
                }}
                disableAutoFocusItem
            >
                {menuList.map((item, index) => (
                    <MenuItem
                        className={pathname === '/' + item.menuPath ? classes.highlight : classes.normal}
                        key={index}
                        onClick={() => {
                            if (item.menuPath === 'Home') handleClickMenu('/')
                            else handleClickMenu('/' + item.menuPath)
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
                        >
                            <ListItemText
                                primary={i18n.language === 'th' ? item.menuNameTH : item.menuNameEN}
                                className={clsx(
                                    classes.listItemText,
                                    pathname === '/' + item.menuPath ? classes.textHighlight : null,
                                    pathname === '/' && item.menuPath === 'Home' ? classes.textHighlight : null,
                                )}
                            />
                        </Badge>
                    </MenuItem>
                ))}
            </StyledMenu>
        </div>
    )
}

type PageMenuListProps = UsePageMenuListProps & Omit<PageMenuListViewProps, keyof ReturnTypeUsePageMenuList>
let PageMenuList: React.FC<PageMenuListProps> = ({ ...others }) => {
    const PageMenuList = usePageMenuList({})
    return <PageMenuListView {...PageMenuList} {...others} />
}

export default PageMenuList

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        btnMenus: {
            color: theme.colors.white,
            cursor: 'pointer',
            '&:hover': {
                color: theme.colors.yellow,
            },
        },
        listItemText: {
            color: theme.colors.lightGray,
            paddingLeft: 20,
            paddingRight: 20,
        },
        textHighlight: {
            color: theme.colors.yellow,
        },
        highlight: {
            height: 55,
        },
        normal: {
            height: 55,
        },
        badge: {
            width: 30,
            height: 12,
            fontSize: 10,
        },
        anchorOriginTopRightRectangle: {
            top: 4,
            right: 5,
            transform: 'scale(1) translate(50%, -50%)',
            transformOrigin: '100% 0%',
        },
    }),
)
