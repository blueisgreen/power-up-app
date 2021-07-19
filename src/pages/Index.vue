<template>
  <q-page class="flex flex-center">
    <div>Found {{total.count}} articles.</div>
    <div class="q-pa-md">
      <div class="row q-gutter-md">
        <div class="col-sm">
          <q-card class="my-card">
            <img src="https://cdn.quasar.dev/img/mountains.jpg" />
            <q-card-section>
              <div class="text-h6">The Basics</div>
              <div class="text-subtitle2">by Zanzibar</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              Learn just enough physics to understand nuclear power.
            </q-card-section>
          </q-card>
        </div>
        <div class="col-sm">
          <q-card class="my-card">
            <img src="https://cdn.quasar.dev/img/mountains.jpg" />
            <q-card-section>
              <div class="text-h6">How It Works</div>
              <div class="text-subtitle2">by Zanzibar</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              Everything you need to know about the parts of a nuclear power plant.
            </q-card-section>
          </q-card>
        </div>
        <div class="col-sm">
          <q-card class="my-card">
            <img src="https://cdn.quasar.dev/img/mountains.jpg" />
            <q-card-section>
              <div class="text-h6">Going Forward</div>
              <div class="text-subtitle2">by Zanzibar</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              Find out about Gen IV nuclear power, how it avoids disaster and consumes nuclear waste.
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, reactive } from 'vue'
import { fetchArticles } from '../api/PowerUpService'

export default defineComponent({
  name: 'PageIndex',
  setup() {
    let total = reactive({count:0})
    const getArticles = async () => {
      const results = await fetchArticles()
      total = {count: results.data.length}
    }

    onMounted(getArticles)

    return {
      total,
      lorem:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    }
  },
})
</script>
