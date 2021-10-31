<template>
  <q-item-label header>Terms of Use</q-item-label>
  <q-item v-for="term in terms" :key="term.code">
    <div class="q-gutter-sm">
      <q-checkbox
        v-model="term.accepted"
        :label="term.explanation"
        :disable="!!acceptedAt"
      />
    </div>
  </q-item>
  <q-item-label v-if="acceptedAt">
    You agreed to terms of use on {{ formatDayMonthYear(acceptedAt) }}
  </q-item-label>
</template>

<script>
import { defineComponent } from 'vue'
import { formatDayMonthYear } from '../../composables/powerUpUtils'

export default defineComponent({
  props: {
    terms: {
      type: Object,
      default() {
        return {
          code: '',
          explanation: '',
          accepted: false,
        }
      },
    },
    acceptedAt: {
      type: String,
      default: null,
    },
  },
  setup() {
    return {
      formatDayMonthYear,
    }
  },
})
</script>

<style></style>
