import { defineStore } from 'pinia'

export const useStore = defineStore('user', {
  state: () => {
    return {
      signedIn: false,
      userId: null,
      alias: null,
      roles: [],
    }
  },
  getters: {
    isSignedIn: (state) => state.signedIn,
    isGuest: (state) =>
      state.roles.find((role) => role === 'member') !== undefined,
    isAuthor: (state) =>
      state.roles.find((role) => role === 'author') !== undefined,
    isAuthor: (state) =>
      state.roles.find((role) => role === 'editor') !== undefined,
    isAuthor: (state) =>
      state.roles.find((role) => role === 'editorInChief') !== undefined,
    isAuthor: (state) =>
      state.roles.find((role) => role === 'admin') !== undefined,
    hasRole: (state) => {
      return (permittedRoles) => {
        return permittedRoles.some((permittedRole) =>
          state.roles.includes(permittedRole)
        )
      }
    },
  },
  actions: {
    signInUser(user) {
      this.signedIn = true
      this.userId = user.who
      this.alias = user.alias
      this.roles = user.roles
    },
    signOutUser() {
      this.$reset() // TODO: make sure this works
      // this.signedIn = false
      // this.userId = null
      // this.alias = null
      // this.roles = user.roles
    },
  },
})
