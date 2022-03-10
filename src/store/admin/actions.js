import {
  fetchUsers,
  fetchUserRoles,
  fetchRoles,
  addUserRole,
  removeUserRole,
  fetchActivity,
} from '../../api/PowerUpApi'

export async function refreshUsers({ commit }) {
  const results = await fetchUsers()
  console.log('users:', results)
  commit('loadUsers', { users: results })
}

export async function loadUserDetails({ commit, getters }, { userKey }) {
  const user = getters.user(userKey)
  if (!user) {
    console.log('user not cached', userKey)
  } else if (!user.roles) {
    const roles = await fetchUserRoles(userKey)
    console.log('got roles for user', userKey, roles)
    commit('addUserDetails', { userKey, roles })
  } else {
    console.log('user and roles already cached')
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

export async function assignUserRole({ commit }, { userKey, role }) {
  if (await addUserRole(userKey, role)) {
    commit('addUserRole', { userKey, role })
  }
}

export async function unassignUserRole({ commit }, { userKey, role }) {
  if (await removeUserRole(userKey, role)) {
    commit('removeUserRole', { userKey, role })
  }
}

export async function loadActivity({ commit }, { dateFilter }) {
  const activity = fetchActivity(dateFilter)
  commit('loadActivity', { activity })
}
