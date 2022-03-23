import { defineStore } from 'pinia'
import { fetchInquiries } from '../api/PowerUpApi'

export const useSupportStore = defineStore('support', {
  state: () => {
    return {
      inquiries: [],
      filterByPurpose: '',
      filterQuery: '',
      filterShowUnreadOnly: false,
    }
  },
  getters: {
    filteredInquires: (store) => store.inquiries,
  },
  actions: {
    async fetchSupportInquiries() {
      const results = await fetchInquiries()
      this.inquiries = []
      console.log(results)
      results.data.forEach((item) => this.inquiries.push(item))
    },
    setFilterByPurpose(purpose) {
      this.filterByPurpose = payload
    },
    setFilterByQuery(query) {
      this.filterByPurpose = query
    },
    setFilterShowUnreadOnly(showUnreadOnly) {
      this.filterShowUnreadOnly = showUnreadOnly
    },
  },
})
