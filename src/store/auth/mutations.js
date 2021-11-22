export function setSignedIn(state, { user }) {
  console.log('mutating signedIn and user properties', user)
  state.signedIn = true
  state.userId = user.who
  state.screenName = user.alias
  state.roles = user.roles
}

export function setSignedOut(state) {
  state.signedIn = false
  state.screenName = null
  state.userId = null
  state.roles = []
}
