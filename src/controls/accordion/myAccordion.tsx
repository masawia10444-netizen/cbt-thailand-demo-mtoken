import React, { FunctionComponent, memo } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography, AccordionProps } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import useMyAccordion from './useMyAccordion'
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import FontSize from '../../constants/fontSize'
import ColorWeb from '../../constants/colorWeb'

type MyAccordionProps = {
    title?: string
    styleMyAccordion?: any
    defaultExpanded?: boolean
}
let MyAccordion: FunctionComponent<MyAccordionProps & AccordionProps> = ({ title, children, ...props }) => {
    const classes = useStyles()
    const { defaultExpanded = false } = props
    // console.log('children', props)
    return (
        <Grid container className={classes.root}>
            <Grid item xs>
                <Accordion defaultExpanded={defaultExpanded} className={classes.accordion}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon className={classes.iconSet} />}
                        className={classes.accordiontitle}
                    >
                        <Typography variant='h4'>{title}</Typography> {/* variant='h3'*/}
                    </AccordionSummary>
                    {/* <Divider /> */}
                    <AccordionDetails className={classes.accordianDetail}>{children}</AccordionDetails>
                    <Divider />
                </Accordion>
            </Grid>
        </Grid>
    )
}
MyAccordion = memo(MyAccordion)
export default MyAccordion

const useStyles = makeStyles((theme: Theme) => ({
    accordion: {
        boxShadow: 'none',
        backgroundColor: '#555A56',
        borderRadius: 0,
    },
    accordiontitle: {
        fontSize: FontSize.medium,
        color: theme.colors.gray,
        backgroundColor: '#555A56',
        height: '42px',
        '&.Mui-expanded': {
            fontSize: FontSize.medium,
            color: theme.colors.textBlack,
            backgroundColor: '#555A56',
            height: '42px',
            minHeight: '0px',
            borderRadius: 0,
            '& .MuiSvgIcon-root': {
                color: theme.colors.textBlack,
            },
        },
        '& .MuiSvgIcon-root': {
            color: theme.colors.gray,
        },
    },
    accordianDetail: {
        backgroundColor: '#555A56',
    },
    root: {
        width: '100%',
        borderRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
    },
    body: {
        borderRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
    },
    iconSet: {
        // color: theme.palette.white,
    },
    title: {
        // paddingLeft: '20px',
        // paddingTop: '20px',
        // ...theme.fontStyle.H3,

        fontSize: FontSize.medium,
    },
}))
