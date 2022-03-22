<template>
  <div>
    <hr />
    <div class="text-h6 text-center">
      {{ user.alias }} ( {{ user.userKey }} )
    </div>
    <role-assignment-selector
      :role-options="adminStore.roleOptions"
      :assigned-roles="userRoles"
      @add-item="addRole"
      @remove-item="removeRole"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useAdminStore } from '../../stores/admin'
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
    const adminStore = useAdminStore()
    return {
      adminStore: useAdminStore(),
    }
  },
  computed: {
    userRoles() {
      return this.user.roles || []
    },
  },
  methods: {
    addRole(role) {
      this.adminStore.assignUserRole(this.user.userKey, role.code)
    },
    removeRole(role) {
      this.adminStore.unassignUserRole(this.user.userKey, role)
    },
  },
})
</script>

<style scoped></style>
