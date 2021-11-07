import {
  fetchInquiries,
  fetchMyInquiries,
  createInquiry,
} from '../../api/PowerUpApi'

export async function fetchSupportMessages({ commit }) {
  const messages = await fetchInquiries()
  commit('loadMessages', messages)
}

export async function refreshMyInquiries({ commit }) {
  const messages = await fetchMyInquiries()
  commit('reloadMessages', { messages: messages })
}

export async function submitInquiry({ commit, state }) {
  const message = await createInquiry(state.inquiryToSend)
  commit('addMessage', { message: message.data })
}
