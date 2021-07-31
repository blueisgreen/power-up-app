<template>
  <div class="q-pa-md q-gutter-sm">
    <q-banner rounded class="bg-blue-3 text-white">
      <span v-if="!isLoggedIn">Who are you?</span>
      <span v-else
        >Welcome, <span v-show="isMember">Member</span
        ><span v-show="isGuest">Guest</span>
        You are
        <span v-show="isAuthor"> an author</span>
        <span v-show="isAdmin"> an administrator</span>
        <span v-show="!(isAuthor || isAdmin)"> fantastic.</span></span
      >
      <template v-slot:action>
        <a :href="loginUrl">Login with GitHub via Power Up API</a>
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
    const isMember = computed(() => store.getters['session/isMember'])
    const isAuthor = computed(() => store.getters['session/isAuthor'])
    const isAdmin = computed(() => store.getters['session/isAdmin'])
    const isGuest = computed(() => store.getters['session/hasRole']('guest'))
    return {
      loginUrl: process.env.LOGIN_URL_BASE + '/login/github',
      isLoggedIn,
      isMember,
      isAuthor,
      isAdmin,
      isGuest,
    }
  },
}
</script>

<style></style>
