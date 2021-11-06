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
  return qdate.formatDate(theDate, 'D MMMM YYYY')
}

export function prettyTrunc(text, maxLength) {
  if (maxLength === 0 || text.length <= maxLength) {
    return text
  }
  return text.slice(0, maxLength) + '…'
}

export function formatDate(ts) {
  return qdate.formatDate(ts, 'D MMM YYYY')
}
