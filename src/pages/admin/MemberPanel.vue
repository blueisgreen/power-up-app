<template>
  <div class="q-pa-md">
    <h3>Member Administration</h3>
    <q-toolbar class="text-primary">
      <q-toolbar-title>
        Find Member
        <q-input v-model="searchQuery" label="Alias" stack-label />
      </q-toolbar-title>
      <q-btn flat round dense icon="fas fa-search" @click="search" />
    </q-toolbar>

    <q-list>
      <q-item
        v-for="user in users"
        :key="user.userKey"
        clickable
        @click="() => selectMember(user)"
      >
        <q-item-section avatar>
          <img :src="user.avatarUrl" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ user.alias }}</q-item-label>
          <q-item-label caption lines="2">{{ user.userKey }}</q-item-label>
          <q-item-label caption lines="3">{{ user.createdAt }}</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-item-label caption>{{ user.email }}</q-item-label>
          <q-item-label v-for="role in user.roles" :key="role"
            >{{ role }},</q-item-label
          >
        </q-item-section>
      </q-item>
    </q-list>
    <q-card v-if="selected" class="my-card bg-secondary text-white">
      <q-card-section>
        <div class="text-h6">{{ selected.alias }}</div>
        <div class="text-subtitle2">member information</div>
      </q-card-section>
      <q-card-section>
        Assigned Roles
        <ul>
          <li v-for="role in roles" :key="role">{{ role }}</li>
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
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { useStore, mapGetters } from 'vuex'
import { fetchUserRoles } from '../../api/PowerUpApi'

export default defineComponent({
  setup() {
    const store = useStore()
    onMounted(() => {
      store.dispatch('admin/refreshUsers')
      store.dispatch('admin/loadRoleOptions')
    })
    return {
      store,
      searchQuery: ref(null),
      showDetail: ref(false),
      selected: ref(null),
      roles: ref([]),
      roleToAdd: ref(null),
    }
  },
  computed: {
    ...mapGetters('admin', ['users']),
    unassignedRoles() {
      const allRoles = this.store.state.admin.roles
      if (!this.selected) {
        return allRoles
      } else {
        const diff = allRoles.filter(
          (check) => !this.roles.includes(check.code)
        )
        return diff
      }
    },
  },
  methods: {
    search() {
      console.log('You are looking for', this.searchQuery)
    },
    async selectMember(member) {
      this.selected = member
      const roles = await fetchUserRoles(this.selected.userKey)
      console.log('Found roles:', roles)
      this.roles = roles
    },
  },
})
</script>
