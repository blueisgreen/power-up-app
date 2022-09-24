import { api } from '../../boot/axios'

export async function fetchPublishedArticles() {
  console.log('PowerUpAPI.fetchPublishedArticles')
  try {
    const results = await api.get('/articles')
    return results.data
  } catch (err) {
    console.error(err)
    return []
  }
}

export async function fetchArticle(key) {
  console.log('PowerUpAPI.fetchArticle', key)
  try {
    const results = await api.get(`/articles/${key}`)
    return results.data
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function fetchCompleteArticle(key) {
  console.log('PowerUpAPI.fetchArticle', key)
  try {
    const results = await api.get(`/articles/${key}/full`)
    return results.data
  } catch (err) {
    console.error(err)
    return null
  }
}
