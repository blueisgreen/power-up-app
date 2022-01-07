import { fetchUsers, fetchRoles } from '../../api/PowerUpApi'

export async function refreshUsers({ commit }) {
  const results = await fetchUsers()
  console.log('users:', results)
  commit('loadUsers', { users: results })
}

export async function loadRoleOptions({ commit }) {
  const results = await fetchRoles()
  console.log('roles:', results)
  commit('loadRoles', { roles: results })
}
