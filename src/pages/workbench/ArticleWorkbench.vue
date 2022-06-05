<template>
  <q-page class="q-pa-md">
    <div class="text-h4">Article Workbench</div>
    <div class="q-gutter-y-md column" style="max-width: 600px">
      <new-article-widget />
    </div>
    <div class="section">
      <article-list />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import NewArticleWidget from './NewArticleWidget.vue'
import ArticleList from './ArticleList.vue'
import { useWorkbenchStore } from '../../stores/workbench'

export default defineComponent({
  components: {
    NewArticleWidget,
    ArticleList,
  },
  setup() {
    const workbench = useWorkbenchStore()
    return {
      workbench
    }
  },
  created() {
    this.workbench.loadArticleIndex()
  },
})
</script>

<style></style>
