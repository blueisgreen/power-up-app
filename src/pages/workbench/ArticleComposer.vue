<template>
  <q-page class="q-pa-md">
    <h4>Article {{ $route.params.articleId }}: {{ draft.headline }}</h4>
    <div class="row">
      <q-form class="q-gutter-sm">
        <q-input
          v-model="draft.headline"
          filled
          label="Headline: something eye-catching"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
        <q-input
          v-model="draft.byline"
          filled
          label="Byline: who wrote the article"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
        <div>
          <div class="text-h4">Synopsis</div>
          <composition-editor
            :starting-text="draft.synopsis"
            bare-bones
            max-height="150px"
            @save-work="handleSynopsisSave"
          />
        </div>
        <div>
          <div class="text-h4">Article Body</div>
          <composition-editor
            :starting-text="draft.content"
            font-options
            max-height="150px"
            @save-work="handleContentSave"
          />
        </div>
      </q-form>
    </div>
    <q-btn-group spread>
      <q-btn
        color="primary"
        :disable="!workbench.isDraftArticleDirty"
        @click="save"
        >Save</q-btn
      >
      <q-btn color="positive" @click="saveAndClose"
        ><span v-if="workbench.isDraftArticleDirty">Save &amp;&nbsp;</span
        >Close</q-btn
      >
      <q-btn color="warning" :to="{ name: 'ArticleWorkbench' }" replace
        >Cancel</q-btn
      >
    </q-btn-group>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { useWorkbenchStore } from 'src/stores/workbench'
import CompositionEditor from '../../components/CompositionEditor.vue'

export default {
  components: {
    CompositionEditor,
  },
  setup() {
    const workbench = useWorkbenchStore()
    const blankDraft = ref({
      headline: '',
      byline: '',
      synopsis: '',
      content: '',
    })
    return {
      workbench,
      draft: blankDraft,
    }
  },
  async created() {
    await this.workbench.loadArticleForEdit(this.$route.params.articleId)
    this.draft = this.workbench.draftArticle
  },
  methods: {
    save() {
      if (this.workbench.isDraftArticleDirty) {
        this.workbench.saveDraft()
      }
    },
    saveAndClose() {
      this.save()
      this.$router.push({ name: 'ArticleWorkbench' })
    },
    handleSynopsisSave(content) {
      this.draft.synopsis = content
    },
    handleContentSave(content) {
      this.draft.content = content
    },
  },
}
</script>

<style></style>
