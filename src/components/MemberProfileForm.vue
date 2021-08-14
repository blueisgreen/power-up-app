<template>
  <div class="q-pa-md" style="max-width: 500px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="profile.screenName"
        label="Screen Name *"
        hint="Your moniker, your handle, how people will know it's you"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        type="email"
        v-model="profile.email"
        label="Email address *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-toggle v-model="accept" label="I accept the license and terms" />

      <div>
        <h4>Roles</h4>
        <ul>
          <li v-for="role in roles" :key="role">{{ role }}</li>
        </ul>
      </div>

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

const onSubmit = () => {
  console.log('IMPLEMENT ME')
}
const onReset = () => {
  console.log('IMPLEMENT ME')
}
export default {
  setup() {
    const store = useStore()
    const screenName = computed(() => store.state.auth.screenName)
    const roles = computed(() => store.state.auth.roles)

    return {
      onSubmit,
      onReset,
      profile: {
        screenName,
        email: 'bubba@happyspiritpublishing.com',
        accessToken: '',
      },
      roles,
      accept: false,
    }
  },
}
</script>

<style>
h4 {
  margin-bottom: 0.5rem;
}
</style>
