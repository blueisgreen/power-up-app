import { defineStore } from 'pinia'
import { fetchPublishedArticles } from '../api/PowerUpApi'

export const useContextStore = defineStore('context', {
  state: () => ({
    messageToUser: 'At your service...',
    articlesById: {},
    articleList: [],
  }),
  getters: {
    article: (state) => {
      return (id) => state.articlesById[id]
    },
    suggestedArticles: (state) => {
      return state.articleList.map((id) => state.article(id))
    },
  },
  actions: {
    setUserMessage(msg) {
      this.messageToUser = msg
    },
    clearUserMessage() {
      this.messageToUser = ''
    },
    async loadSuggestedArticles() {
      try {
        this.messageToUser = 'Looking for something to read...'
        const articles = await fetchPublishedArticles()
        this.articleList = []
        articles.forEach((article) => {
          this.articleList.push(article.id)
          this.articlesById[article.id] = article
        })
        this.messageToUser = 'Loaded some recommendations.'
      } catch (error) {
        console.error(error)
        this.messageToUser =
          'Unable to load articles. Could be something our end.'
      }
    },
  },
})
