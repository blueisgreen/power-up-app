import { defineStore } from 'pinia'
import { fetchPublishedArticles, fetchArticle } from '../api/PowerUpApi'

export const useContextStore = defineStore('context', {
  state: () => ({
    messageToUser: 'Learn about the awesomeness of nuclear power.',
    articles: {},
  }),
  getters: {
    articleList: (state) => Object.values(state.articles),
    article: (state) => {
      return (key) => state.articles[key]
    },
    suggestedArticles: (state) => {
      return state.articleList.sort((a, b) => a.publishedAt > b.publishedAt)
    },
  },
  actions: {
    setUserMessage(msg) {
      this.messageToUser = msg
    },
    clearUserMessage() {
      this.messageToUser = ''
    },
    addToArticles(article) {
      const cachedArticle = this.articles[article.articleKey]
      if (cachedArticle) {
        Object.assign(cachedArticle, article)
      } else {
        this.articles[article.articleKey] = article
      }
    },
    clearArticles() {
      this.articles = {}
    },
    async loadSuggestedArticles() {
      try {
        this.setUserMessage('Looking for good things to read...')
        const published = await fetchPublishedArticles()
        this.clearArticles()
        published.forEach((article) => this.addToArticles(article))
        this.setUserMessage('Try one of these masterpieces.')
      } catch (error) {
        console.error(error)
        this.setUserMessage('Unable to load articles. Could be on our end.')
      }
    },
    async loadArticle(key) {
      try {
        this.setUserMessage('Just a moment while we grab that.')
        const article = await fetchArticle(key)
        this.addToArticles(article)
        this.setUserMessage('There you go. Happy reading.')
      } catch (error) {
        console.error(error)
      }
    },
  },
})
