<template>
  <div class="q-pa-md q-gutter-sm">
    <q-banner rounded class="bg-blue-3 text-white">
      Who are you?
      <template v-slot:action>
        <a href="http://localhost:3000/login/github"
          >Login with GitHub via Power Up API</a
        >
        <a
          href="https://github.com/login/oauth/authorize?client_id=c4884cf58449a331758f&redirect_uri=http://localhost:8080/login/github/callback&state=blargy"
          >Login with GitHub directly</a
        >
        <q-btn
          flat
          color="white"
          label="Sign Up or Sign In"
          to="{ path: 'http://localhost:3000/login/github', exact: true }"
        />
        <span v-show="isLoggedIn">LOGGED IN</span>
        <q-btn flat color="white" label="Sign Out" />
      </template>
    </q-banner>
  </div>
</template>

<script>
export default {
  // might want to fetch the token from here
  computed: {
    isLoggedIn() {
      if (this.$store.getters) {
        console.log(this.$store.getters.isLoggedIn)
        return true
      }
      return false
    },
  },
}
</script>

<style></style>
