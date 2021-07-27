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
        Provider: {{ provider }} <br />
        Code: {{ code }} <br />
        State: {{ state }}
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { oauthLogin } from '../api/PowerUpService'

export default defineComponent({
  // mounted() {
  //   oauthLogin(this.provider, this.code, this.state)
  // },
  data() {
    const provider = this.$route.params.authProvider
    const { code, state } = this.$route.query
    return {
      provider,
      code,
      state,
    }
  },
})

// stash jwt for use in subsequent API calls
// stash roles and preferences in local store
// or handle failure to log in
</script>

<style scoped></style>
