import { date as qdate } from 'quasar'

export function formatYearMonthDay(timestamp) {
  if (timestamp === null) {
    return null
  }
  const agreementDate = qdate.extractDate(timestamp)
  return qdate.formatDate(agreementDate, 'YYYY-MMM-D')
}

export function formatDayMonthYear(timestamp) {
  if (timestamp === null) {
    return null
  }
  const agreementDate = qdate.extractDate(timestamp)
  return qdate.formatDate(agreementDate, 'D-MMM-YYYY')
}
