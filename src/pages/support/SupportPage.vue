<template>
  <q-page class="q-pa-md">
    <h3>User Support: Message Center</h3>
    <div class="greeting">
      Hello<span v-if="isSignedIn">, {{ screenName }}</span
      >. What can we do for you?
    </div>
    <q-banner
      v-if="!isSignedIn"
      class="bg-amber-2 text-black v-space"
      inline-actions
    >
      You are not signed in, so we do not know who you are. We will still get
      your message. However, if you want a response, be sure to sign in first.
      <template #action>
        <authorization-widget />
      </template>
    </q-banner>

    <support-message-form />

  </q-page>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import AuthorizationWidget from 'components/AuthorizationWidget.vue'
import SupportMessageForm from './SupportMessageForm.vue'

export default {
  components: {
    AuthorizationWidget,
    SupportMessageForm,
  },
  setup() {
    return {
    }
  },
  computed: {
    ...mapState('auth', ['screenName']),
    ...mapGetters('auth', ['isSignedIn']),
  },
  methods: {
    onSelectMessage(caseID) {
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
  margin-bottom: 1em;
}
</style>
