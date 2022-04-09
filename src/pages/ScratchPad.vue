<template>
  <q-page>
    <div class="q-pa-md text-h3">Scratch Pad</div>
    <assignment-selector
      :available-items="roles"
      :assigned-items="assignedRoles"
      label="Assignment Prototype"
      @add-item="add"
      @remove-item="remove"
    />
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import AssignmentSelector from '../components/AssignmentSelector.vue'

export default defineComponent({
  name: 'ScratchPad',
  components: { AssignmentSelector },
  setup() {
    return {
      roles: ref([
        { code: 'admin', display: 'System Administrator' },
        { code: 'editorInChief', display: 'Editor in Chief' },
        { code: 'member', display: 'Member' },
        { code: 'author', display: 'Author' },
        { code: 'editor', display: 'Editor' },
      ]),
      assignedRoles: ref(['member', 'author']),
    }
  },
  methods: {
    add(role) {
      if (role) {
        this.assignedRoles.push(role)
      }
    },
    remove(role) {
      this.assignedRoles = this.assignedRoles.filter((item) => item !== role)
    },
    noop() {
      console.log('not implemented')
    },
  },
})
</script>
