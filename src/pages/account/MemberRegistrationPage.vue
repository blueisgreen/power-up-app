<template>
  <div>
    <registration-form />
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import RegistrationForm from 'components/RegistrationForm.vue'

export default defineComponent({
  components: {
    RegistrationForm
  },
  setup() {
    const store = useStore()
    return {
      screenName: computed(() => store.state.auth.screenName),
    }
  },
  data() {
    return {
      tab: ref('overview'),
      splitterModel: ref(20),
    }
  },
})
</script>

<style scoped></style>
