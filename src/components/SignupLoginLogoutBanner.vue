<template>
  <div class="q-pa-md q-gutter-sm">
    <q-banner rounded class="bg-purple-8 text-white">
      Who are you?
      <template v-slot:action>
        <q-btn
          flat
          color="white"
          label="Sign Up or Sign In"
          to="{ path: 'http://localhost:3000/login/github', exact: true }"
        />
        <q-btn flat color="white" label="Sign Out" />
      </template>
    </q-banner>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
