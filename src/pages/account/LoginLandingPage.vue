<template>
  <q-page class="q-pa-md">
    <h3>Login</h3>
    <q-card bordered>
      <q-card-section>
        This page should redirect immediately to where you want to be.
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        Session Token: {{ token }} <br />
        Go To Page: {{ goTo }} <br />
      </q-card-section>
      <q-separator inset />
      <q-card-section> Session Details: {{ authDetails }} </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useUserStore } from '../../stores/user'
import jwtDecode from 'jwt-decode'
import { setAuthHeader } from '../../boot/axios'

// stash jwt for use in subsequent API calls
// stash roles and preferences in local store
// redirect to page or home (default)
// or handle failure to log in

export default defineComponent({
  setup() {
    const store = useStore()
    const userStore = useUserStore()
    const setUserInfo = (token, user) => {
      setAuthHeader(token)
      userStore.signInUser({ user })
      store.dispatch('auth/signInUser', { user })
    }
    return {
      setUserInfo,
    }
  },
  data() {
    const { token, goTo } = this.$route.query
    const authDetails = jwtDecode(token)
    this.setUserInfo(token, authDetails.user)
    return {
      token,
      goTo,
      authDetails,
    }
  },
  mounted() {
    console.log('mounted: redirect to', this.goTo)
    const navMap = {
      home: 'FrontPage',
      register: 'MemberRegistration',
    }
    const destination = navMap[this.goTo]
    if (this.goTo) {
      this.$router.push({ name: destination })
    }
  },
})
</script>

<style scoped></style>
