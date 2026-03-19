import React, { useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Formik, Form, Field, FieldProps } from 'formik'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import Fade from '@material-ui/core/Fade'
import Hidden from '@material-ui/core/Hidden'

import { useTranslation } from 'react-i18next'
// import useSearch from '../hooks/useSearch'
import Dropdown from '../../../controls/dropdown/dropdownAutocomplete'
import Button from '../../../controls/button/button'
import useOnClickOutside from '../hooks/useOnClickOutside'
import FormikCheckbox from '../../../controls/checkbox/formikCheckbox'
import { ReturnTypeUseSearchField } from './home'

const Search = process.env.NEXT_PUBLIC_WEB_URL + '/images/home/search.svg'

type SearchFieldViewProps = ReturnTypeUseSearchField & {}
let SearchFieldView: React.FC<SearchFieldViewProps> = observer(
    ({
        initialValues,
        focused,
        setFocused,
        provinceList,
        communityList,
        dataTypeList,
        handleSubmitSearch,
        handleMyLocation,
        handleClearSearchParams,
        isChecked,
    }) => {
        const classes = useStyles()
        const { t, i18n } = useTranslation()

        const ref = useRef()
        useOnClickOutside(ref, () => setFocused(false))

        const SearchControl = ({ form, field }: FieldProps) => {
            const [value, setValue] = useState(field.value)

            const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                form.setFieldValue(field.name, e.target.value)
                setValue(e.target.value)
            }

            const handleClear = () => {
                form.resetForm()
                setValue('')
                handleClearSearchParams()
            }
            const searhButton = () => {
                return (
                    <>
                        {focused ? (
                            <IconButton className={classes.btnClear} onClick={handleClear}>
                                <HighlightOffIcon fontSize='small' className={classes.iconClear} />
                            </IconButton>
                        ) : (
                            <IconButton
                                className={classes.btnSearch}
                                onClick={() => {
                                    setFocused(true)
                                }}
                            >
                                <img loading='lazy' src={Search} alt='Search' className={classes.iconSearch} />
                            </IconButton>
                        )}
                    </>
                )
            }

            return (
                <InputBase
                    endAdornment={searhButton()}
                    className={classes.search}
                    inputProps={{ input: classes.input }}
                    classes={{ input: classes.input }}
                    placeholder={t('HOME.SEARCH_PLACE_HOLDER')}
                    onChange={handleChange}
                    value={value}
                    autoFocus
                />
            )
        }

        return (
            <>
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
                                const communSelect = communityList.filter((lut) => lut.communID === values.communID)

                                //@ts-ignore
                                if (communSelect && communSelect[0]?.provCode !== values.provID) {
                                    const payload = { ...values, communID: null }
                                    setValues(payload)
                                }
                            }
                        }, [values.provID])

                        return (
                            <Form>
                                <div ref={ref}>
                                    <Grid item xs={12}>
                                        <Field name='keyword' component={SearchControl} />
                                    </Grid>

                                    <Fade in={focused}>
                                        <Grid item container spacing={2} style={{ marginTop: 20 }}>
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

                                            <Grid item xs={12} md={3}>
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

                                            <Hidden mdUp>
                                                <Grid item xs={12}>
                                                    <Field
                                                        name='chkRaidus'
                                                        component={FormikCheckbox}
                                                        label={
                                                            <Typography variant='h5' style={{ color: '#FFFFFF' }}>
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

                                            <Grid item xs={12} md={3}>
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
                                                            <Typography variant='h5' style={{ color: '#FFFFFF' }}>
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
                                    </Fade>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </>
        )
    },
)

type SearchFieldProps = {} & ReturnTypeUseSearchField
let SearchField: React.FC<SearchFieldProps> = ({ ...others }) => {
    return <SearchFieldView {...others} />
}

export default observer(SearchField)

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
        input: {
            paddingRight: 10,
            textOverflow: 'ellipsis',
            width: '100%',
            height: '100%',
            color: 'white',
            fontSize: 14,
            fontWeight: 'normal',
            '&::placeholder': {
                color: 'white',
                opacity: 1,
                fontSize: 14,
            },
        },
        search: {
            width: '100%',
            height: 40,
            backdropFilter: 'blur(30px)',
            borderRadius: 10,
            color: 'white',
            paddingLeft: 20,
            background: 'rgba(255,255,255,0.2)',
            [theme.breakpoints.up('sm')]: {
                height: 56,
            },
        },
        btnSearch: {
            height: '100%',
            width: 70,
            background: '#80BD01',
            borderRadius: '0px 10px 10px 0px',
            color: 'white',
            '&:hover': {
                background: '#80BD01',
            },
            [theme.breakpoints.up('sm')]: {
                width: 75,
            },
            [theme.breakpoints.up('md')]: {
                width: 80,
            },
            [theme.breakpoints.up('lg')]: {
                width: 85,
            },
        },
        btnClear: {
            height: '100%',
            width: 70,
            background: 'transparent',
            borderRadius: '0px 10px 10px 0px',
            color: 'white',
            '&:hover': {
                background: 'transparent',
            },
            [theme.breakpoints.up('sm')]: {
                width: 75,
            },
            [theme.breakpoints.up('md')]: {
                width: 80,
            },
            [theme.breakpoints.up('lg')]: {
                width: 85,
            },
        },
        iconSearch: {
            width: 18,
            height: 18,
            [theme.breakpoints.up('sm')]: {
                width: 22,
                height: 22,
            },
            [theme.breakpoints.up('md')]: {
                width: 25,
                height: 25,
            },
            [theme.breakpoints.up('lg')]: {
                width: 25,
                height: 25,
            },
        },
        iconClear: {
            width: 16,
            height: 16,
            [theme.breakpoints.up('sm')]: {
                width: 18,
                height: 18,
            },
            [theme.breakpoints.up('md')]: {
                width: 20,
                height: 20,
            },
            [theme.breakpoints.up('lg')]: {
                width: 20,
                height: 20,
            },
        },
    }),
)
