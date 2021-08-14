import { fetchUserProfile, updateUserProfile } from '../../api/PowerUpService'

/*
{
    "id": 1,
    "public_id": "1bc305c2-0a87-4786-9171-2145bb1dedfe",
    "screen_name": "Dave Mount",
    "email": null,
    "avatar_url": "https://avatars.githubusercontent.com/u/74470787?v=4",
    "session_token": null,
    "created_at": "2021-08-08T02:02:26.760Z",
    "updated_at": "2021-08-08T02:02:26.760Z",
    "terms_accepted_at": null,
    "cookies_accepted_at": null,
    "email_comms_accepted_at": null,
    "account_status_id": null
}
*/
const state = {
  accountId: null,
  screenName: null,
  email: null,
  avatarUrl: null,
  createdAt: null,
  updatedAt: null,
  termsAcceptedAt: null,
  cookiesAcceptedAt: null,
  emailCommsAcceptedAt: null,
  accountStatusId: null,
}

const getters = {
  isTermsAccepted: (state) => {
    return state.termsAcceptedAt != null
  },
  isCookiesOk: (state) => {
    return state.cookiesAcceptedAt != null
  },
  isEmailCommsAccepted: (state) => {
    return state.emailCommsAcceptedAt != null
  },
}

const actions = {
  async fetchMyProfile({ commit }) {
    const profile = await fetchOwnile()
    commit('load', profile.data)
  },
  async updateMyProfile({ commit, state }, profileUpdates) {
    const profile = await updateOwnProfile(profileUpdates)
    commit('load', profile.data)
  }
}

const mutations = {
  load(state, payload) {
    state.accountId = payload.public_id
    state.screenName = payload.screen_name
    state.email = payload.email
    state.avatarUrl = payload.avatar_url
    state.createdAt = payload.created_at
    state.updatedAt = payload.updated_at
    state.termsAcceptedAt = payload.terms_accepted_at
    state.cookiesAcceptedAt = payload.cookies_accepted_at
    state.emailCommsAcceptedAt = payload.email_comms_accepted_at
    state.accountStatusId = payload.account_status_id
  },
  setScreenName(state, payload) {
    state.screenName = payload.screenName
  },
  setEmail(state, payload) {
    state.email = payload.email
  },
  setAvatarUrl(state, payload) {
    state.avatarUrl = payload.avatarUrl
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
