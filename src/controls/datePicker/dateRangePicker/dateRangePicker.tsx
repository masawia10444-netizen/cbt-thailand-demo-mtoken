import React from 'react'
import { DatePicker, MuiPickersUtilsProvider, useUtils } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import clsx from 'clsx'
import { formatDateToString } from '../../../utilities/dateTimeUtils'
import enLocale from 'date-fns/locale/en-US'
import thLocale from 'date-fns/locale/th'
import DateRangeIcon from '@material-ui/icons/DateRange'
import { useTranslation } from 'react-i18next'
import { FieldProps } from 'formik'
import useDateRangePicker from './useDateRangePicker'
import { useStyles } from './style'

// const dateIcon = process.env.NEXT_PUBLIC_WEB_URL + '/images/icon/ic_detail_date.png'

type ReturnTypeUseDateRangePicker = ReturnType<typeof useDateRangePicker>
type DateRangePickerViewProps = ReturnTypeUseDateRangePicker &
    FieldProps & {
        onOpen?: (values?: any) => void
        handleChange?: (values?: any) => void
        isSelected?: boolean
        format?: string
        disableFuture?: boolean
        disablePast?: boolean
        language?: 'TH' | 'EN'
    }
const DateRangePicker: React.FC<DateRangePickerViewProps> = ({
    values,
    format = 'dd/MMM/yyyy',
    disableFuture = false,
    disablePast = false,
    emptyLabel,
    autoOk,
    open: openForward,
    isSelected,
    maxRange,
    inputVariant = 'standard',
    iconColor = '#FF8E75',
    placeholder,
    begin,
    isOpen,
    end,
    hover,
    onOpen,
    setPrevBegin,
    setPrevEnd,
    setAccepted,
    setOpen,
    onChange,
    labelFunc,
    onClose,
    handleClear,
    handleChange,
    onClear,
    setEnd,
    setBegin,
    setHasClicked,
    checkLimitDateRange,
    setHover,
    checkIsFutureDate,
    checkIsPastDate,
    min,
    max,
    prevBegin,
    prevEnd,
    language,
    ...props
}) => {
    const classes = useStyles()
    const localeMap = {
        EN: enLocale,
        TH: thLocale,
    }
    const utils = useUtils()

    function renderDay(day: Date, selectedDate, dayInCurrentMonth, dayComponent) {
        return React.cloneElement(dayComponent, {
            onClick: (e) => {
                setHasClicked(true)
                e.stopPropagation()

                if (!begin) setBegin(day)
                else if (!end) {
                    if (maxRange !== 30 || checkLimitDateRange(begin, day)) {
                        if (utils.isBeforeDay(day, begin)) {
                            setEnd(begin)
                            setBegin(day)
                        } else {
                            setEnd(day)
                        }
                        if (autoOk) {
                            setPrevBegin(undefined)
                            setPrevEnd(undefined)
                        }
                    }
                } else {
                    setBegin(day)
                    setEnd(undefined)
                }
            },
            onMouseEnter: () =>
                requestAnimationFrame(() => {
                    if (maxRange !== 30 || checkLimitDateRange(begin, day)) {
                        setHover(day)
                    }
                }),
            onFocus: () =>
                requestAnimationFrame(() => {
                    if (maxRange !== 30 || checkLimitDateRange(begin, day)) {
                        setHover(day)
                    }
                }),
            className: clsx(
                disablePast ? (!checkIsPastDate(day) ? classes.day : classes.dayDisabled) : classes.day,
                disableFuture ? (!checkIsFutureDate(day) ? classes.day : classes.dayDisabled) : classes.day,
                {
                    [classes.hidden]: dayComponent.props.hidden,
                    [classes.current]: dayComponent.props.current,
                    [classes.isDisabled]: dayComponent.props.disabled,
                    [classes.focusedRange]:
                        (utils.isAfterDay(day, min) && utils.isBeforeDay(day, max)) ||
                        (utils.isSameDay(day, min) && !utils.isSameDay(day, max)) ||
                        (utils.isSameDay(day, max) && !utils.isSameDay(day, min)),
                    [classes.focusedFirst]: utils.isSameDay(day, min) && !utils.isSameDay(day, max),
                    [classes.focusedLast]: utils.isSameDay(day, max) && !utils.isSameDay(day, min),
                    [classes.beginCap]: utils.isSameDay(day, min),
                    [classes.endCap]: utils.isSameDay(day, max),
                },
            ),
        })
    }

    const formatDate = (date: Date) => {
        let arrTmp = utils.format(date, format || utils.dateFormat)
        let tmp = arrTmp.split('/')
        return `${tmp[0]} ${tmp[1]} ${language === 'TH' ? parseInt(tmp[2]) + 543 : tmp[2]}`
    }

    const genLabelFunc = (date: Date, invalid) => {
        if (placeholder && !begin) return placeholder

        let tmpBegin: Date = null
        let tmpEnd: Date = null

        if (values?.[0] || begin) {
            tmpBegin = new Date(values?.[0] || begin)
        } else {
            tmpBegin = new Date(date)
        }

        if (values?.[1] || end) {
            tmpEnd = new Date(values?.[1] || end)
        } else {
            tmpEnd = new Date(date)
        }

        if (formatDateToString(tmpBegin) === formatDateToString(tmpEnd)) {
            return formatDate(tmpBegin)
        }

        let value = !isOpen
            ? labelFunc
                ? labelFunc([tmpBegin, tmpEnd], invalid)
                : date && tmpBegin && tmpEnd
                    ? `${formatDate(tmpBegin)} - ${formatDate(tmpEnd)}`
                    : emptyLabel || ''
            : prevBegin && prevEnd
                ? labelFunc
                    ? labelFunc([prevBegin, prevEnd], invalid)
                    : `${formatDate(prevBegin)} - ${formatDate(prevEnd)}`
                : emptyLabel || ''

        return value
    }

    return (
        <DatePicker
            {...props}
            color='secondary'
            clearable={handleClear ? true : false}
            clearLabel={<div onClick={onClear}> Clear </div>}
            value={begin}
            renderDay={renderDay}
            open={isOpen}
            onOpen={() => {
                setAccepted(false)
                setPrevBegin(begin)
                setPrevEnd(end)
                onOpen ? onOpen() : setOpen(true)
            }}
            onAccept={(date) => {
                if (!begin || !end) {
                    if (hover && utils.isBeforeDay(begin, hover)) {
                        setEnd(hover)
                    } else {
                        setEnd(begin)
                        setBegin(hover)
                    }
                }
                setPrevBegin(undefined)
                setPrevEnd(undefined)
                if (!autoOk && date) {
                    setAccepted(true)
                }
            }}
            onClose={() => {
                onClose ? onClose() : setOpen(false)
            }}
            onChange={(date: Date) => {
                handleChange && handleChange(date)
            }}
            labelFunc={(date, invalid) => genLabelFunc(date, invalid)}
            InputProps={{
                endAdornment: <DateRangeIcon color='secondary' fontSize='small' />,
                style: {
                    background: 'white',
                    cursor: 'pointer',
                    height: 35,
                    fontSize: 14,
                    color: '#909090'
                },
            }}
            inputVariant='outlined'
            disableFuture={disableFuture}
            disablePast={disablePast}
            inputProps={{
                style: {
                    borderRadius: 4,
                    height: 0,
                    cursor: 'pointer',
                },
            }}
            className={classes.root}
            placeholder={placeholder}
        // showTodayButton
        // DialogProps={{ className: classes.dateRangePickerDialog }}
        />
    )
}

const DateRangePickerComponent = (props) => {
    const localeMap = {
        EN: enLocale,
        TH: thLocale,
    }

    const { i18n } = useTranslation()
    const language = i18n.language.toUpperCase()

    const dateRangePicker = useDateRangePicker({ ...props })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[language]}>
            <DateRangePicker {...props} {...dateRangePicker} language={language} />
        </MuiPickersUtilsProvider>
    )
}

export default DateRangePickerComponent
