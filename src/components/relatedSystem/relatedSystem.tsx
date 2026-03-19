import React from 'react'
import { useTranslation } from 'react-i18next'
import useLogin from '../user/login/useLogin'
import useSideBar from '../../layout/hooks/useSideBar'
import Router from 'next/router'

import { CSSProperties } from '@material-ui/core/styles/withStyles'
import { withStyles, makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Menu, { MenuProps } from '@material-ui/core/Menu'
import Button from '@material-ui/core/Button'

import pathRoutes from '../../configs/routes/pathRoutes'
import { Grid } from '@material-ui/core'


type RelatedSystemProps = {
    btnStyle?: CSSProperties
    customLabel?: JSX.Element
}

const StyledMenu = withStyles({
    paper: {
        marginTop: 5,
        background: 'rgba(22, 105, 54, 0.5)',
        backdropFilter: 'blur(30px)',
    },
})((props: MenuProps) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
))

const RelatedSystem: React.FC<RelatedSystemProps> = ({ btnStyle, customLabel }) => {
    const id = 'related-customized-menu'
    const { t } = useTranslation()
    const { toggleDrawer } = useSideBar()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    
    const handleClickLink = (link: string) => {
        if (process.browser) window.open(link)
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleClickMenu = () => {
        handleClose()
        Router?.push(pathRoutes.relatedSystem.view)
    }

    const classes = useStyles()

    return (
        <>
            {customLabel ? (
                <div
                    aria-describedby={id}
                    onClick={(e) => {
                        toggleDrawer(false)
                        handleClickMenu()
                    }}
                >
                    {customLabel}
                </div>
            ) : (
                <>
                    <Button
                        aria-describedby={id}
                        className={classes.btnOpenDialog}
                        style={btnStyle}
                        onClick={handleClick}
                    >
                        <Typography variant='body1'>{t('FOOTER.SYSTEM_REF_TEXT')}</Typography>
                    </Button>
                    <StyledMenu
                        id='customized-menu'
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        style={{ marginTop: 25 }}
                        PaperProps={{
                            style: {
                                borderRadius: 0,
                                padding: 6
                            },
                        }}
                        disableAutoFocusItem
                    >
                        <Grid container direction='column' alignItems='center'>
                            <Grid item>
                                <Button
                                    className={classes.yellowBtn}
                                    style={btnStyle}
                                    onClick={() => handleClickLink(process.env.NEXT_PUBLIC_WEB_SELF_URL)}
                                >
                                    <Typography variant='body1' className={classes.listItemText}>
                                        {t('FOOTER.SYSTEM_REF.COMMUNITY_WORK')}
                                    </Typography>
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    className={classes.yellowBtn}
                                    style={btnStyle}
                                    onClick={() => handleClickLink(process.env.NEXT_PUBLIC_WEB_CMS_URL)}
                                >
                                    <Typography variant='body1' className={classes.listItemText}>
                                        {t('FOOTER.SYSTEM_REF.REPORT_MANAGE')}
                                    </Typography>
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    className={classes.yellowBtn}
                                    style={btnStyle}
                                    onClick={() => handleClickLink(process.env.NEXT_PUBLIC_API_DEV_URL)}
                                >
                                    <Typography variant='body1' className={classes.listItemText}>
                                        {t('FOOTER.SYSTEM_REF.DEVELOPER_PUBLIC')}
                                    </Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    </StyledMenu>
                </>
            )}
        </>
    )
}

export default RelatedSystem

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        yellowBtn: {
            color: 'white',
            padding: '10px',
            cursor: 'pointer',
            margin: '6px',
            borderRadius: theme.spacing(1),
            width: '198px',
            '&:hover': {
                backgroundColor: theme.colors.yellow,
            },
        },
        btnOpenDialog: {
            color: 'white',
            padding: 0,
            '&:hover': {
                color: '#F5D01A',
            },
        },
        listItemText: {
            color: theme.colors.lightGray,
            paddingLeft: 20,
            paddingRight: 20,
        },
    }),
)
