<template>
  <div>
    <!-- <q-btn v-show="!isSignedIn" @click="() => handleSignIn('github')">Sign In</q-btn> -->
    <q-btn-dropdown v-show="!isSignedIn" color="primary" label="Sign In">
      <q-list>
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
        <q-item v-close-popup clickable @click="() => handleSignIn('github')">
          <q-item-section avatar
            ><q-icon color="gray-6" name="fab fa-github"
          /></q-item-section>
          <q-item-section>
            <q-item-label>GitHub</q-item-label>
          </q-item-section>
        </q-item>
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
      </q-list>
    </q-btn-dropdown>
    <q-btn v-show="isSignedIn" @click="handleSignOut">Sign Out</q-btn>
  </div>
  <div class="q-pa-md"></div>
</template>

<script>
import { useQuasar } from 'quasar'
import { useStore } from 'vuex'
import jwtDecode from 'jwt-decode'
import { setAuthHeader } from '../boot/axios'

const apiUrl = process.env.API_URL

export default {
  setup() {
    const q = useQuasar()
    const store = useStore()
    const setUserInfo = (token, user) => {
      setAuthHeader(token)
      store.dispatch('auth/signInUser', { user })
    }
    return {
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
      this.store.dispatch('auth/signOutUser')
    },
    handleSignIn(pid) {
      window.location.href = `${apiUrl}/login?pid=${pid}`
    },
    recoverSession() {
      console.log('check for cookie with valid session token')
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
