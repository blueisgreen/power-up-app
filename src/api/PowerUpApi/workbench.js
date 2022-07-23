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

export async function fetchMyArticle(key) {
  console.log('PowerUpAPI.fetchMyArticle', key)
  try {
    const results = await api.get(`/workbench/articles/${key}`)
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
    const results = await api.put(`/workbench/articles/${update.articleKey}`, update)
    return results.data
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function publishArticle(key) {
  console.log('PowerUpAPI.publishArticle', key)
  try {
    const results = await api.put(`/workbench/articles/${key}/publish`)
    return results.data
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function retractArticle(key) {
  console.log('PowerUpAPI.retractArticle', key)
  try {
    const results = await api.put(`/workbench/articles/${key}/retract`)
    return results.data
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function archiveArticle(key) {
  console.log('PowerUpAPI.archiveArticle', key)
  try {
    const results = await api.delete(`/workbench/articles/${key}`)
    return results.data
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function reviveArticle(key) {
  console.log('PowerUpAPI.reviveArticle', key)
  try {
    const results = await api.put(`/workbench/articles/${key}/revive`)
    return results.data
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function purgeArticle(key) {
  console.log('PowerUpAPI.purgeArticle', key)
  return await api.delete(`/workbench/articles/${key}/purge`)
}
