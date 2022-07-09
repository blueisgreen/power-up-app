import { defineStore } from 'pinia'
import {
  fetchOwnProfile,
  updateOwnProfile,
  agreeToTerms,
  agreeToEmailComms,
  agreeToCookies,
  becomeMember,
  becomeAuthor,
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
    isAuthor() {
      return this.hasRole('author')
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
      return !!this.termsAcceptedAt
    },
    isEmailOkay() {
      return !!this.emailCommsAcceptedAt
    },
    areCookiesOkay() {
      return !!this.cookiesAcceptedAt
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
      this.avatarUrl = payload.avatarUrl
      this.createdAt = payload.createdAt
      this.updatedAt = payload.updatedAt
      this.termsAcceptedAt = payload.termsAcceptedAt
      this.cookiesAcceptedAt = payload.cookiesAcceptedAt
      this.emailCommsAcceptedAt = payload.emailCommsAcceptedAt
      this.accountStatusId = payload.accountStatusId
      if (payload.roles) {
        this.roles = payload.roles
      }
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
    async becomeMember(alias, okToTerms, okToCookies) {
      const profile = await becomeMember(alias, okToTerms, okToCookies)
      console.log('joined', profile.data)
      this.loadProfile(profile.data)
    },
    async askToBecomeAuthor() {
      const profile = await becomeAuthor()
      console.log('became writer', profile.data)
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
