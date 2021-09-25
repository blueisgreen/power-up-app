<template>
  <q-page>
    <h1>{{ article.title }}</h1>
    <h2>{{ article.byline }}</h2>
    <div>
      <span v-html="article.content" />
    </div>
  </q-page>
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

<style></style>
