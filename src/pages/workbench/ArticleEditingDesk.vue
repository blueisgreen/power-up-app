<template>
  <q-page class="q-pa-md">
    <div class="text-h4">Articles to Review</div>

    <div class="section">
      <q-toolbar class="bg-grey-3">
        <q-toolbar-title>Filter</q-toolbar-title>
        <q-select
          v-model="editingDesk.filterStatus"
          :options="editingDesk.statusFilterOptions"
          class="filter-style"
          outlined
          clearable
          label="Status"
        />
        <q-separator vertical />
        <q-select
          v-model="editingDesk.filterLimit"
          :options="filterLimitOptions"
          outlined
          class="filter-style"
          label="# per page"
        />
        <q-separator vertical />
        <q-btn icon="search" @click="refresh" />
        <q-space />
        <span v-if="false">
          <q-btn icon="navigate_before" @click="editingDesk.loadNext" />
          <q-btn icon="navigate_next" @click="editingDesk.loadPrior" />
          <q-separator vertical />
          <span>Offset: {{ editingDesk.filterOffset }}</span>
        </span>
      </q-toolbar>
    </div>

    <div class="section">
      <q-list v-if="editingDesk.articleList.length" bordered separator dense>
        <q-item>
          <q-item-section>
            <q-item-label header>Headline / Byline / Author</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label header>Actions / Key Dates</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-item
        v-for="article in editingDesk.articleList"
        :key="article"
        v-ripple
        clickable
        @click="() => selectToReview(article)"
      >
        <q-item-section>
          <q-item-label>{{ article.headline }}</q-item-label>
          <q-item-label caption>by {{ article.byline }}</q-item-label>
          <q-item-label
            >Author: {{ article.author }} ({{
              article.authorKey
            }})</q-item-label
          >
        </q-item-section>
        <q-item-section side top>
          <q-item-label>
            Created: {{ formatDayMonthYear(article.createdAt) }}
          </q-item-label>
          <q-item-label v-if="!!article.publishedAt">
            Published: {{ formatDayMonthYear(article.publishedAt) }}
          </q-item-label>
          <q-item-label v-if="!!article.archivedAt">
            Archived: {{ formatDayMonthYear(article.archivedAt) }}
          </q-item-label>
          <q-item-label v-if="!!article.requestedToPublishAt">
            Request to publish:
            {{ formatDayMonthYear(article.requestedToPublishAt) }}
          </q-item-label>
        </q-item-section>
        <q-item-section v-if="!!article.requestedToPublishAt" side top>
          <q-btn-group rounded>
            <q-btn
              color="green-5"
              icon="check"
              @click="() => publish(article)"
            />
            <q-btn
              color="negative"
              icon="cancel"
              @click="() => confirmDecline(article)"
            />
          </q-btn-group>
        </q-item-section>
      </q-item>
    </div>
    <q-dialog v-model="sendBackPopup" persistent>
      <q-card style="min-width: 350px">
        <q-card-section class="q-pt-none">
          <q-input
            v-model="explanation"
            type="textarea"
            dense
            autofocus
            label="Message to contributor"
            hint="Be kind"
            @keyup.enter="decline"
          />
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn v-close-popup flat label="Cancel" />
          <q-btn
            v-close-popup
            flat
            label="Decline to Publish"
            @click="decline"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div v-if="active" class="section">
      <div class="text-h3">{{ active.headline }}</div>
      <div class="text-subtitle2">by {{ active.byline }}</div>
      <div><span v-html="active.content" /></div>
      <div class="text-body1">{{ active.content }}</div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useWorkbenchStore } from '../../stores/workbench'
import { useEditingDeskStore } from '../../stores/editingDesk'
import { formatDayMonthYear } from '../../composables/powerUpUtils'

export default defineComponent({
  components: {},
  setup() {
    const workbench = useWorkbenchStore()
    const editingDesk = useEditingDeskStore()
    const filterLimitOptions = ['10', '25', '50', '100']
    const defaultRejectMsg =
      'If you would like more information, please email support@happyspiritpublishing.com.'
    return {
      active: ref(null),
      sendBackPopup: ref(false),
      articleToSendBack: ref(null),
      explanation: ref(defaultRejectMsg),
      workbench,
      editingDesk,
      formatDayMonthYear,
      filterLimitOptions,
    }
  },
  created() {
    this.editingDesk.loadPendingArticles()
  },
  methods: {
    async refresh() {
      await this.editingDesk.loadArticles()
    },
    async prior() {},
    async next() {},
    async selectToReview(article) {
      this.active = article
      await this.editingDesk.loadArticleForReview(article.articleKey)
    },
    clearSelected() {
      this.active = null
      this.articleToSendBack = null
      this.explanation = ''
    },
    async publish(article) {
      await this.editingDesk.approveToPublish(article.articleKey)
      this.clearSelected()
    },
    async confirmDecline(article) {
      this.articleToSendBack = article
      this.sendBackPopup = true
    },
    async decline() {
      if (this.articleToSendBack) {
        this.editingDesk.denyToPublish(
          this.articleToSendBack.articleKey,
          this.explanation
        )
        this.clearSelected()
        this.sendBackPopup = false
      } else {
        console.log('Decline to publish')
      }
    },
  },
})
</script>

<style>
.filter-style {
  min-width: 100px;
}
</style>
