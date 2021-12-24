<template>
  <q-page class="flex">
    <div class="q-pa-md reader-panel">
      <div v-if="activeArticle">
        <div class="text-h4 headline-font">{{ activeArticle.headline }}</div>
        <div class="byline">
          by {{ activeArticle.byline }}
          <span class="float-right">{{ formatDayMonthYear(activeArticle.publishedAt) }}</span>
        </div>
        <q-separator spaced />
        <div class="article">
          <span v-html="activeArticle.content" />
        </div>
      </div>
      <div v-else class="q-pa-md">
        <h1>Now then, where did I leave that article?</h1>
      </div>
      <q-btn color="primary" to="/" label="Pick Another Article" />
    </div>
  </q-page>
</template>
<script>
import { useStore, mapState } from 'vuex'
import { formatDayMonthYear } from '../composables/powerUpUtils'

export default {
  setup() {
    const store = useStore()
    return {
      store,
      formatDayMonthYear,
    }
  },
  computed: {
    ...mapState('context', ['activeArticle']),
  },
  created() {
    const id = this.$route.params.articleId
    console.log('loading article', id)
    this.store.dispatch('articles/loadArticle', { id })
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
