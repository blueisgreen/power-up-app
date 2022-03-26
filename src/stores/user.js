import { defineStore } from 'pinia'
import { fetchOwnProfile, updateOwnProfile } from '../api/PowerUpApi/profile'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      signedIn: false,
      userId: '',
      alias: '',
      roles: [],
      profile: {
        accountId: '',
        createdAt: new Date(),
        termsAcceptedAt: new Date(),
        cookiesAcceptedAt: new Date(),
        emailCommsAcceptedAt: new Date(),
      },
    }
  },
  getters: {
    isSignedIn: (state) => state.signedIn,
    isGuest: (state) =>
      state.roles.find((role) => role === 'member') !== undefined,
    isAuthor: (state) =>
      state.roles.find((role) => role === 'author') !== undefined,
    isEditor: (state) =>
      state.roles.find((role) => role === 'editor') !== undefined,
    isEditorInChief: (state) =>
      state.roles.find((role) => role === 'editorInChief') !== undefined,
    isAdmin: (state) =>
      state.roles.find((role) => role === 'admin') !== undefined,
    areTermsOkay: (state) => !!state.profile.termsAcceptedAt,
    isEmailOkay: (state) => !!state.profile.emailCommsAcceptedAt,
    areCookiesOkay: (state) => !!state.profile.cookiesAcceptedAt,
  },
  actions: {
    signInUser(user) {
      console.log('user is', user)
      this.signedIn = true
      this.userId = user.who
      this.alias = user.alias
      this.roles = user.roles
    },
    signOutUser() {
      this.$reset()
    },
    loadProfile(payload) {
      this.profile = {
        accountId: payload.public_id,
        alias: payload.alias,
        email: payload.email,
        avatarUrl: payload.avatar_url,
        createdAt: payload.created_at,
        updatedAt: payload.updated_at,
        termsAcceptedAt: payload.terms_accepted_at,
        cookiesAcceptedAt: payload.cookies_accepted_at,
        emailCommsAcceptedAt: payload.email_comms_accepted_at,
        accountStatusId: payload.account_status_id,
      }
    },
    setAlias(alias) {
      this.profile.alias = alias
    },
    setEmail(email) {
      this.profile.email = email
    },
    setAlias(avatarUrl) {
      this.profile.alias = avatarUrl
    },
    async fetchMyProfile() {
      const profile = await fetchOwnProfile()
      this.loadProfile(profile.data)
    },
    async updateMyProfile(profileUpdates) {
      const profile = await updateOwnProfile(profileUpdates)
      this.loadProfile(profile.data)
    },
  },
})
