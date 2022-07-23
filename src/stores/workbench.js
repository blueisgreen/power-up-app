import { defineStore } from 'pinia'
import {
  fetchMyArticles,
  fetchMyArticle,
  createArticle,
  saveArticle,
  publishArticle,
  retractArticle,
  archiveArticle,
  reviveArticle,
  purgeArticle,
} from '../api/PowerUpApi'

/**
 * Dedicated to authors for writing articles and managing their lifecycle.
 */
export const useWorkbenchStore = defineStore('workbench', {
  state: () => ({
    articles: {},
    draftArticle: {},
  }),
  getters: {
    articleList: (state) => Object.values(state.articles),
    lastSavedDraft() {
      return this.articles[this.draftArticle.articleKey]
    },
    isDraftArticleDirty() {
      const baseline = this.lastSavedDraft || {}
      return (
        this.draftArticle.headline !== baseline.headline ||
        this.draftArticle.byline !== baseline.byline ||
        this.draftArticle.synopsis !== baseline.synopsis ||
        this.draftArticle.content !== baseline.content
      )
    },
  },
  actions: {
    storeInArticles(article) {
      const cachedArticle = this.articles[article.articleKey]
      if (cachedArticle) {
        Object.assign(cachedArticle, article)
      } else {
        this.articles[article.articleKey] = article
      }
    },
    clearArticles() {
      this.articles = {}
      this.draftArticle = {}
    },
    async loadArticlesAuthorOwns() {
      try {
        this.clearArticles()
        const articles = await fetchMyArticles()
        articles.forEach((article) => this.storeInArticles(article))
      } catch (err) {
        console.error(err)
      }
    },
    async loadArticleForEdit(articleKey) {
      try {
        const content = await fetchMyArticle(articleKey)
        this.storeInArticles(content)
      } catch (err) {
        console.error(err)
      }
    },
    async create(headline) {
      try {
        const article = await createArticle({ headline })
        this.storeInArticles(article)
      } catch (err) {
        console.error(err)
      }
    },
    async save(update) {
      try {
        const results = await saveArticle(update)
        this.storeInArticles(results)
      } catch (err) {
        console.error(err)
      }
    },
    async saveDraft() {
      try {
        const results = await saveArticle(this.draftArticle)
        this.storeInArticles(results)
      } catch (err) {
        console.error(err)
      }
    },
    async publish(articleKey) {
      try {
        const results = await publishArticle(articleKey)
        this.storeInArticles(results)
      } catch (err) {
        console.error(err)
      }
    },
    async retract(articleKey) {
      try {
        const results = await retractArticle(articleKey)
        await this.storeInArticles(results)
      } catch (err) {
        console.error(err)
      }
    },
    async archive(articleKey) {
      try {
        const results = await archiveArticle(articleKey)
        this.storeInArticles(results)
      } catch (err) {
        console.error(err)
      }
    },
    async revive(articleKey) {
      try {
        const results = await reviveArticle(articleKey)
        this.storeInArticles(results)
      } catch (err) {
        console.error(err)
      }
    },
    async purge(articleKey) {
      try {
        await purgeArticle(articleKey)
        delete this.articles[articleKey]
      } catch (err) {
        console.error(err)
      }
    },
  },
})
