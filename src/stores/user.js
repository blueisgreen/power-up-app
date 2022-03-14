import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      signedIn: false,
      userId: '',
      alias: '',
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
      console.log('user is', user)
      this.signedIn = true
      this.userId = user.who
      this.alias = user.alias
      this.roles = user.roles
    },
    signOutUser() {
      // this.$reset() // TODO: see if this works
      this.signedIn = false
      this.userId = ''
      this.alias = ''
      this.roles = []
    },
  },
})
