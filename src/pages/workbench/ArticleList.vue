<template>
  <div class="text-h4">Articles</div>
  <p v-if="workbench.articleList.length < 1">None found</p>
  <q-list v-if="workbench.articleList.length" bordered separator dense>
    <q-item>
      <q-item-section>
        <q-item-label header>Headline / Byline</q-item-label>
      </q-item-section>
      <q-item-section>
        <q-item-label header>Status</q-item-label>
      </q-item-section>
      <q-item-section>
        <q-item-label header>Actions</q-item-label>
      </q-item-section>
    </q-item>
    <q-item v-for="article in workbench.articleList" :key="article" v-ripple>
      <q-item-section>
        <q-item-label>{{ article.headline }}</q-item-label>
        <q-item-label caption>{{ article.byline }}</q-item-label>
      </q-item-section>
      <q-item-section>
        <q-item-label v-if="!!article.archivedAt"
          >Archived since {{ formatDayMonthYear(article.archivedAt) }}</q-item-label
        >
        <q-item-label v-if="!!article.publishedAt"
          >Published since
          {{ formatDayMonthYear(article.publishedAt) }}</q-item-label
        >
        <q-item-label v-if="!!article.requestedToPublishAt" class="text-weight-bolder text-italic"
          >Pending approval since
          {{ formatDayMonthYear(article.requestedToPublishAt) }}</q-item-label
        >
        <q-item-label
          >Last updated on {{ formatDayMonthYear(article.createdAt) }}</q-item-label
        >
        <q-item-label
          >Created on {{ formatDayMonthYear(article.createdAt) }}</q-item-label
        >
      </q-item-section>
      <q-item-section>
        <article-lifecycle-actions :article="article" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { defineComponent } from 'vue'
import { useWorkbenchStore } from '../../stores/workbench'
import { formatDayMonthYear } from '../../composables/powerUpUtils'
import ArticleLifecycleActions from './ArticleLifecycleActions.vue'

export default defineComponent({
  components: {
    ArticleLifecycleActions,
  },
  setup() {
    const workbench = useWorkbenchStore()
    return {
      workbench,
      formatDayMonthYear,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
