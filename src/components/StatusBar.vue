<template>
  <q-banner class="bg-secondary text-blue-9 text-center">{{
    statusMessage
  }}</q-banner>
</template>

<script>
import { useContextStore } from '../stores/context'

export default {
  setup() {
    const store = useContextStore()
    return { store }
  },
  computed: {
    statusMessage() {
      return this.store.messageToUser
    },
  },
}
</script>

<style></style>
