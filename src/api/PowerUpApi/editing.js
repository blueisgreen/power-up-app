import { api } from '../../boot/axios'

export async function fetchPendingArticles() {
  console.log('PowerUpAPI.fetchPendingArticles')
  try {
    const results = await api.get('/workbench/articles/pending')
    return results.data
  } catch (err) {
    console.error(err)
    return []
  }
}

export async function fetchArticlesForEditorReview(filter) {
  console.log('PowerUpAPI.fetchArticlesForEditorReview')
  try {
    const queryStr = filter.buildQueryString()
    // console.log('filter', filter)
    // console.log('finding actions that match:', queryStr)
    const results = await api.get(`/workbench/articles?${queryStr}`)
    return results.data
  } catch (err) {
    console.error(err)
    return []
  }
}

export async function fetchArticleContent(articleId) {
  console.log('PowerUpAPI.fetchArticleContent', articleId)
  try {
    const results = await api.get(`/workbench/articles/${articleId}`)
    return results.data
  } catch (err) {
    console.error(err)
    return null
  }
}
