import { api } from '../../boot/axios'

export async function recordAction(actionCode, details) {
  return await api.post('/actions', { actionCode, details })
}

export async function fetchActions(filter) {
  const queryStr = filter.buildQueryString()
  console.log('filter', filter)
  console.log('finding actions that match:', queryStr)
  const results = await api.get(`/actions?${queryStr}`)
  return results.data
}
