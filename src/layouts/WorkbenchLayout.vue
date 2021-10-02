<template>
  <q-page class="q-pa-md">
    <h1>Workbench Layout</h1>
    <router-view />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<style scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 0;
  margin-bottom: 0.5em;
  margin-left: 0.5em;
}
</style>
