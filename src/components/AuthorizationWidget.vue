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
    // const q = useQuasar()
    // q.cookies.set('powerup_user', {
    //   token: 'blargypant123',
    //   screenName: 'Zanzibar',
    // }, {
    //   expires: 10,
    //   path: '/bah/',
    //   domain: 'powerupmagazine.com',
    //   sameSite: 'Strict'
    // })
    // const hasCookie = q.cookies.has('powerup_user')
    // if (hasCookie) {
    //   console.log(q.cookies.getAll())
    // }
    return {
      store: useStore(),
      q: useQuasar(),
      cookieOptions: {
        domain: 'localhost',
        path: '/',
      },
    }
  },
  computed: {
    screenName() {
      return this.store.state.auth.screenName
    },
    isSignedIn() {
      console.log('cookies:', this.q.cookies.getAll())
      return this.store.getters['auth/isSignedIn'] // || this.q.cookies.has('token')
    },
  },
  methods: {
    handleSignOut() {
      this.store.commit('auth/signOut')
      this.q.cookies.remove('token', this.cookieOptions)
      this.q.cookies.remove('user_id', this.cookieOptions)
      this.q.cookies.remove('userID', this.cookieOptions)
    },
    handleSignIn() {
      window.location.href = process.env.API_URL + '/login/github'
    },
  },
}
</script>

<style></style>
