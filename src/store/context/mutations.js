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
  console.log('setting message', payload.message)
  state.statusMessage = payload.message
}
