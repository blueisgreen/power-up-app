import { fetchUserProfile } from '../../api/PowerUpService'

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
  public_id: null,
  screen_name: null,
  email: null,
  avatar_url: null,
  created_at: null,
  updated_at: null,
  terms_accepted_at: null,
  cookies_accepted_at: null,
  email_comms_accepted_at: null,
  account_status_id: null,
}

const getters = {
  isTermsAccepted: (state) => {
    return state.terms_accepted_at != null
  },
  isCookiesOk: (state) => {
    return state.cookies_accepted_at != null
  },
  isEmailCommsAccepted: (state) => {
    return state.email_comms_accepted_at != null
  },
}

const actions = {
  async fetchUserProfile({ commit }) {
    commit('load', await fetchUserProfile())
  },
}

const mutations = {
  load(state, payload) {
    state = payload
  },
  setScreenName(state, payload) {
    state.screen_name = payload.screenName
  },
  setEmail(state, payload) {
    state.email = payload.email
  },
  setAvatarUrl(state, payload) {
    state.avatar_url = payload.avatarUrl
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
