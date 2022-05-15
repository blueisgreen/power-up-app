<template>
  <p class="text-h3">Settings</p>
  <ul>
    <li>alias: {{ userStore.alias }}</li>
    <li>ID: {{ userStore.userId }}</li>
    <li>roles: {{ userStore.roles.join(',') }}</li>
    <li>email: {{ userStore.email }}</li>
    <li>avatar: {{ userStore.avatarUrl }}</li>
    <li>created: {{ userStore.createdAt }}</li>
    <li>updated: {{ userStore.updatedAt }}</li>
    <li>cookies: {{ userStore.areCookiesOkay }}</li>
    <li>terms: {{ userStore.areTermsOkay }}</li>
    <li>mail: {{ userStore.isEmailOkay }}</li>
  </ul>
</template>

<script>
import { useUserStore } from '../../stores/user'

export default {
  setup() {
    const userStore = useUserStore()
    return {
      userStore
    }
  },
  created() {
    this.userStore.fetchMyProfile()
  }
}
</script>

<style>

</style>
