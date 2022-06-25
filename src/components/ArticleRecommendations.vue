<template>
  <q-list>
    <q-item
      v-for="article in context.suggestedArticles"
      :key="article.id"
      clickable
      class="article-block"
      @click="() => viewArticle(article.id)"
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
    viewArticle(id) {
      this.$router.push({
        name: 'ArticlePage',
        params: { articleId: id },
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
