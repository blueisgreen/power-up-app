<template>
  <div class="q-pa-md">
    <h3>Member Administration</h3>
    <q-toolbar class="text-primary">
      <q-toolbar-title>
        Find Member
      <q-input v-model="aliasToFind" label="Alias" stack-label />
      </q-toolbar-title>
      <q-btn flat round dense icon="fas fa-search" @click="search" />
    </q-toolbar>

    <q-list>
      <q-item v-for="user in users" :key="user.userKey" clickable>
        <q-item-section avatar>
          <img :src="user.avatarUrl">
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ user.alias }}</q-item-label>
          <q-item-label caption lines="2">{{ user.userKey }}</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-item-label caption>{{ user.email }}</q-item-label>
          <q-icon name="star" color="yellow" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref} from 'vue'
import { useStore, mapGetters } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    onMounted(() => {
      store.dispatch('admin/refreshUsers')
    })
    return {
      showDetail: ref(false),
      aliasToFind: ref(''),
    }
  },
  computed: {
    ...mapGetters('admin', ['users'])
  },
  methods: {
    search() {
      console.log('you are looking for someone...who goes by...' + this.aliasToFind);
    }
  }
})
</script>