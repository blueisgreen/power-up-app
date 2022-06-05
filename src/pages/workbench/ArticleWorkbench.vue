<template>
  <q-page class="q-pa-md">
    <div class="text-h4">Article Workbench</div>
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
      <article-list />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useWorkbenchStore } from '../../stores/workbench'
import ArticleList from './ArticleList.vue'

export default defineComponent({
  components: {
    ArticleList,
  },
  setup() {
    const workbench = useWorkbenchStore()
    return {
      newHeadline: ref(''),
      workbench,
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
  },
})
</script>

<style>
h4 {
  margin-top: 0em;
  margin-bottom: 0.5em;
}
</style>
