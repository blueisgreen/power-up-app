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
        v-for="user in adminStore.userList"
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
    <MemberDetailPanel v-if="selected" :user="selected" />
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { useAdminStore } from '../../stores/admin'
import MemberDetailPanel from './MemberDetailPanel.vue'

export default defineComponent({
  components: { MemberDetailPanel },
  setup() {
    const adminStore = useAdminStore()
    onMounted(() => {
      adminStore.refreshUsers()
      adminStore.loadRoleOptions()
    })
    return {
      adminStore,
      searchQuery: ref(null),
      showDetail: ref(false),
      selected: ref(null),
      selectedRoles: ref([]),
    }
  },
  methods: {
    search() {
      console.log('You are looking for', this.searchQuery)
    },
    async selectMember(member) {
      this.selected = member
      this.adminStore.loadUserDetails(member.userKey)
    },
  },
})
</script>
