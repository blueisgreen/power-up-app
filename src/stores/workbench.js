import { defineStore } from 'pinia'
import {
  fetchAllArticles,
  fetchArticle,
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
    draftLesson: '',
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
        this.draftArticle.synopsis != original.synopsis ||
        this.draftArticle.content !== original.content
      )
    },
  },
  actions: {
    updateArticle(article) {
      this.articlesById[article.id] = article
      const articleIndex = this.articleList.indexOf(
        (item) => item.id === article.id
      )
      this.articleList[articleIndex] = article
    },
    async loadArticleIndex() {
      /*
      TODO: NOTE FOR FUTURE:
        the idea is to deal with summary while browsing articles;
        call to fetch should specific "summary-only"
      */
      try {
        this.articlesById = {}
        this.articleList = []
        const articles = await fetchAllArticles()
        articles.forEach((article) => {
          this.articleList.push(article)
          this.articlesById[article.id] = article
        })
      } catch (err) {
        console.error(err)
      }
    },
    async loadArticleForEdit(id) {
      /*
      TODO: NOTE FOR FUTURE:
        now that we want to edit an article, fetch the full article,
        which might be quite long
      */
      try {
        const original = this.articlesById[id]
        if (!original) {
          original = await fetchArticle(id)
        }
        this.draftArticle = Object.assign(
          {},
          {
            id: original.id,
            headline: original.headline,
            byline: original.byline,
            synopsis: original.synopsis,
            content: original.content,
          }
        )
      } catch (err) {
        console.error(err)
      }
    },
    async create(headline) {
      const article = await createArticle({ headline })
      this.articlesById[article.id] = article
      if (!this.articleList.includes(article)) {
        this.articleList.unshift(article)
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
        this.updateArticle(results)
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
