<template>
  <q-page class="q-pa-md">
    <h3>Login</h3>
    <q-card bordered>
      <q-card-section>
        Not where you want to be? Sorry. Try the menu.
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { useUserStore } from '../../stores/user'
import { setAuthHeader } from '../../boot/axios'
import jwtDecode from 'jwt-decode'

export default {
  setup() {
    const userStore = useUserStore()
    return {
      userStore,
    }
  },
  created() {
    const navMap = {
      home: 'FrontPage',
      register: 'MemberRegistration',
    }
    const { token, goTo } = this.$route.query
    setAuthHeader(token)

    const authDetails = jwtDecode(token)
    this.userStore.signInUser(authDetails.user)

    console.log('user is', this.userStore.alias, this.userStore.userId)
    console.log('service says redirect to', goTo)

    const destination = this.userStore.isMember
      ? navMap[goTo]
      : navMap['register']

    this.$router.push({ name: destination })
  },
}
</script>

<style scoped></style>
