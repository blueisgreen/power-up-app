import { api } from '../../boot/axios'

export async function fetchActions() {
  return await api.get('/actions')
}

export async function createAction(actionCode, details) {
  return await api.post('/actions', { actionCode, details })
}
