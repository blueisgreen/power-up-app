<template>
  <div class="q-pa-md">
    <div class="text-h5 row">Roles</div>
    <q-card class="my-card">
      <q-card-section horizontal>
        <q-card-section style="width: 50%">
          <div class="text-h6">Assigned</div>
          <div v-for="role in proposed" :key="role">
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

      <q-card-section class="bg-secondary">
        <q-card-actions align="around">
          <q-btn class="bg-positive" @click="save">Save</q-btn>
          <q-btn class="bg-warning" @click="cancel">Cancel</q-btn>
        </q-card-actions>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
// TODO: try using new setup approach
export default {
  props: {
    startingRoles: {
      type: Array,
      required: true,
    },
    roleOptions: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const proposed = ref([]) // start with a copy of the array passed in
    const selectedRole = ref('')
    onMounted(() => {
      //load initial roles passed as prop
      props.startingRoles.map((item) => this.proposed.push(item))
    })
    return { proposed, selectedRole }
  },
  computed: {
    available() {
      return this.roleOptions.filter(
        (role) => !this.proposed.includes(role.code)
      )
    },
  },
  methods: {
    add() {
      if (this.selectedRole) {
        this.proposed.push(this.selectedRole.code)
        this.selectedRole = ''
      }
    },
    remove(role) {
      console.log('tried to remove', role)
      this.proposed = this.proposed.filter((item) => item !== role)
    },
    save() {
      // emit so that parent component can decide what action to take
      console.log('not implemented: save roles', this.proposed)
    },
    cancel() {
      // reset proposed to given and emit signal to parent component
      console.log('not implemented: cancel')
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
