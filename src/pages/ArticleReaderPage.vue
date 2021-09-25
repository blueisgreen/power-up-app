<template>
  <q-page>
    <div class="reader-panel">
      <div v-if="article">
        <h1>{{ article.headline }}</h1>
        <h2>{{ article.byline }}</h2>
        <div>
          <span v-html="article.content" />
        </div>
      </div>
      <div v-if="!article">
        <h1>Now then, where did I leave that article?</h1>
      </div>
    </div>
  </q-page>
</template>
<script>
import { useStore } from 'vuex'
export default {
  computed: {
    article() {
      const articleToView = this.$route.params.articleId
      return useStore().getters['articles/getArticle'](articleToView)
    },
  },
}
</script>
<style scoped>
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
