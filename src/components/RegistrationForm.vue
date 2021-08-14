<template>
  <div class="q-pa-md">
    <h4>Member Registration</h4>
    <p>
      You already have an account:
      {{ this.accountId }} created on {{ this.createdAt }}
    </p>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-list separator padding bordered>
        <q-item>
          <q-item-section top>
            <q-input
              filled
              v-model="desiredScreenName"
              label="What shall we call you?"
              hint="This can be your real name or an alias."
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />
          </q-item-section>
          <q-item-section side top>
            <q-btn @click="onSuggestScreenName">Suggest</q-btn><br />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section top>
            <q-toggle
              v-if="!termsAccepted"
              v-model="okWithTerms"
              label="I accept the terms of use."
            />
            <q-item-label v-if="termsAccepted"
              >You agreed to terms of use on {{ termsAccepted }}</q-item-label
            >
          </q-item-section>
          <q-item-section side top>
            <q-item-label @click="onShowTerms">Review terms</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section top>
            <q-toggle
              v-if="!cookiesAccepted"
              v-model="okWithCookies"
              label="I agree to accept cookies for a smooth experience."
            />
            <q-item-label v-if="cookiesAccepted"
              >You agreed to use of cookies on
              {{ cookiesAccepted }}</q-item-label
            >
          </q-item-section>
          <q-item-section side top>
            <q-item-label @click="onShowCookies">Explain cookies</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section top>
            <q-toggle
              v-model="okWithEmail"
              label="Please send me email about Power Up."
            />
          </q-item-section>
          <q-item-section top>
            <q-item-label @click="onShowEmailPromise"
              >See our promise</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-item>
          <q-section>
            <q-input
              filled
              :disable="!okWithEmail"
              type="email"
              v-model="unverifiedEmail"
              label="Your email"
            />
          </q-section>
        </q-item>
        <q-item>
          <q-section>
            <q-btn label="Submit" type="submit" color="primary" />
          </q-section>
          <q-section>
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </q-section>
        </q-item>
      </q-list>
    </q-form>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useQuasar, date } from 'quasar'

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
      termsAcceptedAt: computed(() => $store.state.profile.termsAcceptedAt),
      cookiesAcceptedAt: computed(() => $store.state.profile.cookiesAcceptedAt),
      emailCommsAcceptedAt: computed(
        () => $store.state.profile.emailCommsAcceptedAt
      ),

      onSuggestScreenName() {
        const idea = $store.state.profile.screenName
        console.log(idea)
        desiredScreenName.value = $store.state.profile.screenName
      },
      onShowTerms() {
        console.log('IMPLEMENT TERMS POPUP')
        // show popup with terms
      },
      onShowCookies() {
        console.log('IMPLEMENT COOKIE USE POPUP')
        // show popup with terms
      },
      onShowEmailPromise() {
        console.log('IMPLEMENT EMAIL PROMISE POPUP')
        // show popup with terms
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
          $store.dispatch('profile/updateMyProfile', {
            publicId: this.accountId,
            screenName: this.desiredScreenName,
            email: this.unverifiedEmail,
            agreeToTerms: this.termsAcceptedAt || this.agreeToTerms,
            agreeToCookies: this.cookiesAcceptedAt || this.agreeToCookies,
            agreeToEmailComms:
              this.emailCommsAcceptedAt || this.agreeToEmailComms,
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
      formatAgreementDate(agreedAt) {
        if (agreedAt === null) {
          return null
        }
        const agreementDate = date.extractDate(agreedAt)
        return date.formatDate(agreementDate, 'YYYY-MMM-D')
      },
    }
  },
  computed: {
    termsAccepted: () => {
      return this.formatAgreementDate(this.termsAcceptedAt)
    },
    cookiesAccepted: () => {
      return this.formatAgreementDate(this.cookiesAcceptedAt)
    },
    emailCommsAccepted: () => {
      return this.formatAgreementDate(this.emailCommsAcceptedAt)
    },
  },
}
</script>

<style>
h4 {
  margin-top: 0em;
  margin-bottom: 0.5em;
}
</style>
