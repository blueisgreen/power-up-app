<template>
  <div>
    <!-- <q-btn v-show="!isSignedIn" @click="() => handleSignIn('github')">Sign In</q-btn> -->
    <q-btn-dropdown v-show="!isSignedIn" color="primary" label="Sign In">
      <q-list>
        <q-item v-close-popup clickable @click="() => handleSignIn('github')">
          <q-item-section>
            <q-item-label>with GitHub</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-close-popup clickable @click="() => handleSignIn('google')">
          <q-item-section>
            <q-item-label>with Google</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-close-popup clickable @click="() => handleSignIn('linkedin')">
          <q-item-section>
            <q-item-label>with LinkedIn</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    <q-btn v-show="isSignedIn" @click="handleSignOut">Sign Out</q-btn>
  </div>
  <div class="q-pa-md">
  </div>
</template>

<script>
import { useStore } from 'vuex'

export default {
  setup() {
    return {
      store: useStore(),
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
      window.location.href = `${process.env.API_URL}/login?pid=${pid}`
    },
  },
}
</script>

<style></style>
