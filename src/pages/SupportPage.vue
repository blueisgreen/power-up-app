<template>
  <q-page class="q-pa-md">
    <h3>Need Help? Want to Give Us Feedback?</h3>
    <p>
      Use this contact form to get help, ask questions, or tell us what you're
      thinking. Earnest inquiries will be responded to. Constructive feedback
      will be heard.
    </p>
    <div class="p-pa-md" style="max-width: 500px">
      <q-form>
        <q-select
          v-model="typeOfInquiry"
          filled
          :options="typeOfInquiryOptions"
          label="Filled"
        />
        <q-input
          v-model="inquiry"
          filled
          type="textarea"
          label="Maximum 500 characters"
          :rules="[
            (val) =>
              val.length <= 500 || 'Please summarize your comment or question.',
          ]"
        />
        <q-btn color="blue-4">Submit Feedback</q-btn>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    return {
      typeOfInquiry: ref(null),
      typeOfInquiryOptions: [
        'Giving Feedback',
        'Asking For Help',
        'Question',
        'Something Else',
      ],
      inquiry: ref(''),
    }
  },
}
</script>

<style></style>
