<template>
  <div>
    <q-btn v-show="!isSignedIn" @click="handleSignIn">Sign In</q-btn>
    <q-btn v-show="isSignedIn" @click="handleSignOut">Sign Out</q-btn>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'

export default {
  setup() {
    const q = useQuasar()
    q.cookies.set('powerup_user', {
      token: 'blargypant123',
      screenName: 'Zanzibar',
    })
    const hasCookie = q.cookies.has('powerup_user')
    if (hasCookie) {
      console.log(q.cookies.getAll())
    }
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
