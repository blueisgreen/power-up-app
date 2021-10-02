<template>
  <q-page class="q-pa-md">
    <h4>Edit Article {{ $route.params.articleId }}</h4>
    <q-btn :to="{ name: 'ArticleWorkbench' }" replace>Back to Workbench</q-btn>
  </q-page>
</template>

<script>
export default {}
</script>

<style></style>
