import React, { Children } from 'react'
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';
import { withStyles, makeStyles, Theme, useTheme, createStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TabContext from '@material-ui/lab/TabContext';
import TabPanel from '@material-ui/lab/TabPanel';

import ColorWeb from '../../constants/colorWeb';

import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        tabs: {
            backgroundColor: '#D4E8DC59',

        },
        rootTabs: {
            color: '#166936',
            boxShadow: '0px',
            '& .MuiTab-wrapper': {
                // ...theme.fontStyle.prompt.h2,
                ...theme.typography.h5,
                fontSize: 28,
                [theme.breakpoints.down('sm')]: {
                    fontSize: 20
                }
            },
        },
        indicator: {
            backgroundColor: '#166936'
        },
        swipeableView: {
            width: '100%',
            height: 'calc(100% - 48px)',
            backgroundColor: 'transparent',
        }
    })
)


type UsemapTabsProps = {}
type ReturnTypeUsemapTabs = ReturnType<typeof usemapTabs>
function usemapTabs(props: UsemapTabsProps) {
    const { } = props
    return {}
}

type mapTabsViewProps = ReturnTypeUsemapTabs & {
    // value?: number,
    children: React.ReactNode,
    // elems: JSX.Element,
    // index: any;
    // value: any;
}
let MapTabsView: React.FC<mapTabsViewProps> = ({ children }) => {

    const classes = useStyles()
    const { t, i18n } = useTranslation()
    const lang = i18n.language.toUpperCase()

    const theme = useTheme();
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [value, setValue] = React.useState(0);

    const headerList = [
        { name: t('CONTROLS.MAP_TAB.MAP') },
        { name: t('CONTROLS.MAP_TAB.MAP_IMAGE') }
    ]

    const handleChangeTab = (event, newIndex) => {
        setCurrentIndex(newIndex);
        setValue(newIndex)

    };

    const handleChangeIndex = (index) => {
        setCurrentIndex(index);
    };

    return (
        <Grid container className={classes.root}>
            {/* <TabContext value={value}> */}
            <AppBar position="static" color="default" style={{ zIndex: 1, boxShadow: 'none' }}>
                <Tabs
                    value={currentIndex}
                    onChange={handleChangeTab}
                    className={classes.tabs}
                    // indicatorColor="primary"
                    // textColor="primary"
                    variant="fullWidth"
                    classes={{
                        root: classes.rootTabs,
                        indicator: classes.indicator,
                    }}
                // aria-label="full width tabs example"
                >
                    {
                        headerList.map((item, index) => {
                            return (
                                <Tab label={item.name} key={index} />
                            )
                        })
                    }
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
                className={classes.swipeableView}
            >
                {children}
                {/* {elems} */}
                {/* <TabPanel value={value} dir={theme.direction} >
                        {children[currentIndex]}
                    </TabPanel>
                    <TabPanel value={value} dir={theme.direction}>
                        {children[currentIndex]}
                    </TabPanel> */}

            </SwipeableViews>
            {/* </TabContext> */}
        </Grid >
    )
}

type mapTabsProps = UsemapTabsProps &
    Omit<mapTabsViewProps, keyof ReturnTypeUsemapTabs> & {
        children: React.ReactNode
        // elems: JSX.Element
    }
let MapTabs: React.FC<mapTabsProps> = ({ ...others }) => {
    const mapTabs = usemapTabs({})
    return <MapTabsView {...mapTabs} {...others} />
}

export default MapTabs

// const TabPanel = (props) => {
//     const { children, value, index, ...other } = props;
//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             id={`simple-tabpanel-${index}`}
//             aria-labelledby={`simple-tab-${index}`}
//             {...other}
//         >
//             {value === index && (
//                 <Box p={3} style={{ backgroundColor: 'green', width }}>
//                     <Typography>{children}</Typography>
//                 </Box>
//             )}
//         </div>
//     );
// }
