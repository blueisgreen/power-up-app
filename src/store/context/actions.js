export function notifyLoading({ commit }) {
  console.log('notifyLoading')
  commit('setIsLoading')
  commit('setStatusMessage', { message: 'Hold your horses, Tex.' })
}

export function stopNotifyLoading({ commit }) {
  console.log('stopNotifyLoading')
  commit('setIsNotLoading')
  commit('setStatusMessage', { message: 'Enjoy life to the fullest!' })
}

export function setActiveArticle({ commit }, payload) {
  commit('setActiveArticle', payload)
}
