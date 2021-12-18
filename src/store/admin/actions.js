import { fetchUsers } from '../../api/PowerUpApi'

export async function refreshUsers({ commit }) {
  const results = await fetchUsers()
  commit('loadUsers', { users: results })
}
