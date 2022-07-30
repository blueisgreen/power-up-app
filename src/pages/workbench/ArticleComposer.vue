<template>
  <q-page class="q-pa-md">
    <h4>Article: {{ draft.headline }}</h4>
    <div class="q-gutter-sm">Key: {{ $route.params.articleKey }}</div>
    <div>
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
          <q-card v-if="!editSynopsis" class="my-card">
            <q-card-section horizontal>
              <div class="q-pt-sm q-pl-sm" v-html="draft.synopsis" />
              <q-space />
              <q-card-actions vertical>
                <q-btn flat round icon="edit" @click="handleSynopsisEdit" />
              </q-card-actions>
            </q-card-section>
          </q-card>
          <composition-editor
            v-if="editSynopsis"
            :starting-text="draft.synopsis"
            bare-bones
            max-height="150px"
            @save-work="handleSynopsisSave"
          />
        </div>
        <div>
          <div class="text-h4">Article Body</div>
          <q-card v-if="!editArticle" class="my-card">
            <q-card-section horizontal>
              <div class="q-pt-sm q-pl-sm" v-html="draft.content" />
              <q-space />
              <q-card-actions vertical>
                <q-btn flat round icon="edit" @click="handleArticleEdit" />
              </q-card-actions>
            </q-card-section>
          </q-card>
          <composition-editor
            v-if="editArticle"
            :starting-text="draft.content"
            font-options
            max-height="400px"
            @save-work="handleArticleSave"
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
      editSynopsis: ref(false),
      editArticle: ref(false),
    }
  },
  async created() {
    await this.workbench.loadArticleForEdit(this.$route.params.articleKey)
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
    handleSynopsisEdit() {
      this.editSynopsis = true
    },
    handleSynopsisSave(content) {
      console.log('saving synopsis', content)
      this.draft.synopsis = content
      this.editSynopsis = false
    },
    handleArticleEdit() {
      this.editArticle = true
    },
    handleArticleSave(content) {
      this.draft.content = content
      this.editArticle = false
    },
  },
}
</script>

<style>
.my-card {
  width: 100%;
  max-width: 350px;
}
</style>
