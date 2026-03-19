import React, { Children } from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        heading: {
            fontFamily: 'Prompt-Bold',
        },
        accordion: {
            boxShadow: 'none',
            background: theme.colors.lightGray,
        },
        accordionDetails: {
            background: 'white',
            width: '100%',
        },
        expandedAccordionSummary: {
            minHeight: 0,
            // height: 40,
        },
    }),
)

type Accordiontype = {
    children?: React.ReactNode
    title?: string
    defaultExpanded?: boolean
    disabled?: boolean
    expandIndex?: number
}
export default function AccordionSearchResult({
    children,
    title,
    defaultExpanded = false,
    disabled = false,
    expandIndex = 0,
}: Accordiontype) {
    const classes = useStyles()

    const [expanded, setExpanded] = React.useState<number | false>(false)

    const handleChange = (panel: number) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false)
    }

    return (
        <div className={classes.root}>
            <Accordion
                expanded={expanded === expandIndex}
                onChange={handleChange(expandIndex)}
                square
                className={classes.accordion}
                defaultExpanded={defaultExpanded}
                disabled={disabled}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: '#009687' }} />}
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                    style={{ height: 40 }}
                    classes={{ expanded: classes.expandedAccordionSummary }}
                >
                    <Typography variant='h5' className={classes.heading}>
                        {title}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>
                    <div style={{ width: '100%' }}>{expanded === expandIndex && children}</div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}
