export function loadInquiries (state, payload) {
  console.log(payload);
  state.inquiries = []
  payload.inquiries.forEach(item => state.inquiries.push(item))
}

export function setFilterByPurpose (state, payload) {
  state.filterByPurpose = payload.purpose
}

export function setFilterByQuery (state, payload) {
  state.filterByPurpose = payload.query
}

export function setFilterShowUnreadOnly (state, payload) {
  state.filterShowUnreadOnly = payload.showUnreadOnly
}
