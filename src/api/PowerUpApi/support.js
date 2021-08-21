import { api } from '../../boot/axios'

export async function fetchInquiries() {
  return await api.get('/inquiries')
}

export async function createInquiry(inquiry) {
  return await api.post('/inquiries', inquiry)
}

export async function fetchInquiry(inquiryId) {
  return await api.get(`/inquiries/${inquiryId}`)
}
