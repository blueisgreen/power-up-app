<template>
  <q-page class="q-pa-md">
    <h3>User Support: Message Center</h3>

    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="contact" label="Contact Support" />
        <q-tab name="messages" label="Messages" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="messages">
          <h4>Message History</h4>
          <div v-if="!isSignedIn" class="text-body1">
            Sign in to see your message history.
          </div>
          <message-reader v-if="isSignedIn" />
        </q-tab-panel>

        <q-tab-panel name="contact">
          <div class="text-h4">Contact Power Up Support</div>
          <q-banner
            v-if="!isSignedIn"
            class="bg-amber-2 text-black v-space"
            inline-actions
          >
            You are not signed in, so we do not know who you are. We will still
            get your message. However, if you want a response, be sure to sign
            in first.
            <template #action>
              <authorization-widget />
            </template>
          </q-banner>
          <support-message-form />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { mapGetters, mapState } from 'vuex'
import AuthorizationWidget from 'components/AuthorizationWidget.vue'
import SupportMessageForm from './SupportMessageForm.vue'
import MessageReader from './MessageReader.vue'

export default {
  components: {
    AuthorizationWidget,
    SupportMessageForm,
    MessageReader,
  },
  setup() {
    const tab = ref('contact')
    return {
      tab,
    }
  },
  computed: {
    ...mapState('auth', ['alias']),
    ...mapGetters('auth', ['isSignedIn']),
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
