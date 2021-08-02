<template>
  <q-page class="q-pa-md">
    <h3>Login</h3>
    <q-card bordered>
      <q-card-section>
        Use this page to transfer the code received from auth provider to Power
        Up service. Should get a jwt back if everything checks out. Also should
        get back roles. If something goes wrong, use this page to rectify the
        problem.
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        Session Token: {{ session }} <br />
        Go To Page: {{ goTo }} <br />
      </q-card-section>
      <q-separator inset />
      <q-card-section> Session Details: {{ sessionDetails }} </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import jwtDecode from 'jwt-decode'

// stash jwt for use in subsequent API calls
// stash roles and preferences in local store
// redirect to page or home (default)
// or handle failure to log in

export default defineComponent({
  setup() {
    const store = useStore()
    const setUserInfo = (token, sessionInfo) => {
      const { user, screenName, roles } = sessionInfo
      store.commit('session/setSessionToken', { token })
      store.commit('session/setUser', { user })
      store.commit('session/setScreenName', { screenName })
      store.commit('session/setRoles', { roles })
    }
    return {
      setUserInfo,
    }
  },
  data() {
    const { session, goTo } = this.$route.query
    const sessionDetails = jwtDecode(session)
    this.setUserInfo(session, sessionDetails)
    return {
      session,
      goTo,
      sessionDetails,
    }
  },
  mounted() {
    console.log('mounted: redirect to', this.goTo)
    if (this.goTo) {
      this.$router.push({ name: this.goTo })
    }
  },
})
</script>

<style scoped></style>
