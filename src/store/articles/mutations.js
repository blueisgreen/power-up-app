export function loadArticles(state, payload) {
  state.byId = {}
  state.articleIds = []
  payload.articles.forEach((article) => {
    state.articleIds.push(article.id)
    state.byId[article.id] = article
  })
}
