<template>
  <q-card v-if="selected" class="my-card bg-secondary text-white">
    <q-card-section>
      <div class="text-h6">{{ selected.alias }}</div>
      <div class="text-subtitle2">member information</div>
    </q-card-section>
    <q-card-section>
      Assigned Roles
      <ul>
        <li v-for="role in selected.roles" :key="role">{{ role }}</li>
      </ul>
    </q-card-section>
    <q-separator dark />
    <q-card-section>
      <select :v-model="roleToAdd">
        <option
          v-for="altRole in unassignedRoles"
          :key="altRole.id"
          :value="altRole.code"
        >
          {{ altRole.displayName }}
        </option>
      </select>
      <q-btn flat>Assign Role</q-btn>
    </q-card-section>
    <q-card-actions>
      <q-btn flat>Remove Role</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
export default defineComponent({
  props: {
    selected: {
      type: Object,
      required: true,
    },
  },
  setup() {
    onMounted(() => {
      store.dispatch('admin/loadRoleOptions')
    })
  },
  computed: {
    unassignedRoles() {
      const allRoles = this.store.state.admin.roleOptions || []
      if (!this.selected) {
        return allRoles
      } else {
        const diff = allRoles.filter(
          (check) => !this.roleOptions.includes(check.code)
        )
        return diff
      }
    },
  },
})
</script>

<style scoped></style>
