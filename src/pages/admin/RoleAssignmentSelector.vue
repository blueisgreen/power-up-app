<template>
  <div class="q-pa-md">
    <div class="row">Roles</div>
    <div class="row">
      <div class="col">
        <q-card class="my-card">
          <q-card-section>
            <div class="text-h6">Assigned</div>
          </q-card-section>
          <q-card-section>
            <ul>
              <li v-for="role in proposed" :key="role">
                {{ role }} <q-btn @click="() => remove(role)">X</q-btn>
              </li>
            </ul>
          </q-card-section>
        </q-card>
      </div>
      <div class="col">
        <q-card class="my-card">
          <q-card-section>
            <div class="text-h6">Available</div>
          </q-card-section>
          <q-card-section>
            <select v-model="roleToAdd">
              <option v-for="role in available" :key="role.code">
                {{ role.display }}
              </option>
            </select>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row">
      <q-btn @click="save">Save</q-btn>
      <q-btn @click="cancel">Cancel</q-btn>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
// TODO: try using new setup approach
export default {
  setup() {
    // TODO: use props for roleOptions and assigned
    const roleOptions = [
      { code: 'member', display: 'Member' },
      { code: 'author', display: 'Author' },
      { code: 'editor', display: 'Editor' },
      { code: 'moderator', display: 'Moderator' },
      { code: 'support', display: 'Support' },
    ]
    const assigned = ['member']

    const proposed = ref(...this.assigned) // start with a copy of the array passed in
    const roleToAdd = ref(null)
    const add = (role) => {
      if (role && role !== '') {
        this.proposed.push(role)
      }
    }
    const remove = (role) => {
      this.proposed.value = this.proposed.filter((item) => item !== role)
    }
    return { roleOptions, proposed, roleToAdd, add, remove }
  },
  computed: {
    available() {
      return this.roleOptions.filter(
        (role) => !this.proposed.includes(role.code)
      )
    },
  },
  methods: {
    save() {
      // emit so that parent component can decide what action to take
      console.log('not implemented: save roles', this.proposed)
    },
    cancel() {
      // reset proposed to given and emit signal to parent component
      console.log('not implemented: cancel')
    },
  },
}
</script>

<style></style>
