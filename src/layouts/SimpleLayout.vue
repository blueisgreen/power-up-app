<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar square>
            <img src="https://cdn.powerupmagazine.com/radioactive-sign.png" />
          </q-avatar>
          Power Up Digital Magazine
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SimpleLayout',
  setup() {
    return {}
  },
})
</script>

<style></style>
