import React, { FC } from 'react'
import Grid from '@material-ui/core/Grid'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'fixed',
            backgroundColor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(10px)',
            height: '100%',
            zIndex: 99999,
        },
        loader: {},
    }),
)

type loadingProps = {
    isOpen: boolean
    children?: React.ReactNode
}
const Loading: FC<loadingProps> = (props) => {
    const classes = useStyles()

    return props.isOpen ? (
        <Grid container justify='center' alignContent='center' className={classes.root}>
            <img loading='lazy'
                src={process.env.NEXT_PUBLIC_WEB_URL + '/images/layout/Spinner-1.svg'}
                alt='Spinner'
                className={classes.loader}
            />
        </Grid>
    ) : null
}

export default Loading
