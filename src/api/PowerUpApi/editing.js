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

export async function fetchArticlesForEditorReview() {
  console.log('PowerUpAPI.fetchPendingArticles')
  try {
    const results = await api.get('/workbench/articles/pending')
    return results.data
  } catch (err) {
    console.error(err)
    return []
  }
}
