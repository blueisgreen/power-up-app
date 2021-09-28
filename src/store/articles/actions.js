import { fetchPublishedArticles } from '../../api/PowerUpApi'

export async function refreshArticles({ commit }) {
  const results = await fetchPublishedArticles()
  commit('loadArticles', { articles: results.data })
}
