export function setInquiryPurpose (state, payload) {
  state.inquiryToSend.purpose = payload.purpose
}

export function setInquiryMessage (state, payload) {
  state.inquiryToSend.message = payload.message
}

export function loadMessages (state, payload) {
  payload.messages.forEach((item) => state.messageHistory.push(item))
}

export function reloadMessages (state, payload) {
  state.messageHistory.splice(0, state.messageHistory.length)
  payload.messages.forEach((item) => state.messageHistory.push(item))
  console.log('messages loaded:', state.messageHistory);
}

export function addMessage (state, payload) {
  state.messageHistory.push(payload.message)
}
