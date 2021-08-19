export function isTermsAccepted(state) {
  return state.termsAcceptedAt != null
}

export function isCookiesOk(state) {
  return state.cookiesAcceptedAt != null
}

export function isEmailCommsAccepted(state) {
  return state.emailCommsAcceptedAt != null
}
