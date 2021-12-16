<template>
  <q-page class="flex">
    <div class="q-pa-md reader-panel">
      <div v-if="activeArticle">
        <h4 class="headline-font">{{ activeArticle.headline }}</h4>
        <h2>by {{ activeArticle.byline }}</h2>
        <h3>
          published on {{ formatDayMonthYear(activeArticle.publishedAt) }}
        </h3>
        <q-separator spaced />
        <div>
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
h1 {
  font-size: 24pt;
  font-weight: bold;
  line-height: 2rem;
}
h2 {
  font-size: 18pt;
  color: orangered;
  line-height: 2rem;
}
h3 {
  font-size: 14pt;
  line-height: 2rem;
}
.reader-panel {
  padding: 2em;
  font-size: 12pt;
}
</style>
