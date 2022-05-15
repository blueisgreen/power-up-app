<template>
  <q-page class="q-pa-md">
    <p class="text-h1">Account</p>
    <account-settings />
  </q-page>
</template>

<script>
import AccountSettings from "./AccountSettings.vue"

export default {
  components: {
    AccountSettings
  },
  setup() {
  },
}
</script>

<style scoped></style>
