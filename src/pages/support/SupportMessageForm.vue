<template>
  <div class="p-pa-md">
    <q-form class="q-gutter-md" @submit="handleSend" @reset="onReset">
      <q-select
        v-model="purpose"
        rounded
        outlined
        map-options
        class="v-space"
        :options="purposeOptions"
        label="Purpose of Inquiry"
      />
      <q-input
        v-model="message"
        filled
        type="textarea"
        label="Maximum 500 characters"
        :rules="[
          (val) => val.length <= 500 || 'Please shorten your message.',
          (val) => val.length > 0 || 'Is there something you want to tell us?',
        ]"
      />
      <q-btn type="submit" color="blue-8">Send</q-btn>
    </q-form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { createInquiry } from '../../api/PowerUpApi'
import { useContextStore } from '../../stores/context'

export default {
  setup() {
    const purposeOptions = [
      { label: 'Get help', value: 'help' },
      { label: 'Ask a question', value: 'question' },
      { label: 'Give feedback', value: 'feedback' },
      { label: 'Report a bug', value: 'bug' },
      { label: 'Something else', value: 'misc' },
    ]
    const purpose = ref('feedback')
    const message = ref('')

    const contextStore = useContextStore()

    return {
      purposeOptions,
      purpose,
      message,
      contextStore,
      onReset() {
        purpose.value = 'feedback'
        message.value = ' '
      },
    }
  },
  methods: {
    async handleSend() {
      const inquiry = {
        purpose: this.purpose.value,
        message: this.message,
      }
      const confirmation = await createInquiry(inquiry)
      this.notifyUser(
        'Thanks! You just sent a message to the fine folks at Power Up Magazine. Glad to know you are out there.'
      )
      this.onReset()
    },
    notifyUser(msg) {
      this.contextStore.setUserMessage(msg)
    },
  },
}
</script>

<style></style>
