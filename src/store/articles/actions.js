import {
  fetchPublishedArticles,
  fetchArticles,
  createArticle,
} from '../../api/PowerUpApi'

export async function refreshArticles({ commit }) {
  const results = await fetchPublishedArticles()
  commit('loadArticles', { articles: results.data })
}

export async function refreshArticleCache({ commit }) {
  const results = await fetchArticles()
  commit('loadArticles', { articles: results.data })
}

export async function createNewArticle({ commit }, headline) {
  const results = await createArticle({ headline })
  commit('addArticle', { article: results.data })
}
