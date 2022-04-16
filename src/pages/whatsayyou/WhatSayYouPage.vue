<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col" style="max-width: 500px">
        <q-input
          v-model="prose"
          autogrow
          filled
          label="Write something...anything."
        />
        <q-editor v-model="prose" />
        <q-btn @click="save">Say It</q-btn>
        <composition-editor save-work="saveMe"/>
      </div>
      <div class="col">
        <div class="text-h2">What You've Said</div>
        <div class="">{{ lastSavePoint }}</div>
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
    CompositionEditor
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
    save() {
      this.lastSavePoint = this.prose
    },
    saveMe(blah) {
      alert('Another great save!', blah)
    }
  },
})
</script>

<style></style>
