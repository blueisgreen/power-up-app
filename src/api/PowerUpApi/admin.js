import { api } from '../../boot/axios'

export async function fetchUsers() {
  try {
    const results = await api.get('/admin/users')
    return results.data
  } catch (err) {
    console.error(err)
    return []
  }
}
