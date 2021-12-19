<template>
  <q-page class="q-pa-md">
    <h4>Your Power Up Account</h4>
    <div class="q-pb-md">
      Review and update your online profile and account settings.
    </div>
    <q-list padding bordered>
      <q-item-label header>Profile</q-item-label>

      <q-item>
        <q-item-section side>
          <q-item-label class="text-bold">Member since:</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ formatDayMonthYear(createdAt) }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section side>
          <q-item-label class="text-bold">Screen name:</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ alias }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section side>
          <q-item-label class="text-bold">Email:</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label v-if="email">{{ email }}</q-item-label>
          <q-item-label v-else class="text-italic">unknown</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section side>
          <q-item-label class="text-bold">Avatar:</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-avatar v-if="avatarUrl">
            <img :src="avatarUrl" />
          </q-avatar>
          <q-item-label v-if="avatarUrl === null">Unknown</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced />
      <q-item-label header>Settings</q-item-label>

      <q-item v-ripple tag="label">
        <q-item-section side>
          <q-checkbox v-model="emailIsOkay" @click="toggleEmailComm" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Email Communication</q-item-label>
          <q-item-label v-if="!emailCommsAcceptedAt" caption>
            I agree to receive email about Power Up Magazine.
          </q-item-label>
          <q-item-label v-if="!!emailCommsAcceptedAt" caption>
            On {{ formatDayMonthYear(cookiesAcceptedAt) }}, you said email from
            us is OK.
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

      <q-item v-ripple tag="label">
        <q-item-section side>
          <q-checkbox
            v-model="cookiesAreOkay"
            :disable="!!cookiesAcceptedAt"
            @click="acknowledgeCookies"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>Cookies</q-item-label>
          <q-item-label v-if="!cookiesAcceptedAt" caption
            >Check to allow cookies.</q-item-label
          >
          <q-item-label v-if="!!cookiesAcceptedAt" caption>
            On {{ formatDayMonthYear(cookiesAcceptedAt) }}, you said cookies are
            OK.
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

      <q-separator spaced />
      <terms-of-use :terms="terms" :accepted-at="termsAcceptedAt" />

      <q-separator spaced />
      <q-item-label header>Technical Details</q-item-label>

      <q-item>
        <q-item-section side>
          <q-item-label class="text-bold">Account ID</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ accountId }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section side>
          <q-item-label class="text-bold">Account Status</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ accountStatusId }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section side>
          <q-item-label class="text-bold">Last Updated</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ formatDayMonthYear(updatedAt) }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { mapState, useStore } from 'vuex'
import { formatDayMonthYear } from '../../composables/powerUpUtils'
import TermsOfUse from './TermsOfUse.vue'
import InfoDialog from '../../components/InfoDialog'

export default defineComponent({
  components: {
    TermsOfUse,
    InfoDialog,
  },
  setup() {
    const store = useStore()
    const areTermsOk = !!store.state.profile.termsAcceptedAt
    console.log('okay?', areTermsOk)

    const terms = [
      {
        code: 'term1',
        explanation:
          'Power Up Magazine is for learning about nuclear power and related subjects.',
        accepted: areTermsOk,
      },
      {
        code: 'term2',
        explanation:
          "Be curious: Everyone is learning, even the experts. There will be errors and mistakes. Let's discuss, debate, and learn together.",
        accepted: areTermsOk,
      },
      {
        code: 'term3',
        explanation:
          'Be polite: This is civilized social media. Mind your manners.',
        accepted: areTermsOk,
      },
      {
        code: 'term4',
        explanation:
          'Be empowered: Membership is free. You may leave Power Up Magazine at any time.',
        accepted: areTermsOk,
      },
    ]
    const emailIsOkay = ref(!!store.state.profile.emailCommsAcceptedAt)
    const cookiesAreOkay = ref(!!store.state.profile.cookiesAcceptedAt)

    const dialogValues = {
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
      formatDayMonthYear,
      terms,
      dialogValues,
      emailIsOkay,
      cookiesAreOkay,
    }
  },
  computed: mapState('profile', [
    'accountId',
    'alias',
    'email',
    'avatarUrl',
    'createdAt',
    'updatedAt',
    'termsAcceptedAt',
    'cookiesAcceptedAt',
    'emailCommsAcceptedAt',
    'accountStatusId',
  ]),
  methods: {
    acknowledgeCookies() {
      console.log('cookies are okay, yo')
    },
    toggleEmailComm() {
      console.log('email communication is super duper')
    },
    saveEmail(email) {
      console.log(`saving email: ${email}`)
    },
  },
})
</script>

<style>
h4 {
  margin: 0em;
  margin-bottom: 0.5em;
}
</style>
