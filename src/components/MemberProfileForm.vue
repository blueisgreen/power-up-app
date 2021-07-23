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
const onSubmit = () => {
  console.log('IMPLEMENT ME')
}
const onReset = () => {
  console.log('IMPLEMENT ME')
}
export default {
  setup() {
    return {
      onSubmit,
      onReset,
      profile: {
        screenName: 'Bubba',
        email: 'bubba@happyspiritpublishing.com',
        accessToken: '',
        roles: ['member', 'author'],
      },
      accept: false,
    }
  },
}
</script>

<style></style>
