<template>
  <q-page class="q-pa-md">
    <h4>Edit Article {{ $route.params.articleId }}</h4>
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
        <q-editor v-model="draft.content"
          min-height="5rem"
          :toolbar="[
            ['left', 'center', 'right', 'justify'],
            ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
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
    <q-btn :to="{ name: 'ArticleWorkbench' }" replace>Back to Workbench</q-btn>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  props: {
    articleId: {
      type: String,
      required: true,
    }
  },
  setup(props, context) {
    const shell = {
        headline: '',
        byline: '',
        content: ''
      }
    const draft = ref(shell)
    const store = useStore()
    const route = useRoute()

    onMounted(() => {
      const id = this.articleId
      console.log('id', id)
      const lookup = store.getters['articles/getArticle'](id)
      console.log('article', lookup)
      if (lookup) {
        this.draft = Object.assign({}, lookup)
      }
    })

    return {
      store,
      draft,
    }
  },
  methods: {
    loadArticleAsDraft() {
      const lookup = this.store.getters['articles/getArticle'](this.$route.params.articleId)
      draft = lookup ? lookup : {
        headline: 'You are great',
        byline: 'the great one',
        content: 'read this shtuff'
      }
    },
    save() {
      this.store.dispatch('articles/save', Object.assign({}, this.draft)) // save a copy
    }
  }
}
</script>

<style></style>
