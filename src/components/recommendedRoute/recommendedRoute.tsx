import React, { useCallback, useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import UseRecommendedRoute, { UseRecommendedRouteTypes } from './useRecommendedRoute'
import usePagination from '../../hook/usePagination'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
// Formik
import { Field, Formik, Form } from 'formik'

//Material UI
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Pagination from '@material-ui/lab/Pagination'
import SearchIcon from '@material-ui/icons/Search'

//control
import Meta from '../../controls/meta/meta'
import Card from '../../controls/card/cardRoute'
import ButtonContained from '../../controls/button/button'
import Dropdown from '../../controls/dropdown/dropdownAutocomplete'
import FormikTextField from '../../controls/textField/formikTextField'

//constant
import MainPageHeaderMenuList from '../../controls/mainPageTitle/mainPageHeaderMenuList'
import Button from '@material-ui/core/Button'
import LeftIcon from '@material-ui/icons/ArrowBackIos'

import NoImageView from '../../controls/noImageView'

// //import photo
const img_cover = process.env.NEXT_PUBLIC_WEB_URL + '/images/route/Image_110.png'

const amountDay = [
    // { value: -1, name: null },
    { amountDayID: '1', amountDayNameTH: '1 วัน', amountDayNameEN: '1 Day' },
    { amountDayID: '2', amountDayNameTH: '2 วัน', amountDayNameEN: '2 Days' },
    { amountDayID: '3', amountDayNameTH: '3 วัน', amountDayNameEN: '3 Days' },
    { amountDayID: '4', amountDayNameTH: '4 วัน', amountDayNameEN: '4 Days' },
    { amountDayID: '5', amountDayNameTH: '5 วัน', amountDayNameEN: '5 Days' },
]

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            fontFamily: 'Prompt',
        },
        imageHeader: {
            position: 'relative',
            // display: 'inline-block',
        },
        responsive: {
            height: '500px',
            backgroundSize: 'cover',
            width: '100%',
            objectFit: 'cover',
        },
        headerField: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate( -50%, -50% )',
            textAlign: 'center',
            color: theme.colors.white,
        },
        txt_headerField: {
            fontFamily: 'Prompt-Regular',
            [theme.breakpoints.down('xs')]: {
                fontSize: 22,
            },
        },
        dropdownSearch: {
            margin: '12px',
            minWidth: '100px',
            maxWidth: '160px',
            backgroundColor: theme.colors.white,
        },
        rootTextfieldSearch: {
            ...theme.typography.h5,
            height: '35px',
            width: '150px',
            color: theme.colors.textBlack,
            backgroundColor: theme.colors.white,
            padding: 0,
            [theme.breakpoints.up('sm')]: {
                width: '150px',
            },
            [theme.breakpoints.up('lg')]: {
                width: '200px',
            },
        },
        inputSearch: {
            width: '150px',
            height: 'auto',
            margin: '12px',
            flex: 1,
            [theme.breakpoints.up('sm')]: {
                width: '150px',
            },
            [theme.breakpoints.up('lg')]: {
                width: '200px',
                marginLeft: '30px',
            },
        },
        btnSearch: {
            marginLeft: '12px',
            width: '150px',
            height: '35px',
            color: theme.colors.white,
            backgroundColor: '#80BD01',
            // fontSize: FontSize.minimum1,
            margin: 10,
            [theme.breakpoints.up('sm')]: {
                width: '200px',
            },
            [theme.breakpoints.up('md')]: {
                width: '160px',
                margin: 0,
            },
        },
        searchField: {
            marginTop: 10,
            [theme.breakpoints.up('md')]: {
                marginTop: 50,
            },
        },
        iconButton: {
            padding: 10,
        },
        containerContent: {
            margin: '30px 0px 30px 0px',
            width: '90%',
        },
        titleContent: {
            paddingLeft: 10,
            paddingRight: 10,
            // [theme.breakpoints.up('md')]: {
            //     margin: '0px 60px',
            // },
            // [theme.breakpoints.down('md')]: {
            //     margin: '0px 40px',
            // },
            // [theme.breakpoints.down('xs')]: {
            //     margin: '0px 25px',
            // },
        },
        txtTitle: {
            color: theme.palette.primary.main,
            // paddingLeft: 10,
            marginBottom: 25,
        },
        iconSearch: {
            color: theme.colors.gray,
            fontSize: 18,
        },
        btnBack: {
            color: theme.palette.primary.main,
            fontSize: 14,
            width: 'auto',
        },
        searchTitle: {
            marginLeft: '-30px',
            [theme.breakpoints.down('md')]: {
                marginLeft: 0,
            },
            [theme.breakpoints.down('xs')]: {
                marginLeft: 20,
            },
        },
    }),
)

