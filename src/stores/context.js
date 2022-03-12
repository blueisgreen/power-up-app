import { defineStore } from 'pinia'

export const useContextStore = defineStore('context', {
  state: () => ({
    messageToUser: 'At your service...',
  }),
  actions: {
    setUserMessage(msg) {
      this.messageToUser = msg
    },
    clearUserMessage() {
      this.messageToUser = ''
    },
  },
})
