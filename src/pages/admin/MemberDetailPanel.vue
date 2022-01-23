<template>
  <div>
    <div class="text-h4 text-center">{{ user.alias }} ( {{ user.userKey }} )</div>
    <role-assignment-selector />
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import RoleAssignmentSelector from './RoleAssignmentSelector.vue'

export default defineComponent({
  components: { RoleAssignmentSelector },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
})
</script>

<style scoped></style>
