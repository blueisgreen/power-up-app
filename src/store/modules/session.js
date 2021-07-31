const state = {
  sessionToken: null,
  user: null,
  screenName: null,
  roles: [],
}

const getters = {
  isLoggedIn: (state) => {
    return state.sessionToken !== null
  },
  hasRole: (state) => (roleToMatch) => {
    return state.roles.find((role) => role === roleToMatch) !== undefined
  },
  isGuest: (state) => {
    return state.roles.find((role) => (role === 'guest')) !== undefined
  },
  isMember: (state) => {
    return state.roles.find((role) => (role === 'member')) !== undefined
  },
  isAuthor: (state) => {
    return state.roles.find((role) => (role === 'author')) !== undefined
  },
  isAdmin: (state) => {
    return state.roles.find((role) => (role === 'admin')) !== undefined
  },
}

const actions = {}

const mutations = {
  setSessionToken(state, payload) {
    state.sessionToken = payload.token
  },

  setUser(state, payload) {
    state.user = payload.user
  },

  setScreenName(state, payload) {
    state.screenName = payload.screenName
  },

  setRoles(state, payload) {
    state.roles = payload.roles
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
