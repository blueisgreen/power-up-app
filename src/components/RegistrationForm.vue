<template>
  <div class="q-pa-md">
    <h4>Member Registration</h4>
    <p>
      You already have an account:
      {{ this.accountId }} created on {{ this.createdAt }}
    </p>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="desiredScreenName"
        label="What shall we call you?"
        hint="This can be your real name or an alias."
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-btn @click="onSuggestScreenName">Suggest a name</q-btn><br/>

      <q-toggle v-model="okWithTerms" label="I accept the terms of use." />
      <br />
      <q-toggle
        v-model="okWithCookies"
        label="I agree to accept cookies for a smooth experience."
      />

      <br />
      <q-toggle
        v-model="okWithEmail"
        label="Please send me email about Power Up."
      />
      <q-input
        filled
        :disable="!okWithEmail"
        type="email"
        v-model="unverifiedEmail"
        label="Your email"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'

export default {
  setup() {
    const $q = useQuasar()
    const $store = useStore()

    const desiredScreenName = ref($store.state.profile.screenName)
    const unverifiedEmail = ref(null)
    const okWithTerms = ref(false)
    const okWithCookies = ref(false)
    const okWithEmail = ref(false)

    return {
      desiredScreenName,
      unverifiedEmail,
      okWithTerms,
      okWithCookies,
      okWithEmail,

      accountId: computed(() => $store.state.profile.accountId),
      screenName: computed(() => $store.state.profile.screenName),
      email: computed(() => $store.state.profile.email),
      createdAt: computed(() => $store.state.profile.createdAt),

      onSuggestScreenName() {
        const idea = $store.state.profile.screenName
        console.log(idea);
        desiredScreenName.value = $store.state.profile.screenName
      },
      onSubmit() {
        if (okWithTerms.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the terms to become a member',
          })
        } else {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted',
          })
          // TODO send updates via service API
          console.log('IMPLEMENT ME')
        }
      },

      onReset() {
        desiredScreenName.value = this.screenName
        unverifiedEmail.value = this.email
        okWithTerms.value = false
        okWithCookies.value = false
        okWithEmail.value = false
      },
    }
  },
}
</script>

<style>
h4 {
  margin-top: 0em;
  margin-bottom: 0.5em;
}
</style>
