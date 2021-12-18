export const getUser = (state) => (articleId) => {
  return state.byId[articleId]
}

export function users(state) {
  return state.userIds.map((id) => state.usersById[id])
}
