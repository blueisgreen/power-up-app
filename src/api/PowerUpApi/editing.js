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

export async function fetchArticleContent(key) {
  console.log('PowerUpAPI.fetchArticleContent', key)
  try {
    const results = await api.get(`/workbench/editing/${key}`)
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
      `/workbench/editing/${key}/denyToPublish`,
      payload
    )
    return results.data
  } catch (err) {
    console.error(err)
    return null
  }
}
