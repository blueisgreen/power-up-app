<template>
  <q-page class="flex">
    <div class="q-pa-md">
      <q-list>
        <q-item
          v-for="article in articles"
          :key="article.id"
          clickable
          class="article-block"
        >
          <q-item-section>
            <q-item-label>{{ article.headline }}</q-item-label>
            <q-item-label caption>by {{ article.byline }}</q-item-label>
            <br />
            <q-item-label lines="3"
              ><span v-html="article.content"
            /></q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { fetchArticles } from '../api/PowerUpApi'
// import ArticleView from '../components/article/ArticleView.vue'

export default defineComponent({
  name: 'PageIndex',
  // components: { ArticleView },
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

<style lang="scss" scoped>
.article-block {
  border-bottom: $primary solid 3px;
  padding-top: 2em;
  padding-bottom: 2em;
}
</style>
