<template>
  <q-item v-close-popup clickable @click="$emit('makeWish', provider)">
    <q-item-section avatar
      ><q-icon color="gray-10" :name="`fab fa-${provider.code}`"
    /></q-item-section>
    <q-item-section>
      <q-item-label>{{ provider.label }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: {
    provider: {
      type: Object,
      default: () => {
        return {
          code: 'undefined',
          label: '--unspecified--',
        }
      },
    },
  },
  emits: ['makeWish'],
}
</script>

<style></style>
