export function setInquiryPurpose (state, payload) {
  state.inquiryToSend.purpose = payload.purpose
}

export function setInquiryMessage (state, payload) {
  state.inquiryToSend.message = payload.message
}

export function loadMessages (state, payload) {
  payload.messages.forEach((item) => state.priorMessages.push(item))
}

export function addMessage (state, payload) {
  console.log('adding message', payload.message);
  state.priorMessages.push(payload.message)
}
