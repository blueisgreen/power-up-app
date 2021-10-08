export const getArticle = (state) => (articleId) => {
  console.log('get article called', articleId)
  return state.byId[articleId]
}

export function articles(state) {
  return state.articleIds.map((id) => state.byId[id])
}
