import {
  fetchPublishedArticles,
  fetchAllArticles,
  createArticle,
  saveArticle,
  publishArticle,
  retractArticle,
  archiveArticle,
  reviveArticle,
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
  commit('addArticle', { article: results })
}

export async function save({ commit }, update) {
  const results = await saveArticle(update)
  commit('updateArticle', { article: results })
}

export async function publish({ commit }, id) {
  const results = await publishArticle(id)
  commit('updateArticle', { article: results })
}

export async function retract({ commit }, id) {
  const results = await retractArticle(id)
  console.log('retracted article', results)
  commit('updateArticle', { article: results })
}

export async function archive({ commit }, id) {
  const results = await archiveArticle(id)
  commit('updateArticle', { article: results })
}

export async function revive({ commit }, id) {
  const results = await reviveArticle(id)
  commit('updateArticle', { article: results })
}

export async function purge({ commit }, id) {
  await purgeArticle(id)
  commit('removeArticle', { id })
}
