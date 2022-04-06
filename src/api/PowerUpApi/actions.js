import { registerRuntimeHelpers } from '@vue/compiler-core';
import { api } from '../../boot/axios'

export async function recordAction(actionCode, details) {
  return await api.post('/actions', { actionCode, details })
}

export async function fetchActions(actionFilter) {
  console.log('filter', actionFilter);
  let queryStr = ''
  Object.keys(actionFilter).map((key) => {
    if (typeof key !== 'function') {
      if (queryStr.length > 0) {
        queryStr += '&'
      }
      queryStr += `${key}=${actionFilter[key]}`
    }
  })
  console.log('finding actions that match:', queryStr)
  const results = await api.get(`/actions?${queryStr}`)
  return results.data
}

// hold builder in actionFilter component; call build with api call
export const actionFilterBuilder = () => {
  return {
    filterSet: {},
    setStart: function(start) {
      // TODO: ensure format YYYY-MM-DD
      this.filterSet.start = start
      return this
    },
    setEnd: function(end) {
      // TODO: ensure format YYYY-MM-DD
      this.filterSet.end = end
      return this
    },
    setActionCode: function(code) {
      this.filterSet.action = code
      return this
    },
    setUserKey: function(key) {
      this.filterSet.user = key
      return this
    },
    setLimit: function(limit) {
      this.filterSet.limit = limit
      return this
    },
    setOffset: function(offset) {
      this.filterSet.offset = offset
      return this
    },
    build: function() {
      // return a copy to detach from builder
      return Object.assign({}, this.filterSet)
    },
  }
}
