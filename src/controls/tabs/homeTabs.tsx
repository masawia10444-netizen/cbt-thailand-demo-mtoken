import React from 'react'
import SwipeableViews from 'react-swipeable-views'
import { makeStyles, Theme, useTheme, createStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'

type TabPanelProps = {
    children?: React.ReactNode
    dir?: string
    index: any
    value: any
}

type UseMyTabsProps = { defaultTab?: number }
type ReturnTypeUseMyTabs = ReturnType<typeof useMyTabs>
function useMyTabs({ defaultTab = 0 }: UseMyTabsProps = {}) {
    const [value, setValue] = React.useState(defaultTab)
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue)
    }

    const handleChangeIndex = (index: number) => {
        setValue(index)
    }

    return {
        value,
        handleChange,
        handleChangeIndex,
    }
}

type StyledTabsProps = {
    value: number
    onChange: (event: React.ChangeEvent<{}>, newValue: number) => void
    className?: string
}

type MyTabsViewProps = ReturnTypeUseMyTabs & {
    elems: JSX.Element[]
    tabTitles: string[]
    defaultTab?: number
}
let MyTabsView: React.FC<MyTabsViewProps> = ({ value, handleChange, handleChangeIndex, elems, tabTitles }) => {
    const classes = useStyles()
    const theme = useTheme()

    function TabLabel({ text, isFocused }: { text: string; isFocused: boolean }) {
        return (
            <Typography className={clsx(classes.tabLabel, isFocused ? classes.isFocused : classes.unFocused)}>
                {text}
            </Typography>
        )
    }

    return (
        <div className={classes.root}>
            <AppBar position='static' className={classes.appBarTab}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    className={classes.tabs}
                    TabIndicatorProps={{ children: <span /> }}
                    indicatorColor='secondary'
                    textColor='secondary'
                    variant='scrollable'
                    aria-label='seasonal tab'
                    scrollButtons='on'
                    classes={{
                        indicator: classes.indicator,
                        flexContainer: classes.flexContainer,
                        scrollButtons: classes.scrollButtons,
                    }}
                >
                    {tabTitles.map((title, index) => (
                        <Tab
                            key={index}
                            className={clsx(
                                tabTitles?.length !== index + 1 ? classes.tab : '',
                                value === index ? classes.btnFocused : classes.btnUnFocused,
                            )}
                            label={<TabLabel text={title} isFocused={value === index} />}
                            {...a11yProps(index)}
                        />
                    ))}
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value < elems?.length ? value : 0}
                onChangeIndex={handleChangeIndex}
                springConfig={{
                    duration: '0.8s',
                    easeFunction: '',
                    delay: '0s',
                }}
                style={{ background: 'black' }}
            >
                {elems}
            </SwipeableViews>
        </div>
    )
}

type MyTabsProps = UseMyTabsProps & Omit<MyTabsViewProps, keyof ReturnTypeUseMyTabs>
let MyTabs: React.FC<MyTabsProps> = ({ defaultTab, ...others }) => {
    const MyTabs = useMyTabs({ defaultTab: defaultTab })
    return <MyTabsView {...MyTabs} {...others} />
}

export default MyTabs

function a11yProps(index: any) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    }
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: 'transparent',
            width: '100%',
        },
        tabLabel: {
            // marginRight: 20,
            fontFamily: 'Prompt-Regular',
            color: '#80BD01',
            fontSize: 14,
            [theme.breakpoints.up('sm')]: {
                fontSize: 16,
            },
            [theme.breakpoints.up('md')]: {
                fontSize: 18,
            },
            [theme.breakpoints.up('lg')]: {
                fontSize: 22,
            },
        },
        tabs: {
            padding: 0,
            paddingBottom: 20,
            [theme.breakpoints.up('sm')]: {
                paddingLeft: 30,
                paddingRight: 30,
            },
            [theme.breakpoints.up('md')]: {
                paddingLeft: 60,
                paddingRight: 60,
            },
            [theme.breakpoints.up('lg')]: {
                paddingLeft: 90,
                paddingRight: 90,
            },
        },
        tab: {},
        appBarTab: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            // minWidth: 600,
        },
        flexContainer: {
            justifyContent: 'flex-start',
            [theme.breakpoints.up('sm')]: {
                justifyContent: 'space-between',
            },
        },
        scrollButtons: {
            color: theme.palette.secondary.main,
            width: 10,
        },
        indicator: {},
        unFocused: {
            color: theme.colors.gray,
            fontFamily: 'Prompt-Light',
        },
        isFocused: {
            [theme.breakpoints.down('sm')]: {
                color: '#090909',
                fontFamily: 'Prompt-Bold',
            },
        },
        btnFocused: {
            [theme.breakpoints.down('sm')]: {
                // marginRight: 30,
                // marginLeft:30,
            },
        },
        btnUnFocused: {},
    }),
)