export type RouteType = {
    ID: number
    titleTH: string
    titleEN: string
    image: string
    provNameTH: string
    provNameEN: string
    day: number
    updateDate: string
}

export type ProvinceType = {
    provID: string
    provNameTH: string
    provNameEN: string
}

export type CommunityType = {
    communID: string
    communCode: string
    communNameTH: string
    communNameEN: string
}

// type UserecommendedRouteProps = {}
type ReturnTypeUseRecommendedRoute = ReturnType<typeof UseRecommendedRoute>

type recommendedRouteViewProps = ReturnTypeUseRecommendedRoute & {
    routeData: RouteType[]
    lookupProvince: ProvinceType[]
    lookupCommunity: CommunityType[]
}

type RenderViewPropsType = {
    routeData: RouteType[]
    currentSortName: string
    handleClickCard: (id: number) => void
    handleClickSetRouteBySearchData: () => void
    sortByHighlight: () => void
    sortByUpdateDate: () => void
    setShowSearchResultPage: (boolean) => void
}
const RenderView = (props: RenderViewPropsType) => {
    const { routeData, currentSortName, handleClickCard, sortByHighlight, sortByUpdateDate } = props

    const { t } = useTranslation()
    const classes = useStyles()
    const theme = useTheme()
    const isMobileView = useMediaQuery(theme.breakpoints.down('xs'))

    let pageSize = 12
    const initData = routeData?.slice(0, pageSize)
    const [state, setState] = useState({
        datasource: initData,
        currentPage: 1,
        pageCount: 0,
    })

    useEffect(() => {
        genData()
        setState((prevState) => ({
            ...prevState,
            pageCount: Math.ceil(routeData?.length / pageSize),
        }))
    }, [state.currentPage, routeData])

    const genData = () => {
        const upperLimit = state.currentPage * pageSize
        const data = routeData.slice(upperLimit - pageSize, upperLimit)
        setState((prevState) => ({
            ...prevState,
            datasource: data,
        }))
    }
    const onChangePage = (event: any, page: number) => {
        setState((prevState) => ({
            ...prevState,
            currentPage: page,
        }))
    }

    return (
        <>
            <Grid item xs={11} container justify='space-between' alignItems='center' className={classes.titleContent}>
                <MainPageHeaderMenuList
                    title={t('ROUTE.ALL_RECOMMENDED_ROUTE')}
                    menuList={[
                        {
                            title: t('ROUTE.HIGHLIGHT'),
                            onClickItem: sortByHighlight,
                        },
                        {
                            title: t('ROUTE.LATEST'),
                            onClickItem: sortByUpdateDate,
                        },
                    ]}
                    currentMenuName={t(currentSortName)}
                />
            </Grid>
            <Grid
                item
                xs={11}
                style={{ margin: isMobileView ? '0px 0px 100px 0px' : '0px' }}
                container
                justify='flex-start'
                alignItems='center'
            >
                {state.datasource.map((item: any, index: number) => {
                    return (
                        <Grid
                            item
                            md={4}
                            sm={6}
                            xs={12}
                            style={{ padding: 10 }}
                            key={index}
                            data-aos='zoom-in-up'
                            data-aos-duration={(index + 1) * 150}
                            data-aos-offset={50}
                        >
                            <Card data={item} onClickCard={handleClickCard} />
                        </Grid>
                    )
                })}
                {routeData?.length > 0 && (
                    <Grid container justify='center' alignItems='center' style={{ margin: '70px 0px 40px 0px' }}>
                        <Pagination
                            count={state.pageCount}
                            page={state.currentPage}
                            onChange={onChangePage}
                            showFirstButton
                            showLastButton
                            size='small'
                        />
                    </Grid>
                )}
            </Grid>
        </>
    )
}

