<template>
  <q-page>
    <div class="reader-panel">
      <div v-if="activeArticle">
        <h1>{{ activeArticle.headline }}</h1>
        <h2>{{ activeArticle.byline }}</h2>
        <div>
          <span v-html="activeArticle.content" />
        </div>
      </div>
      <div v-if="!activeArticle">
        <h1>Now then, where did I leave that article?</h1>
      </div>
    </div>
  </q-page>
</template>
<script>
import { useStore, mapState } from 'vuex'
export default {
  setup() {
    const store = useStore()
    return {
      store,
    }
  },
  computed: {
    ...mapState('context', ['activeArticle'])
  },
  created() {
    const id = this.$route.params.articleId
    console.log('loading article', id)
    this.store.dispatch('articles/loadArticle', { id })
  },
  methods: {
  },
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
  font-size: 16pt;
  color: orangered;
  line-height: 2rem;
}
.reader-panel {
  margin: 2em;
  padding: 2em;
  border: ridge 5px lightslategray;
}
</style>
