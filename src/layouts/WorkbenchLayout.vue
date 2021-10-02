<template>
  <q-page class="q-pa-md">
    <q-banner class="bg-accent text-white text-center">
      <span class="text-weight-bold text-uppercase">Workbench</span>
    </q-banner>
    <router-view />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<style>
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
.section {
  margin-top: 2em;
}
</style>
