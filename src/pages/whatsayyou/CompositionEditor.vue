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
          handler: handleSave,
        },
        subscript: {
          icon: 'subscript',
        },
        superscript: {
          icon: 'superscript',
        },
      }"
      :toolbar="[
        [
          {
            label: '',
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            list: 'only-icons',
            options: ['left', 'center', 'right', 'justify'],
          },
        ],
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        ['quote', 'link', 'unordered', 'ordered'],
        ['save'],
      ]"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CompositionEditor',
  props: {
    original: {
      type: String,
      default: '',
    },
  },
  emits: ['saveWork'],
  setup() {
    return {
      composition: ref(''),
    }
  },
  created() {
    if (this.original) {
      this.composition = this.original
    }
  },
  methods: {
    handleSave() {
      this.$emit('saveWork', this.composition)
    },
  },
})
</script>

<style lang="scss" scoped></style>
