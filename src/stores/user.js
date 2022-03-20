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
    isEditor: (state) =>
      state.roles.find((role) => role === 'editor') !== undefined,
    isEditorInChief: (state) =>
      state.roles.find((role) => role === 'editorInChief') !== undefined,
    isAdmin: (state) =>
      state.roles.find((role) => role === 'admin') !== undefined,
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
  },
})
