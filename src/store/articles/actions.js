import { fetchArticles } from '../../api/PowerUpApi'

export async function refreshArticles({ commit }) {
  const results = await fetchArticles()
  commit('loadArticles', { articles: results.data })
}
