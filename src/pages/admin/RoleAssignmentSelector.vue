<template>
  <div class="q-pa-md">
    <q-card class="my-card">
      <q-card-section horizontal>
        <q-card-section style="width: 50%">
          <div class="text-h6">Assigned</div>
          <div v-for="role in assignedRoles" :key="role">
            {{ display(role) }} <q-btn @click="() => remove(role)">X</q-btn>
          </div>
        </q-card-section>

        <q-separator vertical />

        <q-card-section style="width: 50%">
          <div class="text-h6">Available</div>
          <q-select
            v-model="selectedRole"
            :options="available"
            option-label="display"
            option-value="code"
          ></q-select>
          <div><q-btn @click="add">Assign</q-btn></div>
        </q-card-section>
      </q-card-section>

      <q-separator />

    </q-card>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  props: {
    assignedRoles: {
      type: Array,
      required: true,
    },
    roleOptions: {
      type: Array,
      required: true,
    },
  },
  emits: ['addItem', 'removeItem'],
  setup(props) {
    const selectedRole = ref('')
    return { selectedRole }
  },
  computed: {
    available() {
      return this.roleOptions.filter(
        (role) => !this.assignedRoles.includes(role.code)
      )
    },
  },
  methods: {
    add() {
      if (this.selectedRole) {
        this.$emit('addItem', this.selectedRole)
        this.selectedRole = ''
      }
    },
    remove(role) {
      this.$emit('removeItem', role)
    },
    display(code) {
      if (code && code !== '') {
        const option = this.roleOptions.find((bah) => code === bah.code)
        return option.display
      }
      return '-unknown-'
    },
  },
}
</script>

<style>
.my-card {
  width: 150%;
  max-width: 400px;
}
</style>
