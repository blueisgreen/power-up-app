const state = {
  token: null,
  userId: null,
  screenName: null,
  roles: [],
}

const getters = {
  isSignedIn: (state) => {
    return state.token !== null
  },
  isGuest: (state) => {
    return state.roles.length === 0
  },
  isMember: (state) => {
    return state.roles.find((role) => role === 'member') !== undefined
  },
  isAuthor: (state) => {
    return state.roles.find((role) => role === 'author') !== undefined
  },
  isEditor: (state) => {
    return state.roles.find((role) => role === 'editor') !== undefined
  },
  isAdmin: (state) => {
    return state.roles.find((role) => role === 'admin') !== undefined
  },
}

const actions = {}

const mutations = {
  setToken(state, payload) {
    state.token = payload.token
  },

  setUserId(state, payload) {
    state.userId = payload.userId
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
