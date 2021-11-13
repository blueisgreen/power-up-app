export function setActiveArticle(state, payload) {
  state.activeArticle = payload.article
}

export function setIsLoading(state) {
  state.isLoading = true
}

export function setIsNotLoading(state) {
  state.isLoading = false
}

export function setStatusMessage(state, payload) {
  state.statusMessage = payload.message
}
