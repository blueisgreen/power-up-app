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
  return await api.post('/my/account/member', {
    alias,
    okToTerms,
    okToCookies,
  })
}

export async function becomeAuthor() {
  console.log('PowerUpService.becomeAuthor')
  return await api.post('/my/account/author')
}

export async function fetchOwnProfile() {
  console.log('PowerUpService.fetchOwnProfile')
  // TODO: - verify jwt in header before sending
  console.log(api.defaults.headers.common['Authorization'])
  return await api.get('/my/profile')
}

export async function updateOwnProfile(updates) {
  console.log('PowerUpService.updateOwnProfile')
  // TODO: - verify jwt in header before sending
  console.log(api.defaults.headers.common['Authorization'])
  return await api.put('/my/profile', updates)
}

export async function agreeToTerms() {
  console.log('PowerUpService.agreeToTerms')
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
  console.log('PowerUpService.agreeToCookies')
  return await api.put('/my/cookiesOK')
}

/**
 * Use after registration to toggle acceptance of email communication.
 *
 * @param {*} updates
 * @returns
 */
export async function agreeToEmailComms() {
  console.log('PowerUpService.agreeToEmailComms')
  return await api.put('/my/emailCommsOK')
}
