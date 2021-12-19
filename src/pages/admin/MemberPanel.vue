<template>
  <div class="q-pa-md">
    <h3>Member Administration</h3>
    <ul>
      <li v-for="user in users" :key="user.userKey">{{user.alias}} : {{user.userKey}}</li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import { useStore, mapGetters } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    onMounted(() => {
      store.dispatch('admin/refreshUsers')
    })
  },
  computed: {
    ...mapGetters('admin', ['users'])
  }
})
</script>