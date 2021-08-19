export function setToken(state, payload) {
  state.token = payload.token
}

export function setUserId(state, payload) {
  state.userId = payload.userId
}

export function setScreenName(state, payload) {
  state.screenName = payload.screenName
}

export function setRoles(state, payload) {
  state.roles = payload.roles
}

export function signOut(state) {
  state.token = null
  state.screenName = null
  state.userId = null
  state.roles = []
}
