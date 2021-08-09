<template>
  <div>
    <h4>Member Registration</h4>
    <p>*Choose a screen name - what do you want to be called.</p>
    <p>What is your real name?</p>
    <p>Do you agree to our terms of use?</p>
    <p>May we use a cookie to give you a smooth experience?</p>
    <p>May we send you email? Yes / No If yes, what is your email address? confirm if known.</p>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
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
