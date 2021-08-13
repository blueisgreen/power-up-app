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
import jwtDecode from 'jwt-decode'
import { setAuthHeader } from '../../boot/axios'

// stash jwt for use in subsequent API calls
// stash roles and preferences in local store
// redirect to page or home (default)
// or handle failure to log in

export default defineComponent({
  setup() {
    const store = useStore()
    const setUserInfo = (token, { user }) => {
      setAuthHeader(token)
      const { publicId, screenName, roles } = user
      store.commit('auth/setToken', { token })
      store.commit('auth/setUserId', { userId: publicId })
      store.commit('auth/setScreenName', { screenName })
      store.commit('auth/setRoles', { roles })
    }
    return {
      setUserInfo,
    }
  },
  data() {
    const { token, goTo } = this.$route.query
    const authDetails = jwtDecode(token)
    console.log('auth info:', authDetails)
    this.setUserInfo(token, authDetails)
    return {
      token,
      goTo,
      authDetails,
    }
  },
  mounted() {
    console.log('mounted: redirect to', this.goTo)
    const navMap = {
      // home: 'FrontPage',
      home: 'MemberRegistration',
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
