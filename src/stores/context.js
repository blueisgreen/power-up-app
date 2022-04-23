import { defineStore } from 'pinia'
import { fetchPublishedArticles, fetchArticle } from '../api/PowerUpApi'

export const useContextStore = defineStore('context', {
  state: () => ({
    messageToUser: 'Time to learn something...',
    recommendationsLoaded: false,
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
        if (this.recommendationsLoaded) {
          return
        }
        this.setUserMessage('Looking for something to read...')
        const articles = await fetchPublishedArticles()
        this.articleList = []
        articles.forEach((article) => {
          this.articleList.push(article.id)
          this.articlesById[article.id] = article
        })
        this.recommendationsLoaded = true
        this.setUserMessage('Loaded some recommendations.')
      } catch (error) {
        console.error(error)
        this.setUserMessage(
          'Unable to load articles. Could be something our end.'
        )
      }
    },
    async loadArticle(id) {
      try {
        if (!this.articlesById[id]) {
          this.setUserMessage('Just a moment while we grab that.')
          const article = await fetchArticle(id)
          this.articlesById[article.id] = article
          this.setUserMessage('There you go. Happy reading.')
        } else {
          this.setUserMessage('We already have that one.')
        }
      } catch (error) {
        console.error(error)
      }
    },
  },
})
