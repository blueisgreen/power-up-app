<template>
  <q-page class="q-pa-md">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">Ooops, I did it again.</div>
    <div v-if="!(loading || error)" class="content">
      <router-view />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useUserStore } from '../stores/user'

export default defineComponent({
  setup() {
    return {
      error: null,
      user: useUserStore()
    }
  },
  computed: {
    loading() {
      return this.user.profile === null
    },
  },
  created() {
    this.user.fetchMyProfile()
  },
})
</script>

<style scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 0;
  margin-bottom: 0.5em;
  margin-left: 0.5em;
}
</style>
