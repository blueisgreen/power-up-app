import { api, authAPI } from '../../boot/axios'

export async function oauthLogin(authProvider, code, state) {
  // use auth provider ID and given code to finish authenticating via Power Up API
  const response = await authAPI.post(
    `/login/${authProvider}/callback?code=${code}&state=${state}`
  )
  console.log(response)
}

export async function becomeMember(alias, okToTerms, okToCookies) {
  console.log('PowerUpService.becomeMember')
  return await api.post('/myself/join', {
    alias,
  })
}

export async function becomeAuthor() {
  console.log('PowerUpService.becomeAuthor')
  return await api.post('/myself/author')
}

export async function fetchOwnProfile() {
  console.log('PowerUpService.fetchOwnProfile')
  // TODO: - verify jwt in header before sending
  console.log(api.defaults.headers.common['Authorization'])
  return await api.get('/myself/profile')
}

export async function updateOwnProfile(updates) {
  console.log('PowerUpService.updateOwnProfile')
  // TODO: - verify jwt in header before sending
  console.log(api.defaults.headers.common['Authorization'])
  return await api.put('/myself/profile', updates)
}

/**
 * Use after registration to toggle acceptance of cookies,
 * on a preferences panel for example.
 *
 * @param {*} updates
 * @returns
 */
export async function agreeToCookies() {
  console.log('PowerUpService.agreeToCookies')
  return await api.put('/myself/settings', { acceptCookies: true })
}

/**
 * Use after registration to toggle acceptance of email communication.
 *
 * @param {*} updates
 * @returns
 */
export async function agreeToEmailComms() {
  console.log('PowerUpService.agreeToEmailComms')
  return await api.put('/myself/settings', { acceptEmailComms: true })
}
