import { api } from '../../boot/axios'

export async function fetchUsers() {
  try {
    const results = await api.get('/admin/users')
    return results.data
  } catch (err) {
    console.error(err)
    return []
  }
}

export async function fetchUserRoles(userKey) {
  try {
    const results = await api.get(`/admin/users/${userKey}/roles`)
    return results.data
  } catch (err) {
    console.error(err)
    return []
  }
}

export async function addUserRole(userKey, role) {
  try {
    const results = await api.put(`/admin/users/${userKey}/roles`, [role])
    return results.status === 204
  } catch (err) {
    console.error(err)
    return false
  }
}

export async function removeUserRole(userKey, role) {
  try {
    const results = await api.delete(`/admin/users/${userKey}/roles`, [role])
    return results.status === 204
  } catch (err) {
    console.error(err)
    return false
  }
}

export async function fetchRoles() {
  try {
    const results = await api.get('/admin/roles')
    return results.data
  } catch (err) {
    console.error(err)
    return []
  }
}

export async function fetchActivity(dateFilter) {
  try {
    const endpoint = dateFilter
      ? `/admin/activities?on=${dateFilter.toISOString()}`
      : '/admin/activities'
    const results = await api.get(endpoint)
    return results.data
  } catch (err) {
    console.error(err)
    return []
  }
}
