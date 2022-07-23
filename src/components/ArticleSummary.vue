<template>
  <q-card bordered class="shadow-5 summary-card">
    <q-card-section>
      <div class="text-h5">{{ summary.headline }}</div>
      <div class="text-subtitle1 text-italic">by {{ summary.byline }}</div>
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
import { defineComponent } from 'vue'
import { formatDayMonthYear } from '../composables/powerUpUtils.js'

export default defineComponent({
  name: 'ArticleSummary',
  props: {
    summary: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {
      formatDayMonthYear,
    }
  },
})
</script>

<style lang="sass" scoped>
.summary-card
  width: 100%
  background: $blue-grey-1
  color: $grey-10
  border: $primary 2px solid
.subdued
  color: $grey-8
</style>
