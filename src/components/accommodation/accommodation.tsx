import React, { useState, useEffect } from 'react'
import * as apiAccommodation from './apiAccommodation'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import UseAccommodation from './useAccommodation'

// Formik
import { Field, Formik, Form } from 'formik'

// Formik
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Pagination from '@material-ui/lab/Pagination'
import SearchIcon from '@material-ui/icons/Search'
import Button from '@material-ui/core/Button'
import LeftIcon from '@material-ui/icons/ArrowBackIos'

//controls
import Meta from '../../controls/meta/meta'
import Card from '../../controls/card/cardCommunity'
import ButtonContained from '../../controls/button/button'
import Dropdown from '../../controls/dropdown/dropdownAutocomplete'
import FormikTextField from '../../controls/textField/formikTextField'
import MainPageHeader from '../../controls/mainPageTitle/mainPageHeader'

//constant
import ColorWeb from '../../constants/colorWeb'
import FontSize from '../../constants/fontSize'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'

//img
const img_cover = process.env.NEXT_PUBLIC_WEB_URL + '/images/accommodation/Image_738.png'
const ic_detail_location = process.env.NEXT_PUBLIC_WEB_URL + '/images/icon/ic_detail_location.png'
const ic_detail_accom = process.env.NEXT_PUBLIC_WEB_URL + '/images/icon/ic_detail_accom.png'

//hooks
import usePagination from '../../hook/usePagination'
import NoImageView from '../../controls/noImageView'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            // backgroundColor: 'wheat'
        },
        imageHeader: {
            position: 'relative',
            // display: 'inline-block',
        },
        responsive: {
            width: '100%',
            // height: 'auto',
            height: '500px',
            maxHeight: '500px',
            opacity: 1,
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
            marginBottom: 20,
            // padding: '30px 0px 15px 0px',
        },
        btnBack: {
            color: theme.palette.primary.main,
            fontSize: 14,
            width: 'auto',
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
        iconSearch: {
            color: theme.colors.gray,
            fontSize: 18,
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
        imgDetailAccom: {
            color: theme.colors.gray,
            height: '17px',
        },
        imgDetailLocation: {
            color: theme.colors.gray,
            height: 'auto',
            width: '15px',
        },
        commuName: {
            color: theme.colors.textBlack,
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            justify: 'center',
            alignItems: 'center',
            // minHeight: 45,
        },
        typeName: {
            color: theme.colors.textBlack,
        },
    }),
)

export type RenderCardContentProps = {
    dataItem: apiAccommodation.TResAccomSearch
}

