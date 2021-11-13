<template>
  <div class="v-space">
    <div class="text-caption">
      On {{ formatDate(message.createdAt) }}, you said:
    </div>
    <div class="message-window text-body1">{{ message.message }}</div>
  </div>
</template>

<script>
import { formatDate } from '../../composables/powerUpUtils'

export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {
      formatDate,
    }
  },
}
</script>

<style>
.v-space {
  margin-top: 1em;
}
</style>
