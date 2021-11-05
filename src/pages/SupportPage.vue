<template>
  <q-page class="q-pa-md">
    <h3>User Support: Message Center</h3>
    <div class="greeting">
      Hello<span v-if="isSignedIn">, {{ screenName }}</span>. What can we do for you?
    </div>
    <q-banner v-if="!isSignedIn" class="bg-amber-2 text-black v-space" inline-actions>
      You are not signed in, so we do not know who you are. We will still get your message. However, if you want a response, be sure to sign in first.
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
    AuthorizationWidget,
  },
  setup() {
    const store = useStore()
    const purposeOfInquiryOptions = [
      { label: 'Get Help', value: 'help' },
      { label: 'Ask a Question', value: 'question' },
      { label: 'Give Feedback', value: 'feedback' },
      { label: 'Report a Bug', value: 'bug' },
      { label: 'Something Else', value: 'misc' },
    ]
    const purpose = computed({
      get: () => store.state.support.inquiryToSend.purpose,
      set: (val) => {
        console.log('setting purpose', val.value)
        store.commit('support/setInquiryPurpose', { purpose: val.value })
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
      console.log('clicked submit')
      this.store.dispatch('support/submitInquiry')
    },
  },
}
</script>

<style lang="scss">
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-left: 0;
}
.v-space {
  margin-bottom: 1.5em;
}
.greeting {
  font-size: large;
  font-weight: bold;
  color: $light-blue-10;
  margin-bottom: 1.0em;
}
</style>
