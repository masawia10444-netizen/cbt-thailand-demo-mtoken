import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import * as apiAttraction from './apiAttraction'
// Formik
import { Field, Formik, Form } from 'formik'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

//constants
import FontSize from '../../constants/fontSize'

//controls
import Dropdown from '../../controls/dropdown/dropdownAutocomplete'
import FormikTextField from '../../controls/textField/formikTextField'
import ButtonContained from '../../controls/button/button'

import RenderSearchView from './renderSearchView'
import RenderView from './renderView'
//hooks
import Useactivity from './useActivity'
import SearchIcon from '@material-ui/icons/Search'

//import photo
const img_cover = process.env.NEXT_PUBLIC_WEB_URL + '/images/activity/7.3.png'

type UseactivityProps = {}
type ReturnTypeUseactivity = ReturnType<typeof Useactivity>

type activityViewProps = ReturnTypeUseactivity & {
    attractionData: apiAttraction.TResSearchAttraction[]
    lookupAttracType: apiAttraction.TResLookupAttraction[]
    lookupProvince: apiAttraction.TResLookupProvince[]
    lookupCommunity: apiAttraction.TResLookupCommu[]
}

let ActivityView: React.FC<activityViewProps> = observer(
    ({
        attractionData,
        attractionBySearchData,
        handleClickSetAttractionBySearchData,
        handleSubmit,
        lookupAttracType,
        lookupProvince,
        lookupCommunity,
        initSearchValues,
        submitFormOnMount,
        isSubmitOnMount,
        lutProvince,
        onChangeAttractionType,
    }) => {
        const classes = useStyles()
        const router = useRouter()
        const { t, i18n } = useTranslation()
        const lang = i18n.language.toUpperCase()

        const handleClickCard = (id: number) => {
            const link = '/attraction/content/' + id
            router.push(link)
        }

        type ValuesType = {
            attractionType: string
            province: string
            community: string
            keyword: string
        }
        const onSubmit = (values: ValuesType) => {
            handleSubmit && handleSubmit(values)
        }

        return (
            <Grid container className={classes.root} justify='flex-start' alignContent='flex-start'>
                <Grid item xs={12}>
                    <Grid container className={classes.imageHeader}>
                        <img
                            loading='lazy'
                            src={img_cover}
                            alt={t('ATTRACTION.ATTRACTION.HEADER')}
                            className={classes.responsive}
                        />

                        <Grid item sm={12} xs={11} className={classes.headerField} style={{ width: '100%' }}>
                            <Typography variant='h1' className={classes.txt_headerField}>
                                {t('ATTRACTION.ATTRACTION.HEADER')}
                            </Typography>

                            <Grid
                                container
                                direction='row'
                                justify='center'
                                alignItems='center'
                                style={{ marginTop: 40 }}
                            >
                                <Grid item lg={8} sm={11} xs={9}>
                                    <Formik onSubmit={onSubmit} initialValues={initSearchValues}>
                                        {(formikProps) => {
                                            const { values, setValues, submitForm } = formikProps

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
                                                        {/* กิจกรรมเชิงวัฒนธรรม */}
                                                        <Grid item md={2} sm={3} xs={12}>
                                                            <Field
                                                                name='attractionType'
                                                                placeholder={t('ATTRACTION.CULTURAL_ACTIVITY')}
                                                                component={Dropdown} //Selectbox
                                                                dataSource={lookupAttracType}
                                                                onChange={onChangeAttractionType}
                                                                style={{ fontSize: 14 }}
                                                                displayField={{
                                                                    id: 'attracTypeID',
                                                                    name:
                                                                        lang === 'TH' ? 'attracTypeTH' : 'attracTypeEN',
                                                                }}
                                                            />
                                                        </Grid>

                                                        {/* จังหวัด */}
                                                        <Grid item md={2} sm={3} xs={12}>
                                                            <Field
                                                                name='province'
                                                                placeholder={t('ATTRACTION.PROVINCE')}
                                                                component={Dropdown} //Selectbox
                                                                style={{ fontSize: 14 }}
                                                                dataSource={
                                                                    lutProvince.length ? lutProvince : lookupProvince
                                                                }
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
                                                                placeholder={t('ATTRACTION.COMMUNITY')}
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
                                                                name='keyword'
                                                                component={FormikTextField}
                                                                placeholder={t('ATTRACTION.KEYWORD')}
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
                            {attractionBySearchData ? (
                                <RenderSearchView
                                    attractionBySearchData={attractionBySearchData}
                                    classes={classes}
                                    handleClickCard={handleClickCard}
                                    handleClickSetAttractionBySearchData={handleClickSetAttractionBySearchData}
                                />
                            ) : (
                                attractionData && (
                                    <RenderView
                                        attractionData={attractionData}
                                        classes={classes}
                                        handleClickCard={handleClickCard}
                                    />
                                )
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    },
)

type activityProps = UseactivityProps &
    Omit<activityViewProps, keyof ReturnTypeUseactivity> & {
        attractionData: apiAttraction.TResSearchAttraction[]
        lookupAttracType: apiAttraction.TResLookupAttraction[]
        lookupProvince: apiAttraction.TResLookupProvince[]
        lookupCommunity: apiAttraction.TResLookupCommu[]
    }
let Activity: React.FC<activityProps> = ({ ...others }) => {
    const activity = Useactivity()
    return <ActivityView {...others} {...activity} />
}

export default observer(Activity)

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        iconSearch: {
            color: theme.colors.gray,
            fontSize: 18,
        },
        root: {
            width: '100%',
        },
        rootCard: {
            maxWidth: '100%',
        },
        media: {
            height: 140,
        },
        imageHeader: {
            position: 'relative',
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
        caption: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate( -50%, -50% )',
            textAlign: 'center',
            color: 'white',
            fontSize: '36px',
            fontWeight: 'bold',
        },
        content: {
            width: '90%',
            height: '100%',
        },
        contentCard: {
            padding: '30px 0 30px 0',
        },
        txtTitle: {
            marginBottom: 25,
            // marginTop: 40,
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
