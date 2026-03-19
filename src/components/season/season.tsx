import React, { useEffect, useState } from 'react'
import * as apiSeason from './apiSeason'
import { Router, useRouter } from 'next/router'
import UseSeason, { UseSeasonPropTypes } from './useSeason'
// Formik
import { Field, Formik, Form } from 'formik'

//Material UI
// import makeStyles from '@material-ui/core/styles/makeStyles';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Pagination from '@material-ui/lab/Pagination'
import Hidden from '@material-ui/core/Hidden'
//icon
import DateIcon from '@material-ui/icons/DateRange'
import LeftIcon from '@material-ui/icons/ArrowBackIos'
import RightIcon from '@material-ui/icons/ArrowForward'
//control
// import Card from '../../controls/card/card'
import Card from '../../controls/card/cardCommunity'
import Dropdown from '../../controls/dropdown/dropdownAutocomplete'
import FormikTextField from '../../controls/textField/formikTextField'
import ButtonContained from '../../controls/button/button'

//constanst
import FontSize from '../../constants/fontSize'
import ColorWeb from '../../constants/colorWeb'
import { monthParams } from '../../constants/month'

import { useTranslation } from 'react-i18next'
//hooks
import usePagination from '../../hook/usePagination'
import SearchIcon from '@material-ui/icons/Search'

import Meta from '../../controls/meta/meta'
import NoImageView from '../../controls/noImageView'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'

//import photo
const img_cover = process.env.NEXT_PUBLIC_WEB_URL + '/images/season/img_cover.png'
const ic_detail_location = process.env.NEXT_PUBLIC_WEB_URL + '/images/icon/ic_detail_location.png'

const GlobalCss = withStyles({
    // @global is handled by jss-plugin-global.
    '@global': {
        // You should target [class*="MuiButton-root"] instead if you nest themes.
        '.MuiOutlinedInput-inputMarginDense': {
            paddingTop: '8px !important',
            paddingBottom: '8px !important',
        },
    },
})(() => null)

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            // height: '100%',
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
        margin: {
            margin: '12px',
            width: '200px',
            height: 'auto',
            backgroundColor: theme.colors.white,
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
                width: '200px',
            },
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
            fontSize: FontSize.minimum1,
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
        content: {
            width: '90%',
            height: '100%',
        },
        rootCard: {
            maxWidth: 345,
        },
        contentCard: {
            padding: '35px 0 30px 0',
            [theme.breakpoints.down('xs')]: {
                padding: '30px 0 30px 0',
            },
        },
        txtTitle: {
            color: theme.palette.primary.main,
            marginBottom: 25,
            [theme.breakpoints.down('xs')]: {
                marginBottom: 0,
            },
        },
        grid_seeAll: {
            marginBottom: 25,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            [theme.breakpoints.down('xs')]: {
                marginBottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
            },
        },

        seeAllIcon: {
            fontSize: '14px !important',
            marginLeft: 5,
        },
        btnSeeAll: {
            color: theme.palette.primary.main,
            fontSize: 14,
            width: 'auto',
            marginTop: '-20px',
            [theme.breakpoints.down('xs')]: {
                marginTop: 0,
            },
        },
        searchTitle: {
            marginLeft: '-30px',
            [theme.breakpoints.down('md')]: {
                marginLeft: 0,
            },
            [theme.breakpoints.down('xs')]: {
                marginLeft: 0,
                marginTop: 20,
                marginBottom: 20,
            },
        },
        detailLocation: {
            color: theme.colors.gray,
            height: '17px',
        },
        prov: {
            color: theme.colors.textBlack,
        },
        iconSearch: {
            color: theme.colors.gray,
            fontSize: 18,
        },
    }),
)

export type RenderCardContentProps = {
    dataItem: apiSeason.TResSearchCommu
}

