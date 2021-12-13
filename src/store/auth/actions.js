export function signInUser({ commit }, user) {
  console.log('signing in user', user)
  commit('setSignedIn', user)
}

export function signOutUser({ commit }) {
  console.log('signing out user')
  commit('setSignedOut')
}