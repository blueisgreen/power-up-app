export function isSignedIn(state) {
  return state.token !== null
}
export function isGuest(state) {
  return state.roles.length === 0
}
export function isMember(state) {
  return state.roles.find((role) => role === 'member') !== undefined
}
export function isAuthor(state) {
  return state.roles.find((role) => role === 'author') !== undefined
}
export function isEditor(state) {
  return state.roles.find((role) => role === 'editor') !== undefined
}
export function isEditorInChief(state) {
  return state.roles.find((role) => role === 'editorInChief') !== undefined
}
export function isAdmin(state) {
  return state.roles.find((role) => role === 'admin') !== undefined
}
export const hasRole = (state) => (permittedRoles) => {
  console.log('looking for roles', permittedRoles)
  return permittedRoles.some((permittedRole) =>
    state.roles.includes(permittedRole)
  )
}
