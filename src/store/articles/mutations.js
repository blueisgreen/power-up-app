export function loadArticles(state, payload) {
  state.byId = {}
  state.articleIds = []
  payload.articles.forEach((article) => {
    state.articleIds.push(article.id)
    state.byId[article.id] = article
  })
}

export function addArticle(state, { article }) {
  state.byId[article.id] = article
  state.articleIds.push(article.id)
}

export function setActiveDraft(state, { articleId }) {
  state.activeDraft = articleId
}
