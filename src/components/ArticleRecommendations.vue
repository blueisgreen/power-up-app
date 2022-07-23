<template>
  <q-list>
    <q-item
      v-for="article in context.suggestedArticles"
      :key="article.articleKey"
      clickable
      class="article-block"
      @click="() => viewArticle(article.articleKey)"
    >
      <q-item-section>
        <article-summary :summary="article" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { defineComponent } from 'vue'
import ArticleSummary from './ArticleSummary.vue'
import { useContextStore } from '../stores/context'

export default defineComponent({
  name: 'ArticleRecommendations',
  components: {
    ArticleSummary,
  },
  setup() {
    const context = useContextStore()
    return {
      context,
    }
  },
  mounted() {
    this.context.loadSuggestedArticles()
  },
  methods: {
    viewArticle(key) {
      this.$router.push({
        name: 'ArticlePage',
        params: { articleKey: key },
      })
    },
  },
})
</script>

<style scoped>
.article-block {
  padding-top: 1em;
  padding-bottom: 1em;
}
</style>
