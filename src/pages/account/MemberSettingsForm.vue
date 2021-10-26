<template>
  <div class="q-pa-md" style="max-width: 500px">
    <q-list>
      <q-list-item>
        <q-list-label>Accepted Terms: {{ formatDayMonthYear(termsAcceptedAt) }}</q-list-label>
      </q-list-item>
      <q-list-item>
        <q-list-label>Accepted Cookies: {{ formatDayMonthYear(termsAcceptedAt) }}</q-list-label>
      </q-list-item>
      <q-list-item>
        <q-list-label>Agreed to Receive Email: {{ formatDayMonthYear(termsAcceptedAt) }} to {{ email }}</q-list-label>
      </q-list-item>
    </q-list>
    <q-form class="q-gutter-md" @submit.stop="onSubmit">
      <q-toggle v-model="model.emailToggle" label="OK to send email" />
      <q-toggle
        v-model="model.cookiesToggle"
        label="I understand that cookies are used to enhance my experience."
      />
    </q-form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore, mapGetters, mapState } from 'vuex'

export default {
  setup() {
    const model = ref({
      emailToggle: emailCommsOk,
      cookiesToggle: cookiesOk
    }) // FIXME figure out best way to set initial state
    const store = useStore()
    return {
      store,
      model
    }
  },
  computed: {
    ...mapState('profile', ['termsAcceptedAt', 'cookiesAcceptedAt', 'emailCommsAcceptedAt', 'email']),
    ...mapGetters('profile', ['termsOk', 'cookiesOk', 'emailCommsOk'])
  },
  methods: {
    onSubmit() {
      console.log('IMPLEMENT');
    },
    onReset() {
      console.log('IMPLEMENT');
    }
  }
}
</script>

<style></style>
