<template>
  <q-page class="q-pa-md">
    <h4>Article {{ $route.params.articleId }}: {{ draft.headline }}</h4>
    <div class="row">
      <q-form class="q-gutter-md">
        <q-input
          v-model="draft.headline"
          filled
          label="Make it interesting"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
        <q-input
          v-model="draft.byline"
          filled
          label="Who wrote the article"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
        <q-editor
          v-model="draft.synopsis"
          max-height="25rem"
          placeholder="--content goes here--"
          paragraph-tag="p"
          toolbar-push
          dark
        />
        <q-editor
          v-model="draft.content"
          max-height="25rem"
          placeholder="--content goes here--"
          paragraph-tag="p"
          toolbar-push
          dark
          :toolbar="[
            ['left', 'center', 'right', 'justify'],
            [
              'bold',
              'italic',
              'strike',
              'underline',
              'subscript',
              'superscript',
            ],
            ['hr', 'link'],
            [
              {
                label: $q.lang.editor.formatting,
                icon: $q.iconSet.editor.formatting,
                list: 'no-icons',
                options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
              },
              {
                label: $q.lang.editor.fontSize,
                icon: $q.iconSet.editor.fontSize,
                fixedLabel: true,
                fixedIcon: true,
                list: 'no-icons',
                options: [
                  'size-1',
                  'size-2',
                  'size-3',
                  'size-4',
                  'size-5',
                  'size-6',
                  'size-7',
                ],
              },
              {
                label: $q.lang.editor.defaultFont,
                icon: $q.iconSet.editor.font,
                fixedIcon: true,
                list: 'no-icons',
                options: [
                  'default_font',
                  'arial',
                  'arial_black',
                  'comic_sans',
                  'courier_new',
                  'impact',
                  'lucida_grande',
                  'times_new_roman',
                  'verdana',
                ],
              },
              'removeFormat',
            ],
            ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
            ['undo', 'redo'],
            ['viewsource'],
          ]"
          :fonts="{
            arial: 'Arial',
            arial_black: 'Arial Black',
            comic_sans: 'Comic Sans MS',
            courier_new: 'Courier New',
            impact: 'Impact',
            lucida_grande: 'Lucida Grande',
            times_new_roman: 'Times New Roman',
            verdana: 'Verdana',
          }"
        />
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

export default {
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
  },
}
</script>

<style></style>
