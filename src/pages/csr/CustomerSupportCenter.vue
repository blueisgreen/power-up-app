<template>
  <q-page class="q-pa-md">
    <h3>Customer Support Center</h3>
    <q-toolbar class="bg-primary text-white q-my-md shadow-2">
      <q-btn-dropdown stretch flat no-wrap label="Filter">
        <q-list>
          <q-item-label header>By Purpose</q-item-label>
          <q-item>
            <q-item-section side>
              <q-icon name="support" />
            </q-item-section>
            <q-item-section no-wrap>
              <q-item-label>Needs Help</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section side>
              <q-icon name="help" />
            </q-item-section>
            <q-item-section no-wrap>
              <q-item-label>Has Question</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section side>
              <q-icon name="feedback" />
            </q-item-section>
            <q-item-section no-wrap>
              <q-item-label>Gave Feedback</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section side>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section no-wrap>
              <q-item-label>Something Else</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator inset spaced />
          <q-item-label header>Status</q-item-label>
          <q-item>
            <q-item-section side>
              <q-checkbox v-model="showOnlyUnread" />
            </q-item-section>
            <q-item-section no-wrap>
              <q-item-label>Unread Only</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>

      <q-separator dark vertical />
      <q-space />

      <q-input
        v-model="searchQuery"
        dark
        dense
        standout
        input-class="text-right"
        class="q-ml-md"
      >
        <template #append>
          <q-icon v-if="searchQuery === ''" name="search" />
          <q-icon
            v-else
            name="clear"
            class="cursor-pointer"
            @click="searchQuery = ''"
          />
        </template>
      </q-input>
      <q-separator dark vertical />
      <q-btn stretch flat label="Link" />
    </q-toolbar>
    <q-scroll-area class="inquiry-list">
      <q-list>
        <q-item clickable>
          <q-item-section side>
            <q-item-label>20 Aug 2021</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label>Blargy Pants</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label><q-avatar icon="help" /></q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label lines="3">{{ sampleMessage }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
    <q-card>
      <q-tabs
        v-model="inquiryTab"
        inline-label
        class="bg-purple text-white shadow-2"
      >
        <q-tab name="read" icon="mail" label="Read" />
        <q-tab name="respond" icon="send" label="Respond" />
        <q-tab name="history" icon="clock" label="History" />
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="inquiryTab">
        <q-tab-panel name="read">
          <div>{{ sampleMessage }}</div>
        </q-tab-panel>
      </q-tab-panels>
      <q-tab-panels v-model="inquiryTab">
        <q-tab-panel name="respond">
          <q-input v-model="sampleResponse" type="textarea"></q-input>
          <q-btn color="primary">Submit Response</q-btn>
        </q-tab-panel>
      </q-tab-panels>
      <q-tab-panels v-model="inquiryTab">
        <q-tab-panel name="history">
          <div>See other inquiries from the same user.</div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'PageCustomerSupportCenter',
  setup() {
    const sampleMessage =
      'If the birds and the bees are as smart as the tree, what color are the dandilions in the springtime under a full moon? Also, what is your favorite color? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod <b>tempor</b> incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    const sampleResponse =
      'Dear Blargy Pants, You will have to learn to deal with it, whatever your problem is. Sorry, life is hard.'
    return {
      showOnlyUnread: ref(false),
      searchQuery: ref(''),
      inquiryTab: ref('read'),
      sampleMessage,
      sampleResponse: ref(sampleResponse),
    }
  },
})
</script>

<style lang="scss" scoped>
.inquiry-list {
  height: 200px;
  max-width: 100%;
}
</style>
