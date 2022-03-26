<template>
  <q-page class="q-pa-md">
    <h4>Your Power Up Account</h4>

    <q-list padding bordered>
      <q-item-label header>Profile</q-item-label>
      <q-item>
        <q-item-section side>
          <q-item-label class="text-bold">Member since:</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{
            formatDayMonthYear(profile.createdAt)
          }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section side>
          <q-item-label class="text-bold">Screen name:</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ profile.alias }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section side>
          <q-item-label class="text-bold">Email:</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label v-if="profile.email">{{ profile.email }}</q-item-label>
          <q-item-label v-else class="text-italic">unknown</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section side>
          <q-item-label class="text-bold">Avatar:</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-avatar v-if="profile.avatarUrl">
            <img :src="profile.avatarUrl" />
          </q-avatar>
          <q-item-label v-if="profile.avatarUrl === null">Unknown</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced />
      <q-item-label header>Settings</q-item-label>
      <q-item v-ripple tag="label">
        <q-item-section side>
          <q-checkbox
            v-model="userStore.isEmailOkay"
            @click="toggleEmailComm"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>Email Communication</q-item-label>
          <q-item-label v-if="!userStore.isEmailOkay" caption>
            I agree to receive email about Power Up Magazine.
          </q-item-label>
          <q-item-label v-if="userStore.isEmailOkay" caption>
            On {{ formatDayMonthYear(profile.emailAcceptedAt) }}, you said email
            from us is OK.
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
            v-model="userStore.areCookiesOkay"
            :disable="userStore.areCookiesOkay"
            @click="acknowledgeCookies"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>Cookies</q-item-label>
          <q-item-label v-if="!userStore.areCookiesOkay" caption
            >Check to allow cookies.</q-item-label
          >
          <q-item-label v-if="userStore.areCookiesOkay" caption>
            On {{ formatDayMonthYear(profile.cookiesAcceptedAt) }}, you said
            cookies are OK.
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
      <terms-of-use :terms="terms" :accepted-at="profile.termsAcceptedAt" />

      <q-separator spaced />
      <q-item-label header>Technical Details</q-item-label>

      <q-item>
        <q-item-section side>
          <q-item-label class="text-bold">Account ID</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ profile.accountId }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section side>
          <q-item-label class="text-bold">Account Status</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>Powered On</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section side>
          <q-item-label class="text-bold">Last Updated</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{
            formatDayMonthYear(profile.updatedAt)
          }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useUserStore } from '../../stores/user'
import { formatDayMonthYear } from '../../composables/powerUpUtils'
import TermsOfUse from './TermsOfUse.vue'
import InfoDialog from '../../components/InfoDialog'

// FIXME: rethink entire profile - lots of personalization use cases are not right
export default defineComponent({
  components: {
    TermsOfUse,
    InfoDialog,
  },
  setup() {
    const userStore = useUserStore()
    const profile = userStore.profile
    const terms = ref([])
    onMounted(async () => {
      await userStore.fetchMyProfile()
      terms.value.push({
        code: 'term1',
        explanation:
          'Power Up Magazine is for learning about nuclear power and related subjects.',
        accepted: userStore.areTermsOkay,
      })
      terms.value.push({
        code: 'term2',
        explanation:
          "Be curious: Everyone is learning, even the experts. There will be errors and mistakes. Let's discuss, debate, and learn together.",
        accepted: userStore.areTermsOkay,
      })
      terms.value.push({
        code: 'term3',
        explanation:
          'Be polite: This is civilized social media. Mind your manners.',
        accepted: userStore.areTermsOkay,
      })
      terms.value.push({
        code: 'term4',
        explanation:
          'Be empowered: Membership is free. You may leave Power Up Magazine at any time.',
        accepted: userStore.areTermsOkay,
      })
    })

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
      userStore,
      profile,
    }
  },
  methods: {
    acknowledgeCookies() {},
    toggleEmailComm() {
      this.userStore.agreeToEmail()
    },
    saveEmail(email) {},
  },
})
</script>

<style>
h4 {
  margin: 0em;
  margin-bottom: 0.5em;
}
</style>
