import { date as qdate } from 'quasar'

export function displayAsYearMonthDay(timestamp) {
  if (timestamp === null) {
    return null
  }
  const agreementDate = qdate.extractDate(timestamp)
  return qdate.formatDate(agreementDate, 'YYYY-MMM-D')
}
