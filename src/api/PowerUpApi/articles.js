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
  try {
    const results = await api.get(`/articles/${articleId}`)
    return results.data
  } catch (err) {
    console.error(err)
    return null
  }
}
