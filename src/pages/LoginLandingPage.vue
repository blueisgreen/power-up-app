<template>
  <q-page class="q-pa-md">
    <h3>Login</h3>
    <div>
      Use this page to transfer the code received from auth provider to Power Up
      service. Should get a jwt back if everything checks out. Also should get
      back roles. If something goes wrong, use this page to rectify the problem.
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import api from 'api/PowerUpService'

export default defineComponent({
  components: {},
  data() {
    return {}
  },
})

// expect url parameter authProvider and code from query; use these to pass to API

// stash jwt for use in subsequent API calls
// stash roles and preferences in local store
// or handle failure to log in
</script>

<style scoped></style>
