<template>
  <div class="q-pa-md q-gutter-sm">
    <q-banner rounded class="bg-blue-3 user-message">
      <div v-if="!isSignedIn">Who are you? Log in please.</div>
      <div v-else>
        Hello, {{ screenName }}.
        <span v-if="isGuest">Be our guest.</span>
        <span v-else
          >You are:
          <span v-show="isMember"> /a member/</span>
          <span v-show="isAuthor"> *an author*</span>
          <span v-show="isEditor"> $an editor$</span>
          <span v-show="isEditorInChief"> !the editor in chief!</span>
          <span v-show="isAdmin"> #a system administrator#</span>
        </span>
      </div>
      <template v-slot:action>
        <a v-show="!isSignedIn" :href="loginUrl"
          >Login with GitHub via Power Up API</a
        >
        <q-btn
          v-show="isSignedIn"
          flat
          color="forestgreen"
          label="Sign Out"
          @click="handleSignOut"
        />
      </template>
    </q-banner>
  </div>
</template>

<script>
import { useStore, mapState, mapGetters, mapMutations } from 'vuex'
export default {
  setup() {
    return {
      loginUrl: process.env.API_URL + '/login/github',
      store: useStore(),
    }
  },
  computed: {
    ...mapState('auth', ['userId', 'screenName']),
    ...mapGetters('auth', [
      'isSignedIn',
      'isGuest',
      'isMember',
      'isAuthor',
      'isAdmin',
      'isEditor',
      'isEditorInChief',
    ]),
  },
  methods: {
    handleSignOut() {
      this.store.commit('auth/signOut')
    },
    // ...mapMutations('auth', {
    //   handleSignOut: 'signOut'
    // })
  },
}
</script>

<style scoped>
.user-message {
  color: forestgreen;
}
</style>
