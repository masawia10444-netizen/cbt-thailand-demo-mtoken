import moment from 'moment'
import groupBy from 'lodash/groupBy'

export const NAME_OF_MONTH_TH = [
    { id: 0, name: 'มกราคม', abbr: 'ม.ค.' },
    { id: 1, name: 'กุมภาพันธ์', abbr: 'ก.พ.' },
    { id: 2, name: 'มีนาคม', abbr: 'มี.ค.' },
    { id: 3, name: 'เมษายน', abbr: 'เม.ย.' },
    { id: 4, name: 'พฤษภาคม', abbr: 'พ.ค.' },
    { id: 5, name: 'มิถุนายน', abbr: 'มิ.ย.' },
    { id: 6, name: 'กรกฎาคม', abbr: 'ก.ค.' },
    { id: 7, name: 'สิงหาคม', abbr: 'ส.ค.' },
    { id: 8, name: 'กันยายน', abbr: 'ก.ย.' },
    { id: 9, name: 'ตุลาคม', abbr: 'ต.ค.' },
    { id: 10, name: 'พฤศจิกายน', abbr: 'พ.ย.' },
    { id: 11, name: 'ธันวาคม', abbr: 'ธ.ค.' },
]

export const NAME_OF_MONTH_EN = [
    { id: 0, name: 'January', abbr: 'Jan' },
    { id: 1, name: 'February', abbr: 'Feb' },
    { id: 2, name: 'March', abbr: 'Mar' },
    { id: 3, name: 'April', abbr: 'Apr' },
    { id: 4, name: 'May', abbr: 'May' },
    { id: 5, name: 'June', abbr: 'Jun' },
    { id: 6, name: 'July', abbr: 'Jul' },
    { id: 7, name: 'August', abbr: 'Aug' },
    { id: 8, name: 'September', abbr: 'Sep' },
    { id: 9, name: 'October', abbr: 'Oct' },
    { id: 10, name: 'November', abbr: 'Nov' },
    { id: 11, name: 'December', abbr: 'Dec' },
]

type TConvertToDisplayDateRangeProps = {
    startDate: string
    endDate: string
    lang: 'TH' | 'EN'
    format?: string
}

// ex
// 2020-04-05 - 2020-05-10 => 5 เม.ย. 2563 - 10 พ.ค. 2563
// 2020-04-05 - 2020-04-10 => 5 - 10 เม.ย. 2563
// 2020-04-05 - 2020-05-10 => 5 Apr 2020 - 10 May 2020
// 2020-04-05 - 2020-04-10 => 5 - 10 Apr 2020
export const convertToDisplayDateRange = ({
    startDate, // -- 2020-05-10
    endDate, // -- 2020-05-10
    lang = 'TH',
    format = 'D MMM YYYY',
}: TConvertToDisplayDateRangeProps) => {
    if (!startDate || !endDate) {
        return undefined
    }

    const isSameDay = moment(startDate).isSame(endDate, 'day') && moment(startDate).isSame(endDate, 'month') && moment(startDate).isSame(endDate, 'year')
    const isSameMountAndYear = moment(startDate).isSame(endDate, 'month') && moment(startDate).isSame(endDate, 'year')
    const startDateLocal = moment(startDate).locale(lang)
    const endDateLocal = moment(endDate).locale(lang)

    if (lang === 'TH') {
        startDateLocal.add(543, 'year')
        endDateLocal.add(543, 'year')
    }

    if (isSameMountAndYear && !isSameDay) {
        return `${startDateLocal.date()} - ${endDateLocal.format(format)}`
    }
    else if (isSameDay) {
        return `${endDateLocal.format(format)}`
    }
    else {
        return `${startDateLocal.format(format)} - ${endDateLocal.format(format)}`
    }

}

export const formatDateToString = (date) => {
    //  format datetime to string "YYYY-MM-DD"

    const year = date.getFullYear().toString()
    const month = (date.getMonth() + 1).toString()
    const day = date.getDate().toString()

    const strDate = `${year}-${addZeroBefore(month)}-${addZeroBefore(day)}`

    return strDate
}

export const addZeroBefore = (n) => {
    // ex. 1 => 01
    return (n < 10 ? '0' : '') + n
}

