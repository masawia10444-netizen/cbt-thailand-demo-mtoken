import React, { useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import useSearchResult from '../home/hooks/useSearch'
import { observer } from 'mobx-react-lite'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Hidden from '@material-ui/core/Hidden'

import { Formik, FormikHelpers, FormikProps, Form, Field, FieldProps } from 'formik'
import Button from '../../controls/button/button'
import FormikCheckbox from '../../controls/checkbox/formikCheckbox'
import Dropdown from '../../controls/dropdown/dropdownAutocomplete'
import FormikTextField from '../../controls/textField/formikTextField'

import CardSearchResult from './cardSearchResult'
import NoImageView from '../../controls/noImageView'

type UseSearchResultProps = {}
type ReturnTypeUseSearchResult = ReturnType<typeof useSearchResult>

type SearchResultViewProps = ReturnTypeUseSearchResult & {}
let SearchResultView: React.FC<SearchResultViewProps> = observer(
    ({
        initialValues,
        handleSubmitSearch,
        handleMyLocation,
        dataTypeList,
        provinceList,
        communityList,
        searchResult,
        isEmpty,
        isChecked,
    }) => {
        const classes = useStyles()
        const { t, i18n } = useTranslation()
        return (
            <>
                <Grid className={classes.container} container justify='center' alignItems='flex-start'>
                    <Grid item xs={10} sm={8} md={8}>
                        <Formik initialValues={initialValues} onSubmit={handleSubmitSearch} enableReinitialize={true}>
                            {(formikProps) => {
                                const { values, setValues } = formikProps
                                const lutCommunity = React.useMemo(() => {
                                    if (values.provID) {
                                        return communityList.filter((lut: any) => lut.provCode === values.provID)
                                    } else {
                                        return communityList
                                    }
                                }, [values.provID, communityList])

                                React.useEffect(() => {
                                    if (values.provID && values.communID) {
                                        const communSelect = communityList.filter(
                                            (lut) => lut.communID === values.communID,
                                        )

                                        //@ts-ignore
                                        if (communSelect && communSelect[0]?.provCode !== values.provID) {
                                            const payload = { ...values, communID: null }
                                            setValues(payload)
                                        }
                                    }
                                }, [values.provID])

                                return (
                                    <Form>
                                        <Grid item container spacing={1} style={{ marginTop: 20 }}>
                                            <Grid item xs={12} md={3}>
                                                <Field
                                                    name='menuID'
                                                    component={Dropdown}
                                                    placeholder={t('HOME.SEARCH.DATA_TYPE')}
                                                    variant='outlined'
                                                    style={{ height: 35, fontSize: 14 }}
                                                    dataSource={dataTypeList}
                                                    displayField={{
                                                        id: 'menuID',
                                                        name: i18n.language === 'th' ? 'menuNameTH' : 'menuNameEN',
                                                    }}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={2}>
                                                <Field
                                                    name='provID'
                                                    component={Dropdown}
                                                    placeholder={t('HOME.SEARCH.PROVINCE')}
                                                    variant='outlined'
                                                    style={{ height: 35, fontSize: 14 }}
                                                    dataSource={provinceList}
                                                    displayField={{
                                                        id: 'provID',
                                                        name: i18n.language === 'th' ? 'provNameTH' : 'provNameEN',
                                                    }}
                                                    disabled={isChecked}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={3}>
                                                <Field
                                                    name='communID'
                                                    component={Dropdown}
                                                    placeholder={t('HOME.SEARCH.COMMUNITY')}
                                                    variant='outlined'
                                                    style={{ height: 35, fontSize: 14 }}
                                                    dataSource={lutCommunity}
                                                    displayField={{
                                                        id: 'communID',
                                                        name: i18n.language === 'th' ? 'communNameTH' : 'communNameEN',
                                                    }}
                                                    disabled={isChecked}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={3}>
                                                <Field
                                                    name='keyword'
                                                    component={FormikTextField}
                                                    placeholder={t('HOME.SEARCH.KEYWORD')}
                                                    type='text'
                                                    color='secondary'
                                                    variant='outlined'
                                                    style={{ height: 35, fontSize: 14 }}
                                                    clearable
                                                />
                                            </Grid>

                                            <Hidden mdUp>
                                                <Grid item xs={'auto'}>
                                                    <Field
                                                        name='chkRaidus'
                                                        component={FormikCheckbox}
                                                        label={
                                                            <Typography variant='h5' style={{ color: '#000000' }}>
                                                                {t('HOME.SEARCH.FIND_AROUND_ME')}
                                                            </Typography>
                                                        }
                                                        type='checkbox'
                                                        color='secondary'
                                                        noWrap
                                                        filledIcon
                                                        onCheckboxChange={handleMyLocation}
                                                    />
                                                </Grid>
                                            </Hidden>

                                            <Grid item xs={12} md={1}>
                                                <Button
                                                    label={t('HOME.SEARCH.BUTTON_LABEL')}
                                                    btnType='save'
                                                    type='submit'
                                                    style={{ height: 35 }}
                                                    fontSize={14}
                                                />
                                            </Grid>
                                            <Hidden smDown>
                                                <Grid item xs={'auto'}>
                                                    <Field
                                                        name='chkRaidus'
                                                        component={FormikCheckbox}
                                                        label={
                                                            <Typography variant='h5' style={{ color: '#000000' }}>
                                                                {t('HOME.SEARCH.FIND_AROUND_ME')}
                                                            </Typography>
                                                        }
                                                        type='checkbox'
                                                        color='secondary'
                                                        noWrap
                                                        filledIcon
                                                        onCheckboxChange={handleMyLocation}
                                                    />
                                                </Grid>
                                            </Hidden>
                                        </Grid>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </Grid>

                    <Grid item xs={11} md={10} container className={classes.containerResult}>
                        <Grid item xs={12}>
                            <Typography variant='h1' color='primary'>
                                {t('HOME.SEARCH.RESULT')}
                            </Typography>
                        </Grid>

                        {isEmpty && <NoImageView />}

                        {searchResult.reviewTravel?.length > 0 && (
                            <CardSearchResult
                                title={t('HOME.REVIEW_TRAVEL.TITLE')}
                                dataList={searchResult.reviewTravel}
                                defaultImg={process.env.NEXT_PUBLIC_WEB_URL + '/images/defaultImg/Community_small.png'}
                                contentPrefix={'/reviewTravel'}
                            />
                        )}

                        {searchResult.community?.length > 0 && (
                            <CardSearchResult
                                title={t('HOME.COMMUNITY.TITLE')}
                                dataList={searchResult.community}
                                defaultImg={process.env.NEXT_PUBLIC_WEB_URL + '/images/defaultImg/Community_small.png'}
                                contentPrefix={'/community'}
                            />
                        )}

                        {searchResult.attraction?.length > 0 && (
                            <CardSearchResult
                                title={t('HOME.ATTRACTION.TITLE')}
                                dataList={searchResult.attraction}
                                defaultImg={
                                    process.env.NEXT_PUBLIC_WEB_URL + '/images/defaultImg/Activity_activity.png'
                                }
                                contentPrefix={'/attraction'}
                            />
                        )}

                        {searchResult.trip?.length > 0 && (
                            <CardSearchResult
                                title={t('HOME.RECOMMENDED_ROUTE.TITLE')}
                                dataList={searchResult.trip}
                                defaultImg={process.env.NEXT_PUBLIC_WEB_URL + '/images/defaultImg/Route_small.png'}
                                contentPrefix={'/recommendedRoute'}
                            />
                        )}

                        {searchResult.festival?.length > 0 && (
                            <CardSearchResult
                                title={t('HOME.FESTIVAL_AND_TRADITIONAL.TITLE')}
                                dataList={searchResult.festival}
                                defaultImg={process.env.NEXT_PUBLIC_WEB_URL + '/images/defaultImg/Festival_small.png'}
                                contentPrefix={'/festival'}
                            />
                        )}

                        {searchResult.accommodation?.length > 0 && (
                            <CardSearchResult
                                title={t('HOME.ACCOMMODATION.TITLE')}
                                dataList={searchResult.accommodation}
                                defaultImg={
                                    process.env.NEXT_PUBLIC_WEB_URL + '/images/defaultImg/Accommodation_small.png'
                                }
                                contentPrefix={'/accommodation'}
                            />
                        )}
                    </Grid>
                </Grid>
            </>
        )
    },
)

type SearchResultProps = UseSearchResultProps & Omit<SearchResultViewProps, keyof ReturnTypeUseSearchResult>
let SearchResult: React.FC<SearchResultProps> = ({ ...others }) => {
    const searchResult = useSearchResult()
    return <SearchResultView {...searchResult} {...others} />
}

export default observer(SearchResult)

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: '100%',
            background: '#F6F6F6',
            paddingTop: 20,
            paddingBottom: 100,
            [theme.breakpoints.up('sm')]: {
                paddingTop: 80,
            },
            [theme.breakpoints.up('md')]: {
                paddingTop: 140,
            },
        },
        title: {
            marginBottom: 40,
        },
        textField: {
            marginBottom: 50,
            height: 48,
        },
        containerResult: {
            marginTop: 60,
            paddingBottom: 100,
        },
        paper: {
            background: '#FFFFFF',
            height: 155,
            border: 'none',
            marginTop: 10,
        },
        desc: {
            display: '-webkit-box',
            '-webkit-line-clamp': 2,
            '-webkit-box-orient': 'vertical',
            textOverflow: 'ellipsis',
            lineHeight: 1.75,
            overflow: 'hidden',
            height: 48,
            marginTop: 10,
        },
    }),
)
