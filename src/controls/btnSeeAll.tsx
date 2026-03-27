import React from 'react'
import SeeAllIcon from '@material-ui/icons/ArrowForward'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import clsx from 'clsx'
import Link from 'next/link'

type Proptypes = {
    label?: string
    btnClassName: string
    labelClassName: string
    iconClassName: string
    onClick?: (e?: any) => void
    href?: string
}
const btnSeeAll: React.FC<Proptypes> = ({
    label = '',
    btnClassName = '',
    labelClassName = '',
    iconClassName = '',
    onClick,
    href = '',
}) => {
    const classes = useStyles()
    return (
        <Link href={href}>
            <a target='_self' style={{ textDecoration: 'none' }}>
                <Button
                    className={clsx(classes.btnSeeAll, btnClassName)}
                    endIcon={<SeeAllIcon fontSize='small' className={clsx(classes.seeAllIcon, iconClassName)} />}
                    onClick={(e) => {
                        onClick && onClick(e)
                    }}
                >
                    <Typography variant='body2' className={clsx(classes.seeAll, labelClassName)}>
                        {label}
                    </Typography>
                </Button>
            </a>
        </Link>
    )
}

export default btnSeeAll

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        seeAll: {
            fontFamily: theme.fontStyle.prompt.h5.fontFamily,
            fontSize: theme.fontStyle.prompt.h5.fontSize,
        },
        seeAllIcon: {
            fontSize: '14px !important',
            marginLeft: 5,
        },
        btnSeeAll: {
            borderRadius: 0,
            height: 40,
            width: 122,
        },
    }),
)
