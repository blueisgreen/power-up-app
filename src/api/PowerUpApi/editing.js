import { api } from '../../boot/axios'

export async function fetchArticlesForEditorReview(filter) {
  console.log('PowerUpAPI.fetchArticlesForEditorReview')
  try {
    const queryStr = filter.buildQueryString()
    const results = await api.get(`/articles/editing?${queryStr}`)
    return results.data
  } catch (err) {
    console.error(err)
    return []
  }
}

export async function fetchArticleContent(key) {
  console.log('PowerUpAPI.fetchArticleContent', key)
  try {
    const results = await api.get(`/articles/authoring/${key}`)
    return results.data
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function denyToPublishArticle(key, message) {
  console.log('PowerUpAPI.denyToPublishArticle', key)
  try {
    const payload = {
      message,
    }
    const results = await api.put(
      `/articles/editing/${key}/deny-to-publish`,
      payload
    )
    return results.data
  } catch (err) {
    console.error(err)
    return null
  }
}
