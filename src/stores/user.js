import { defineStore } from 'pinia'
import {
  fetchOwnProfile,
  updateOwnProfile,
  agreeToEmailComms,
} from '../api/PowerUpApi'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      signedIn: false,
      userId: null,
      alias: null,
      roles: [],
      profile: {
        accountId: null,
        createdAt: null,
        termsAcceptedAt: null,
        cookiesAcceptedAt: null,
        emailCommsAcceptedAt: null,
      },
    }
  },
  getters: {
    isSignedIn: (state) => state.signedIn,
    isGuest: (state) => state.roles.some((role) => role === 'member'),
    isAuthor: (state) => state.roles.some((role) => role === 'author'),
    isEditor: (state) => state.roles.some((role) => role === 'editor'),
    isEditorInChief: (state) =>
      state.roles.some((role) => role === 'editorInChief'),
    isAdmin: (state) => state.roles.some((role) => role === 'admin'),
    areTermsOkay: (state) => !!state.profile.termsAcceptedAt,
    isEmailOkay: (state) => !!state.profile.emailCommsAcceptedAt,
    areCookiesOkay: (state) => !!state.profile.cookiesAcceptedAt,
    hasRole: (state) => {
      return (roleToCheck) => state.roles.includes(roleToCheck)
    },
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
    async agreeToEmail() {
      const result = await agreeToEmailComms()
      console.log('result of agree to email comms', result)
    },
  },
})
