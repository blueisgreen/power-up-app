import { api } from '../../boot/axios'

export async function recordAction(actionCode, details) {
  // TODO: buffer and send in bulk
  console.log('PowerUpAPI.recordAction')
  try {
    return await api.post('/actions', { actionCode, details })
  } catch (err) {
    console.error(err)
  }
}

export async function fetchActions(filter) {
  console.log('PowerUpAPI.fetchActions')
  try {
    const queryStr = filter.buildQueryString()
    // console.log('filter', filter)
    // console.log('finding actions that match:', queryStr)
    const results = await api.get(`/actions?${queryStr}`)
    return results.data
  } catch (err) {
    console.error(err)
  }
}
