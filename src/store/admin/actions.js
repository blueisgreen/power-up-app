import { fetchUsers } from '../../api/PowerUpApi'

export async function refreshUsers({ commit }) {
  const results = await fetchUsers()
  console.log('users:', results)
  commit('loadUsers', { users: results })
}
