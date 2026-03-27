import React, { useEffect, useCallback } from 'react'
import Router, { useRouter } from 'next/router'
import UseFestival from './useFestival'
// Formik
import { Field, Formik, Form } from 'formik'

//Material UI
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Pagination from '@material-ui/lab/Pagination'
import LeftIcon from '@material-ui/icons/ArrowBackIos'
import SearchIcon from '@material-ui/icons/Search'

//controls
import Dropdown from '../../controls/dropdown/dropdownAutocomplete'
import FormikTextField from '../../controls/textField/formikTextField'
import ButtonContained from '../../controls/button/button'
import Card from '../../controls/card/cardCommunity'
import DateRangePicker from '../../controls/datePicker/dateRangePicker/dateRangePicker'

//constant
import FontSize from '../../constants/fontSize'
import * as apiFestival from './apiFestival'
import { convertToDisplayDate } from '../../utilities/dateTimeUtils'

import { useTranslation } from 'react-i18next'
import usePagination from '../../hook/usePagination'
import MainPageHeaderMenuList from '../../controls/mainPageTitle/mainPageHeaderMenuList'
import Meta from '../../controls/meta/meta'
import NoImageView from '../../controls/noImageView'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'

//import photo
const img_cover = process.env.NEXT_PUBLIC_WEB_URL + '/images/festival/banner_dark.png'
const ic_detail_location = process.env.NEXT_PUBLIC_WEB_URL + '/images/icon/ic_detail_location.png'
const ic_detail_date = process.env.NEXT_PUBLIC_WEB_URL + '/images/icon/ic_detail_date.png'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        iconSearch: {
            color: theme.colors.gray,
            fontSize: 18,
        },
        root: {
            width: '100%',
            fontFamily: 'Prompt',
        },
        imageHeader: {
            position: 'relative',
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
        iconButton: {
            padding: 10,
        },
        content: {
            width: '90%',
            height: '100%',
        },
        contentCard: {
            padding: '30px 0 30px 0',
        },
        txtTitle: {
            fontSize: theme.fontStyle.prompt.h1.fontSize,
            fontWeight: FontSize.weight.semiBold,
            color: theme.palette.primary.main,
            // marginBottom: 25,
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
        detailLocation: {
            color: theme.colors.gray,
            height: '15px',
        },
        commuName: {
            color: theme.colors.textBlack,
            fontWeight: 'bold',
            minHeight: 42,
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
        },
        prov: {
            color: theme.colors.textBlack,
        },
        detailDate: {
            color: theme.colors.gray,
            height: '17px',
        },
        updateDate: {
            color: theme.colors.textBlack,
        },
        searchResultTitle: {
            marginTop: 5,
            marginBottom: 25,
        },
    }),
)

type UsefestivelProps = {}
type ReturnTypeUsefestivel = ReturnType<typeof UseFestival>

type festivelViewProps = ReturnTypeUsefestivel & {
    festivalData: apiFestival.TResSearchFestival[]
    lookupProvince: apiFestival.TResLutProvince[]
    lookupCommunity: apiFestival.TResLutCommunity[]
}
export type RenderCardContentProps = {
    dataItem: apiFestival.TResSearchFestival
}

const RenderCardContent: React.FC<RenderCardContentProps> = ({ dataItem }) => {
    const { t, i18n } = useTranslation()
    const lang = i18n.language.toUpperCase()
    const classes = useStyles()

    return (
        <>
            <Grid container alignItems='center' justify='center'>
                <Grid item xs={12}>
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
                        }}
                    >
                        {
                            // @ts-ignore
                            dataItem[`title` + lang]
                        }
                    </Typography>
                </Grid>
            </Grid>

            <Grid container justify='center' alignItems='center'>
                <Grid item xs={12}>
                    <Typography variant='h5' className={classes.commuName}>
                        {
                            // @ts-ignore
                            dataItem[`communName` + lang]
                        }
                    </Typography>
                </Grid>

                <Grid container alignItems='center'>
                    <Grid item xs={1}>
                        <img
                            loading='lazy'
                            src={ic_detail_location}
                            alt='ic_detail_location'
                            className={classes.detailLocation}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='h5' color='textSecondary' className={classes.prov} noWrap>
                            {(lang === 'TH' && dataItem[`provName` + lang] !== 'กรุงเทพมหานคร'
                                ? t('SEASON.PROVINCE')
                                : '') + dataItem[`provName` + lang]}
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <img loading='lazy' src={ic_detail_date} alt='ic_detail_date' className={classes.detailDate} />
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant='h5' color='textSecondary' className={classes.updateDate}>
                            {dataItem && convertToDisplayDate({ date: dataItem?.startDate, lang: lang })}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

type TRenderViewProps = {
    festivalData: apiFestival.TResSearchFestival[]
    currentSortName: string
    classes: any
    handleClickCard: (id: number) => void
    sortByPublishDate: () => void
    sortByStartDate: () => void
}

