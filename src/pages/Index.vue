<template>
  <q-page class="flex">
    <div class="q-pa-md">
      <div class="row q-gutter-md">
        <div class="col-sm">
          <q-card class="my-card">
            <img src="https://cdn.quasar.dev/img/mountains.jpg" />
            <q-card-section>
              <div class="text-h6">How It Works</div>
              <div class="text-subtitle2">by Zanzibar</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              Everything you need to know about the parts of a nuclear power
              plant. Find out now.
            </q-card-section>
          </q-card>
        </div>
        <div v-for="article in articles" :key="article.id" class="col-sm">
          <q-card class="my-card">
            <img src="https://cdn.quasar.dev/img/mountains.jpg" />
            <q-card-section>
              <div class="text-h6">{{ article.headline }}</div>
              <div class="text-subtitle2">by {{ article.byline }}</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              {{ article.content }}
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { fetchArticles } from '../api/PowerUpApi'

export default defineComponent({
  name: 'PageIndex',
  setup() {
    let articles = ref([])
    const getArticles = async () => {
      const results = await fetchArticles()
      results.data.forEach((article) => articles.value.push(article))
    }

    onMounted(getArticles)

    return {
      articles,
      lorem:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      getArticles,
    }
  },
})
</script>
