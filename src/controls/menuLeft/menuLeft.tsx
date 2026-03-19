import React, { useMemo } from 'react'
import Router from 'next/router'
import { ListItem, List, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { menuItemType } from '../../configs/routes/page'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import pathRoutes, { mainMenu } from '../../configs/routes/pathRoutes'
import clsx from 'clsx'
import Store from '../../stores/rootStore'

type selectProp = {
    selected?: boolean
}
type UsemenuLeftProps = { menulist: (menuItemType & selectProp)[] }
type ReturnTypeUsemenuLeft = ReturnType<typeof useMenuLeft>
function useMenuLeft(props: UsemenuLeftProps) {
    const { UserStore } = Store()
    const { menulist } = props
    // const { pathname } = useLocation()

    const handleClickMenu = async (data: menuItemType) => {
        if (UserStore?.userInfo?.email) {
            await UserStore.getProfile({
                email: UserStore.userInfo.email,
                userID: UserStore.userInfo.userID,
            })
        }

        if (data.pathRoute) {
            Router?.push(data?.pathRoute)
        }
    }

    let list = useMemo(() => {
        const path = '' //pathname.split('/')[1]
        return menulist.map((itm) => {
            if (itm?.isDisplayMenu) {
                let selected = mainMenu[path as never] === itm.id ? true : false
                return { ...itm, selected: selected }
            }
        })
    }, [menulist]) //,pathname
    return { list, handleClickMenu }
}

type menuLeftViewProps = ReturnTypeUsemenuLeft & { toggleDrawer: () => void }
let MenuLeftView: React.FC<menuLeftViewProps> = ({ list, handleClickMenu, toggleDrawer }) => {
    const classes = useStyles()
    // const { pathname } = useLocation()
    const pathname = ''

    return (
        <>
            {list.map((itm) => {
                let Icon = itm?.icon || null
                return (
                    itm &&
                    (itm?.children ? (
                        <Accordion
                            key={itm.name}
                            className={clsx(classes.accordion, itm?.selected && classes.accordionSelected)}
                            defaultExpanded
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon style={{ padding: '0px 10px 0px 10px' }} />}
                                className={classes.accordionTitle}
                            >
                                {Icon && <Icon className={classes.icon} />}
                                {itm.name}
                            </AccordionSummary>
                            <AccordionDetails style={{ paddingBottom: '0px', paddingTop: '0px' }}>
                                <List component='div' disablePadding className={classes.list}>
                                    {itm?.children.map((item, index) => {
                                        return (
                                            item?.isDisplayMenu && (
                                                <ListItem
                                                    selected={
                                                        item?.pathRoute ? !pathname.indexOf(item?.pathRoute) : false
                                                    }
                                                    button
                                                    key={`${item.id}_${index}`}
                                                    onClick={() => {
                                                        handleClickMenu(item)
                                                        toggleDrawer()
                                                    }}
                                                    className={classes.listItem}
                                                >
                                                    {item.name} <ChevronRightIcon />
                                                </ListItem>
                                            )
                                        )
                                    })}
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    ) : (
                        <ListItem
                            button
                            key={itm?.id}
                            onClick={() => handleClickMenu(itm)}
                            className={classes.listItem}
                            style={{ height: 48 }}
                        >
                            {Icon && <Icon className={classes.icon} />}
                            {itm?.name}
                        </ListItem>
                    ))
                )
            })}
        </>
    )
}

type menuLeftProps = UsemenuLeftProps & Omit<menuLeftViewProps, keyof ReturnTypeUsemenuLeft>
let MenuLeft: React.FC<menuLeftProps> = ({ ...others }) => {
    const menuLeft = useMenuLeft({ ...others })
    return <MenuLeftView {...menuLeft} {...others} />
}

export default MenuLeft
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        accordionTitle: {
            // backgroundColor: theme.palette.primary,
            // color: theme.palette.white,
            '& .MuiAccordionSummary-content': {
                margin: '0px',
            },
            '&.Mui-expanded': {
                backgroundColor: theme.palette.primary,
            },
        },
        accordionSelected: {
            // borderLeft: '4px solid',
            // borderRadius: '0px !important',
            // borderColor: theme.palette.primary,
        },
        list: {
            width: '100%',
        },
        listItem: {
            justifyContent: 'space-between',
            height: 30,

            // '&.MuiListItem-button:hover': {
            //     backgroundColor: 'unset',
            //     color: theme.palette.lightGreen,

            //     // '& .MuiSvgIcon-root': {
            //     //     fill: theme.palette.lightGreen,
            //     // },
            // },
            // '&.MuiListItem-root.Mui-selected': {
            //     color: theme.palette.lightGreen,
            //     backgroundColor: 'unset',
            //     '& .MuiSvgIcon-root': {
            //         fill: theme.palette.lightGreen + '!important',
            //     },
            // },
            // ...theme.fontStyle.H5,
        },
        accordion: {
            //backgroundColor: theme.palette.secondary,
            //color: theme.palette.white,
            boxShadow: 'none',
            position: 'unset',
            // '& .MuiSvgIcon-root': {
            //     fill: theme.palette.white,
            // },
            '&.MuiAccordion-root.Mui-expanded': {
                margin: 0,
            },
            '& .MuiAccordionSummary-root.Mui-expanded': {
                minHeight: 'unset',
            },
        },
        icon: {
            width: '35px !important',
            height: '35px !important',
            margin: 8,
        },
    }),
)
