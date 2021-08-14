import { api, authAPI } from '../boot/axios'

export async function oauthLogin(authProvider, code, state) {
  // use auth provider ID and given code to finish authenticating via Power Up API
  const response = await authAPI.post(
    `/login/${authProvider}/callback?code=${code}&state=${state}`
  )
  console.log(response)
}

export async function fetchOwnProfile() {
  console.log('PowerUpService.fetchOwnProfile')
  // TODO - verify jwt in header before sending
  console.log(api.defaults.headers.common['Authorization'])
  return await api.get('/my/profile')
}

export async function updateOwnProfile(updates) {
  console.log('PowerUpService.updateOwnProfile')
  // TODO - verify jwt in header before sending
  console.log(api.defaults.headers.common['Authorization'])
  return await api.put('/my/profile', updates)
}

export async function agreeToTerms() {
  console.log('PowerUpService.fetchUserProfile')
  return await api.put('/my/termsOK')
}

/**
 * Use after registration to toggle acceptance of cookies, 
 * on a preferences panel for example.
 * 
 * @param {*} updates 
 * @returns 
 */
export async function agreeToCookies() {
  console.log('PowerUpService.fetchUserProfile')
  return await api.put('/my/cookiesOK')
}

/**
 * Use after registration to toggle acceptance of email communication.
 * 
 * @param {*} updates 
 * @returns 
 */
 export async function agreeToEmailComms() {
  console.log('PowerUpService.fetchUserProfile')
  return await api.put('/my/emailCommsOK')
}

export async function fetchArticles() {
  console.log('PowerUpService.fetchArticles')
  return await api.get('/articles')
}

export async function fetchArchivedArticles() {
  console.log('PowerUpService.fetchArchivedArticles')
  return await api.get('/articles/archived')
}

export async function fetchPublishedArticles() {
  console.log('PowerUpService.fetchPublishedArticles')
  try {
    return await api.get('/articles/published')
  } catch (err) {
    console.error(err)
    return []
  }
}

export async function fetchArticle(articleId) {
  console.log('PowerUpService.fetchArticle', articleId)
  return await api.get(`/articles/${articleId}`)
}

export async function createArticle(update) {
  console.log('PowerUpService.createArticle', update)
  return await api.post('/articles/', update)
}

export async function saveArticle(update) {
  console.log('PowerUpService.saveArticle', update)
  return await api.put(`/articles/${update.id}`, update)
}

export async function publishArticle(articleId) {
  console.log('PowerUpService.publishArticle', articleId)
  return await api.put(`/articles/${articleId}/publish`)
}

export async function unpublishArticle(articleId) {
  console.log('PowerUpService.unpublishArticle', articleId)
  return await api.put(`/articles/${articleId}/unpublish`)
}

export async function archiveArticle(articleId) {
  console.log('PowerUpService.archiveArticle', articleId)
  return await api.delete(`/articles/${articleId}`)
}

export async function purgeArticle(articleId) {
  console.log('PowerUpService.purgeArticle', articleId)
  return await api.delete(`/articles/${articleId}/purge`)
}
