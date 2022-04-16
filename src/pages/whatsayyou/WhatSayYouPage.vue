<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col" style="max-width: 500px">
        <composition-editor
          :original="prose"
          @save-work="handleSave"
        />
      </div>
      <div class="col">
        <div class="text-h2">What You've Said</div>
        <q-card>
          <q-card-section>{{ afterMassaging }}</q-card-section>
        </q-card>
        <hr />
        <q-card>
          <q-card-section v-html="afterMassaging" />
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import CompositionEditor from './CompositionEditor.vue'

export default defineComponent({
  name: 'WhatSayYouPage',
  components: {
    CompositionEditor,
  },
  setup() {
    const prose = ref(
      '<p>this is exactly the kind of thing...</p><p>we should tweet about</p>'
    )
    const lastSavePoint = ref('')
    return {
      prose,
      lastSavePoint,
    }
  },
  computed: {
    afterMassaging() {
      return this.lastSavePoint
    },
  },
  methods: {
    handleSave(blah) {
      this.lastSavePoint = blah
    },
  },
})
</script>

<style></style>
