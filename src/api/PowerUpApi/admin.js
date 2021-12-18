import { api } from '../../boot/axios'

export async function fetchUsers() {
  return await api.get('/admin/users')
}
