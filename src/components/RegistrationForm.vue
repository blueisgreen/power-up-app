<template>
  <div class="q-pa-md">
    <h4>Member Registration</h4>
    <p>
      Ready to become a member? You already have an account:
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

    <q-list bordered padding>
      <q-item>
        <q-item-section side>
          <q-item-label>Screen Name</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ this.screenName }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section side>
          <q-item-label>Email</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ this.email }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section side>
          <q-item-label>Avatar</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-avatar v-if="this.avatarUrl">
            <img :src="this.avatarUrl" />
          </q-avatar>
          <q-item-label v-if="this.avatarUrl === null">Unknown</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section side>
          <q-item-label>Created</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ this.createdAt }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section side>
          <q-item-label>Last Updated</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ this.updatedAt }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced />
      <q-item-label header>Preferences</q-item-label>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox disable v-model="this.termsAcceptedAt" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Terms of Use</q-item-label>
          <q-item-label caption>
            I agree to the terms of use. Violation of these terms may lead to
            suspension of my account.
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox disable v-model="this.cookiesAcceptedAt" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Cookies</q-item-label>
          <q-item-label caption>
            I understand that Power Up uses cookies to make the experience
            great.
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox disable v-model="this.emailCommsAcceptedAt" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Email Communication</q-item-label>
          <q-item-label caption>
            The Power Up team has permission to communicate with me via email
            about my account.
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
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

    const desiredScreenName = ref(null)
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
      avatarUrl: computed(() => $store.state.profile.avatarUrl),
      createdAt: computed(() => $store.state.profile.createdAt),
      updatedAt: computed(() => $store.state.profile.updatedAt),
      termsAcceptedAt: computed(() => $store.state.profile.termsAcceptedAt),
      cookiesAcceptedAt: computed(() => $store.state.profile.cookiesAcceptedAt),
      emailCommsAcceptedAt: computed(
        () => $store.state.profile.emailCommsAcceptedAt
      ),
      accountStateId: computed(() => $store.state.profile.accountStateId),

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
