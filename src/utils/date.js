import * as Moment from 'moment';

export const dateFormat = (dateTime=Date.now(),fmt='YYYY/MM/DD HH:mm:ss.SSS')=> {
  return Moment(dateTime).format(fmt);
}