<template>
  <div>
    <span>{{ screenName }}</span>
    <q-btn
      v-show="!isSignedIn"
      >Sign In</q-btn
    >
    <q-btn
      v-show="isSignedIn"
      >Sign Out</q-btn
    >
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  setup() {
    return {
      store: useStore()
    }
  },
  computed: {
    screenName() {
      return this.store.state.auth.screenName
    },
    isSignedIn() {
      return this.store.getters['auth/isSignedIn']
    },
  }
}
</script>

<style></style>