const RenderView = (props: TRenderViewProps) => {
    const { festivalData, currentSortName, classes, handleClickCard, sortByPublishDate, sortByStartDate } = props
    const { t } = useTranslation()
    const { dataPage, pageCount, currentPage, setDataSource, onChangePage } = usePagination<
        apiFestival.TResSearchFestival[]
    >({
        initDataSource: festivalData,
        pageSize: 12,
    })

    useEffect(() => {
        setDataSource(festivalData)
    }, [festivalData[0]])

    return (
        <>
            <MainPageHeaderMenuList
                title={t('FESTIVAL.ALL_FESTIVAL')}
                menuList={[
                    {
                        title: t('FESTIVAL.PUBLISH_DATE'),
                        onClickItem: sortByPublishDate,
                    },
                    {
                        title: t('FESTIVAL.START_DATE'),
                        onClickItem: sortByStartDate,
                    },
                ]}
                currentMenuName={t(currentSortName)}
            />

            <Grid container spacing={2} direction='row' justify='flex-start' alignItems='center'>
                {dataPage.map((item, index) => {
                    item.menu = 'festival'
                    return (
                        <Grid
                            item
                            lg={3}
                            sm={6}
                            xs={12}
                            key={index}
                            data-aos='zoom-in-up'
                            data-aos-duration={(index + 1) * 150}
                            data-aos-offset={50}
                        >
                            <Card
                                dataItem={item}
                                onClickCard={handleClickCard}
                                style={{ height: 160, padding: '16px' }}
                            >
                                <RenderCardContent dataItem={item} />
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>

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
        </>
    )
}

type TRenderSearchViewProps = {
    festivalBySearchData: apiFestival.TResSearchFestival[]
    currentSortName: string
    classes: any
    handleClickCard: (id: number) => void
    handleClickSetFestivalBySearchData: () => void
    sortByPublishDate: () => void
    sortByStartDate: () => void
    setShowSearchResultPage?: any
}

const RenderSearchView = (props: TRenderSearchViewProps) => {
    const {
        festivalBySearchData,
        currentSortName,
        classes,
        handleClickCard,
        handleClickSetFestivalBySearchData,
        sortByPublishDate,
        sortByStartDate,
        setShowSearchResultPage,
    } = props
    const {
        dataPage,
        pageCount,
        currentPage,

        setDataSource,
        onChangePage,
    } = usePagination<apiFestival.TResSearchFestival[]>({ initDataSource: festivalBySearchData, pageSize: 12 })
    const { t } = useTranslation()
    const theme = useTheme()
    const isMobileView = useMediaQuery(theme.breakpoints.down('xs'))

    useEffect(() => {
        setDataSource(festivalBySearchData)
    }, [festivalBySearchData])

    const onClickBack = useCallback(() => {
        if (handleClickSetFestivalBySearchData) handleClickSetFestivalBySearchData()
        setShowSearchResultPage && setShowSearchResultPage(false)
    }, [])

    return (
        <>
            <Grid container direction='row' alignItems='center' className={classes.searchResultTitle}>
                <Grid item sm={1} xs={1} style={{ marginTop: isMobileView ? '0px' : '5px', marginLeft: '-25px' }}>
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
            {festivalBySearchData?.length > 0 ? (
                <Grid container spacing={2} direction='row' justify='flex-start' alignItems='center'>
                    {dataPage.map((item, index) => {
                        item.menu = 'festival'
                        return (
                            <Grid
                                item
                                lg={3}
                                sm={6}
                                xs={12}
                                key={index}
                                data-aos='zoom-in-up'
                                data-aos-duration={(index + 1) * 150}
                                data-aos-offset={50}
                            >
                                <Card
                                    dataItem={item}
                                    onClickCard={handleClickCard}
                                    style={{ height: 160, padding: '16px' }}
                                >
                                    <RenderCardContent dataItem={item} />
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            ) : (
                <NoImageView />
            )}

            {festivalBySearchData?.length === 0 ? null : (
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

let FestivalView: React.FC<festivelViewProps> = ({
    festivalData,
    festivalBySearchData,
    currentSortName,
    lookupProvince,
    lookupCommunity,
    handleClickSetFestivalBySearchData,
    handleSubmit,
    handleSortByPublishDate,
    handleSortByStartDate,
    setShowSearchResultPage,
    isShowSearchResultPage,
}) => {
    const classes = useStyles()
    const { t, i18n } = useTranslation()
    const lang = i18n.language.toUpperCase()
    const router = useRouter()

    const handleClickCard = useCallback((id: number) => {
        const link = '/festival/content/' + id
        router.push(link)
    }, [])

    return (
        <Grid container className={classes.root}>
            <Meta
                data={{
                    title: t('FESTIVAL.FESTIVALANDTRADITIONAL.TITLE'),
                    description: t('FESTIVAL.FESTIVALANDTRADITIONAL.TITLE'),
                    image: img_cover,
                }}
            />
            <Grid item xs={12}>
                <Grid container className={classes.imageHeader}>
                    <img
                        loading='lazy'
                        src={img_cover}
                        alt={t('FESTIVAL.FESTIVALANDTRADITIONAL.TITLE')}
                        className={classes.responsive}
                    />

                    <Grid item sm={12} xs={11} className={classes.headerField} style={{ width: '100%' }}>
                        <Typography variant='h1' className={classes.txt_headerField}>
                            {t('FESTIVAL.FESTIVALANDTRADITIONAL.TITLE')}
                        </Typography>

                        <Grid container direction='row' justify='center' alignItems='center' style={{ marginTop: 40 }}>
                            <Grid item lg={8} sm={11} xs={9}>
                                <Formik
                                    onSubmit={handleSubmit}
                                    initialValues={{
                                        dateRange: {
                                            startDate: null,
                                            endDate: null,
                                        },
                                        province: '',
                                        community: '',
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
                                                    alignItems='flex-start'
                                                    style={{ width: '100%' }}
                                                >
                                                    <Grid style={{ height: 50 }} item sm={3} xs={12}>
                                                        <Field
                                                            name='dateRange'
                                                            placeholder={t('FESTIVAL.DATE')}
                                                            component={DateRangePicker}
                                                            style={{ fontSize: 14 }}
                                                            maxRange={30}
                                                            disablePast
                                                        />
                                                    </Grid>

                                                    <Grid item md={2} sm={3} xs={12}>
                                                        <Field
                                                            name='province'
                                                            placeholder={t('FESTIVAL.PROVINCE')}
                                                            component={Dropdown}
                                                            dataSource={lookupProvince}
                                                            style={{ fontSize: 14 }}
                                                            displayField={{
                                                                id: 'provID',
                                                                name: lang === 'TH' ? 'provNameTH' : 'provNameEN',
                                                            }}
                                                        />
                                                    </Grid>

                                                    <Grid item md={2} sm={3} xs={12}>
                                                        <Field
                                                            name='community'
                                                            placeholder={t('FESTIVAL.COMMUNITY')}
                                                            component={Dropdown}
                                                            dataSource={lutCommunity}
                                                            style={{ fontSize: 14 }}
                                                            displayField={{
                                                                id: 'communID',
                                                                name: lang === 'TH' ? 'communNameTH' : 'communNameEN',
                                                            }}
                                                        />
                                                    </Grid>

                                                    <Grid item md={3} sm={3} xs={12}>
                                                        <Field
                                                            id='keyword'
                                                            name='keyword'
                                                            component={FormikTextField}
                                                            placeholder={t('FESTIVAL.KEYWORD')}
                                                            variant='outlined'
                                                            style={{ height: '35px', fontSize: 14 }}
                                                            clearable={true}
                                                            rightIcon={<SearchIcon className={classes.iconSearch} />}
                                                        />
                                                    </Grid>

                                                    <Grid item md={2} sm={3} xs={12}>
                                                        <ButtonContained
                                                            type='submit'
                                                            btnType={'save'}
                                                            label={t('ATTRACTION.SEARCH')}
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

            {/* ======================================= content =======================================*/}
            <Grid container item xs={12} justify='center' alignContent='center'>
                <Grid container className={classes.content} justify='center' alignContent='center'>
                    <Grid
                        container
                        item
                        direction='row'
                        justify='space-between'
                        alignItems='center'
                        className={classes.contentCard}
                    >
                        {isShowSearchResultPage ? (
                            <RenderSearchView
                                festivalBySearchData={festivalData}
                                currentSortName={currentSortName}
                                classes={classes}
                                handleClickCard={handleClickCard}
                                handleClickSetFestivalBySearchData={handleClickSetFestivalBySearchData}
                                sortByPublishDate={handleSortByPublishDate}
                                sortByStartDate={handleSortByStartDate}
                                setShowSearchResultPage={setShowSearchResultPage}
                            />
                        ) : (
                            festivalData?.length > 0 && (
                                <RenderView
                                    festivalData={festivalData}
                                    currentSortName={currentSortName}
                                    classes={classes}
                                    handleClickCard={handleClickCard}
                                    sortByPublishDate={handleSortByPublishDate}
                                    sortByStartDate={handleSortByStartDate}
                                />
                            )
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

type festivelProps = UsefestivelProps &
    Omit<festivelViewProps, keyof ReturnTypeUsefestivel> & {
        festivalData: apiFestival.TResSearchFestival[]
        lookupProvince: apiFestival.TResLutProvince[]
        lookupCommunity: apiFestival.TResLutCommunity[]
    }
let Festival: React.FC<festivelProps> = ({ ...others }) => {
    const festival = UseFestival({ festivalData: others.festivalData })
    return <FestivalView {...others} {...festival} />
}

export default Festival
