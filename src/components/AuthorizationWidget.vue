<template>
  <div>
    <!-- <q-btn v-show="!isSignedIn" @click="() => handleSignIn('github')">Sign In</q-btn> -->
    <q-btn-dropdown v-show="!isSignedIn" color="primary" label="Sign In">
      <q-list>
        <q-item v-close-popup clickable @click="() => track('google')">
          <q-item-section avatar
            ><q-icon color="red-8" name="fab fa-google"
          /></q-item-section>
          <q-item-section>
            <q-item-label>Google</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-close-popup clickable @click="() => track('linkedin')">
          <q-item-section avatar
            ><q-icon color="blue-9" name="fab fa-linkedin"
          /></q-item-section>
          <q-item-section>
            <q-item-label>LinkedIn</q-item-label>
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
        <q-item v-close-popup clickable @click="() => track('github')">
          <q-item-section avatar
            ><q-icon color="gray-6" name="fab fa-github"
          /></q-item-section>
          <q-item-section>
            <q-item-label>GitHub</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-close-popup clickable @click="recoverSession">
          <q-item-section avatar
            ><q-icon color="green-6" name="fas fa-recycle"
          /></q-item-section>
          <q-item-section>
            <q-item-label>Rehydrate</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-close-popup clickable @click="() => handleSignIn('bypass')">
          <q-item-section avatar
            ><q-icon color="orange-6" name="fas fa-sign-in-alt"
          /></q-item-section>
          <q-item-section>
            <q-item-label>Bypass</q-item-label>
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
          Sign In is not supported at this time. We took note of your interest and will get this working soon. Thanks for trying.
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
import jwtDecode from 'jwt-decode'
import { setAuthHeader } from '../boot/axios'
import { recordClick } from '../composables/actions'

const apiUrlBase = process.env.API_URL_BASE

export default {
  setup() {
    const q = useQuasar()
    const store = useStore()
    const setUserInfo = (token, user) => {
      setAuthHeader(token)
      store.dispatch('auth/signInUser', { user })
    }
    return {
      popup: ref(false),
      setUserInfo,
      store,
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
      this.store.dispatch('auth/signOutUser')
    },
    handleSignIn(pid) {
      recordClick('Sign In button', 'sign in using ' + pid)
      window.location.href = `${apiUrlBase}/login?pid=${pid}`
    },
    track(pid) {
      recordClick('Sign In button', 'attempt sign in using ' + pid)
      this.popup = true
      this.store.commit(
        'context/setStatusMessage',
        'This website is under construction. We appreciate your interest.'
      )
    },
    recoverSession() {
      console.log('check for cookie with valid session token')
      recordClick('Sign In button', 'try to get session from cookie')
      const localToken = this.q.cookies.get('token')
      if (!this.isSignedIn && localToken) {
        const authDetails = jwtDecode(localToken)
        this.setUserInfo(localToken, authDetails.user)
      }
    },
  },
}
</script>

<style></style>
