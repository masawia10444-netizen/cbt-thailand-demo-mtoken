
export const MONTH = {
    TH: {
        JAN: "มกราคม",
        FEB: "กุมภาพันธ์",
        MAR: "มีนาคม",
        APR: "เมษายน",
        MAY: "พฤษภาคม",
        JUN: "มิถุนายน",
        JUL: "กรกฏาคม",
        AUG: "สิงหาคม",
        SEP: "กันยายน",
        OCT: "ตุลาคม",
        NOV: "พฤษจิกายน",
        DEC: "ธันวาคม"
    },
    EN: {
        JAN: "January",
        FEB: "February",
        MAR: "March",
        APR: "April",
        MAY: "May",
        JUN: "June",
        JUL: "July",
        AUG: "August",
        SEP: "September",
        OCT: "October",
        NOV: "November",
        DEC: "December"
    }

}

// export const MONTH_RANGE_TEXT = [
//     `${t('JAN')} - ${t('MAR')}`,
//     `${t('APR')} - ${t('JUN')}`,
//     `${t('JUL')} - ${t('SEP')}`,
//     `${t('OCT')} - ${t('DEC')}`,
// ]

export enum MONTH_NUMBER {
    JAN = 1,
    FEB = 2,
    MAR = 3,
    APR = 4,
    MAY = 5,
    JUN = 6,
    JUL = 7,
    AUG = 8,
    SEP = 9,
    OCT = 10,
    NOV = 11,
    DEC = 12
}

export const monthPeriod = [
    { id: 1, name: 'JAN,MAR' },
    { id: 2, name: 'FEB,JUN' },
    { id: 3, name: 'JUL,SEP' },
    { id: 4, name: 'OCT,DEC' },
]

export const monthParams = [
    { id: 1, name: 'JAN,FEB,MAR' },
    { id: 2, name: 'APR,MAY,JUN' },
    { id: 3, name: 'JUL,AUG,SEP' },
    { id: 4, name: 'OCT,NOV,DEC' },
]