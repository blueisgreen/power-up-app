export function setInquiryPurpose (state, payload) {
  state.inquiryToSend.purpose = payload.purpose
}

export function setInquiryMessage (state, payload) {
  state.inquiryToSend.message = payload.message
}

