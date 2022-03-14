<template>
  <q-page>
    <div>
      <q-img src="https://cdn.powerupmagazine.com/nuclear-power-coexist.jpg" />
    </div>
    <q-page-sticky position="top-right" :offset="[18, 18]">
      <q-btn
        :to="{ name: 'FrontPage' }"
        fab
        icon="add"
        color="primary"
        label="Get Started"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ScratchPad',
  setup() {
    return {}
  },
  methods: {},
})
</script>

<style></style>
