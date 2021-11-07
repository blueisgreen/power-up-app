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

export async function fetchMyInquiries() {
  // FIXME think through; block if not logged in
  const response = await api.get('/my/inquiries')
  console.log('found inquiries', response);
  return response.data
}
