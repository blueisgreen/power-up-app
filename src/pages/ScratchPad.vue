<template>
  <q-page>
    <div class="q-pa-md text-h3">Scratch Pad</div>
    <role-assignment-selector
      :role-options="options"
      :assigned-roles="starting"
      @add-item="add"
      @remove-item="remove"
    />
    <assignment-selector
      :available-items="roles"
      :assigned-items="assignedRoles"
    />
    <q-card>
      <q-card-section class="bg-secondary">
        <q-card-actions align="around">
          <q-btn class="bg-positive" @click="noop">Save</q-btn>
          <q-btn class="bg-warning" @click="noop">Cancel</q-btn>
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import RoleAssignmentSelector from './admin/RoleAssignmentSelector.vue'
import AssignmentSelector from '../components/AssignmentSelector.vue'

export default defineComponent({
  name: 'ScratchPad',
  components: { RoleAssignmentSelector, AssignmentSelector },
  setup() {
    return {
      options: ref([
        { code: 'admin', display: 'System Administrator' },
        { code: 'editorInChief', display: 'Editor in Chief' },
        { code: 'member', display: 'Member' },
        { code: 'author', display: 'Author' },
        { code: 'editor', display: 'Editor' },
      ]),
      starting: ref(['member', 'author']),
      roles: ref([
        { value: 'admin', label: 'System Administrator' },
        { value: 'editorInChief', label: 'Editor in Chief' },
        { value: 'member', label: 'Member' },
        { value: 'author', label: 'Author' },
        { value: 'editor', label: 'Editor' },
      ]),
      assignedRoles: ref(['member', 'author']),
    }
  },
  methods: {
    add(role) {
      if (role) {
        this.starting.push(role.code)
      }
    },
    remove(role) {
      this.starting = this.starting.filter((item) => item !== role)
    },
    noop() {
      console.log('not implemented')
    },
  },
})
</script>
