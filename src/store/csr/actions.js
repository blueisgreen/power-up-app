import { fetchInquiries } from '../../api/PowerUpApi'

export async function fetchSupportInquiries({ commit }) {
  const results = await fetchInquiries()
  commit('loadInquiries', { inquiries: results.data })
}
