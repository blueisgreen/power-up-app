<template>
  <q-page class="flex">
    <div class="q-pa-md">
      <q-list>
        <q-item
          v-for="article in articles"
          :key="article.id"
          clickable
          class="article-block"
          @click="
            () =>
              $router.push({
                name: 'ArticlePage',
                params: { articleId: article.id },
              })
          "
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

export default defineComponent({
  name: 'PageIndex',
  setup() {
    let articles = ref([])
    let activeArticle = ref()
    const getArticles = async () => {
      const results = await fetchArticles()
      results.data.forEach((article) => articles.value.push(article))
    }
    const selectArticle = (article) => {
      activeArticle = article
    }

    onMounted(getArticles)

    return {
      articles,
      lorem:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      getArticles,
      selectArticle,
      activeArticle,
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
