<template>
  <q-page class="flex">
    <div class="q-pa-md">
      <div class="row q-gutter-md">
        <div v-for="article in articles" :key="article.id" class="col-md">
          <article-view :article="article" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { fetchArticles } from '../api/PowerUpApi'
import ArticleView from '../components/article/ArticleView.vue'

export default defineComponent({
  name: 'PageIndex',
  components: { ArticleView },
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