const RenderSearchView = (props: RenderViewPropsType) => {
    const {
        routeData,
        currentSortName,
        handleClickCard,
        handleClickSetRouteBySearchData,
        sortByHighlight,
        sortByUpdateDate,
        setShowSearchResultPage,
    } = props
    const {
        dataPage,
        pageCount,
        currentPage,

        setDataSource,
        onChangePage,
    } = usePagination({ initDataSource: routeData, pageSize: 12 })
    const { t } = useTranslation()
    const theme = useTheme()
    const classes = useStyles()
    const isMobileView = useMediaQuery(theme.breakpoints.down('xs'))

    useEffect(() => {
        setDataSource(routeData)
    }, [routeData])

    const onClickBack = useCallback(() => {
        if (handleClickSetRouteBySearchData) handleClickSetRouteBySearchData()
        setShowSearchResultPage(false)
    }, [])

    return (
        <>
            <Grid
                container
                direction='row'
                alignItems='center'
                style={isMobileView ? { marginBottom: '-30px' } : { marginTop: '5px' }}
            >
                <Grid
                    item
                    sm={1}
                    xs={1}
                    style={
                        isMobileView
                            ? { marginTop: '-25px', marginLeft: '-15px' }
                            : { marginTop: '-15px', marginLeft: '-25px' }
                    }
                >
                    <Button
                        className={classes?.btnBack}
                        endIcon={<LeftIcon fontSize='large' />}
                        onClick={onClickBack}
                    />
                </Grid>
                <Grid item sm={11} xs={11} className={classes?.txtTitle}>
                    <Typography variant={isMobileView ? 'h2' : 'h1'} className={classes?.searchTitle}>
                        {t('ATTRACTION.RESULT')}
                    </Typography>
                </Grid>
            </Grid>

            {/* </Grid> */}
            {routeData?.length > 0 ? (
                <Grid
                    // item
                    // xs={11}
                    // style={{ margin: isMobileView ? '0px 0px 100px 0px' : '30px 0px 100px 0px' }}
                    container
                    justify='flex-start'
                    alignItems='center'
                >
                    {dataPage.map((item: any, index: number) => {
                        return (
                            <Grid
                                item
                                md={4}
                                sm={6}
                                xs={12}
                                style={{ padding: 10 }}
                                key={index}
                                data-aos='zoom-in-up'
                                data-aos-duration={(index + 1) * 150}
                                data-aos-offset={50}
                            >
                                <Card data={item} onClickCard={handleClickCard} />
                            </Grid>
                        )
                    })}
                </Grid>
            ) : (
                <NoImageView />
            )}

            {routeData?.length === 0 ? null : (
                <Grid container justify='center' alignItems='center' style={{ margin: '70px 0px 60px 0px' }}>
                    <Pagination
                        count={pageCount}
                        page={currentPage}
                        onChange={onChangePage}
                        showFirstButton
                        showLastButton
                        size='small'
                    />
                </Grid>
            )}
        </>
    )
}
let RecommendedRouteView: React.FC<recommendedRouteViewProps> = ({
    handleSubmit,
    routeData,
    lookupProvince,
    lookupCommunity,
    routeBySearchData,
    currentSortName,
    isShowSearchResultPage,
    handleClickSetRouteBySearchData,
    handleSortByHighlight,
    handleSortByUpdateDate,
    setShowSearchResultPage,
}) => {
    const classes = useStyles()
    const router = useRouter()
    const { t, i18n } = useTranslation()
    const lang = i18n.language.toUpperCase()

    const handleClickCard = (id: number) => {
        const link = '/recommendedRoute/content/' + id
        router.push(link)
    }

    return (
        <>
            <Meta
                data={{
                    title: t('ROUTE.RECOMMENDED_ROUTE.TITLE'),
                    description: t('ROUTE.RECOMMENDED_ROUTE.TITLE'),
                    image: img_cover,
                }}
            />
            <Grid container className={classes.root} alignItems='center' justify='center'>
                <Grid item xs={12}>
                    <Grid container className={classes.imageHeader}>
                        <img
                            loading='lazy'
                            src={img_cover}
                            alt={t('ROUTE.RECOMMENDED_ROUTE.TITLE')}
                            className={classes.responsive}
                        />

                        <Grid item sm={12} xs={11} className={classes.headerField} style={{ width: '100%' }}>
                            <Typography variant='h1' className={classes.txt_headerField}>
                                {t('ROUTE.RECOMMENDED_ROUTE.TITLE')}
                            </Typography>

                            <Grid
                                container
                                direction='row'
                                justify='center'
                                alignItems='center'
                                style={{ marginTop: 40 }}
                            >
                                <Grid item lg={8} sm={11} xs={9}>
                                    <Formik
                                        onSubmit={(values: any) => {
                                            if (handleSubmit) handleSubmit(values)
                                        }}
                                        initialValues={{
                                            provID: null,
                                            communID: null,
                                            day: null,
                                            keyword: null,
                                        }}
                                    >
                                        {(formikProps) => {
                                            const { values, setValues, resetForm } = formikProps
                                            const lutCommunity = React.useMemo(() => {
                                                if (values.provID) {
                                                    return lookupCommunity.filter(
                                                        (lut: any) => lut.provCode === values.provID,
                                                    )
                                                } else {
                                                    return lookupCommunity
                                                }
                                            }, [values.provID, lookupCommunity])

                                            React.useEffect(() => {
                                                if (values.provID && values.communID) {
                                                    const communSelect = lookupCommunity.filter(
                                                        (lut) => lut.communID === values.communID,
                                                    )

                                                    //@ts-ignore
                                                    if (communSelect && communSelect[0]?.provCode !== values.provID) {
                                                        const payload = { ...values, communID: null }
                                                        setValues(payload)
                                                    }
                                                }
                                            }, [values.provID])

                                            useEffect(() => {
                                                !isShowSearchResultPage && resetForm()
                                            }, [isShowSearchResultPage])

                                            return (
                                                <Form>
                                                    <Grid
                                                        container
                                                        spacing={2}
                                                        direction='row'
                                                        justify='center'
                                                        alignItems='center'
                                                    >
                                                        {/* จำนวนวัน */}
                                                        <Grid item md={2} sm={3} xs={12}>
                                                            <Field
                                                                name='day'
                                                                placeholder={t(
                                                                    'ROUTE.RECOMMENDED_ROUTE.FORM.AMOUNT_DAY',
                                                                )}
                                                                component={Dropdown}
                                                                dataSource={amountDay}
                                                                style={{ fontSize: 14 }}
                                                                displayField={{
                                                                    id: 'amountDayID',
                                                                    name:
                                                                        lang === 'TH'
                                                                            ? 'amountDayNameTH'
                                                                            : 'amountDayNameEN',
                                                                }}
                                                            />
                                                        </Grid>

                                                        {/* จังหวัด */}
                                                        <Grid item md={2} sm={3} xs={12}>
                                                            <Field
                                                                name='provID'
                                                                placeholder={t('ROUTE.RECOMMENDED_ROUTE.FORM.PROVINCE')}
                                                                component={Dropdown}
                                                                dataSource={lookupProvince}
                                                                style={{ fontSize: 14 }}
                                                                displayField={{
                                                                    id: 'provID',
                                                                    name: lang === 'TH' ? 'provNameTH' : 'provNameEN',
                                                                }}
                                                            />
                                                        </Grid>

                                                        {/* ชุมชน */}
                                                        <Grid item md={3} sm={3} xs={12}>
                                                            <Field
                                                                name='communID'
                                                                placeholder={t(
                                                                    'ROUTE.RECOMMENDED_ROUTE.FORM.COMMUNITY',
                                                                )}
                                                                component={Dropdown}
                                                                dataSource={lutCommunity}
                                                                style={{ fontSize: 14 }}
                                                                displayField={{
                                                                    id: 'communID',
                                                                    name:
                                                                        lang === 'TH' ? 'communNameTH' : 'communNameEN',
                                                                }}
                                                            />
                                                        </Grid>

                                                        {/* Keyword */}
                                                        <Grid item md={3} sm={3} xs={12} style={{ marginTop: '3px' }}>
                                                            <Field
                                                                id='keyword'
                                                                name='keyword'
                                                                component={FormikTextField}
                                                                // placeholder='Keyword'
                                                                placeholder={t('ROUTE.RECOMMENDED_ROUTE.FORM.KEYWORD')}
                                                                variant='outlined'
                                                                style={{ height: '35px', fontSize: 14 }}
                                                                clearable={true}
                                                                rightIcon={
                                                                    <SearchIcon className={classes.iconSearch} />
                                                                }
                                                            />
                                                        </Grid>

                                                        {/* search btn */}
                                                        <Grid item md={2} sm={3} xs={12} style={{ marginTop: '-1px' }}>
                                                            <ButtonContained
                                                                variant='contained'
                                                                className={classes.btnSearch}
                                                                type='submit'
                                                                btnType={'save'}
                                                                label={t('ROUTE.RECOMMENDED_ROUTE.FORM.SEARCH')}
                                                                style={{ height: '35px' }}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Form>
                                            )
                                        }}
                                    </Formik>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                {/* content */}
                <Grid item xs={12} container justify='center' alignContent='center'>
                    <Grid
                        container
                        direction='row'
                        justify='center'
                        alignItems='center'
                        className={classes.containerContent}
                    >
                        {isShowSearchResultPage ? (
                            <RenderSearchView
                                routeData={routeBySearchData}
                                currentSortName={currentSortName}
                                handleClickCard={handleClickCard}
                                handleClickSetRouteBySearchData={handleClickSetRouteBySearchData}
                                sortByHighlight={handleSortByHighlight}
                                sortByUpdateDate={handleSortByUpdateDate}
                                setShowSearchResultPage={setShowSearchResultPage}
                            />
                        ) : (
                            <RenderView
                                routeData={routeData}
                                currentSortName={currentSortName}
                                handleClickCard={handleClickCard}
                                handleClickSetRouteBySearchData={handleClickSetRouteBySearchData}
                                sortByHighlight={handleSortByHighlight}
                                sortByUpdateDate={handleSortByUpdateDate}
                                setShowSearchResultPage={setShowSearchResultPage}
                            />
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

type recommendedRouteProps = UseRecommendedRouteTypes &
    Omit<recommendedRouteViewProps, keyof ReturnTypeUseRecommendedRoute> & {
        routeData: RouteType[]
        lookupProvince: ProvinceType[]
        lookupCommunity: CommunityType[]
    }
let RecommendedRoute: React.FC<recommendedRouteProps> = ({ ...others }) => {
    const recommendedRoute = UseRecommendedRoute({ routeData: others.routeData })
    return <RecommendedRouteView {...others} {...recommendedRoute} />
}

export default RecommendedRoute
