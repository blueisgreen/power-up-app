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
import { useQuasar } from 'quasar'
import jwtDecode from 'jwt-decode'
import { setAuthHeader } from '../../boot/axios'

// stash jwt for use in subsequent API calls
// stash roles and preferences in local store
// redirect to page or home (default)
// or handle failure to log in

export default defineComponent({
  setup() {
    const store = useStore()
    const setUserInfo = (token, user) => {
      setAuthHeader(token)
      const { publicId, screenName, roles } = user
      store.commit('auth/setToken', { token })
      store.commit('auth/setUserId', { userId: publicId })
      store.commit('auth/setScreenName', { screenName })
      store.commit('auth/setRoles', { roles })
    }
    const setCookies = (token, user) => {
      const q = useQuasar()
      q.cookies.set('session', { token, user }, {
        expires: 30,
        domain: 'powerupmagazine.com',
        sameSite: 'Lax',
      })
      // q.cookies.set('user', user, {
      //   expires: 30,
      //   domain: 'powerupmagazine.com',
      //   sameSite: 'Strict',
      // })
      console.log(q.cookies.getAll())
    }
    return {
      setUserInfo,
      setCookies,
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
