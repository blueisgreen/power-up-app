<template>
  <div>
    <span>{{ this.screenName }}</span>
    <q-btn
      v-show="this.status !== 'loggedIn'"
      @click="
        () => {
          this.status = 'loggedIn'
          this.screenName = 'bubba'
        }
      "
      >Login</q-btn
    >
    <q-btn
      v-show="this.status === 'loggedIn'"
      @click="
        () => {
          this.status = 'loggedOut'
          this.screenName = 'anonymous'
        }
      "
      >Logout</q-btn
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: 'loggedOut',
      screenName: 'anonymous',
    }
  },
}
</script>

<style></style>
