export const getArticle = (state) => (articleId) => {
  return state.byId[articleId]
}

export function articles(state) {
  return state.articleIds.map(id => state.byId[id])
}

export const getActiveDraft = () => {
  return state.byId[state.activeDraft]
}
