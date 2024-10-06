import moment from 'moment/moment'

export const currentDate = (timeFormat) => {
    return moment().format(timeFormat)
}