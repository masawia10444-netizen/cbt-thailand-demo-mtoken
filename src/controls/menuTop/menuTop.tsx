import React, { useState, useMemo, memo } from 'react'
import { List, ListItem, ListItemIcon, ListItemText, Popover, Box } from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import { menuItemType } from '../../configs/routes/page'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Router, { useRouter } from 'next/router'
import pathRoutes, { mainMenu } from '../../configs/routes/pathRoutes'
import clsx from 'clsx'

type selectProp = {
    selected?: boolean
}
type UsemenuTopProps = { menulist: (menuItemType & selectProp)[] }
type ReturnTypeUsemenuTop = ReturnType<typeof UsemenuTop>
function UsemenuTop(props: UsemenuTopProps) {
    const { menulist } = props
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)
    const [subMenu, setSubMenu] = useState<JSX.Element[] | null>(null)
    const router = useRouter()
    let open = useMemo(() => Boolean(anchorEl), [anchorEl])
    let list = useMemo(() => {
        const path = '' // pathname.split('/')[1]
        return menulist.map((itm) => {
            if (itm?.isDisplayMenu) {
                let selected = mainMenu[path as never] === itm.id ? true : false
                return { ...itm, selected: selected }
            }
        })
    }, [menulist]) // ,pathname
    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, data: menuItemType) => {
        let sub = null
        if (event.currentTarget) {
            if (data.children) {
                sub = data?.children
                    .filter((itm) => itm?.isDisplayMenu && itm)
                    .map((itm) => (
                        <ListItem
                            key={itm?.name}
                            button
                            onClick={() => {
                                if (itm.pathRoute) {
                                    handleClose()
                                    Router?.push(itm?.pathRoute)
                                }
                            }}
                        >
                            {itm.icon && <ListItemIcon>{itm.icon}</ListItemIcon>}
                            <ListItemText primary={itm?.name} />
                            {/* {itm.children && true ? <ExpandLess /> : <ExpandMore />} */}
                            {itm.children && <ExpandMore />}
                        </ListItem>
                    ))
                setAnchorEl(event.currentTarget)
                setSubMenu(sub)
            } else {
                if (data?.pathRoute) Router?.push(data?.pathRoute)
            }
        }
    }

    const handleClose = () => {
        setAnchorEl(null)
    }
    return { list, handleClick, subMenu, anchorEl, open, handleClose }
}

type popUpProps = {
    subMenu: JSX.Element[] | null
    anchorEl: HTMLDivElement | null
    open: boolean
    handleClose: () => void
}
let PopUp: React.FC<popUpProps> = ({ subMenu, anchorEl, open, handleClose }) => {
    const classes = useStyles()

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <Box className={classes.paper}>{subMenu && subMenu}</Box>
        </Popover>
    )
}
memo(PopUp)
type menuTopViewProps = ReturnTypeUsemenuTop & {}
let MenuTopView: React.FC<menuTopViewProps> = ({ list, handleClick }) => {
    const classes = useStyles()

    return (
        <Box display='flex' width='auto' height='100%'>
            {list &&
                list.map((itm) => {
                    return (
                        itm && (
                            <div key={itm?.name} style={{ height: '100%' }}>
                                <Box height='100%'>
                                    <ListItem
                                        key={itm?.name}
                                        selected={itm.selected}
                                        button
                                        onClick={(event) => handleClick(event, itm)}
                                        className={clsx(classes.menuSelect, classes.root)}
                                    >
                                        {itm.icon && <ListItemIcon>{itm.icon}</ListItemIcon>}
                                        <ListItemText primary={itm?.name} />
                                        {itm.children && <ExpandMore />}
                                    </ListItem>
                                </Box>
                            </div>
                        )
                    )
                })}
        </Box>
    )
}
memo(MenuTopView)

type menuTopProps = UsemenuTopProps & Omit<menuTopViewProps, keyof ReturnTypeUsemenuTop>
let MenuTop: React.FC<menuTopProps> = ({ ...others }) => {
    const menuTop = UsemenuTop(others)
    return (
        <>
            <MenuTopView {...menuTop} {...others} />
            <PopUp {...menuTop} />
        </>
    )
}

export default MenuTop
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '100%',
        },
        popUp: {
            width: 100,
        },

        paper: {
            minWidth: 150,
            // '& .MuiListItem-button:hover': {
            //     backgroundColor: theme.palette.lightGreen,
            //     color: theme.palette.white,
            // },
        },
        menuSelect: {
            '&.MuiListItem-root.Mui-selected, .MuiListItem-root.Mui-selected:hover': {
                borderBottom: '4px solid',
                borderColor: theme.palette.primary,
                color: theme.palette.primary,
            },
        },
    }),
)
