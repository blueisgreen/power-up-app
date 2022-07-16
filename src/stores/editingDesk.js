import { defineStore } from 'pinia'

export const useEditingDeskStore = defineStore('editingDesk', {
  state: () => ({
    articles: {},
    filteredArticles: [],
    articleContents: {},
    filters: {
      pending: false,
      author: null,
      limit: 0,
      offset: 0,
    },
  }),
  getters: {
    allArticles() {
      return []
    },
    articlesToReview() {
      return articles.values.sort(
        (a, b) => a.requestedToPublishAt < b.requestedToPublishAt
      )
    },
  },
  actions: {
    async loadArticlesForEditor() {
      // TODO: implement
    },
    async loadPendingArticles() {
      try {
        const pendingList = await fetchPendingArticles()
        pendingList.forEach((item) => (this.articles[item.id] = item))
        this.filters.pending = true
      } catch (err) {
        console.error(err)
      }
    },
    async loadArticleForReview(id) {
      // FIXME:
      try {
        const restOfArticle = await fetchArticlesForEditorReview()
        this.articles[id].content = restOfArticle.content
      } catch (err) {
        console.error(err)
      }
    },
  },
})
