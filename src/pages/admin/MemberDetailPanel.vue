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
    }
  },
  computed: {
    userRoles() {
      return this.user.roles || []
    },
  },
  methods: {
    addRole(role) {
      // FIXME: use API to update roles
      console.log('add', role)
    },
    removeRole(role) {
      // FIXME: use API to update roles
      console.log('remove', role)
    },
  },
})
</script>

<style scoped></style>
