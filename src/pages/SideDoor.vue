<template>
  <q-page class="flex">
    <div class="q-pa-md">
      <h3 class="headline-font">You Have Found the Side Door</h3>
      <h4 class="headline-font">Authorized access only</h4>
      <authorization-widget side-door />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import AuthorizationWidget from 'components/AuthorizationWidget.vue'

export default defineComponent({
  name: 'SideDoorAccess',
  components: {
    AuthorizationWidget,
  },
})
</script>
