<template>
  <q-page class="q-pa-md">
    <div class="text-h4">Articles to Review</div>
    <div class="section">
      search / filter bar goes here
    </div>
    <div class="section">list of articles goes here - click to read</div>
    <div class="section">
      place to read - buttons to approve and deny - place to write a message to
      the author - gets stored as a support message
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useWorkbenchStore } from '../../stores/workbench'

export default defineComponent({
  components: {
  },
  setup() {
    const workbench = useWorkbenchStore()
    return {
      workbench,
    }
  },
  created() {
    this.workbench.loadArticleIndex()
  },
})
</script>

<style></style>
