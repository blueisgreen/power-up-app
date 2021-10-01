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
            <q-btn round dense flat icon="add_circle" @click="createArticle" />
          </template>
        </q-input>
      </form>
    </div>
    <hr/>
    <h4>Articles</h4>
    <q-panel>
      <q-list v-if="articles.length" bordered separator>
        <q-item style="background-color: #0000FF; color: #FFFFFF;font-weight: bold">
          <q-item-section>Headline</q-item-section>
          <q-item-section>Byline</q-item-section>
          <q-item-section>Changes</q-item-section>
          <q-item-section>Actions</q-item-section>
        </q-item>
        <q-item v-for="article in articles" :key="article" v-ripple>
          <q-item-section>
            <q-item-label>{{ article.headline }}</q-item-label>
          </q-item-section>
          <q-item-section>{{ article.byline }}</q-item-section>
          <q-item-section>Created: {{ article.createdAt }}<br />
          Published: {{ article.archivedAt }}<br />
          Archived: {{ article.publishedAt }}</q-item-section>
          <q-item-section>
            <q-btn-group push>
              <q-btn push label="Edit" icon="edit" />
              <q-btn push label="Publish" icon="publish" />
              <q-btn push label="Archive" icon="archive" />
              <q-btn push label="Delete" icon="delete" />
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

export default defineComponent({
  setup() {
    const store = useStore()
    onMounted(() => store.dispatch('articles/refreshArticleCache'))
    return {
      newHeadline: ref(''),
      store,
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
    editArticle(id) {

    },
    archiveArticle(id) {

    },
    deleteArticle(id) {

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
