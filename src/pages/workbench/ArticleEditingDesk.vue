<template>
  <q-page class="q-pa-md">
    <div class="text-h4">Articles to Review</div>
    <div class="section">-- search / filter bar goes here --</div>
    <div class="section">
      <q-list v-if="editingDesk.articleList.length" bordered separator dense>
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
        v-for="article in editingDesk.articleList"
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
          <q-item-label
            >Author: {{ article.author }} ({{
              article.authorKey
            }})</q-item-label
          >
        </q-item-section>
        <q-item-section side top>
          <q-btn-group rounded>
            <q-btn
              color="green-5"
              icon="check"
              @click="() => publish(article.id)"
            />
            <q-btn
              color="negative"
              icon="cancel"
              @click="() => confirmDecline(article.id)"
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
    return {
      active: ref(null),
      sendBackPopup: ref(false),
      articleToSendBack: ref(-1),
      explanation: ref(''),
      workbench,
      editingDesk,
      formatDayMonthYear,
    }
  },
  created() {
    this.editingDesk.loadPendingArticles()
  },
  methods: {
    async refreshArticleList() {
      await this.loadArticlesForEditor()
    },
    async selectToReview(article) {
      this.active = article
      await this.editingDesk.loadArticleContent(article.id)
    },
    clearSelected() {
      this.active = null
      this.articleToSendBack = -1
      this.explanation = ''
    },
    async publish(id) {
      await this.workbench.publish(id)
      this.clearSelected()
      this.editorWorkbench.loadPendingArticles()
    },
    async confirmDecline(id) {
      this.articleToSendBack = id
      this.sendBackPopup = true
    },
    // FIXME: decide whether to combine editor view into workbench; or split out article cache
    async decline() {
      if (this.articleToSendBack > 0) {
        this.workbench.retract(this.articleToSendBack)
        // TODO: send note to author
        console.log('Note to contributor: ' + this.explanation)
        this.clearSelected()
        this.editorWorkbench.loadPendingArticles()
        this.sendBackPopup = false
      } else {
        console.log('Decline to publish')
      }
    },
  },
})
</script>

<style></style>
