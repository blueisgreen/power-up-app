import { defineStore } from 'pinia'

export const useWorkbenchStore = defineStore('workbench', {
  state: () => ({
    draftArticle: '',
    draftLesson: '',
  }),
  getters: {},
  actions: {},
})
