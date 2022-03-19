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
    draftArticleStart: '',
    draftArticle: '',
    draftLesson: '',
  }),
  getters: {
    articles() {
      return this.articleList
    },
    draftIsDirty() {
      // FIXME: make this a deep comparison
      return this.draftArticle !== this.draftArticleStart
    },
  },
  actions: {
    updateArticle(article) {
      this.articlesById[article.id] = article
    },
    async loadArticleIndex() {
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
      try {
        // make a copy to update; keep original for change detection
        this.draftArticleStart = await fetchArticle(id)
        this.draftArticle = Object.assign({}, this.draftArticleStart) // FIXME: is there a better way to clone?
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
        updateArticle(results)
      } catch (err) {
        console.error(err)
      }
    },
    async publish(id) {
      try {
        const results = await publishArticle(id)
        updateArticle(results)
      } catch (err) {
        console.error(err)
      }
    },
    async retract(id) {
      try {
        const results = await retractArticle(id)
        updateArticle(results)
      } catch (err) {
        console.error(err)
      }
    },
    async archive(id) {
      try {
        const results = await archiveArticle(id)
        updateArticle(results)
      } catch (err) {
        console.error(err)
      }
    },
    async revive(id) {
      try {
        const results = await reviveArticle(id)
        updateArticle(results)
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
