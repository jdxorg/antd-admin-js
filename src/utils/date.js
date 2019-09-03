import * as Moment from 'moment'

export const dateFormat = (dateTime, fmt = 'YYYY/MM/DD HH:mm:ss.SSS') => {
  dateTime = typeof dateTime === 'string' ? +dateTime : dateTime
  return dateTime ? Moment(new Date(dateTime)).format(fmt) : ''
}
