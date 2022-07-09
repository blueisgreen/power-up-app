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

export const useWorkbenchStore = defineStore('workbench', {
  state: () => ({
    articleList: [],
    articlesById: {},
    draftArticle: {},
    draftLesson: null,
  }),
  getters: {
    articles() {
      return this.articleList
    },
    originalOfDraft() {
      return this.articlesById[this.draftArticle.id]
    },
    isDraftArticleDirty() {
      const original = this.originalOfDraft || {}
      return (
        this.draftArticle.headline !== original.headline ||
        this.draftArticle.byline !== original.byline ||
        this.draftArticle.synopsis !== original.synopsis ||
        this.draftArticle.content !== original.content
      )
    },
  },
  actions: {
    updateArticle(article) {
      this.articlesById[article.id] = article
      const articleIndex = this.articleList.findIndex(
        (item) => item.id === article.id
      )
      console.log('updating article at index', articleIndex)
      this.articleList[articleIndex] = article
    },
    async loadArticleIndex() {
      try {
        this.articlesById = {}
        this.articleList = []
        const articles = await fetchMyArticles()
        articles.forEach((article) => {
          this.articleList.push(article)
          this.articlesById[article.id] = article
        })
      } catch (err) {
        console.error(err)
      }
    },
    async loadArticleForEdit(id) {
      try {
        const original = this.articlesById[id]
        const content = await fetchMyArticle(id)
        this.draftArticle = Object.assign({}, original, content)
      } catch (err) {
        console.error(err)
      }
    },
    async create(headline) {
      try {
        const article = await createArticle({ headline })
        this.articlesById[article.id] = article
        this.articleList.unshift(article)
      } catch (err) {
        console.error(err)
      }
    },
    async save(update) {
      try {
        const results = await saveArticle(update)
        this.updateArticle(results)
      } catch (err) {
        console.error(err)
      }
    },
    async saveDraft() {
      try {
        const results = await saveArticle(this.draftArticle)
        this.updateArticle(results)
      } catch (err) {
        console.error(err)
      }
    },
    async publish(id) {
      try {
        const results = await publishArticle(id)
        this.updateArticle(results)
      } catch (err) {
        console.error(err)
      }
    },
    async retract(id) {
      try {
        const results = await retractArticle(id)
        await this.updateArticle(results)
      } catch (err) {
        console.error(err)
      }
    },
    async archive(id) {
      try {
        const results = await archiveArticle(id)
        this.updateArticle(results)
      } catch (err) {
        console.error(err)
      }
    },
    async revive(id) {
      try {
        const results = await reviveArticle(id)
        this.updateArticle(results)
      } catch (err) {
        console.error(err)
      }
    },
    async purge(id) {
      try {
        await purgeArticle(id)
        delete this.articlesById[id]
        this.articleList = this.articleList.filter((item) => item.id === id)
      } catch (err) {
        console.error(err)
      }
    },
  },
})
