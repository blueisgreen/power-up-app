export function loadUsers(state, { users }) {
  state.usersById = {}
  state.userIds.length = 0
  users.forEach((user) => {
    state.userIds.push(user.userKey)
    state.usersById[user.userKey] = user
  })
}

export function updateUser(state, { user }) {
  state.usersById[user.id] = user
}

export function addUserDetails(state, { userKey, roles }) {
  if (roles) {
    state.usersById[userKey].roles = roles
  }
}

export function removeUser(state, { userKey }) {
  delete state.usersById[userKey]
  state.userIds = state.userIds.filter((item) => item !== userKey)
}

export function loadRoleOptions(state, { roles }) {
  state.roleOptions = roles
}
