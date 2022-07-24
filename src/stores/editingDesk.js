import { defineStore } from 'pinia'
import {
  queryFilterBuilder,
  fetchArticlesForEditorReview,
  fetchArticleContent,
  publishArticle,
  denyToPublishArticle,
} from 'src/api/PowerUpApi'

export const useEditingDeskStore = defineStore('editingDesk', {
  state: () => ({
    articles: {},
    filteredArticles: [],
    filterAuthor: null,
    filterStatus: null,
    statusFilterOptions: ['pending', 'published', 'archived'],
    filterLimit: 10,
    filterOffset: 0,
    filterBuilder: queryFilterBuilder(),
  }),
  getters: {
    articleList: (state) => Object.values(state.articles),
    articlesToReview: (state) => {
      state.articleList.sort((a, b) => {
        if (state.filterStatus === 'pending') {
          a.requestedToPublishAt < b.requestedToPublishAt
        } else {
          a.createdAt > b.createdAt
        }
      })
    },
  },
  actions: {
    filterByUser(user) {
      this.filterUser = user
    },
    limitReturnedItems(count) {
      this.filterLimit = count
    },
    filterPending() {
      this.filterStatus = 'pending'
    },
    applyFilters() {
      this.filterBuilder.setLimit(this.filterLimit).setOffset(this.filterOffset)
      if (this.filterAuthor) {
        this.filterBuilder.setUserKey(this.filterAuthor)
      }
      this.filterBuilder.setStatus(this.filterStatus)
    },
    storeArticles(list) {
      this.articles = {}
      list.forEach((item) => (this.articles[item.articleKey] = item))
    },
    updateArticleInStore(update) {
      const articleToUpdate = this.articles[update.articleKey]
      if (articleToUpdate) {
        Object.assign(this.articles[update.articleKey], update)
      } else {
        console.warn('article not found in local store on update')
      }
    },
    async loadArticles() {
      // TODO: consider dirty flag for filter settings to know whether to reapply filters
      this.applyFilters()
      try {
        const articles = await fetchArticlesForEditorReview(this.filterBuilder)
        this.storeArticles(articles)
      } catch (err) {
        console.error(err)
      }
    },
    async loadNext() {
      this.filterBuilder.nextPage()
      await this.loadArticles()
    },
    async loadPrior() {
      this.filterBuilder.priorPage()
      await this.loadArticles()
    },
    async loadPendingArticles() {
      try {
        this.filterPending()
        await this.loadArticles()
      } catch (err) {
        console.error(err)
      }
    },
    async loadArticleForReview(key) {
      try {
        const articleContent = await fetchArticleContent(key)
        this.updateArticleInStore(articleContent)
      } catch (err) {
        console.error(err)
      }
    },
    async approveToPublish(key) {
      try {
        const results = await publishArticle(key)
        this.updateArticleInStore(results)
      } catch (err) {
        console.error(err)
      }
    },
    async denyToPublish(key, explanation) {
      try {
        const results = await denyToPublishArticle(key, explanation)
        await this.updateArticleInStore(results.article)
        console.log('Message delivered: ' + results.messageToUser)
      } catch (err) {
        console.error(err)
      }
    },
  },
})
