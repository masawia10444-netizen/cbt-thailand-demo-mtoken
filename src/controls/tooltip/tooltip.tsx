import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Tooltip } from '@material-ui/core'
import { TooltipProps } from '@material-ui/core/Tooltip'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            fontSize: '18px',
        },
    }),
)

//placement
// top-start
// top
// top-end
// right-start
// right
// right-end
// bottom-start
// bottom
// bottom-end
// left-start
// left
// left-end

type props = {
    title: string
    disable?: boolean
    placement?: string
}

const TooltipControl: React.FC<TooltipProps & props> = ({ title, disable, placement, children }) => {
    const classes = useStyles()
    return (
        <Tooltip
            title={title}
            placement={placement}
            disableHoverListener={disable}
            classes={{
                tooltip: classes.root,
            }}
        >
            {children}
        </Tooltip>
    )
}

export default TooltipControl
