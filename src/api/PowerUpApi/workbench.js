import { api } from '../../boot/axios'

export async function fetchMyArticles() {
  console.log('PowerUpAPI.fetchMyArticles')
  try {
    const results = await api.get('/workbench/articles')
    return results.data
  } catch (err) {
    console.error(err)
    return []
  }
}

export async function fetchMyArticle(articleId) {
  console.log('PowerUpAPI.fetchMyArticle', articleId)
  try {
    const results = await api.get(`/workbench/articles/${articleId}`)
    return results.data
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function createArticle(update) {
  console.log('PowerUpAPI.createArticle', update)
  try {
    const results = await api.post('/workbench/articles/', update)
    return results.data
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function saveArticle(update) {
  console.log('PowerUpAPI.saveArticle', update)
  try {
    const results = await api.put(`/articles/${update.id}`, update)
    return results.data
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function publishArticle(articleId) {
  console.log('PowerUpAPI.publishArticle', articleId)
  try {
    const results = await api.put(`/articles/${articleId}/publish`)
    return results.data
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function retractArticle(articleId) {
  console.log('PowerUpAPI.retractArticle', articleId)
  try {
    const results = await api.put(`/articles/${articleId}/retract`)
    return results.data
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function archiveArticle(articleId) {
  console.log('PowerUpAPI.archiveArticle', articleId)
  try {
    const results = await api.delete(`/articles/${articleId}`)
    return results.data
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function reviveArticle(articleId) {
  console.log('PowerUpAPI.reviveArticle', articleId)
  try {
    const results = await api.put(`/articles/${articleId}/revive`)
    return results.data
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function purgeArticle(articleId) {
  console.log('PowerUpAPI.purgeArticle', articleId)
  return await api.delete(`/articles/${articleId}/purge`)
}
