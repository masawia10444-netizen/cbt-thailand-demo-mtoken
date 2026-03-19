// import { MONTH_NUMBER } from '../constants/month'


export const findMonthRange = (monthID: string) => {

    let monthRange = 0

    switch (monthID) {
        case "JAN": monthRange = 1; break;
        case "FEB": monthRange = 1; break;
        case "MAR": monthRange = 1; break;
        case "APR": monthRange = 2; break;
        case "MAY": monthRange = 2; break;
        case "JUN": monthRange = 2; break;
        case "JUL": monthRange = 3; break;
        case "AUG": monthRange = 3; break;
        case "SEP": monthRange = 3; break;
        case "OCT": monthRange = 4; break;
        case "NOV": monthRange = 4; break;
        case "DEC": monthRange = 4; break;

        default:
            break;
    }

    return monthRange
}