<template>
  <div>
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
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useWorkbenchStore } from '../../stores/workbench'

export default defineComponent({
  setup() {
    const workbench = useWorkbenchStore()
    return {
      newHeadline: ref(''),
      workbench,
    }
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

<style lang="scss" scoped></style>
