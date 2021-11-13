<template>
  <div class="p-pa-md">
    <q-form @submit="handleSend">
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
import { useStore } from 'vuex'

export default {
  setup() {
    const purposeOptions = [
      { label: 'Get help', value: 'help' },
      { label: 'Ask a question', value: 'question' },
      { label: 'Give feedback', value: 'feedback' },
      { label: 'Report a bug', value: 'bug' },
      { label: 'Something else', value: 'misc' },
    ]
    return {
      purposeOptions,
      purpose: ref('feedback'),
      message: ref(''),
      store: useStore()
    }
  },
  methods: {
    async handleSend() {
      const inquiry = {
        purpose: this.purpose.value,
        message: this.message,
      }
      const confirmation = await createInquiry(inquiry)
      this.notifyUser('Hey, you just sent a message to Power Up. Thanks! We will take it from here.')
      this.purpose = 'help'
      this.message = ''
    },
    notifyUser(msg) {
      this.store.commit('context/setStatusMessage', { message: msg })
    }
  },
}
</script>

<style></style>
