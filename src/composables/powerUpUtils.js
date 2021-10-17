import { date as qdate } from 'quasar'

export function formatYearMonthDay(timestamp) {
  if (timestamp === null) {
    return null
  }
  const theDate = qdate.extractDate(timestamp)
  return qdate.formatDate(theDate, 'YYYY-MMM-D')
}

export function formatDayMonthYear(timestamp) {
  if (timestamp === null) {
    return null
  }
  const theDate = qdate.extractDate(timestamp)
  return qdate.formatDate(theDate, 'D MMM YYYY')
}
