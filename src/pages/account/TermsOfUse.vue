<template>
  <q-item-label header>Terms of Use</q-item-label>

  <q-item v-if="acceptedAt">
    <q-item-label>
      You agreed to the following terms of use on {{ formatDayMonthYear(acceptedAt) }}.
    </q-item-label>
  </q-item>

  <q-item v-for="term in terms" :key="term.code">
    <div class="q-gutter-sm">
      <q-checkbox
        v-model="term.accepted"
        :label="term.explanation"
        :disable="!!acceptedAt"
      />
    </div>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'
import { formatDayMonthYear } from '../../composables/powerUpUtils'

export default defineComponent({
  props: {
    terms: {
      type: Array,
      default: () => [],
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
