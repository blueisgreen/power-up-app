<template>
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 400px">
      <p class="text-h4">Become a Member</p>
      <q-form greedy @submit="onSubmit">
        <p class="text-h6">Choose an alias</p>
        <q-input
          v-model="formValues.screenName"
          class="field-vspace"
          label="Screen Name / Alias"
          outlined
          stack-label
          maxlength="50"
          hint="How you will be known to Power Up members."
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
        <p class="text-h6">Terms of use</p>
        <q-scroll-area class="bordered" style="height: 200px">
          <p>
            By using the Power Up website and applications, you are agreeing to
            the following terms of use.
          </p>
          <ul>
            <li>
              This website is for educational and informational purposes only.
              You might also be amused, entertained, dazzled, and inspired. No
              guarantees.
            </li>
            <li>
              Be polite. Constructive commentary, honest feedback, alternative
              viewpoints, and humor are welcome. Personal attacks and abusive
              language are not.
            </li>
            <li>
              You agree to our use of cookies to remember that it is you. We
              want to give you the best experience we can, and that is difficult
              to do if we keep forgetting who you are.
            </li>
            <li>
              These terms are subject to change. When they do, you can find
              updates here.
            </li>
          </ul>
        </q-scroll-area>
        <q-toggle
          v-model="formValues.termsModel"
          class="field-vspace"
          label="I agree to the terms of use."
        />
        <p class="field-vspace">
          Power Up Magazine uses cookies for your benefit when using the
          website.
        </p>
        <q-btn label="Power Up! (Join)" type="submit" color="primary" />
      </q-form>
    </div>
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
          this.formValues.termsModel // terms include accepting cookies
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

<style scoped>
.field-vspace {
  margin-bottom: 1em;
}
.bordered {
  border: 1px solid gray;
  padding: 0.5em;
}
</style>
