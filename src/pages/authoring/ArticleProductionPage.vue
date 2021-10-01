<template>
  <q-page class="q-pa-md">
    <h4>Article Production Hub</h4>
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
    <hr />
    <h4>Articles</h4>
    <q-panel>
      <q-list v-if="articles.length" bordered separator dense>
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
        <q-item v-for="article in articles" :key="article" v-ripple clickable>
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
              {{ formatDayMonthYear(article.archivedAt) }}</q-item-label
            >
            <q-item-label
              >Archived:
              {{ formatDayMonthYear(article.publishedAt) }}</q-item-label
            >
          </q-item-section>
          <q-item-section>
            <q-btn-group push spread>
              <q-btn
                push
                size="sm"
                padding="xs"
                label="Edit"
                color="primary"
                icon="edit"
              />
              <q-btn
                push
                size="sm"
                padding="xs"
                label="Publish"
                color="secondary"
                icon="publish"
              />
              <q-btn
                push
                size="sm"
                padding="xs"
                label="Archive"
                color="warning"
                icon="archive"
              />
              <q-btn
                push
                size="sm"
                padding="xs"
                label="Delete"
                color="negative"
                icon="delete"
              />
            </q-btn-group>
          </q-item-section>
        </q-item>
      </q-list>
    </q-panel>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { useStore, mapGetters } from 'vuex'
import { formatDayMonthYear } from '../../composables/powerUpUtils'

export default defineComponent({
  setup() {
    const store = useStore()
    onMounted(() => store.dispatch('articles/refreshArticleCache'))
    return {
      newHeadline: ref(''),
      store,
      formatDayMonthYear,
    }
  },
  computed: {
    ...mapGetters('articles', ['articles']),
  },
  methods: {
    createArticle() {
      if (this.newHeadline != '') {
        this.store.dispatch('articles/createNewArticle', this.newHeadline)
        this.newHeadline = ''
      }
    },
    editArticle(id) {},
    archiveArticle(id) {},
    deleteArticle(id) {},
  },
})
</script>

<style>
h4 {
  margin-top: 0em;
  margin-bottom: 0.5em;
}
</style>
