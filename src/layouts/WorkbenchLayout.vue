<template>
  <q-page class="q-pa-md">
    <q-banner class="bg-accent text-white text-center" inline-actions>
      <span class="text-weight-bold text-uppercase">Workbench</span>
      <template #action>
        <q-btn icon="help" round color="purple-3" @click="help = true"></q-btn>
      </template>
    </q-banner>

    <q-dialog v-model="help">
      <q-card>
        <q-card-section>
          <div class="text-h6">How to Use the Workbench</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Start by entering a headline for the article you are writing. You will
          be able to change it later. Then click the big "+ Add" button. Your
          article will appear in the list of your articles.
        </q-card-section>

        <q-card-section class="q-pt-none">
          Now click on the EDIT button. That will open your article where you can change the title, decide what byline to use (your alias, your real name, whatever you like), and most
          importantly, write the contents of the article. Each field gets saved as you go. The big text areas have their own Save buttons, so that you can save as you go.
        </q-card-section>

        <q-card-section class="q-pt-none">
          You leave the editor by clicking on one of the actions at the bottom. (You'll see.) Be sure to choose the one that saves your work.
        </q-card-section>

        <q-card-section class="q-pt-none">
          When everything is ready, you will want to publish your article, which makes it available to readers who come to Power Up Magazine. Click the PUBLISH button. If you are a verified contributor, your article will simply appear. Ta da!
        </q-card-section>

        <q-card-section class="q-pt-none">
          When unverified writers click PUBLISH, the article will be pending until one of Power Up Magazine's editors takes a look. Either the editor will approve finish publishing the article, or you will get a message that explains any problems that need to be resolved.
        </q-card-section>

        <q-card-section class="q-pt-none">
          Finally, if you want to change a published article, you have to RETRACT it first. That means it will stop being shown. Maybe you want to fix a typo or do some editing. For now, you can only edit unpublished articles, so click RETRACT and then EDIT. Publish again whenever you are ready.
        </q-card-section>

        <q-card-section class="q-pt-none">
          P.S. Use ARCHIVE to throw your article away. It will be gone, although we might be able to recover it for you it you archived by mistake.
        </q-card-section>

        <q-card-section class="q-pt-none">
          P.P.S. Have fun!
        </q-card-section>

        <q-card-actions align="right">
          <q-btn v-close-popup flat label="OK" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <router-view />
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useContextStore } from 'src/stores/context'

export default defineComponent({
  setup() {
    const context = useContextStore()
    return {
      help: ref(false),
      context,
    }
  },
  mounted() {
    this.context.setUserMessage('Time to work on that article.')
  },
})
</script>

<style>
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 0;
  margin-bottom: 0.5em;
  margin-left: 0.5em;
}
.section {
  margin-top: 2em;
}
</style>
