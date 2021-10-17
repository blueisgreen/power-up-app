<template>
    <q-card
      class="my-card text-white"
      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
    >
      <q-card-section>
        <div class="text-h6">{{ summary.headline }}</div>
        <div class="text-subtitle2">by {{ summary.byline }}</div>
        <div class="text-blue-3">posted on {{ formatDayMonthYear(summary.publishedAt) }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ summary.synopsis || summary.content }}
      </q-card-section>
    </q-card>
</template>

<script>
import { formatDayMonthYear } from '../composables/powerUpUtils.js'
export default {
    props: {
        summary: {
            type: Object,
            required: true
        }
    },
    setup() {
        return {
            formatDayMonthYear
        }
    }
}
</script>

<style>

</style>