const RenderCardContent: React.FC<RenderCardContentProps> = ({ dataItem }): any => {
    const { t, i18n } = useTranslation()
    const lang = i18n.language.toUpperCase()
    const classes = useStyles()

    return (
        <>
            {/* <Grid></Grid> */}
            <Typography
                gutterBottom
                variant='h3'
                color='primary'
                style={{
                    minHeight: 66,
                    lineHeight: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    marginBottom: 10,
                }}
            >
                {lang === 'TH' ? dataItem.titleTH : dataItem.titleEN}
            </Typography>
            <Grid container justify='center' alignItems='center'>
                <Grid item xs={1}>
                    <img
                        loading='lazy'
                        src={ic_detail_location}
                        alt='ic_detail_location'
                        className={classes.detailLocation}
                    />
                </Grid>
                <Grid item xs={11}>
                    <Typography variant='h5' color='textSecondary' className={classes.prov}>
                        {(lang === 'TH' && dataItem[`provName` + lang] !== 'กรุงเทพมหานคร'
                            ? t('SEASON.PROVINCE')
                            : '') + dataItem[`provName` + lang]}
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

type TRenderView = {
    communityBySeasonList: apiSeason.TResCommunityHighlight[][]
    handleClickCard: (id: number) => void
    classes: any
    fieldRef?: any
}

const RenderView = (props: TRenderView) => {
    const { communityBySeasonList, handleClickCard, classes, fieldRef } = props
    const { t } = useTranslation()
    const router = useRouter()
    const theme = useTheme()
    const isMobileView = useMediaQuery(theme.breakpoints.down('xs'))

    const monthTitles = [
        `${t('MONTH.JAN')} - ${t('MONTH.MAR')}`,
        `${t('MONTH.APR')} - ${t('MONTH.JUN')}`,
        `${t('MONTH.JUL')} - ${t('MONTH.SEP')}`,
        `${t('MONTH.OCT')} - ${t('MONTH.DEC')}`,
    ]

    const handleClickAll = (id: string) => {
        const link = process.env.NEXT_PUBLIC_LINK + '/community/travelPeriod/' + id
        if (process.browser) {
            window.open(link)
        } else {
            router.push(link)
        }
    }

    return (
        <>
            {communityBySeasonList?.map((communityItem, index) => {
                return (
                    <Grid container key={index} spacing={2} justify='center' alignItems='center'>
                        {/* ref={fieldRef[index]} */}
                        <Grid item sm={10} md={9} xs={12} className={classes.txtTitle}>
                            <Typography variant={isMobileView ? 'h2' : 'h1'}>{monthTitles[index]}</Typography>
                        </Grid>
                        <Grid item sm={2} md={3} xs={12} container justify='flex-end' className={classes.grid_seeAll}>
                            <ButtonContained
                                type='submit'
                                btnType={'transparent'}
                                label={t('SEASON.SEE_ALL')}
                                onClick={() => handleClickAll(monthParams[index].name)}
                                style={{ height: 40, width: 120, borderRadius: 0, padding: 0 }}
                                rightIcon={<RightIcon fontSize='default' />}
                            />
                        </Grid>

                        <Grid
                            container
                            spacing={2}
                            direction='row'
                            justify='flex-start'
                            alignItems='center'
                            style={{ marginBottom: 20 }}
                        >
                            {communityItem.map((item, index) => {
                                return (
                                    <Grid
                                        item
                                        lg={3}
                                        sm={6}
                                        xs={12}
                                        key={index}
                                        data-aos='zoom-in-up'
                                        data-aos-duration={(index + 1) * 300}
                                        data-aos-offset={50}
                                    >
                                        <Card dataItem={item} onClickCard={handleClickCard} style={{ height: 125 }}>
                                            <RenderCardContent dataItem={item} />
                                        </Card>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Grid>
                )
            })}
        </>
    )
}

type TRenderSearchView = {
    communityBySearchData: apiSeason.TResSearchCommu[]
    handleClickCard: (id: number) => void
    classes: any
    handleClickSetCommunityBySearchData: () => void
}

const RenderSearchView = (props: TRenderSearchView) => {
    const { communityBySearchData, handleClickCard, handleClickSetCommunityBySearchData, classes } = props
    const { dataPage, pageCount, currentPage, setDataSource, onChangePage } = usePagination({
        initDataSource: communityBySearchData,
        pageSize: 12,
    })
    const theme = useTheme()
    const { t } = useTranslation()
    const isMobileView = useMediaQuery(theme.breakpoints.down('xs'))

    useEffect(() => {
        setDataSource(communityBySearchData)
    }, [communityBySearchData])

    const onClickBack = () => {
        if (handleClickSetCommunityBySearchData) handleClickSetCommunityBySearchData()
    }

    return (
        <>
            <Grid item sm={1} xs={12} style={{ marginTop: isMobileView ? '-5px' : '0px' }}>
                <Hidden xsDown>
                    <Button
                        className={classes.btnSeeAll}
                        startIcon={<LeftIcon fontSize='large' />}
                        onClick={onClickBack}
                    />
                </Hidden>

                <Hidden smUp>
                    <Button
                        className={classes.btnSeeAll}
                        startIcon={<LeftIcon fontSize='large' />}
                        onClick={onClickBack}
                        style={{ marginLeft: 0 }}
                    >
                        <Typography variant='h2'>{t('SEASON.RESULT')}</Typography>
                    </Button>
                </Hidden>
            </Grid>
            <Hidden xsDown>
                <Grid item sm={11} xs={11} className={classes.txtTitle}>
                    <Typography variant='h1' className={classes.searchTitle}>
                        {t('SEASON.RESULT')}
                    </Typography>
                </Grid>
            </Hidden>

            {communityBySearchData?.length > 0 ? (
                <Grid
                    container
                    spacing={2}
                    direction='row'
                    justify='flex-start'
                    alignItems='center'
                    style={{ marginBottom: 20 }}
                >
                    {dataPage.map((item, index) => {
                        return (
                            <Grid
                                item
                                lg={3}
                                sm={6}
                                xs={12}
                                key={index}
                                data-aos='zoom-in-up'
                                data-aos-duration={(index + 1) * 300}
                                data-aos-offset={50}
                            >
                                <Card dataItem={item} onClickCard={handleClickCard} style={{ height: 125 }}>
                                    <RenderCardContent dataItem={item} />
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            ) : (
                <NoImageView />
            )}

            {communityBySearchData?.length === 0 ? null : (
                <Grid container justify='center' alignItems='center' style={{ margin: '70px 0px 40px 0px' }}>
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

type ReturnTypeUseSeason = ReturnType<typeof UseSeason>
type seasonViewProps = ReturnTypeUseSeason & {
    communityHighlight: apiSeason.TResCommunityHighlight[]
    lookupMonth: apiSeason.TResLookupMonth[]
    lookupProvince: apiSeason.TResLookupProvince[]
    lookupCommunity: apiSeason.TResLookupCommu[]
}
let SeasonView: React.FC<seasonViewProps> = ({
    fieldRef,
    handleSubmit,
    communityBySearchData,
    communityBySeasonList,
    handleClickSetCommunityBySearchData,
    lookupMonth,
    lookupProvince,
    lookupCommunity,
    isClickBack,
}) => {
    const classes = useStyles()
    const router = useRouter()
    const { t, i18n } = useTranslation()
    const lang = i18n.language.toUpperCase()

    const handleClickCard = (id: number) => {
        const link = process.env.NEXT_PUBLIC_LINK + '/community/content/' + id
        if (process.browser) {
            window.open(link)
        } else {
            router.push(link)
        }
    }

    return (
        <>
            <Meta
                data={{
                    title: t('SEASON.SEASON.TITLE'),
                    description: 'ท่องเที่ยวชุมชนตามฤดู',
                    image: img_cover,
                }}
            />
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <Grid container className={classes.imageHeader}>
                        <img
                            loading='lazy'
                            src={img_cover}
                            alt={t('SEASON.SEASON.TITLE')}
                            className={classes.responsive}
                        />

                        <Grid item sm={12} xs={11} className={classes.headerField} style={{ width: '100%' }}>
                            <Typography variant='h1' className={classes.txt_headerField}>
                                {t('SEASON.SEASON.TITLE')}
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
                                        // onSubmit={onSubmit}
                                        onSubmit={(values) => {
                                            if (handleSubmit) handleSubmit(values)
                                        }}
                                        initialValues={{
                                            month: null,
                                            province: null,
                                            community: null,
                                            keyword: '',
                                        }}
                                    >
                                        {(formikProps) => {
                                            const { values, setValues, resetForm } = formikProps
                                            const lutCommunity = React.useMemo(() => {
                                                if (values.province) {
                                                    return lookupCommunity.filter(
                                                        (lut: any) => lut.provCode === values.province,
                                                    )
                                                } else {
                                                    return lookupCommunity
                                                }
                                            }, [values.province, lookupCommunity])

                                            React.useEffect(() => {
                                                if (values.province && values.community) {
                                                    const communSelect = lookupCommunity.filter(
                                                        (lut) => lut.communID === values.community,
                                                    )

                                                    //@ts-ignore
                                                    if (communSelect && communSelect[0]?.provCode !== values.province) {
                                                        const payload = { ...values, community: null }
                                                        setValues(payload)
                                                    }
                                                }
                                            }, [values.province])

                                            React.useEffect(() => {
                                                isClickBack && resetForm()
                                            }, [isClickBack])

                                            return (
                                                <Form>
                                                    <Grid
                                                        container
                                                        spacing={2}
                                                        direction='row'
                                                        justify='center'
                                                        alignItems='center'
                                                    >
                                                        {/* เดือน */}
                                                        <Grid item md={2} sm={3} xs={12}>
                                                            <Field
                                                                name='month'
                                                                placeholder={t('SEASON.MONTH')}
                                                                component={Dropdown} //Selectbox
                                                                dataSource={lookupMonth}
                                                                // onChange={onChangeItem}
                                                                style={{ fontSize: 14 }}
                                                                icon={<DateIcon />}
                                                                displayField={{
                                                                    id: 'monthID',
                                                                    name: lang === 'TH' ? 'monthNameTH' : 'monthNameEN',
                                                                }}
                                                            />
                                                        </Grid>

                                                        {/* จังหวัด */}
                                                        <Grid item md={2} sm={3} xs={12}>
                                                            <Field
                                                                name='province'
                                                                placeholder={t('SEASON.PROVINCE')}
                                                                component={Dropdown} //Selectbox
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
                                                                name='community'
                                                                placeholder={t('SEASON.COMMUNITY')}
                                                                component={Dropdown} //Selectbox
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
                                                                placeholder={t('SEASON.KEYWORD')}
                                                                variant='outlined'
                                                                style={{ height: '35px', fontSize: 14 }}
                                                                rightIcon={
                                                                    <SearchIcon className={classes.iconSearch} />
                                                                }
                                                                clearable={true}
                                                            />
                                                        </Grid>

                                                        {/* search btn */}
                                                        <Grid item md={2} sm={3} xs={12} style={{ marginTop: '-1px' }}>
                                                            <ButtonContained
                                                                variant='contained'
                                                                className={classes.btnSearch}
                                                                // onClick={formikProps.handleSubmit}
                                                                type='submit'
                                                                btnType={'save'}
                                                                label={t('SEASON.SEARCH')}
                                                                style={{ height: '34px' }}
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

                <Grid item xs={12} container justify='center' alignContent='center'>
                    <Grid container className={classes.content} justify='center' alignContent='center'>
                        <Grid
                            item
                            container
                            direction='row'
                            justify='space-between'
                            alignItems='center'
                            className={classes.contentCard}
                        >
                            {communityBySearchData ? (
                                <RenderSearchView
                                    communityBySearchData={communityBySearchData}
                                    classes={classes}
                                    handleClickCard={handleClickCard}
                                    handleClickSetCommunityBySearchData={handleClickSetCommunityBySearchData}
                                />
                            ) : (
                                communityBySeasonList && (
                                    <RenderView
                                        communityBySeasonList={communityBySeasonList}
                                        classes={classes}
                                        handleClickCard={handleClickCard}
                                        fieldRef={fieldRef}
                                    />
                                )
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

type seasonProps = UseSeasonPropTypes &
    Omit<seasonViewProps, keyof ReturnTypeUseSeason> & {
        communityHighlight: apiSeason.TResCommunityHighlight[]
        lookupMonth: apiSeason.TResLookupMonth[]
        lookupProvince: apiSeason.TResLookupProvince[]
        lookupCommunity: apiSeason.TResLookupCommu[]
    }
let Season: React.FC<seasonProps> = ({ ...others }) => {
    const season = UseSeason({ communityHighlight: others.communityHighlight })

    return <SeasonView {...others} {...season} />
}

export default Season
