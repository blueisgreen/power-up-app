export function load(state, payload) {
  state.accountId = payload.public_id
  state.alias = payload.alias
  state.email = payload.email
  state.avatarUrl = payload.avatar_url
  state.createdAt = payload.created_at
  state.updatedAt = payload.updated_at
  state.termsAcceptedAt = payload.terms_accepted_at
  state.cookiesAcceptedAt = payload.cookies_accepted_at
  state.emailCommsAcceptedAt = payload.email_comms_accepted_at
  state.accountStatusId = payload.account_status_id
}

export function setAlias(state, payload) {
  state.alias = payload.alias
}

export function setEmail(state, payload) {
  state.email = payload.email
}

export function setAvatarUrl(state, payload) {
  state.avatarUrl = payload.avatarUrl
}
