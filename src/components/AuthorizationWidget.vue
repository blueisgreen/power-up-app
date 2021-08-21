<template>
  <div>
    <span>{{ screenName }}</span>
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
    screenName() {
      return this.store.state.auth.screenName
    },
    isSignedIn() {
      return this.store.getters['auth/isSignedIn']
    },
  },
  methods: {
    handleSignOut() {
      this.store.commit('auth/signOut')
    },
    handleSignIn() {
      window.location.href = process.env.API_URL + '/login/github'
    },
  },
}
</script>

<style></style>
