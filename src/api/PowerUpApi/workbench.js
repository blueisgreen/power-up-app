import { api } from '../../boot/axios'

export async function fetchMyArticles() {
  console.log('PowerUpAPI.fetchMyArticles')
  try {
    const results = await api.get('/articles/authoring')
    return results.data
  } catch (err) {
    console.error(err)
    return []
  }
}

export async function fetchMyArticle(key) {
  console.log('PowerUpAPI.fetchMyArticle', key)
  try {
    const results = await api.get(`/articles/authoring/${key}`)
    return results.data
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function createArticle(update) {
  console.log('PowerUpAPI.createArticle', update)
  try {
    const results = await api.post('/articles/authoring/', update)
    return results.data
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function saveArticle(update) {
  console.log('PowerUpAPI.saveArticle', update)
  try {
    const results = await api.put(
      `/articles/authoring/${update.articleKey}`,
      update
    )
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
    const results = await api.put(`/articles/authoring/${key}/retract`)
    return results.data
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function archiveArticle(key) {
  console.log('PowerUpAPI.archiveArticle', key)
  try {
    const results = await api.put(`/articles/authoring/${key}/archive`)
    return results.data
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function reviveArticle(key) {
  console.log('PowerUpAPI.reviveArticle', key)
  try {
    const results = await api.put(`/articles/authoring/${key}/revive`)
    return results.data
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function purgeArticle(key) {
  console.log('PowerUpAPI.purgeArticle', key)
  return await api.delete(`/articles/authoring/${key}`)
}
