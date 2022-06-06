<template>
  <div class="text-h4">Articles</div>
  <p v-if="!workbench.articles || workbench.articles.length < 1">None found</p>
  <q-list v-if="workbench.articles.length" bordered separator dense>
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
    <q-item v-for="article in workbench.articles" :key="article" v-ripple>
      <q-item-section>
        <q-item-label>{{ article.headline }}</q-item-label>
        <q-item-label caption>{{ article.byline }}</q-item-label>
      </q-item-section>
      <q-item-section>
        <q-item-label
          >Created: {{ formatDayMonthYear(article.createdAt) }}</q-item-label
        >
        <q-item-label
          >Published:
          {{ formatDayMonthYear(article.publishedAt) }}</q-item-label
        >
        <q-item-label
          >Archived: {{ formatDayMonthYear(article.archivedAt) }}</q-item-label
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

<style lang="scss" scoped></style>
