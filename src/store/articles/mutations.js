export function loadArticles(state, { articles }) {
  state.byId = {}
  state.articleIds = []
  articles.forEach((article) => {
    state.articleIds.push(article.id)
    state.byId[article.id] = article
  })
}

export function addArticle(state, { article }) {
  console.log('save article to local state')
  state.byId[article.id] = article
  if (!state.articleIds.includes(article.id)) {
    state.articleIds.unshift(article.id)
  }
}

export function updateArticle(state, { article }) {
  state.byId[article.id] = article
}

export function removeArticle(state, { id }) {
  delete state.byId[article.id]
  state.articleIds = state.articleIds.filter((item) => item !== id)
}
