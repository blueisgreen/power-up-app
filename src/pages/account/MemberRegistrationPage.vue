<template>
  <div>
    <registration-form />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import RegistrationForm from 'components/RegistrationForm.vue'

export default defineComponent({
  components: {
    RegistrationForm
  },
})
</script>

<style scoped></style>
