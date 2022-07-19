import { defineStore } from 'pinia'
import {
  fetchArticlesForEditorReview,
  publishArticle,
  fetchArticleContent,
  queryFilterBuilder,
} from 'src/api/PowerUpApi'

export const useEditingDeskStore = defineStore('editingDesk', {
  state: () => ({
    articles: {},
    filteredArticles: [],
    articleContents: {},
    // filterSettings: {
    //   author: null,
    //   status: null,
    //   limit: 20,
    //   offset: 0,
    // },
    filterAuthor: null,
    filterStatus: null,
    statusFilterOptions: ['pending', 'published', 'archived'],
    filterLimit: 10,
    filterOffset: 0,
    //   { label: 'Pending', value: 'pending' },
    //   { label: 'Published', value: 'published' },
    //   { label: 'Archived', value: 'archived' },
    // ],
    filterBuilder: queryFilterBuilder(),
  }),
  getters: {
    articleList: (state) => Object.values(state.articles),
    articlesToReview: (state) => {
      state.articleList.sort((a, b) => {
        if (state.filterSettings.pending) {
          a.requestedToPublishAt < b.requestedToPublishAt
        } else {
          a.createdAt > b.createdAt
        }
      })
    },
  },
  actions: {
    /*
     * NOTE: status filters are mutually exclusive: pending, published, archived
     */
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
      this.filterBuilder
        .setLimit(this.filterLimit)
        .setOffset(this.filterOffset)
      if (this.filterAuthor) {
        this.filterBuilder.setUserKey(this.filterAuthor)
      }
      this.filterBuilder.setStatus(this.filterStatus)
    },
    storeArticles(list) {
      this.articles = {}
      list.forEach((item) => (this.articles[item.id] = item))
    },
    updateArticleInStore(update) {
      const articleToUpdate = this.articles[update.id]
      if (articleToUpdate) {
        this.articles[update.id].content = update.content
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
    async loadPendingArticles() {
      try {
        this.filterPending()
        await this.loadArticles()
      } catch (err) {
        console.error(err)
      }
    },
    // async loadNext() {
    //   // FIXME: anticipating problems keeping offset in sync; see above (check dirty filter)
    // },
    // async loadPendingArticles() {
    //   // TODO: should be able to delete once following method works
    //   try {
    //     const pendingList = await fetchPendingArticles()
    //     this.storeArticles(pendingList)
    //     this.filterPending()
    //   } catch (err) {
    //     console.error(err)
    //   }
    // },
    async loadArticleForReview(id) {
      // FIXME:
      try {
        const articleContent = await fetchArticleContent(id)
        this.updateArticleInStore(articleContent)
      } catch (err) {
        console.error(err)
      }
    },
    async approvePublishing(id) {
      try {
        const results = await publishArticle(id)
        this.updateArticleInStore(results)
      } catch (err) {
        console.error(err)
      }
    },
  },
})
