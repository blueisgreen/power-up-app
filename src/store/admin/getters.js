export const user = (state) => (userKey) => {
  return state.usersById[userKey]
}

export function users(state) {
  return state.userIds.map((userKey) => state.usersById[userKey])
}
