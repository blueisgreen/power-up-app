<template>
  <div class="q-pa-md q-gutter-sm">
    <q-banner rounded class="bg-blue-3 text-white">
      <span v-if="!isLoggedIn">Who are you? Log in please.</span>
      <span v-else
        >Welcome, <span v-show="isMember">Member.</span
        ><span v-show="isGuest">Guest.</span>
        You are
        <span v-show="isGuest"> amazing!</span>
        <span v-show="isAuthor"> an author!</span>
        <span v-show="isEditor"> an editor!</span>
        <span v-show="isEditorInChief"> the editor in chief!</span>
        <span v-show="isAdmin"> a system administrator!</span>
      </span>
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
    const isGuest = computed(() => store.getters['session/isGuest'])
    const isMember = computed(() => store.getters['session/isMember'])
    const isAuthor = computed(() => store.getters['session/isAuthor'])
    const isAdmin = computed(() => store.getters['session/isAdmin'])
    const isEditor = computed(() => store.getters['session/isEditor'])
    const isEditorInChief = computed(
      () => store.getters['session/isEditorInChief']
    )
    return {
      loginUrl: process.env.LOGIN_URL_BASE + '/login/github',
      isLoggedIn,
      isGuest,
      isMember,
      isAuthor,
      isAdmin,
      isEditor,
      isEditorInChief,
    }
  },
}
</script>

<style></style>
