<template>
  <q-page class="flex">
    <div class="q-pa-md">
      <h3 class="headline-font">Nuclear Power is the Future</h3>
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
    </div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import { useContextStore } from '../stores/context'
import { formatDayMonthYear } from '../composables/powerUpUtils'
import ArticleSummary from '../components/ArticleSummary.vue'

export default defineComponent({
  name: 'PageIndex',
  components: {
    ArticleSummary
  },
  setup() {
    const context = useContextStore()
    onMounted(() => context.loadSuggestedArticles())
    return {
      context,
      formatDayMonthYear,
    }
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

<style lang="scss" scoped>
.article-block {
  padding-top: 2em;
  padding-bottom: 2em;
}
</style>
