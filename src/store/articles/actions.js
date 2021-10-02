import {
  fetchPublishedArticles,
  fetchAllArticles,
  createArticle,
  saveArticle,
  publishArticle,
  retractArticle,
  archiveArticle,
  purgeArticle,
} from '../../api/PowerUpApi'

export async function refreshArticles({ commit }) {
  const results = await fetchPublishedArticles()
  commit('loadArticles', { articles: results })
}

export async function loadCache({ commit }) {
  const results = await fetchAllArticles()
  commit('loadArticles', { articles: results })
}

export async function create({ commit }, headline) {
  const results = await createArticle({ headline })
  commit('addArticle', { article: results.data })
}

export async function save({ commit }, update) {
  const results = await saveArticle(update)
  commit('addArticle', { article: results.data })
}

export async function publish({ commit }, id) {
  const results = await publishArticle(id)
  commit('addArticle', { article: results.data })
}

export async function retract({ commit }, id) {
  const results = await retractArticle(id)
  commit('addArticle', { article: results.data })
}

export async function archive({ commit }, id) {
  const results = await archiveArticle(id)
  commit('addArticle', { article: results.data })
}

export async function purge({ commit }, id) {
  const results = await purgeArticle(id)
  commit('addArticle', { article: results.data })
}
