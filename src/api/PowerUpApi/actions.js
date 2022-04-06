import { api } from '../../boot/axios'

export async function recordAction(actionCode, details) {
  return await api.post('/actions', { actionCode, details })
}

export async function fetchActions(actionFilter) {
  let queryStr = ''
  actionFilter.keys().map((key) => {
    if (typeof key !== 'function') {
      if (queryStr.length > 0) {
        queryStr += '&'
      }
      queryStr += `${key}=${actionFilter[key]}`
    }
  })
  console.log('finding actions that match:', queryStr);
  return await api.get(`/actions?${queryStr}`)
}

// hold builder in actionFilter component; call build with api call
export const actionFilterBuilder = {
  filterSet: {},
  init: () => {
    this.filterSet = {}
    return this
  },
  setStart: (start) => {
    // TODO: ensure format YYYY-MM-DD
    this.filterSet.start = start
    return this
  },
  setEnd: (end) => {
    // TODO: ensure format YYYY-MM-DD
    this.filterSet.end = end
    return this
  },
  setActionCode: (code) => {
    this.filterSet.action = code
    return this
  },
  setUserKey: (key) => {
    this.filterSet.user = key
    return this
  },
  setLimit: (limit) => {
    this.filterSet.limit = limit
    return this
  },
  setOffset: (offset) => {
    this.filterSet.offset = offset
    return this
  },
  build: () => {
    // return a copy to detach from builder
    return Object.assign({}, filterSet)
  },
}
