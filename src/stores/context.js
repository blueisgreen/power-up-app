import { defineStore } from 'pinia'
import { fetchPublishedArticles, fetchArticle } from '../api/PowerUpApi'

export const useContextStore = defineStore('context', {
  state: () => ({
    messageToUser: 'Learn about the awesomeness of nuclear power.',
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
    sortArticles() {
      this.articleList.sort((a, b) => {
        return this.articlesById[a].createdAt < this.articlesById[b].createdAt
      })
    },
    addArticleToList(article) {
      this.articleList.push(article.id)
      this.articlesById[article.id] = article
    },
    removeArticleFromList(id) {
      delete this.articlesById[id]
      const ind = this.articleList.findIndex((item) => item.id === id)
      if (ind > -1) {
        this.articleList.splice(ind, 1)
      }
    },
    async loadSuggestedArticles() {
      try {
        if (this.recommendationsLoaded) {
          return
        }
        this.setUserMessage('Looking for something to read...')
        const articles = await fetchPublishedArticles()
        this.articleList = []
        articles.forEach((article) => this.addArticleToList(article))
        this.sortArticles()
        this.recommendationsLoaded = true
        this.setUserMessage('Here are some recommendations for you.')
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
          this.setUserMessage('Enjoy limitless power!')
        }
      } catch (error) {
        console.error(error)
      }
    },
  },
})
