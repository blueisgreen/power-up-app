export function updateUser(state, { user }) {
  state.usersById[user.id] = user
}

export function removeArticle(state, { id }) {
  delete state.usersById[id]
  state.articleIds = state.userIds.filter((item) => item !== id)
}
