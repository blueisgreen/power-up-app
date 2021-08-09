<template>
  <div>
    <h4>Member Registration</h4>
    <member-profile-form />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import MemberProfileForm from 'components/MemberProfileForm.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default defineComponent({
  components: {
    MemberProfileForm,
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
