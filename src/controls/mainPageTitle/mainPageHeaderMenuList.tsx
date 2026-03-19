import React, { FC } from 'react'
import Grid from '@material-ui/core/Grid'
import Menu, { MenuProps } from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { CSSProperties } from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

type UseMainPageHeaderMenuListProps = {}
type ReturnTypeUseMainPageHeaderMenuList = ReturnType<typeof useMainPageHeaderMenuList>
function useMainPageHeaderMenuList(props: UseMainPageHeaderMenuListProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return {
        anchorEl,
        handleClick,
        handleClose,
    }
}

type MenuListType = {
    title: string
    onClickItem: () => void
}
type MainPageHeaderMenuListViewProps = {
    title?: string
    arrangement?: string
    containerStyle?: CSSProperties
    gridItemTitleStyle?: CSSProperties
    titleTextStyle?: CSSProperties
    gridItemArrangementStyle?: CSSProperties
    menuList: MenuListType[]
    currentMenuName: string

    anchorEl: any
    handleClick: any
    handleClose: () => void
}
let MainPageHeaderMenuListView: FC<ReturnTypeUseMainPageHeaderMenuList & MainPageHeaderMenuListViewProps> = ({
    title,
    arrangement,
    containerStyle,
    gridItemTitleStyle,
    titleTextStyle,
    gridItemArrangementStyle,
    currentMenuName,

    anchorEl,
    menuList,
    handleClick,
    handleClose,
}) => {
    const { t } = useTranslation()
    const theme = useTheme()
    const classes = useStyles()
    const isMobileView = useMediaQuery(theme.breakpoints.down('xs'))

    return (
        <Grid container alignItems='center' justify='space-between' style={isMobileView ? { marginBottom: 10, ...containerStyle } : containerStyle}>
            <Grid item sm={7} xs={12} style={isMobileView ? gridItemTitleStyle : { marginTop: 5, marginBottom: 40, ...gridItemTitleStyle }}>
                <Typography variant='h1' color='primary' style={isMobileView ? { fontSize: 28, ...titleTextStyle } : titleTextStyle}>
                    {title}
                </Typography>
            </Grid>
            <Grid
                item
                sm={5}
                xs={12}
                style={isMobileView ? { textAlign: 'left', ...gridItemArrangementStyle } : { marginTop: '-25px', textAlign: 'right', ...gridItemArrangementStyle }}
            >
                <Typography
                    variant='h5'
                    align='right'
                    style={{ marginTop: 10, display: 'inline-flex', marginRight: 10 }}
                >
                    {t('ACCOMMODATION.ARRANGEMENT')}
                </Typography>
                <div style={{ fontFamily: 'Prompt-Medium', display: 'inline-flex' }}>
                    <Button
                        aria-controls='simple-menu'
                        aria-haspopup='true'
                        onClick={handleClick}
                        color='secondary'
                        endIcon={<ExpandMoreIcon />}
                    >
                        <Typography variant='h5' color='secondary'>
                            {currentMenuName}
                        </Typography>
                    </Button>
                    <Menu
                        id='simple-menu'
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {menuList.map((item, index) => (
                            <MenuItem
                                key={index}
                                onClick={() => {
                                    item.onClickItem()
                                    handleClose()
                                }}
                            >
                                {currentMenuName === item.title ? (
                                    <Typography variant='h5' color='secondary'>
                                        {item.title}
                                    </Typography>
                                ) : (
                                        <Typography variant='h5'>{item.title}</Typography>
                                    )}
                            </MenuItem>
                        ))}
                    </Menu>
                </div>
            </Grid>
        </Grid>
    )
}

type MainPageHeaderMenuListProps = UseMainPageHeaderMenuListProps &
    Omit<MainPageHeaderMenuListViewProps, keyof ReturnTypeUseMainPageHeaderMenuList>
let MainPageHeaderMenuList: FC<MainPageHeaderMenuListProps> = ({ ...others }) => {
    const MainPageHeaderMenuList = useMainPageHeaderMenuList({})
    return <MainPageHeaderMenuListView {...MainPageHeaderMenuList} {...others} />
}

export default MainPageHeaderMenuList

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        btnMenus: {
            color: theme.colors.lightGrey,
            cursor: 'pointer',
        },
        listItemText: {
            color: '#80BD01',
            paddingLeft: 20,
            paddingRight: 20,
            // textAlign: 'center'
        },
        highlight: {
            background: theme.colors.yellow,
        },
        normal: {},
    }),
)
