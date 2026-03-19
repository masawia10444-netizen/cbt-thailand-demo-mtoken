import React from 'react'
import { withStyles, makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Menu, { MenuProps } from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import Router from 'next/router'
import clsx from 'clsx'
import Store from '../../stores/rootStore'

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
        if (UserStore?.userInfo?.email) {
            await UserStore.getProfile({
                email: UserStore.userInfo.email,
                userID: UserStore.userInfo.userID,
            })
        }

        handleClose()
        Router.push(path)
    }

    return {
        anchorEl,
        handleClick,
        handleClose,
        handleClickMenu,
    }
}

type MenuType = {
    id: number
    name: string
    path?: string
    handleClick?: (values?: any) => void
    isHighlight?: boolean
}
type PageMenuListViewProps = ReturnTypeUsePageMenuList & {
    menuText: string
    menuList: MenuType[]
    currentPath?: string
    isHighlight?: boolean
}
let PageMenuListView: React.FC<PageMenuListViewProps> = ({
    anchorEl,
    handleClick,
    handleClose,
    menuList,
    menuText,
    isHighlight,
}) => {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <div>
            <Typography
                variant='h5'
                onClick={handleClick}
                className={clsx(classes.btnMenus, isHighlight && classes.textHighlight)}
                noWrap
            >
                {menuText}
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
            >
                {menuList.map((item, index) => (
                    <MenuItem
                        className={item.isHighlight ? classes.bgHighlight : classes.normal}
                        key={index}
                        onClick={() => {
                            item.handleClick && item.handleClick()
                            handleClose()
                        }}
                    >
                        <ListItemText
                            primary={t(`${item.name}`)}
                            className={clsx(classes.listItemText, item.isHighlight && classes.bgHighlight)}
                        />
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
            color: theme.colors.lightGray,
            cursor: 'pointer',
            '&:hover': {
                color: theme.colors.yellow,
            },
            maxWidth: 100,
            [theme.breakpoints.up('sm')]: {
                maxWidth: 210,
            },
        },
        listItemText: {
            color: theme.colors.lightGray,
            paddingLeft: 20,
            paddingRight: 20,
            // textAlign: 'center'
        },
        textHighlight: {
            color: theme.colors.yellow,
        },
        bgHighlight: {
            color: theme.colors.yellow,
        },
        normal: {},
    }),
)
