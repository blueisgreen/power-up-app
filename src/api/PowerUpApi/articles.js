import { api } from '../../boot/axios'

async function fetchArticles(articleSet) {
  try {
    const results = await api.get(articleSet)
    return results.data
  } catch (err) {
    console.error(err)
    return []
  }
}

export async function fetchAllArticles() {
  console.log('PowerUpAPI.fetchAllArticles')
  return await fetchArticles('/articles')
}

export async function fetchPublishedArticles() {
  console.log('PowerUpAPI.fetchPublishedArticles')
  return await fetchArticles('/articles/published')
}

export async function fetchArchivedArticles() {
  console.log('PowerUpAPI.fetchArchivedArticles')
  return await fetchArticles('/articles/archived')
}

export async function fetchArticle(articleId) {
  console.log('PowerUpAPI.fetchArticle', articleId)
  return await api.get(`/articles/${articleId}`)
}

export async function createArticle(update) {
  console.log('PowerUpAPI.createArticle', update)
  return await api.post('/articles/', update)
}

export async function saveArticle(update) {
  console.log('PowerUpAPI.saveArticle', update)
  return await api.put(`/articles/${update.id}`, update)
}

export async function publishArticle(articleId) {
  console.log('PowerUpAPI.publishArticle', articleId)
  return await api.put(`/articles/${articleId}/publish`)
}

export async function retractArticle(articleId) {
  console.log('PowerUpAPI.retractArticle', articleId)
  return await api.put(`/articles/${articleId}/retract`)
}

export async function archiveArticle(articleId) {
  console.log('PowerUpAPI.archiveArticle', articleId)
  return await api.delete(`/articles/${articleId}`)
}

export async function purgeArticle(articleId) {
  console.log('PowerUpAPI.purgeArticle', articleId)
  return await api.delete(`/articles/${articleId}/purge`)
}
