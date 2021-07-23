<template>
  <div class="q-pa-md" style="max-width: 500px">
    <q-form class="q-gutter-md">
      <q-toggle v-model="settings.allowEmailComms" label="OK to send email" />
      <q-toggle
        v-model="settings.allowCookies"
        label="I understand that cookies are used to enhance my experience."
      />
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
      settings: {
        allowEmailComms: true,
        allowCookies: true,
      },
    }
  },
}
</script>

<style></style>
