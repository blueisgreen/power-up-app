import { defineStore } from 'pinia'
import {
  fetchOwnProfile,
  updateOwnProfile,
  agreeToTerms,
  agreeToEmailComms,
  agreeToCookies,
} from '../api/PowerUpApi'

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: null,
    alias: null,
    roles: [],
    email: null,
    avatarUrl: null,
    createdAt: null,
    termsAcceptedAt: null,
    cookiesAcceptedAt: null,
    emailCommsAcceptedAt: null,
  }),
  getters: {
    isSignedIn() {
      return this.userId !== null
    },
    hasRole() {
      return (roleToCheck) => this.roles.includes(roleToCheck)
    },
    isMember() {
      return this.hasRole('member')
    },
    isEditor() {
      return this.hasRole('editor')
    },
    isEditorInChief() {
      return this.hasRole('editorInChief')
    },
    isAdmin() {
      return this.hasRole('admin')
    },
    areTermsOkay() {
      return this.termsAcceptedAt !== null
    },
    isEmailOkay() {
      return this.emailCommsAcceptedAt !== null
    },
    areCookiesOkay() {
      return this.cookiesAcceptedAt !== null
    },
  },
  actions: {
    signInUser(user) {
      this.userId = user.who
      this.alias = user.alias
      this.roles = user.roles
    },
    signOutUser() {
      this.$reset()
    },
    loadProfile(payload) {
      this.alias = payload.alias
      this.email = payload.email
      this.avatarUrl = payload.avatar_url
      this.createdAt = payload.created_at
      this.updatedAt = payload.updated_at
      this.termsAcceptedAt = payload.terms_accepted_at
      this.cookiesAcceptedAt = payload.cookies_accepted_at
      this.emailCommsAcceptedAt = payload.email_comms_accepted_at
      this.accountStatusId = payload.account_status_id
    },
    setAlias(alias) {
      this.alias = alias
    },
    setEmail(email) {
      this.email = email
    },
    setAvatarUrl(avatarUrl) {
      this.alias = avatarUrl
    },
    async fetchMyProfile() {
      const profile = await fetchOwnProfile()
      this.loadProfile(profile.data)
    },
    async updateMyProfile(profileUpdates) {
      const profile = await updateOwnProfile(profileUpdates)
      this.loadProfile(profile.data)
    },
    async updateAgreeToTerms() {
      const result = await agreeToTerms()
      console.log('result of agree to email comms', result)
    },
    async updateAgreeToEmail() {
      const result = await agreeToEmailComms()
      console.log('result of agree to email comms', result)
    },
    async updateAgreeToCookies() {
      const result = await agreeToCookies()
      console.log('result of agree to email comms', result)
    },
  },
})
