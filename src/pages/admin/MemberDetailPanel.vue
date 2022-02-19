<template>
  <div>
    <hr />
    <div class="text-h6 text-center">
      {{ user.alias }} ( {{ user.userKey }} )
    </div>
    <role-assignment-selector
      :role-options="roleOptions"
      :assigned-roles="userRoles"
      @add-item="addRole"
      @remove-item="removeRole"
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
      store,
    }
  },
  computed: {
    userRoles() {
      return this.user.roles || []
    },
  },
  methods: {
    addRole(role) {
      this.store.dispatch('admin/assignUserRole', {
        userKey: this.user.userKey,
        role: role.code,
      })
    },
    removeRole(role) {
      this.store.dispatch('admin/unassignUserRole', {
        userKey: this.user.userKey,
        role,
      })
    },
  },
})
</script>

<style scoped></style>
