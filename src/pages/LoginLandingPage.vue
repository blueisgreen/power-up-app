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
import jwtDecode from 'jwt-decode'

// stash jwt for use in subsequent API calls
// stash roles and preferences in local store
// redirect to page or home (default)
// or handle failure to log in

export default defineComponent({
  data() {
    const { session, goTo } = this.$route.query
    const sessionDetails = jwtDecode(session)
    return {
      session,
      goTo,
      sessionDetails,
    }
  },
})
</script>

<style scoped></style>
