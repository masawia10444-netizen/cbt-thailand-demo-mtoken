import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { FieldProps } from 'formik'

type useDateRangePickerPropsType = {
    handleClear?: (params?: any) => void
    openForward?: boolean
    maxRange?: number | 'unlimited'
    autoOk?: boolean
    onClose?: () => void
    onChange?: (values?: any) => void
    disableFuture?: boolean
    format?: string
    placeholder?: string
    values?: Date[]
    labelFunc?: (date: Date[], invalidLabel: string) => string
    emptyLabel?: string
} & FieldProps
const useDateRangePicker = ({
    handleClear,
    openForward,
    maxRange,
    autoOk,
    onClose,
    onChange,
    placeholder,
    values,
    labelFunc,
    emptyLabel,
    ...props
}: useDateRangePickerPropsType) => {
    const [begin, setBegin] = useState<Date>(null)
    const [end, setEnd] = useState<Date>(null)
    const [prevBegin, setPrevBegin] = useState<Date>(undefined)
    const [prevEnd, setPrevEnd] = useState<Date>(undefined)
    const [hasClicked, setHasClicked] = useState(false)

    const [hover, setHover] = useState<Date>(undefined)
    const [accepted, setAccepted] = useState(false)

    const min = new Date(Math.min(Number(begin), Number(end || hover)))
    const max = new Date(Math.max(Number(begin), Number(end || hover)))

    const [open, setOpen] = useState(false)

    const isOpen = openForward !== undefined ? openForward : open

    const onClear = () => {
        handleClear && handleClear()
    }

    const checkIsFutureDate = (date) => {
        return date > new Date()
    }

    const checkIsPastDate = (date) => {
        return date < new Date()
    }

    const checkLimitDateRange = (date1: Date, date2: Date) => {
        var a = moment(date1)
        var b = moment(date2)

        var diffDays = Math.abs(b.diff(a, 'days')) + 1
        return diffDays <= Number(maxRange)
    }

    useEffect(() => {
        //Only way to get to this state is is openForward is used
        if (isOpen && accepted && !prevBegin && !prevEnd) {
            setAccepted(false)
            setPrevBegin(begin)
            setPrevEnd(end)
            return
        }
        //Closed without accepting, reset to prev state, don't find onChange
        if (!isOpen && !accepted) {
            setBegin(prevBegin)
            setEnd(prevEnd)
            setHover(undefined)
            setHasClicked(false)
        }
        //Auto ok and hasn't been accepted, but has all the items set, accept and close.
        //This will also triger the on change event by setting isOpen to false
        if (isOpen && autoOk && !accepted && begin && end && hasClicked) {
            setAccepted(true)
            onClose ? onClose() : setOpen(false)
        }
        if (accepted && begin && end && !isOpen && hasClicked) {
            setHasClicked(false)
            onChange && onChange({ begin, end })
            onClose ? onClose() : setOpen(false)

            if (props.form && props.form.setFieldValue) {
                props.form.setFieldValue(props.field.name, { startDate: begin, endDate: end })
            }
        }
    }, [begin, end, autoOk, accepted, isOpen, prevBegin, hasClicked, prevEnd])

    return {
        values,
        onChange,
        labelFunc,
        emptyLabel,
        autoOk,
        onClose,
        open: openForward,
        maxRange: 30,
        inputVariant: 'standard',
        iconColor: '#FF8E75',
        handleClear,
        placeholder,
        onClear,
        begin,
        isOpen,
        end,
        setOpen,
        hover,
        setPrevBegin,
        setPrevEnd,
        setAccepted,
        setHasClicked,
        checkLimitDateRange,
        setEnd,
        setBegin,
        setHover,
        checkIsFutureDate,
        checkIsPastDate,
        min,
        max,
        prevBegin,
        prevEnd,
    }
}
export default useDateRangePicker
