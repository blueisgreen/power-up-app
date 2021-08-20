<template>
  <q-card
    class="my-card text-white"
    style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
  >
    <img src="https://cdn.quasar.dev/img/mountains.jpg" />
    <q-card-section>
      <div class="text-h6">{{ article.headline }}</div>
      <div class="text-subtitle2">by {{ article.byline }}</div>
    </q-card-section>
    <hr />
    <q-card-section class="q-pt-none">
      <span v-html="article.content" />
    </q-card-section>
    <q-card-actions>
      <q-btn flat>Open</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  min-height: 300px;
  max-height: 500px;
  overflow-y: scroll;
}
</style>
