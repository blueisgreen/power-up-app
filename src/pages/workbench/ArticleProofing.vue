<template>
  <q-page class="q-pa-md">
    <div class="text-h4">Articles to Review</div>
    <div class="section">-- search / filter bar goes here --</div>
    <div class="section">
      <q-list v-if="workbench.articlesToReview.length" bordered separator dense>
        <q-item>
          <q-item-section side>Submitted</q-item-section>
          <q-item-section>
            <q-item-label header>Headline / Byline / Author</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label header>Actions</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-item
        v-for="article in workbench.articlesToReview"
        :key="article"
        v-ripple
        clickable
        @click="() => selectToReview(article)"
      >
        <q-item-section side top>
          <q-item-label>
            {{ formatDayMonthYear(article.requestedToPublishAt) }}
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ article.headline }}</q-item-label>
          <q-item-label caption>by {{ article.byline }}</q-item-label>
          <q-item-label>Author: {{ article.author }} ({{ article.authorKey }})</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-btn-group>
            <q-btn
              color="primary"
              label="Publish"
              @click="() => publish(article.id)"
            />
            <q-btn
              color="negative"
              label="Send Back"
              @click="() => sendBack(article.id)"
            />
          </q-btn-group>
        </q-item-section>
      </q-item>
    </div>
    <div v-if="active" class="section">
      <div class="text-h3">{{ active.headline }}</div>
      <div class="text-subtitle2">by {{ active.byline }}</div>
      <div class="text-body1">{{ active.content }}</div>
      <q-btn-group>
        <q-btn
          color="primary"
          glossy
          label="Publish"
          @click="() => publish(active.id)"
        />
        <q-btn
          color="negative"
          glossy
          label="Send Back"
          @click="() => sendBack(active.id)"
        />
      </q-btn-group>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useWorkbenchStore } from '../../stores/workbench'
import { formatDayMonthYear } from '../../composables/powerUpUtils'

export default defineComponent({
  components: {},
  setup() {
    const workbench = useWorkbenchStore()
    return {
      active: ref(null),
      workbench,
      formatDayMonthYear,
    }
  },
  created() {
    this.workbench.loadPendingArticles()
  },
  methods: {
    async selectToReview(article) {
      this.active = article
      await this.workbench.lazyLoadArticleContent(article.id)
    },
    clearSelected() {
      this.active = null
    },
    async publish(id) {
      await this.workbench.publish(id)
      this.clearSelected()
      this.workbench.loadPendingArticles()
    },
    async sendBack(id) {
      this.workbench.retract(id)
      this.clearSelected()
      this.workbench.loadPendingArticles()
    },
  },
})
</script>

<style></style>
