export function getActiveArticle (state, getters) {
  if (state.activeArticleId) {
    return getters.articles.byId[state.activeArticleId]
  } else {
    return {}
  }
}
