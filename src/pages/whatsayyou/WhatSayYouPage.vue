<template>
  <q-page class="q-pa-md" style="max-width: 500px">
    <q-input
      v-model="prose"
      autogrow
      filled
      label="Write something...anything."
    />
    <q-btn @click="save">Say It</q-btn>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'WhatSayYouPage',
  setup() {
    const prose = ref('')
    return {
      prose,
    }
  },
  methods: {
    save() {
      alert('You said:' + this.prose)
    },
  },
})
</script>

<style></style>
