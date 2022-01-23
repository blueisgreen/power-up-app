<template>
  <div>
    <div class="text-h6">{{ user.alias }}</div>
    <role-assignment-selector />
  </div>
</template>

<script>
import RoleAssignmentSelector from './RoleAssignmentSelector.vue'

export default defineComponent({
  components: [RoleAssignmentSelector],
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  setup() {
    onMounted(() => {
      store.dispatch('admin/loadRoleOptions')
    })
  },
  computed: {},
})
</script>

<style scoped></style>
