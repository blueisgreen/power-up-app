<template>
  <div>
    <q-btn-dropdown v-show="!isSignedIn" color="primary" label="Sign In">
      <q-list style="max-width: 200px">
        <q-item v-close-popup clickable @click="() => handleSignIn('google')">
          <q-item-section avatar
            ><q-icon color="red-8" name="fab fa-google"
          /></q-item-section>
          <q-item-section>
            <q-item-label>Google</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-close-popup clickable @click="() => handleSignIn('linkedin')">
          <q-item-section avatar
            ><q-icon color="blue-9" name="fab fa-linkedin"
          /></q-item-section>
          <q-item-section>
            <q-item-label>LinkedIn</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-close-popup clickable @click="() => handleSignIn('github')">
          <q-item-section avatar
            ><q-icon color="gray-6" name="fab fa-github"
          /></q-item-section>
          <q-item-section>
            <q-item-label>GitHub</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item>
          <q-item-section>
            <q-item-label>Future Options Below</q-item-label>
            <q-item-label caption
              >If you see what you like better, click to make a
              wish.</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-item v-close-popup clickable @click="() => track('twitter')">
          <q-item-section avatar
            ><q-icon color="blue-6" name="fab fa-twitter"
          /></q-item-section>
          <q-item-section>
            <q-item-label>Twitter</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-close-popup clickable @click="() => track('amazon')">
          <q-item-section avatar
            ><q-icon color="gray-10" name="fab fa-amazon"
          /></q-item-section>
          <q-item-section>
            <q-item-label>Amazon</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    <q-btn v-show="isSignedIn" @click="handleSignOut">Sign Out</q-btn>

    <q-dialog v-model="popup">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Unavailable</div>
          <q-space />
          <q-btn v-close-popup icon="close" flat round dense />
        </q-card-section>
        <q-card-section>
          Sign In is not supported at this time. We took note of your interest
          and will get this working soon. Thanks for trying.
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
// TODO: separate alert into its own component, using props for context
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useStore } from 'vuex'
import { useContextStore } from '../stores/context'
import { useUserStore } from '../stores/user'
import { recordClick } from '../composables/actions'

const apiUrlBase = process.env.API_URL_BASE

export default {
  setup() {
    const q = useQuasar()
    const store = useStore()
    const userStore = useUserStore()
    const contextStore = useContextStore()
    return {
      popup: ref(false),
      store,
      userStore,
      contextStore,
      q,
    }
  },
  computed: {
    isSignedIn() {
      return this.store.getters['auth/isSignedIn']
    },
  },
  methods: {
    handleSignOut() {
      recordClick('Sign Out button', 'clear credentials')
      this.userStore.signOutUser()
      this.store.dispatch('auth/signOutUser')
    },
    async handleSignIn(pid) {
      await recordClick('Sign In button', 'sign in using ' + pid)
      window.location.href = `${apiUrlBase}/login?pid=${pid}`
    },
    track(pid) {
      recordClick('Sign In button', 'attempt sign in using ' + pid)
      this.popup = true
      this.contextStore.setUserMessage(
        'This website is under construction. We appreciate your interest.'
      )
    },
  },
}
</script>

<style></style>
