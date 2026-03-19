import React, { useCallback } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import { Grid } from '@material-ui/core'

export type InitialTabObj = {
    title: string
    content: React.ReactNode | JSX.Element
    activeKey: number
    onCallBackRemoveTab?: (values: InitialTabObj) => {}
}

type UseTabProps = {
    activeKey?: number
    titleTab?: string
    numberOfTabs?: number
    handleChangeTab?: (values: any) => void
    initialTab: InitialTabObj[]
}
export const useTabPanel = ({ activeKey = 0, initialTab = [], handleChangeTab }: UseTabProps) => {
    const [value, setValue] = React.useState(activeKey)
    const [tabList, setTabList] = React.useState<InitialTabObj[]>(initialTab)
    const onChange = useCallback((newValue: number) => {
        setValue(newValue)
        handleChangeTab?.(newValue)
    }, [])

    const onAddTab = useCallback(() => {}, [])
    const onRemoveTab = useCallback((tabItem: InitialTabObj) => {}, [])

    return { value, tabList, onChange, onAddTab, onRemoveTab, setValue }
}

interface TabPanelItemProps {
    children?: React.ReactNode
    index: any
    value: any
    activeKey: any
}

function TabPanelItem(props: TabPanelItemProps) {
    const { children, value, index, activeKey, ...other } = props

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </div>
    )
}

function a11yProps(index: any) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    }
}

const ButtonInTabs = ({ className, onClick }) => {
    return (
        <Button color='secondary' variant='outlined' className={className} onClick={onClick}>
            <img
                loading='lazy'
                src={process.env.NEXT_PUBLIC_WEB_URL + '/images/trip/add_day.svg'}
                alt='add_day'
                style={{ width: 12 }}
            />
        </Button>
    )
}

//@ts-ignore
type TabPanelPropsView = {
    maxTabs?: number
    titleTab?: string
    titleTabConfig?: string | React.ReactNode[]
    tabPanels?: React.ReactNode[]
    numberOfTabs?: number
    handleChangeTab?: (values: any) => void
    initialTab: InitialTabObj[]
    isRemoveTab?: boolean
    isAddTab?: boolean
    onCallBackRemoveTab?: (values: InitialTabObj, onChange: (value: number) => void) => void
    onCallBackAddTab?: () => void
} & ReturnType<typeof useTabPanel>

export const TabPanelView: React.FC<TabPanelPropsView> = ({
    maxTabs = 5,
    titleTab = '',
    tabPanels,
    titleTabConfig,
    value,
    tabList,
    onChange,
    onAddTab,
    onRemoveTab,
    initialTab,
    isRemoveTab = false,
    isAddTab = false,
    onCallBackRemoveTab,
    onCallBackAddTab,
}) => {
    const classes = useStyles()

    return (
        <>
            <AppBar position='relative' color='transparent' className={classes.appbar}>
                <Tabs
                    value={value}
                    onChange={(event: React.ChangeEvent<{}>, newValue: number) => {
                        onChange(newValue)
                    }}
                    variant='scrollable'
                    scrollButtons='auto'
                    aria-label='trip tabs'
                    indicatorColor='secondary'
                    textColor='secondary'
                    TabIndicatorProps={{ className: classes.indicator }}
                >
                    {initialTab?.map((tabItem: InitialTabObj, index: number) => (
                        <Tab
                            key={index}
                            className={clsx(classes.tab, index === value && classes.focused)}
                            label={
                                <Grid container justify='space-between' alignItems='center' spacing={2}>
                                    <Grid item>
                                        <Typography
                                            component='div'
                                            variant='h2'
                                            color={index === value ? 'secondary' : 'inherit'}
                                            className={clsx(classes.label, index === value && classes.labelFocused)}
                                        >
                                            {tabItem.title}
                                        </Typography>
                                    </Grid>
                                    {initialTab?.length > 1 && isRemoveTab && (
                                        <Grid item>
                                            <IconButton
                                                size='small'
                                                onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                                                    event.stopPropagation()

                                                    if (onCallBackRemoveTab) {
                                                        onCallBackRemoveTab(tabItem, onChange)
                                                    }
                                                }}
                                            >
                                                <CloseIcon className={classes.iconRemove} />
                                            </IconButton>
                                        </Grid>
                                    )}
                                </Grid>
                            }
                            {...a11yProps(index)}
                        />
                    ))}
                    {isAddTab && initialTab?.length < maxTabs && (
                        <ButtonInTabs
                            className={classes.btnAddTab}
                            onClick={() => {
                                if (onCallBackAddTab) {
                                    onCallBackAddTab()
                                }
                            }}
                        />
                    )}
                </Tabs>
                <span
                    style={{
                        height: 2,
                        width: '100%',
                        background: 'rgba(210,210,210,0.5)',
                        borderRadius: 6,
                        marginLeft: 0,
                        position: 'absolute',
                        bottom: 1,
                        zIndex: -1,
                    }}
                ></span>
            </AppBar>
            {initialTab?.map((item: InitialTabObj, index: number) => (
                <TabPanelItem value={value} index={index} key={item.activeKey} activeKey={item.activeKey}>
                    <div style={{ paddingTop: 30 }}>{item.content}</div>
                </TabPanelItem>
            ))}
        </>
    )
}

type TabPanelProps = {} & UseTabProps & Omit<TabPanelPropsView, keyof ReturnType<typeof useTabPanel>>

const TabPanel: React.FC<TabPanelProps> = ({ ...props }) => {
    const { titleTab, numberOfTabs, handleChangeTab, initialTab, activeKey } = props
    const state = useTabPanel({ titleTab, numberOfTabs, handleChangeTab, initialTab, activeKey })
    return <TabPanelView {...state} {...props} />
}
export default TabPanel

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        iconRemove: {
            color: 'gray',
            // marginTop: 10,
        },
        root: {
            // flexGrow: 1,
            // width: '100%',
        },
        appbar: {
            boxShadow: 'none',
            overflow: 'hidden',
            position: 'relative',
            zIndex: 1,
        },
        tab: {
            padding: 5,
            marginRight: 30,
            width: 'fit-content',
            minWidth: 0,
        },
        label: {
            color: theme.colors.gray,
            // paddingBottom: 10,
            width: '100%',
            // [theme.breakpoints.down('xs')]: {
            //     fontSize: 28,
            // },
        },
        labelFocused: {
            color: theme.palette.secondary.main,
        },
        indicator: {
            height: 4,
        },
        focused: {},
        btnAddTab: {
            width: 36,
            height: 36,
            minWidth: 0,
            borderRadius: 6,
            marginTop: 5,
            marginLeft: 20,
        },
    }),
)
