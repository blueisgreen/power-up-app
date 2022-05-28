<template>
  <div>
    <p class="text-h3">Set Up Account</p>
    <q-form greedy @submit="onSubmit">
      <q-input
        v-model="formValues.screenName"
        outlined
        label="Screen Name"
        hint="This is how you would like to be know within the Power Up community. Use an alias, a nickname, your given name, anything you like."
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-toggle
        v-model="formValues.termsModel"
        label="I agree to the terms of use."
      />
      <q-toggle
        v-model="formValues.cookiesModel"
        label="Cookies are fine by me."
      />
      <p>
        Power Up Magazine uses cookies for your benefit when using the website.
      </p>
      <q-btn label="Power Up! (Join)" type="submit" color="primary" />
    </q-form>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { defineComponent, ref } from 'vue'
import { useUserStore } from 'src/stores/user'

export default defineComponent({
  setup() {
    const q = useQuasar()
    const userStore = useUserStore()
    const formValues = ref({
      screenName: '',
      termsModel: false,
      cookiesModel: false,
    })
    return {
      q,
      userStore,
      formValues,
    }
  },
  methods: {
    onSubmit() {
      if (this.formValues.termsModel !== true) {
        this.q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You must accept the terms to join.',
        })
      } else {
        this.userStore.becomeMember(
          this.formValues.screenName,
          this.formValues.termsModel,
          this.formValues.cookiesModel
        )
        this.q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Your application was submitted. Good luck!',
        })
      }
    },
  },
})
</script>

<style scoped></style>
