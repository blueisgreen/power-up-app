<template>
  <q-page class="flex">
    <div class="q-pa-md">
      <div class="section">
        <router-view />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AboutPage',
})
</script>

<style>
h1 {
  font-size: 48px;
}
h2 {
  font-size: 36px;
  margin-top: 1em;
}
h1, h2 {
  margin-left: 0;
}
li {
  margin-bottom: 0.5em;
}
</style>
