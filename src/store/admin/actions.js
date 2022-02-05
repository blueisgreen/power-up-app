import { fetchUsers, fetchRoles } from '../../api/PowerUpApi'

export async function refreshUsers({ commit }) {
  const results = await fetchUsers()
  console.log('users:', results)
  commit('loadUsers', { users: results })
}

export async function loadUserDetails({ commit, getters }, { userKey }) {
  const user = getters.user(userKey)
  if (!user.roles) {
    const roles = await fetchUserRoles(userKey)
    commit('addUserDetails', { userKey, roles })
  }
}

export async function loadRoleOptions({ commit, getters }) {
  if (!getters.isRoleOptionsLoaded) {
    const results = await fetchRoles()
    commit('loadRoleOptions', { roles: results })
  } else {
    console.log('role options already loaded')
  }
}
