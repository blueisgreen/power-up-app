<template>
  <div class="q-pa-md">
    <h4>Join Power Up</h4>
    <div class="q-pb-md">
      It's free and simple to join. Pick a screen name for yourself. Then read
      and check each of the terms of use to show that you understand and agree.
    </div>
    <q-form class="q-gutter-md" @submit="onSubmit" @reset="onReset">
      <q-list padding bordered>
        <q-item-label header>Screen Name</q-item-label>
        <q-item>
          <q-item-section top>
            <q-input
              v-model="desiredAlias"
              filled
              label="What shall we call you? This may be an alias."
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'You have to give us more than that.',
              ]"
            />
          </q-item-section>
          <q-item-section side top>
            <q-btn @click="onSuggestAlias">Suggest</q-btn><br />
          </q-item-section>
        </q-item>

        <q-separator spaced />
        <terms-of-use :terms="termsOfUse" :accepted-at="termsAcceptedAt" />

        <q-separator spaced />
        <q-item-label header>Optional Settings</q-item-label>
        <q-item>
          <q-item-section>
            <q-checkbox
              v-if="!cookiesAcceptedAt"
              v-model="okWithCookies"
              label="Cookies are OK"
            />
            <q-item-label v-if="cookiesAcceptedAt">
              On {{ formatDayMonthYear(cookiesAcceptedAt) }}, you said cookies
              are OK.
            </q-item-label>
          </q-item-section>
          <q-item-section side top>
            <info-dialog
              :prompt="dialogValues.cookies.prompt"
              :title="dialogValues.cookies.title"
              :message="dialogValues.cookies.message"
            />
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section top>
            <q-checkbox
              v-if="!emailCommsAcceptedAt"
              v-model="okWithEmail"
              label="I agree to receive email about Power Up Magazine"
            />
            <q-item-label v-if="emailCommsAcceptedAt">
              On {{ formatDayMonthYear(emailCommsAcceptedAt) }}, you said email
              is OK.
            </q-item-label>
          </q-item-section>
          <q-item-section side top>
            <info-dialog
              :prompt="dialogValues.emailComms.prompt"
              :title="dialogValues.emailComms.title"
              :message="dialogValues.emailComms.message"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section top>
            <q-item-label
              ><span class="text-bold">Email Address:</span>
              {{ socialEmail }}</q-item-label
            >
          </q-item-section>
        </q-item>

        <q-separator spaced />
        <q-item>
          <q-item-section>
            <q-btn label="Sign Me Up" type="submit" color="primary" />
          </q-item-section>
          <q-item-section>
            <q-btn
              label="Clear Form"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-form>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
import InfoDialog from 'components/InfoDialog'
import {
  formatYearMonthDay,
  formatDayMonthYear,
} from '../../composables/powerUpUtils'
import TermsOfUse from './TermsOfUse.vue'

export default {
  components: { InfoDialog, TermsOfUse },
  setup() {
    const q = useQuasar()
    const store = useStore()

    const desiredAlias = ref(store.state.profile.alias)
    const unverifiedEmail = ref(null)
    const okWithCookies = ref(false)
    const okWithEmail = ref(false)

    const termsOfUse = ref([
      {
        code: 'term1',
        explanation:
          'Power Up Magazine is for learning about nuclear power and related subjects.',
        accepted: false,
      },
      {
        code: 'term2',
        explanation:
          "Be curious: Everyone is learning, even the experts. There will be errors and mistakes. Let's discuss, debate, and learn together.",
        accepted: false,
      },
      {
        code: 'term3',
        explanation:
          'Be polite: This is civilized social media. Mind your manners.',
        accepted: false,
      },
      {
        code: 'term4',
        explanation:
          'Be empowered: Membership is free. You may leave Power Up Magazine at any time.',
        accepted: false,
      },
    ])
    const dialogValues = {
      terms: {
        prompt: 'Review Terms',
        title: 'Terms of Use',
        message:
          "Power Up Magazine is for learning about nuclear power and related subjects. Everyone is learning, even the experts. There will be errors and mistakes. Let's discuss, debate, and learn together. This is civilized social media. Mind your manners. Be polite. Membership is free. You may leave Power Up Magazine at any time.",
      },
      cookies: {
        prompt: 'Explain Cookies',
        title: 'How Cookies Help',
        message:
          'Power Up Magazine uses browser cookies to remember who you are, which saves you time and gives you a better experience. We do not share information about your activity on Power Up Magazine with others.',
      },
      emailComms: {
        prompt: 'Email Pledge',
        title: 'Only the Good Stuff',
        message:
          'We will only send you email about Power Up Magazine. We will not share your email address with anyone.',
      },
    }
    return {
      q,
      store,
      formatYearMonthDay,
      formatDayMonthYear,
      dialogValues,
      termsOfUse,

      desiredAlias,
      unverifiedEmail,
      okWithCookies,
      okWithEmail,

      accountId: computed(() => store.state.profile.accountId),
      alias: computed(() => store.state.profile.alias),
      socialEmail: computed(() => store.state.profile.email),
      createdAt: computed(() => store.state.profile.createdAt),
      termsAcceptedAt: computed(() => store.state.profile.termsAcceptedAt),
      cookiesAcceptedAt: computed(() => store.state.profile.cookiesAcceptedAt),
      emailCommsAcceptedAt: computed(
        () => store.state.profile.emailCommsAcceptedAt
      ),
      onSuggestAlias() {
        const idea = store.state.profile.alias
        console.log(idea)
        desiredAlias.value = store.state.profile.alias
      },
    }
  },
  methods: {
    okWithTerms() {
      return !this.termsOfUse.find((term) => !term.accepted)
    },
    onSubmit() {
      console.log('submitting registration')
      if (!this.okWithTerms()) {
        this.q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept all of the terms to become a member.',
        })
      } else {
        this.q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted',
        })
        console.log('about to dispatch registration action')
        this.store.dispatch('profile/updateMyProfile', {
          publicId: this.accountId,
          alias: this.desiredAlias,
          email: this.unverifiedEmail,
          agreeToTerms: !!this.termsAcceptedAt || this.okWithTerms(),
          agreeToCookies: !!this.cookiesAcceptedAt || this.okWithCookies,
          agreeToEmailComms: !!this.emailCommsAcceptedAt || this.okWithEmail,
        })
      }
    },
    onReset() {
      this.desiredAlias = this.alias
      this.termsOfUse.forEach((term) => (term.accepted = false))
      this.okWithTerms = false
      this.okWithCookies = false
      this.okWithEmail = false
    },
  },
}
</script>

<style>
h4 {
  margin: 0em;
  margin-bottom: 0.5em;
}
</style>
