<template>
  <q-page>
    <h3>Need Help? Want to Give Us Feedback?</h3>
    <p>
      Use this contact form to ask questions or tell us what you're thinking.
      Earnest inquiries will be responded to. Constructive feedback will be
      heard. Rants may end up on Twitter.
    </p>
    <div class="p-pa-md" style="max-width: 500px">
      <q-form action="">
        <q-input
          v-model="feedback"
          filled
          type="textarea"
          label="Maximum 250 characters"
          :rules="[
            (val) => val.length <= 250 || 'Please use maximum 250 characters',
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
  data() {
    return {
      feedback: ref(''),
    }
  },
}
</script>

<style></style>
