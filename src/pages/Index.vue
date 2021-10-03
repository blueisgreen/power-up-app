<template>
  <q-page class="flex">
    <div class="q-pa-md">
      <q-list>
        <q-item
          v-for="article in articles"
          :key="article.id"
          clickable
          class="article-block"
          @click="() => viewArticle(article.id)"
        >
          <q-item-section>
            <q-item-label>{{ article.headline }}</q-item-label>
            <q-item-label caption>by {{ article.byline }}</q-item-label>
            <q-item-label>created on {{ formatDayMonthYear(article.createdAt) }}</q-item-label>
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
import { defineComponent, onMounted } from 'vue'
import { useStore, mapGetters } from 'vuex'
import { formatDayMonthYear } from '../composables/powerUpUtils'

export default defineComponent({
  name: 'PageIndex',
  setup() {
    const store = useStore()
    onMounted(() => store.dispatch('articles/refreshArticles'))
    return {
      store,
      formatDayMonthYear,
    }
  },
  computed: {
    ...mapGetters('articles', ['articles']),
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
  border-bottom: $primary solid 3px;
  padding-top: 2em;
  padding-bottom: 2em;
}
</style>
