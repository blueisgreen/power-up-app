<template>
  <q-btn-group push spread>
    <q-btn
      push
      size="sm"
      padding="xs"
      label="Edit"
      color="primary"
      icon="edit"
      :disable="!canEdit"
      @click="() => editArticle(article.id)"
    />
    <q-btn
      v-if="canPublish"
      push
      size="sm"
      padding="xs"
      label="Publish"
      color="positive"
      icon="publish"
      @click="() => workbench.publish(article.id)"
    />
    <q-btn
      v-if="canRetract"
      push
      size="sm"
      padding="xs"
      label="Retract"
      color="positive"
      icon="unpublished"
      @click="() => workbench.retract(article.id)"
    />
    <q-btn
      v-if="canArchive"
      push
      size="sm"
      padding="xs"
      label="Archive"
      color="warning"
      icon="archive"
      @click="() => workbench.archive(article.id)"
    />
    <q-btn
      v-if="canRestore"
      push
      size="sm"
      padding="xs"
      label="Revive"
      color="warning"
      icon="unarchive"
      @click="() => workbench.revive(article.id)"
    />
    <q-btn
      v-if="canDelete"
      push
      size="sm"
      padding="xs"
      label="Delete"
      color="negative"
      icon="delete"
      @click="() => workbench.purge(article.id)"
    />
  </q-btn-group>
</template>

<script>
import { defineComponent } from 'vue'
import { useUserStore } from 'src/stores/user'
import { useWorkbenchStore } from 'src/stores/workbench'

export default defineComponent({
  props: {
    article: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const user = useUserStore()
    const workbench = useWorkbenchStore()
    return {
      user,
      workbench,
    }
  },
  computed: {
    canEdit() {
      return !this.article.publishedAt
    },
    canPublish() {
      return !this.article.publishedAt
    },
    canRetract() {
      return !!this.article.publishedAt
    },
    canArchive() {
      return !this.article.archivedAt
    },
    canRestore() {
      return !!this.article.archivedAt
    },
    canDelete() {
      return !!this.article.archivedAt
    },
  },
  methods: {
    editArticle(id) {
      this.$router.push({ name: 'ArticleComposer', params: { articleId: id } })
    },
  },
})
</script>

<style lang="scss" scoped></style>
