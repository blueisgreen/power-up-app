<template>
  <div>
    <div class="text-h4 text-center">
      {{ user.alias }} ( {{ user.userKey }} )
    </div>
    <role-assignment-selector
      :role-options="roleOptions"
      :starting-roles="user.roles"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import RoleAssignmentSelector from './RoleAssignmentSelector.vue'

export default defineComponent({
  components: { RoleAssignmentSelector },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const store = useStore()
    const roleOptions = store.state.admin.roleOptions
    return {
      roleOptions,
    }
  },
})
</script>

<style scoped></style>
