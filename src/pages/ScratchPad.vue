<template>
  <q-page>
    <div class="q-pa-md text-h3">Scratch Pad</div>
    <role-assignment-selector
      :role-options="options"
      :assigned-roles="starting"
      @add-item="add"
      @remove-item="remove"
    />
    <q-card>
      <q-card-section class="bg-secondary">
        <q-card-actions align="around">
          <q-btn class="bg-positive" @click="save">Save</q-btn>
          <q-btn class="bg-warning" @click="cancel">Cancel</q-btn>
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import RoleAssignmentSelector from './admin/RoleAssignmentSelector.vue'

export default defineComponent({
  name: 'ScratchPad',
  components: { RoleAssignmentSelector },
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
  },
})
</script>
