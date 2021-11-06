<template>
  <div class="p-pa-md">
    <q-form @submit="onSubmit">
      <q-select
        v-model="purpose"
        rounded
        outlined
        map-options
        class="v-space"
        :options="purposeOfInquiryOptions"
        label="Purpose of Inquiry"
      />
      <q-input
        v-model="message"
        filled
        type="textarea"
        label="Maximum 500 characters"
        :rules="[
          (val) =>
            val.length <= 500 || 'Please shorten your message.',
          (val) => val.length > 0 || 'Is there something you want to tell us?',
        ]"
      />
      <q-btn type="submit" color="blue-8">Send</q-btn>
    </q-form>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const purposeOfInquiryOptions = [
      { label: 'Get help', value: 'help' },
      { label: 'Ask a question', value: 'question' },
      { label: 'Give feedback', value: 'feedback' },
      { label: 'Report a bug', value: 'bug' },
      { label: 'Something else', value: 'misc' },
    ]
    const purpose = computed({
      get: () => store.state.support.inquiryToSend.purpose,
      set: (val) => {
        store.commit('support/setInquiryPurpose', { purpose: val.value })
      },
    })
    const message = computed({
      get: () => store.state.support.inquiryToSend.message,
      set: (val) => {
        store.commit('support/setInquiryMessage', { message: val })
      },
    })
    return {
      purposeOfInquiryOptions,
      purpose,
      message,
      store,
    }
  },
  methods: {
    onSubmit() {
      this.store.dispatch('support/submitInquiry')
    },
  },
}
</script>

<style></style>
