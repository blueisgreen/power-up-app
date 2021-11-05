<template>
  <q-page class="q-pa-md">
    <h3>What can we do for you?</h3>
    <div v-if="isSignedIn" class="v-space greeting">
      Hello, {{ screenName }}.
    </div>
    <p>
      Use this contact form to get help, ask a question, or give us feedback.
    </p>
    <q-banner v-if="!isSignedIn" class="bg-purple-8 text-white v-space">
      You are anonymous. If you want a response, be sure to sign in first.
      <template #action>
        <authorization-widget />
      </template>
    </q-banner>
    <div class="p-pa-md" style="max-width: 500px">
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
              val.length <= 500 || 'Please summarize your comment or question.',
          ]"
        />
        <q-btn type="submit" color="blue-8">Submit Feedback</q-btn>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { computed } from 'vue'
import { useStore, mapGetters, mapState } from 'vuex'
import AuthorizationWidget from 'components/AuthorizationWidget.vue'

export default {
  components: {
    AuthorizationWidget
  },
  setup() {
    const store = useStore()
    const purposeOfInquiryOptions = [
      { label: 'Get Help', value: 'help' },
      { label: 'Ask a Question', value: 'question' },
      { label: 'Give Feedback', value: 'feedback' },
      { label: 'Something Else', value: 'other' },
    ]
    const purpose = computed({
      get: () => store.state.support.inquiryToSend.purpose,
      set: (val) => {
        console.log('setting purpose', val.value)
        $store.commit('support/setInquiryPurpose', { purpose: val.value })
      },
    })
    const message = computed({
      get: () => store.state.support.inquiryToSend.message,
      set: (val) => {
        console.log('setting message', val)
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
  computed: {
    ...mapState('auth', ['screenName']),
    ...mapGetters('auth', ['isSignedIn']),
  },
  methods: {
    onSubmit() {
      console.log('clicked submit');
      this.store.dispatch('support/submitInquiry')
    }
  },
}
</script>

<style lang="scss">
.v-space {
  margin-bottom: 1.5em;
}
.greeting {
  font-size: large;
  font-weight: bold;
  color: $teal-8;
}
</style>
