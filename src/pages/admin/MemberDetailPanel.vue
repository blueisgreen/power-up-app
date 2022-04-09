<template>
  <div>
    <hr />
    <div class="text-h6 text-center">
      {{ user.alias }} ( {{ user.userKey }} )
    </div>
    <assignment-selector
      :available-items="adminStore.roleOptions"
      :assigned-items="userRoles"
      label="Role Assignments"
      @add-item="addRole"
      @remove-item="removeRole"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useAdminStore } from '../../stores/admin'
import AssignmentSelector from '../../components/AssignmentSelector.vue'

export default defineComponent({
  components: { AssignmentSelector },
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
      this.adminStore.assignUserRole(this.user.userKey, role)
    },
    removeRole(role) {
      this.adminStore.unassignUserRole(this.user.userKey, role)
    },
  },
})
</script>

<style scoped></style>
