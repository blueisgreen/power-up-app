<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn :label="prompt" color="primary" @click="showDialog" />
  </div>
</template>

<script>
import { useQuasar } from 'quasar'

export default {
  props: {
    prompt: {
      type: String,
      default: 'Click Me',
    },
    title: {
      type: String,
      default: 'Information',
    },
    message: {
      type: String,
      default: 'What can I tell you?',
    },
  },
  setup() {
    const q = useQuasar()

    return {
      q,
    }
  },
  methods: {
    showDialog() {
      this.q
        .dialog({
          title: this.title,
          message: this.message,
          html: true,
        })
        .onOk(() => {
          // console.log('OK')
        })
        .onCancel(() => {
          // console.log('Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        })
    },
  },
}
</script>

<style></style>
