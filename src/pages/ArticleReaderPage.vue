<template>
  <q-page>
    <h1>{{ article.title }}</h1>
    <h2>{{ article.byline }}</h2>
    <div>
      <span v-html="article.content" />
    </div>
  </q-page>
</template>
<script>
import { useStore } from 'vuex'
export default {
  props: {
    articleId: {
      type: String,
      required: true,
    },
  },
  setup() {
    $store = useStore()
    return {
      $store,
    }
  },
  computed: {
    article: this.$store.articles.byId[articleId],
  },
}
</script>

<style></style>
