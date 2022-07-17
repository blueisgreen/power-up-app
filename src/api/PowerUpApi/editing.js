import { api } from '../../boot/axios'

export async function fetchArticlesForEditorReview(filter) {
  console.log('PowerUpAPI.fetchArticlesForEditorReview')
  try {
    const queryStr = filter.buildQueryString()
    const results = await api.get(`/workbench/editing?${queryStr}`)
    return results.data
  } catch (err) {
    console.error(err)
    return []
  }
}

export async function fetchArticleContent(articleId) {
  console.log('PowerUpAPI.fetchArticleContent', articleId)
  try {
    const results = await api.get(`/workbench/editing/${articleId}`)
    return results.data
  } catch (err) {
    console.error(err)
    return null
  }
}
