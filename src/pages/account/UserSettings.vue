<template>
  <q-item-label header>Settings</q-item-label>
  <q-item>
    <q-item-section>
      <q-checkbox
        v-if="!cookiesAcceptedAt"
        v-model="options.okWithCookies"
        label="Cookies are OK"
      />
      <q-item-label v-if="cookiesAcceptedAt">
        On {{ formatDayMonthYear(cookiesAcceptedAt) }}, you said cookies are OK.
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
        v-model="options.okWithEmailComms"
        label="I agree to receive email about Power Up Magazine"
      />
      <q-item-label v-if="emailCommsAcceptedAt">
        On {{ formatDayMonthYear(emailCommsAcceptedAt) }}, you said email is OK.
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
</template>

<script>
import InfoDialog from 'components/InfoDialog'
import { formatDayMonthYear } from '../../composables/powerUpUtils'

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

export default {
  components: { InfoDialog },
  props: {
    emailCommsAcceptedAt: {
      type: String,
      default: null,
    },
    cookiesAcceptedAt: {
      type: String,
      default: null,
    },
    options: {
      type: Object,
      default: () => {
        return {
          okayWithEmailComms: false,
          okayWithCookies: false,
        }
      },
    },
    whenAccepted: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    return {
      dialogValues,
      formatDayMonthYear,
    }
  },
}
</script>

<style></style>
