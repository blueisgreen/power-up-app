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

        <q-btn-dropdown color="accent" label="Missing Something?">
          <q-item>
            <q-item-section>
              <q-item-label>Make a Wish</q-item-label>
              <q-item-label caption>Which do you prefer?</q-item-label>
            </q-item-section>
          </q-item>
          <unsupported-auth-option
            v-for="opt in unsupportedAuthProviders"
            :key="opt.code"
            :provider="opt"
            @make-wish="(wish) => track(wish)"
          />
        </q-btn-dropdown>
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
          Sorry, we don't support that way of signing in at the moment. However,
          we took note of your interest and will think about adding it. Try a
          different way for now.
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useContextStore } from '../stores/context'
import { useUserStore } from '../stores/user'
import { recordClick } from '../composables/actions'
import UnsupportedAuthOption from './UnsupportedAuthOption.vue'

const apiUrlBase = process.env.API_URL_BASE

export default {
  components: {
    UnsupportedAuthOption,
  },
  setup() {
    const q = useQuasar()
    const userStore = useUserStore()
    const contextStore = useContextStore()

    const unsupportedAuthProviders = [
      { code: 'twitter', label: 'Twitter' },
      { code: 'facebook', label: 'Facebook' },
      { code: 'amazon', label: 'Amazon' },
      { code: 'instagram', label: 'Instagram' },
      { code: 'discord', label: 'Discord' },
      { code: 'apple', label: 'Apple' },
      { code: 'microsoft', label: 'Microsoft' },
    ]

    return {
      q,
      popup: ref(false),
      userStore,
      contextStore,
      unsupportedAuthProviders,
    }
  },
  computed: {
    isSignedIn() {
      return this.userStore.isSignedIn
    },
  },
  methods: {
    handleSignOut() {
      recordClick('Sign Out button', 'clear credentials')
      this.userStore.signOutUser()
    },
    async handleSignIn(pid) {
      await recordClick('Sign In button', 'sign in using ' + pid)
      window.location.href = `${apiUrlBase}/login?pid=${pid}`
    },
    track(provider) {
      recordClick('Sign In button', 'user prefers ' + provider.code)
      this.popup = true
      this.contextStore.setUserMessage(
        `Thanks for telling us you prefer to sign in with ${provider.label}.`
      )
    },
  },
}
</script>

<style></style>
