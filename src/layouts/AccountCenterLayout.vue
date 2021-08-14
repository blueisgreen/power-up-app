<template>
  <q-page class="q-pa-md">
    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="error" class="error">Ooops, I did it again.</div>

    <div v-if="!(loading || error)" class="content">
      <p>Hello, {{ screenName }}</p>
    </div>
    <router-view />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'vuex'

export default defineComponent({
  setup() {
    return {
      loading: false,
      error: null,
    }
  },
  created() {
    this.fetchMyProfile()
  },
  computed: mapState('auth', ['screenName']),
  methods: mapActions('profile', ['fetchMyProfile']),
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
