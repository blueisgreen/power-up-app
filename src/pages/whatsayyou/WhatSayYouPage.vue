<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col" style="max-width: 500px">
        <div class="text-h3">What Say You?</div>
        <composition-editor :starting-text="prose" @save-work="handleSave" />
        <composition-editor
          :starting-text="prose"
          bare-bones
          max-height="100px"
          @save-work="handleSave"
        />
        <composition-editor
          :starting-text="prose"
          bare-bones
          font-options
          @save-work="handleSave"
        />
        <composition-editor font-options @save-work="handleSave" />
      </div>
      <div class="col">
        <div class="text-h3">What You Said</div>
        <q-card>
          <q-card-section>{{ afterMassaging }}</q-card-section>
        </q-card>
        <hr />
        <q-card v-for="(point, index) in savePoints" :key="index">
          <q-card-section><span v-html="point" /></q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import CompositionEditor from '../../components/CompositionEditor.vue'

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
    const savePoints = ref([])
    return {
      prose,
      lastSavePoint,
      savePoints,
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
      this.savePoints.push(blah)
    },
  },
})
</script>

<style></style>
