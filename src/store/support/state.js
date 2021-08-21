export default function () {
  // would need to be logged in to see message history
  return {
    inquiryToSend: {
      purpose: 'feedback',
      message: 'I really love this website. Keep it going!',
    },
    priorMessages: [
      {
        sentAt: 'timestamp',
        purpose: 'question',
        message: 'What gives?',
        response: {
          sentAt: 'timestamp',
          csrName: 'Zanzibar',
          purpose: 'answer',
          message: 'A donor.',
        },
      },
    ],
  }
}