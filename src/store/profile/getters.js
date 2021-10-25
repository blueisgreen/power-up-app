export function termsOk(state) {
  return state.termsAcceptedAt !== null
}

export function cookiesOk(state) {
  return state.cookiesAcceptedAt !== null
}

export function emailCommsOk(state) {
  return state.emailCommsAcceptedAt !== null
}