export const dateTimeTH = (delimiter = '', language = 'TH') => {
    // format datetime to thai datetime.
    // ex. if(delimiter === '|') => "2 พ.ค. 63 | 13:57:00"

    const formatLanguage = language === 'TH' ? 'th-TH' : 'en-EN'

    const options = { month: 'short', day: 'numeric' }
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    const hour = addZeroBefore(date.getHours())
    const minutes = addZeroBefore(date.getMinutes())
    const time = hour + ':' + minutes
    const strDate = new Date(Date.UTC(year, month, day, 3, 0, 0))

    return strDate.toLocaleDateString(formatLanguage, options) + ` ${delimiter} ` + time
}

//ex 2020-10-22
export const convertToDateService = (date?: Date) => {
    if (!date) {
        return
    }

    return moment(date).format('YYYY-MM-D')
}

//ex
// 2020-05-10 => 10 พ.ค. 2563
// 2020-05-10 => 10 May 2563
type TConvertToDisplayDateProps = {
    date?: string // -- 2020-05-10
    lang?: string
    format?: string
}
export const convertToDisplayDate = ({
    date, // -- 2020-05-10
    lang = 'TH',
    format = 'D MMM YYYY',
}: TConvertToDisplayDateProps = {}) => {
    if (!date) {
        return
    }
    const dateLocal = moment(date).locale(lang)
    if (lang === 'TH') {
        dateLocal.add(543, 'year')
    }

    return dateLocal.format(format)
}

export type TMonthProps = {
    monthNameTH: string
    monthNameEN: string
    order: number
}

//ex
// มกราคม กุมภาพันธ์, มีนาคม => มกราคม - มีนาคม
export const convertToDisplayMonth = (dataMonth: TMonthProps[] = [], lang: string) => {
    const groupMonth = []
    let tempMonth = []

    dataMonth.forEach((month, index) => {
        //กรณีตัวต่อไปลำดับไม่ได้ต่อกับตัวปัจจุบัน หรือตัวปัจจุบันเป็นตัวสุดท้าย
        if (!dataMonth[index + 1] || month.order + 1 !== dataMonth[index + 1].order) {
            tempMonth.push(month[`monthName${lang}`])
            groupMonth.push(tempMonth.join(' - '))
            tempMonth = []
            return
        }

        if (tempMonth?.length === 0) {
            tempMonth.push(month[`monthName${lang}`])
        }
    })

    return groupMonth.join(', ')
}

export type TDayProps = {
    dayNameTH: string //จันทร์
    dayNameEN: string //Monday
    startTime: string //07:00
    endTime: string //16:00
    order: number
}

//ex
// จันทร์ 07:00-16:00 อังคาร 07:00-16:00 พุธ 07:00-16:00 => จันทร์ - พุธ 07:00-16:00
export const convertToDisplayDay = (dataDay: TDayProps[] = [], lang: string) => {
    const groupDay = []
    let tempDay = []

    //กรณีทุกวัน
    if (dataDay?.length === 7) {
        const isSameStartTime = Object.keys(groupBy(dataDay, 'startTime'))?.length === 1
        const isSameEndTime = Object.keys(groupBy(dataDay, 'endTime'))?.length === 1

        if (isSameStartTime && isSameEndTime) {
            const wording = lang === 'TH' ? 'ทุกกวัน' : 'Every day'
            return `${wording} ${dataDay[0].startTime}-${dataDay[0].endTime}`
        }
    }

    dataDay.forEach((day, index) => {
        //กรณี ข้อมูลลำดับถัดไปไม่ต่อกับตัวปัจจุบัน, ข้อมูลตัวถัดไปเวลาไม่ตรงก้น, ข้อมูลเป็นตัวสุดท้าย
        const nextDay = dataDay[index + 1]
        const isSameTimeNextDay = nextDay && nextDay.startTime === day.startTime && nextDay.endTime === day.endTime
        if (!nextDay || day.order + 1 !== nextDay.order || !isSameTimeNextDay) {
            tempDay.push(day[`dayName${lang}`])
            const dayRange = `${tempDay.join(' - ')} ${day.startTime}-${day.endTime}`
            groupDay.push(dayRange)
            tempDay = []
            return
        }

        if (tempDay?.length === 0) {
            tempDay.push(day[`dayName${lang}`])
        }
    })

    return groupDay.join(', ')
}
