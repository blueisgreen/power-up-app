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
    filterSettings: {
      author: null,
      pending: false,
      published: false,
      archived: false,
      limit: 20,
      offset: 0,
    },
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
      this.filterSettings.user = user
    },
    limitReturnedItems(count) {
      this.filterSettings.limit = count
    },
    filterPending() {
      this.filterSettings.pending = true
      this.filterSettings.published = false
      this.filterSettings.archived = false
    },
    filterPublished() {
      this.filterSettings.pending = false
      this.filterSettings.published = true
      this.filterSettings.archived = false
    },
    filterArchived() {
      this.filterSettings.pending = false
      this.filterSettings.published = false
      this.filterSettings.archived = true
    },
    applyFilters() {
      this.filterBuilder
        .setLimit(this.filterSettings.limit)
        .setOffset(this.filterSettings.offset)
      if (this.filterSettings.author) {
        this.filterBuilder.setUserKey(this.filterSettings.author)
      }
      if (this.filterSettings.pending) {
        this.filterBuilder.setStatus('pending')
      }
      if (this.filterSettings.published) {
        this.filterBuilder.setStatus('published')
      }
      if (this.filterSettings.archived) {
        this.filterBuilder.setStatus('archived')
      }
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
