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

    <div style="max-width: 550px">
      <q-list v-if="articles.length" bordered separator>
        <q-item v-for="article in articles" :key="article" v-ripple clickable>
          <q-item-section>{{ article.headline }}</q-item-section>
          <q-item-section>{{ article.byline }}</q-item-section>
          <q-item-section>{{ article.createdAt }}</q-item-section>
          <q-item-section>{{ article.publishedAt }}</q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { useStore, mapGetters } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    onMounted(() => store.dispatch('articles/refreshArticles'))
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
  },
})
</script>

<style>
h4 {
  margin-top: 0em;
  margin-bottom: 0.5em;
}
</style>
