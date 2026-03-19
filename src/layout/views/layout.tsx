import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Grid } from '@material-ui/core'
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import useLayout, { ReturnLayout, UseLayoutProps } from '../hooks/useLayout'
import { useRouter } from 'next/router'
import AppBarView from './appBar'
import PolicyDialog from '../../components/user/policyDialog/policyDialog'

//constants
import Footer from '../../components/footer/footer'
import SwipePage from './swipePage'
import useSideBar from '../hooks/useSideBar'
import Breadcrumb from './breadcrumb'

import { useConfirmationDialog } from '../../controls/dialog/confirmationDialog'
import InterestDialog from '../../components/user/profile/interestDialog'
import { useTranslation } from 'react-i18next'
import usePolicyDialog from '../../components/user/policyDialog/usePolicyDialog'

type LayoutViewProps = ReturnLayout
let LayoutView: React.FC<LayoutViewProps> = observer(
    ({
        userInfo,
        list,
        openInterestDialog,
        handleChangeLanguage,
        menuList,
        openPolicyDialog,
        handleSubmitDialogForm,
        ...props
    }) => {
        const classes = useStyles()
        const sideBar = useSideBar()
        const router = useRouter()
        const { t } = useTranslation()

        const { openDialogConfirmation, closeDialogConfirmation } = useConfirmationDialog()
        const {
            handleCheckPolicy,
            handleCheckPDPA_1,
            handleCheckPDPA_2,
            handleSubmitPolicyDialogForm,
            disabled,
        } = usePolicyDialog()

        const theme = useTheme()
        const isMobileSize = useMediaQuery(theme.breakpoints.down('sm'))
        const policyDialogViewProps = {
            handleCheckPolicy,
            handleCheckPDPA_1,
            handleCheckPDPA_2,
            handleSubmitDialogForm,
        }

        useEffect(() => {
            openInterestDialog
                ? openDialogConfirmation({
                      component: <InterestDialog />,
                      showButtonOk: false,
                      showButtonCancel: false,
                  })
                : closeDialogConfirmation()

            return () => {}
        }, [openInterestDialog])

        useEffect(() => {
            openPolicyDialog
                ? openDialogConfirmation({
                      component: <PolicyDialog {...policyDialogViewProps} />,
                      showButtonOk: true,
                      showButtonCancel: false,
                      customClassName: {
                          paper: classes.dialogPaper,
                      },
                      customStyleContent: {
                          margin: 0,
                      },
                      buttonOkProps: {
                          className: classes.okButton,
                          disabled: disabled,
                      },
                      actionCallbackOk: handleSubmitPolicyDialogForm,
                  })
                : closeDialogConfirmation()

            return () => {}
        }, [openPolicyDialog, disabled])

        return (
            <>
                <AppBarView
                    opacity={props.opacity}
                    handleClickMenu={props.handleClickMenu}
                    currentPath={props.currentPath}
                    userInfo={userInfo}
                    handleChangeLanguage={handleChangeLanguage}
                    menuList={menuList}
                    {...sideBar}
                />

                <Breadcrumb />

                <Grid container className={router.pathname === '/' ? classes.transparent : classes.root}>
                    <Grid item xs={12}>
                        {isMobileSize && (
                            <SwipePage
                                menuList={menuList}
                                currentPath={props.currentPath}
                                userInfo={userInfo}
                                handleChangeLanguage={handleChangeLanguage}
                                {...sideBar}
                            />
                        )}

                        {props.children}
                        <Footer />
                    </Grid>
                </Grid>
            </>
        )
    },
)

type LayoutProps = UseLayoutProps & Omit<LayoutViewProps, keyof ReturnLayout>
const Layout: React.FC<LayoutProps> = (children) => {
    const layout = useLayout({})
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <LayoutView {...layout} {...children} />
        </div>
    )
}
export default observer(Layout)
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            overflow: 'hidden',
            minWidth: 320,
        },
        transparent: {},
        root: {
            marginTop: 60,
            [theme.breakpoints.up('sm')]: {
                marginTop: 70,
            },
            [theme.breakpoints.up('md')]: {
                marginTop: 80,
            },
            [theme.breakpoints.up('lg')]: {
                marginTop: 90,
            },
        },
        dialogPaper: {
            borderRadius: 0,
            width: '90%',
            maxWidth: 'unset',
            [theme.breakpoints.up('md')]: {
                width: '60vw',
            },
        },
        okButton: {
            width: '90%',
            height: 34,
            marginBottom: 10,
            marginTop: 10,
            [theme.breakpoints.up('sm')]: {
                width: '55%',
            },
        },
    }),
)
