<template>
  <q-page class="q-pa-md">
    <h4>Article Workbench</h4>
    <div class="q-gutter-y-md column" style="max-width: 600px">
      <form autofocus @submit.prevent="createArticle">
        <q-input
          v-model="newHeadline"
          outlined
          bottom-slots
          autofocus
          label="Headline"
        >
          <template #hint> Get attention without being clickbait. </template>
          <template #append>
            <q-btn
              round
              dense
              flat
              size="lg"
              icon="add_circle"
              color="primary"
              label="Add"
              no-caps
              @click="createArticle"
            />
          </template>
        </q-input>
      </form>
    </div>
    <div class="section">
      <h4>Articles</h4>
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
              >Created:
              {{ formatDayMonthYear(article.createdAt) }}</q-item-label
            >
            <q-item-label
              >Published:
              {{ formatDayMonthYear(article.publishedAt) }}</q-item-label
            >
            <q-item-label
              >Archived:
              {{ formatDayMonthYear(article.archivedAt) }}</q-item-label
            >
          </q-item-section>
          <q-item-section>
            <article-lifecycle-actions :article="article" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
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
      newHeadline: ref(''),
      workbench,
      formatDayMonthYear,
    }
  },
  created() {
    this.workbench.loadArticleIndex()
  },
  methods: {
    createArticle() {
      if (this.newHeadline != '') {
        this.workbench.create(this.newHeadline)
        this.newHeadline = ''
      }
    },
    editArticle(id) {
      this.$router.push({ name: 'ArticleComposer', params: { articleId: id } })
    },
    publishArticle(id) {
      this.workbench.publish(id)
    },
    retractArticle(id) {
      this.workbench.retract(id)
    },
    archiveArticle(id) {
      this.workbench.archive(id)
    },
    reviveArticle(id) {
      this.workbench.revive(id)
    },
    deleteArticle(id) {
      this.workbench.purge(id)
    },
  },
})
</script>

<style>
h4 {
  margin-top: 0em;
  margin-bottom: 0.5em;
}
</style>
