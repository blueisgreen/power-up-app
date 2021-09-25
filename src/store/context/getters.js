export function getActiveArticle (state, getters) {
  return getters.articles.byId[state.activeArticleId]
}
