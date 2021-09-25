<template>
  <q-page>
    <div v-if="article">
      <h1>{{ article.headline }}</h1>
      <h2>{{ article.byline }}</h2>
      <div>
        <span v-html="article.content" />
      </div>
    </div>
    <div v-if="!article">What are we trying to see here?</div>
  </q-page>
</template>
<script>
import { useStore } from 'vuex'
export default {
  computed: {
    article() {
      const articleToView = this.$route.params.articleId
      return useStore().getters['articles/getArticle'](articleToView)
    }
  },
}
</script>

<style></style>
