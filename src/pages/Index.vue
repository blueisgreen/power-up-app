<template>
  <q-page class="flex">
    <div class="q-pa-md">
      <article-recommendations />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import ArticleRecommendations from '../components/ArticleRecommendations.vue'

export default defineComponent({
  name: 'IndexPage',
  components: {
    ArticleRecommendations,
  },
})
</script>

<style lang="scss" scoped></style>
