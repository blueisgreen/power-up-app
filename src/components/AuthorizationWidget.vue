<template>
  <div>
    <q-btn v-show="!isSignedIn" @click="handleSignIn">Sign In</q-btn>
    <q-btn v-show="isSignedIn" @click="handleSignOut">Sign Out</q-btn>
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
    handleSignIn() {
      window.location.href = process.env.API_URL + '/login?pid=github'
    },
  },
}
</script>

<style></style>
