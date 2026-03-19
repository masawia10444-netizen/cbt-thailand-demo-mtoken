import React from 'react'
import { observer } from 'mobx-react-lite'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'

import Router, { useRouter } from 'next/router'
import { allPageList } from '../../configs/menuConfig'
import { useTranslation } from 'react-i18next'
import { specialPath } from '../../configs/menuConfig'
import Store from '../../stores/rootStore'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        green: {
            height: 50,
            width: '100%',
            background: theme.colors.lightGreen,
            position: 'absolute',
            top: 60,
            zIndex: 3,
            padding: '15px 20px',
            display: 'none',
            paddingRight: 5,
            [theme.breakpoints.up('sm')]: {
                top: 70,
                padding: '20px 47px',
                height: 60,
                display: 'block',
                paddingRight: 5,
            },
            [theme.breakpoints.up('md')]: {
                top: 80,
                padding: '26px 87px',
                height: 70,
                display: 'block',
                paddingRight: 5,
            },
            [theme.breakpoints.up('lg')]: {
                top: 90,
                padding: '26px 115px',
                height: 70,
                display: 'block',
                paddingRight: 5,
            },
        },
        transparent: {
            height: 70,
            width: '100%',
            background: '',
            position: 'absolute',
            top: 60,
            zIndex: 3,
            padding: '15px 20px',
            paddingRight: 5,
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                top: 70,
                padding: '20px 47px',
                display: 'block',
                paddingRight: 5,
            },
            [theme.breakpoints.up('md')]: {
                top: 80,
                padding: '26px 87px',
                display: 'block',
                paddingRight: 5,
            },
            [theme.breakpoints.up('lg')]: {
                top: 90,
                padding: '26px 115px',
                display: 'block',
                paddingRight: 5,
            },
        },
    }),
)

const CustomSeparator = () => {
    const { LayoutStore } = Store()
    const classes = useStyles()
    const { t, i18n } = useTranslation()
    const router = useRouter()
    let language = i18n.language.toUpperCase()
    let arrPathname = router.pathname.split('/')
    let pathname = '/' + arrPathname[1]
    if (pathname === '/trip') pathname = '/' + arrPathname[1] + '/' + arrPathname[2]

    let color = specialPath.includes(pathname) ? '#009687' : '#FFFFFF'

    let ttt =
        router.pathname === '/community/travelPeriod/[id]' || router.pathname === '/community/content/[id]/attraction'

    if (ttt) color = '#009687'

    const hasContent = LayoutStore.currentContentName

    const genPageList = () => {
        const list = []

        allPageList.forEach((item) => {
            if (item.id !== 1 && item.path === pathname) {
                item.breadcrumbs.forEach((itm, index) => {
                    const isNotLast = item.breadcrumbs?.length !== index + 1 || hasContent

                    list.push(
                        <Link
                            key={index}
                            component='button'
                            style={{
                                color: color,
                                cursor: isNotLast ? 'pointer' : 'default',
                            }}
                            onClick={() => Router.push(isNotLast ? itm.path : '#')}
                        >
                            <Typography variant='h5'> {t(itm.name)}</Typography>
                        </Link>,
                    )
                })
            }
        })

        return list
    }

    if (pathname === '/') return null
    return (
        <div className={specialPath.includes(pathname) || ttt ? classes.green : classes.transparent}>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize='small' style={{ color: color }} />}
                aria-label='breadcrumb'
            >
                <Link style={{ color: color, cursor: 'pointer' }} component='button' onClick={() => Router.push('/')}>
                    <Typography variant='h5'> {allPageList[0].breadcrumbs[0][language]}</Typography>
                </Link>

                {genPageList()}

                {hasContent && (
                    <Link style={{ color: color, textDecoration: 'none' }}>
                        <Typography variant='h5' noWrap style={{ maxWidth: '45vw' }}>
                            {' ' + LayoutStore.currentContentName}
                        </Typography>
                    </Link>
                )}
            </Breadcrumbs>
        </div>
    )
}

export default observer(CustomSeparator)
