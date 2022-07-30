export const queryFilterBuilder = () => {
  return {
    filterSet: {},
    setStart(start) {
      this.filterSet.start = start
      return this
    },
    setEnd(end) {
      this.filterSet.end = end
      return this
    },
    setActionCode(code) {
      this.filterSet.action = code
      return this
    },
    setStatus(code) {
      this.filterSet.status = code
      return this
    },
    setUserKey(key) {
      this.filterSet.user = key
      return this
    },
    setLimit(limit) {
      this.filterSet.limit = limit
      return this
    },
    setOffset(offset) {
      this.filterSet.offset = offset
      return this
    },
    nextPage() {
      if (!this.filterSet.limit) {
        return
      }
      const start = this.filterSet.offset || 0
      this.setOffset(start + this.filterSet.limit)
    },
    priorPage() {
      if (!this.filterSet.limit || !this.filterSet.offset) {
        return
      }
      this.setOffset(this.filterSet.offset - this.filterSet.limit)
      if (this.filterSet.offset < 0) {
        this.setOffset(0)
      }
    },
    buildQueryString() {
      const keys = Object.keys(this.filterSet)
      const start = ''
      const query = keys.reduce((before, current) => {
        let frag = before
        if (before.length) {
          frag += '&'
        }
        frag += current + '=' + this.filterSet[current]
        return frag
      }, start)
      return query
    },
  }
}
