<template>
  <q-card class="shadow-5 summary-card">
    <q-card-section>
      <div class="text-h5">{{ summary.headline }}</div>
      <div class="text-subtitle1">by {{ summary.byline }}</div>
      <div class="subdued">
        {{ formatDayMonthYear(summary.publishedAt) }}
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
  background: $indigo-10
  color: $yellow-12
.subdued
  color: $light-blue-3
</style>
