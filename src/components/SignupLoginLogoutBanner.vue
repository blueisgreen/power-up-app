<template>
  <div class="q-pa-md q-gutter-sm">
    <q-banner rounded class="bg-blue-3 text-white">
      Who are you?
      <template v-slot:action>
        <a :href="loginUrl">Login with GitHub via Power Up API</a>
        <q-btn
          flat
          color="white"
          label="Sign Up or Sign In"
          :to="{ path: loginUrl, exact: true }"
        />
        <span v-show="!isLoggedIn">NOT </span> <span>LOGGED IN</span>
        <q-btn flat color="white" label="Sign Out" />
      </template>
    </q-banner>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    const isLoggedIn = computed(() => store.getters['session/isLoggedIn'])
    return {
      loginUrl: process.env.LOGIN_URL_BASE + '/login/github',
      isLoggedIn,
    }
  },
}
</script>

<style></style>
