import {
  fetchInquiries,
  createInquiry,
} from '../../api/PowerUpApi'

export async function fetchSupportMessages({ commit }) {
  const messages = await fetchInquiries()
  commit('loadMessages', messages)
}

export async function submitInquiry({ commit, state }) {
  console.log('sending inquiry', state.inquiryToSend);
  const message = await createInquiry(state.inquiryToSend)
  commit('addMessage', { message: message.data })
}
