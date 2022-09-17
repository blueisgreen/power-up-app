import { defineStore } from 'pinia'
import {
  fetchOwnProfile,
  updateOwnProfile,
  agreeToEmailComms,
  agreeToCookies,
  becomeMember,
  becomeAuthor,
} from '../api/PowerUpApi'

export const useUserStore = defineStore('user', {
  state: () => ({
    userKey: null,
    alias: null,
    accountStatus: null,
    roles: {},
    email: null,
    avatarUrl: null,
    createdAt: null,
    termsAcceptedAt: null,
    cookiesAcceptedAt: null,
    emailCommsAcceptedAt: null,
  }),
  getters: {
    isSignedIn() {
      return this.userKey !== null
    },
    hasRole: (state) => {
      return (roleToCheck) => !!state.roles[roleToCheck]
    },
    isAdmin() {
      return this.roles.admin
    },
    isAuthor() {
      return this.roles.author
    },
    isEditor() {
      return this.roles.editor
    },
    isMember() {
      return this.roles.member
    },
    isModerator() {
      return this.roles.moderator
    },
    isProducer() {
      return this.roles.producer
    },
    isSupport() {
      return this.roles.support
    },
    isTermsOkay() {
      return !!this.termsAcceptedAt
    },
    isEmailOkay() {
      return !!this.emailCommsAcceptedAt
    },
    isCookiesOkay() {
      return !!this.cookiesAcceptedAt
    },
  },
  actions: {
    signInUser(user) {
      console.log(user)
      this.userKey = user.userKey
      this.alias = user.alias
      user.roles.forEach((role) => (this.roles[role] = true))
    },
    signOutUser() {
      this.$reset()
    },
    loadContext(payload) {
      console.log(payload)
      this.userKey = payload.userKey
      this.alias = payload.alias
      this.accountStatus = payload.accountStatus
      this.roles = payload.hasRole
    },
    loadProfile(payload) {
      console.log(payload)
      this.userKey = payload.userKey
      this.alias = payload.alias
      this.email = payload.email
      this.avatarUrl = payload.avatarUrl
      this.accountStatus = payload.accountStatus
      this.createdAt = payload.createdAt
      this.updatedAt = payload.updatedAt
      this.termsAcceptedAt = payload.termsAcceptedAt
      this.cookiesAcceptedAt = payload.cookiesAcceptedAt
      this.emailCommsAcceptedAt = payload.emailCommsAcceptedAt
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
    async fetchMyContext() {
      const profile = await fetchOwnProfile()
      this.loadProfile(profile.data)
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
