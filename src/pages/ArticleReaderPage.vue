<template>
  <q-page class="flex">
    <div class="q-pa-md reader-panel">
      <div v-if="activeArticle">
        <div class="text-h4 headline-font">{{ activeArticle.headline }}</div>
        <div class="byline">
          by {{ activeArticle.byline }}
          <span class="float-right">{{
            formatDayMonthYear(activeArticle.publishedAt)
          }}</span>
        </div>
        <q-separator spaced />
        <div class="article">
          <span v-html="activeArticle.content" />
        </div>
      </div>
      <div v-else class="q-pa-md">
        <h1>Now then, where did I leave that article?</h1>
      </div>
      <q-btn color="primary" :to="{ name: 'FrontPage' }" label="Pick Another Article" />
    </div>
  </q-page>
</template>
<script>
import { useContextStore } from '../stores/context'
import { formatDayMonthYear } from '../composables/powerUpUtils'

export default {
  setup() {
    const context = useContextStore()
    return {
      context,
      formatDayMonthYear,
    }
  },
  computed: {
    activeArticle() {
      return this.context.article(this.$route.params.articleId)
    },
  },
  created() {
    this.context.loadArticle(this.$route.params.articleId)
  },
  methods: {},
}
</script>
<style scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-left: 0;
}
.byline {
  font-size: large;
  color: teal;
}
.reader-panel {
  padding: 2em;
}
.article {
  font-size: x-large;
}
</style>
