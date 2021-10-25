<template>
  <q-card class="summary-card">
    <q-card-section>
      <div class="text-h6">{{ summary.headline }}</div>
      <div class="text-subtitle2">by {{ summary.byline }}</div>
      <div class="subdued">
        posted on {{ formatDayMonthYear(summary.publishedAt) }}
      </div>
    </q-card-section>

    <q-separator dark inset />

    <!-- <hr class="color: white" /> -->
    <q-card-section class="text-body1">
      <span v-if="summary.synopsis" v-html="summary.synopsis" />
    </q-card-section>
  </q-card>
</template>

<script>
import { formatDayMonthYear, prettyTrunc } from '../composables/powerUpUtils.js'
export default {
  props: {
    summary: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {
      formatDayMonthYear,
      prettyTrunc,
    }
  },
}
</script>

<style lang="sass" scoped>
.summary-card
  width: 100%
  background: #014a88
  color: white
.subdued
  color: $blue-3
</style>