const RenderCardContent: React.FC<RenderCardContentProps> = ({ dataItem }) => {
    const { t, i18n } = useTranslation()
    const lang = i18n.language.toUpperCase() as 'TH' | 'EN'
    const classes = useStyles()

    let accomName = lang === 'TH' ? dataItem.titleTH : dataItem.titleEN
    let commuName = lang === 'TH' ? dataItem.communNameTH : dataItem.communNameEN
    let typeName = lang === 'TH' ? dataItem.typeNameTH : dataItem.typeNameEN

    return (
        <>
            <Typography
                gutterBottom
                variant='h3'
                color='primary'
                style={{
                    minHeight: 66,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    lineHeight: 1.5,
                    margin: 0,
                }}
            >
                {accomName}
            </Typography>
            <Grid
                container
                justify='flex-start'
                alignItems='center'
                style={{
                    minHeight: 45,
                    paddingBottom: '10px',
                }}
            >
                {/* <Grid container justify='flex-start' alignItems='center' style={{ backgroundColor: 'wheat' }}> */}
                <Grid item xs={1}>
                    <img
                        loading='lazy'
                        src={ic_detail_location}
                        alt='ic_detail_location'
                        className={classes.imgDetailLocation}
                    />
                </Grid>
                <Grid item xs={11}>
                    <Typography variant='h5' color='textSecondary' className={classes.commuName}>
                        {commuName || '-'}
                    </Typography>
                </Grid>
                {/* </Grid> */}
            </Grid>
            <Grid container justify='center' alignItems='center'>
                <Grid item xs={1}>
                    <img
                        loading='lazy'
                        src={ic_detail_accom}
                        alt='ic_detail_accom'
                        className={classes.imgDetailAccom}
                    />
                </Grid>
                <Grid item xs={11}>
                    <Typography variant='h5' color='textSecondary' className={classes.typeName}>
                        {typeName || '-'}
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

type RenderViewPropsType = {
    accommodationData: apiAccommodation.TResAccomSearch[]
    classes?: Record<
        | 'root'
        | 'content'
        | 'imageHeader'
        | 'responsive'
        | 'headerField'
        | 'contentCard'
        | 'txtTitle'
        | 'btnBack'
        | 'btnSearch'
        | 'iconSearch',
        string
    >
    handleClickCard?: (id: number) => void
}

const RenderView = (props: RenderViewPropsType) => {
    const { accommodationData, classes, handleClickCard } = props
    const { t } = useTranslation()

    let pageSize = 12
    const initData = accommodationData?.slice(0, pageSize)
    const [state, setState] = useState({
        datasource: initData,
        currentPage: 1,
        pageCount: 0,
    })

    useEffect(() => {
        genData()
        setState((prevState) => ({
            ...prevState,
            pageCount: Math.ceil(accommodationData?.length / pageSize),
        }))
    }, [state.currentPage])

    const genData = () => {
        const upperLimit = state.currentPage * pageSize
        const data = accommodationData.slice(upperLimit - pageSize, upperLimit)
        setState((prevState) => ({
            ...prevState,
            datasource: data,
        }))
    }
    const onChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
        setState((prevState) => ({
            ...prevState,
            currentPage: page,
        }))
    }

    return (
        <>
            <MainPageHeader title={t('ACCOMMODATION.ACCOMMODATION.TITLE')} arrangement={t('ACCOMMODATION.LATEST')} />

            <Grid container spacing={2} direction='row' justify='flex-start' alignItems='center'>
                {state.datasource.map((item, index) => {
                    item.menu = 'accommodation'
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
                                style={{ height: 170, padding: '16px' }}
                            >
                                <RenderCardContent dataItem={item} />
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>

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
        </>
    )
}

type RenderSearchViewPropsType = {
    accommodationBySearchData: apiAccommodation.TResAccomSearch[]
    handleClickCard: (id: number) => void
    handleClickSetAccommodationBySearchData: () => void
    classes?: Record<
        | 'root'
        | 'content'
        | 'imageHeader'
        | 'responsive'
        | 'headerField'
        | 'contentCard'
        | 'txtTitle'
        | 'btnBack'
        | 'btnSearch'
        | 'iconSearch'
        | 'searchTitle',
        string
    >
}
const RenderSearchView = (props: RenderSearchViewPropsType) => {
    const { accommodationBySearchData, classes, handleClickCard, handleClickSetAccommodationBySearchData } = props
    const { dataPage, pageCount, currentPage, setDataSource, onChangePage } = usePagination({
        initDataSource: accommodationBySearchData,
        pageSize: 12,
    })
    const { t } = useTranslation()
    const theme = useTheme()
    const isMobileView = useMediaQuery(theme.breakpoints.down('xs'))

    useEffect(() => {
        setDataSource(accommodationBySearchData)
    }, [accommodationBySearchData])

    const onClickBack = () => {
        if (handleClickSetAccommodationBySearchData) handleClickSetAccommodationBySearchData()
    }

    return (
        <>
            <Grid
                container
                direction='row'
                alignItems='center'
                style={isMobileView ? { marginBottom: '-15px' } : { marginTop: '5px' }}
            >
                <Grid item sm={1} xs={1} style={{ marginTop: isMobileView ? '-20px' : '-15px', marginLeft: '-25px' }}>
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
            {accommodationBySearchData?.length > 0 ? (
                <Grid container spacing={2} direction='row' justify='flex-start' alignItems='center'>
                    {dataPage.map((item, index) => {
                        item.menu = 'accommodation'
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
                                    style={{ height: 170, padding: '16px' }}
                                >
                                    <RenderCardContent dataItem={item} />
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            ) : (
                // <Grid container item xs={12} justify='center' alignItems='center'>
                //     <Typography variant='h4'>{t('SEASON.NO_DATA')}</Typography>
                // </Grid>
                <NoImageView />
            )}

            {accommodationBySearchData?.length === 0 ? null : (
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

type UseaccommodationProps = {}
type ReturnTypeUseaccommodation = ReturnType<typeof UseAccommodation>
type accommodationViewProps = ReturnTypeUseaccommodation & {
    accommodationData: apiAccommodation.TResAccomSearch[]
    lookupProvince: apiAccommodation.TResLookupProvince[]
    lookupCommunity: apiAccommodation.TResLookupCommu[]
}
let AccommodationView: React.FC<accommodationViewProps> = ({
    handleSubmit,
    accommodationData,
    lookupProvince,
    lookupCommunity,
    accommodationBySearchData,
    handleClickSetAccommodationBySearchData,
}) => {
    const classes = useStyles()
    const router = useRouter()
    const { t, i18n } = useTranslation()
    const lang = i18n.language.toUpperCase()

    const handleClickCard = (id: number) => {
        const link = process.env.NEXT_PUBLIC_LINK + '/accommodation/content/' + id
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
                    title: t('ACCOMMODATION.ACCOMMODATION.TITLE'),
                    description: t('ACCOMMODATION.ACCOMMODATION.TITLE'),
                    image: img_cover,
                }}
            />
            <Grid container className={classes.root} justify='flex-start' alignContent='flex-start'>
                <Grid item xs={12}>
                    <Grid container className={classes.imageHeader}>
                        <img
                            loading='lazy'
                            src={img_cover}
                            alt={t('ACCOMMODATION.ACCOMMODATION.TITLE')}
                            className={classes.responsive}
                        />

                        <Grid item sm={12} xs={11} className={classes.headerField} style={{ width: '100%' }}>
                            <Typography variant='h1' className={classes.txt_headerField}>
                                {t('ACCOMMODATION.ACCOMMODATION.TITLE')}
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
                                        onSubmit={handleSubmit}
                                        initialValues={{
                                            province: '',
                                            community: '',
                                            keyword: '',
                                        }}
                                    >
                                        {(formikProps) => {
                                            const { values, setValues } = formikProps
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

                                            return (
                                                <Form>
                                                    <Grid
                                                        container
                                                        spacing={2}
                                                        direction='row'
                                                        justify='center'
                                                        alignItems='center'
                                                    >
                                                        {/* จังหวัด */}
                                                        <Grid item sm={3} xs={12}>
                                                            <Field
                                                                name='province'
                                                                placeholder={t('ACCOMMODATION.PROVINCE')}
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
                                                        <Grid item sm={3} xs={12}>
                                                            <Field
                                                                name='community'
                                                                placeholder={t('ACCOMMODATION.COMMUNITY')}
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
                                                        <Grid item sm={3} xs={12} style={{ marginTop: '3px' }}>
                                                            <Field
                                                                id='keyword'
                                                                name='keyword'
                                                                component={FormikTextField}
                                                                // placeholder='Keyword'
                                                                placeholder={t('ACCOMMODATION.KEYWORD')}
                                                                variant='outlined'
                                                                style={{ height: '35px', fontSize: 14 }}
                                                                rightIcon={
                                                                    <SearchIcon className={classes.iconSearch} />
                                                                }
                                                                clearable={true}
                                                            />
                                                        </Grid>

                                                        {/* search btn */}
                                                        <Grid item sm={2} xs={12} style={{ marginTop: '-2px' }}>
                                                            <ButtonContained
                                                                variant='contained'
                                                                className={classes.btnSearch}
                                                                type='submit'
                                                                btnType={'save'}
                                                                label={t('ACCOMMODATION.SEARCH')}
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
                            {accommodationBySearchData ? (
                                <RenderSearchView
                                    accommodationBySearchData={accommodationBySearchData}
                                    classes={classes}
                                    handleClickCard={handleClickCard}
                                    handleClickSetAccommodationBySearchData={handleClickSetAccommodationBySearchData}
                                />
                            ) : (
                                accommodationData && (
                                    <RenderView
                                        accommodationData={accommodationData}
                                        classes={classes}
                                        handleClickCard={handleClickCard}
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

type accommodationProps = UseaccommodationProps &
    Omit<accommodationViewProps, keyof ReturnTypeUseaccommodation> & {
        accommodationData: apiAccommodation.TResAccomSearch[]
        lookupProvince: apiAccommodation.TResLookupProvince[]
        lookupCommunity: apiAccommodation.TResLookupCommu[]
    }
let Accommodation: React.FC<accommodationProps> = ({ ...others }) => {
    const accommodation = UseAccommodation()
    return <AccommodationView {...accommodation} {...others} />
}

export default Accommodation
