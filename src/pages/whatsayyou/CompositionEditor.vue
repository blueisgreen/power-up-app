<template>
  <div>
    <q-editor
      v-model="composition"
      placeholder="Say whatever is on your mind."
      :definitions="{
        save: {
          tip: 'Save me',
          icon: 'save',
          label: 'Save',
          handler: 'handleSave',
        },
      }"
      :toolbar="[
        [
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            list: 'only-icons',
            options: ['left', 'center', 'right', 'justify'],
          },
        ],
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        ['hr', 'link'],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
        ['save'],
      ]"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CompositionEditor',
  emits: ['saveWork'],
  setup() {
    return {
      composition: ref(''),
      handleSave() {
        $emit('saveWork', this.composition)
      },
    }
  },
})
</script>

<style lang="scss" scoped></style>
