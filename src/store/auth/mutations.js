export function setSignedIn(state, { user }) {
  console.log('mutating signedIn and user properties', user)
  state.signedIn = true
  state.userId = user.who
  state.alias = user.alias
  state.roles = user.roles
}

export function setSignedOut(state) {
  state.signedIn = false
  state.alias = null
  state.userId = null
  state.roles = []
}
