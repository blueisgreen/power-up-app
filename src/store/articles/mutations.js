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

export function clearActiveDraft(state, { articleId }) {
  state.activeDraft = null
}

export function updateArticle(state, { update }) {
  state.byId[article.id] = update
}

export function removeArticle(state, { id }) {
  delete state.byId[article.id]
  state.articleIds = state.articleIds.filter(item => item !== id)
}
