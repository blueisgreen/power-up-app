export function loadArticles(state, payload) {
  state.byId = {}
  payload.articles.forEach((article) => {
    state.byId[article.id] = article
  })
}
