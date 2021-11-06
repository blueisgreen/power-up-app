<template>
  <q-page class="q-pa-md">
    <h4>Customer Support Center</h4>
    <q-toolbar class="bg-primary text-white q-my-md shadow-2">
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
      <q-space />

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
              <q-icon name="bug_report" />
            </q-item-section>
            <q-item-section no-wrap>
              <q-item-label>Bug Report</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section side>
              <q-icon name="contact_support" />
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
      <q-btn stretch flat label="Link" />
    </q-toolbar>

    <q-scroll-area class="inquiry-list">
      <q-list v-for="item in filteredInquires" :key="item.id">
        <q-item clickable @click="() => setSelected(item)">
          <q-item-section side top>
            <q-item-label
              ><q-avatar :icon="mapPurposeToIcon(item.purpose)"
            /></q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-item-label>{{ item.userId || 'anonymous' }}</q-item-label>
            <q-item-label>{{ formatDate(item.createdAt) }}</q-item-label>
          </q-item-section>
          <q-item-section top>
            <q-item-label lines="3">{{ item.message }}</q-item-label>
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
          <div>{{ selectedMessage }}</div>
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
import { defineComponent, onMounted, ref } from 'vue'
import { useStore, mapGetters } from 'vuex'
import { formatDate } from '../../composables/powerUpUtils'

const purposeIconMap = {
  help: 'support',
  question: 'help',
  feedback: 'feedback',
  bug: 'bug_report',
  other: 'person',
}

export default defineComponent({
  name: 'PageCustomerSupportCenter',
  setup() {
    onMounted(() => useStore().dispatch('csr/fetchSupportInquiries'))

    return {
      showOnlyUnread: ref(false),
      searchQuery: ref(''),
      inquiryTab: ref('read'),
      selected: ref(null),
      sampleResponse: ref('Gentle User, '),
      formatDate,
    }
  },
  computed: {
    selectedMessage() {
      return !this.selected ? '--select an inquiry--' : this.selected.message
    },
    ...mapGetters('csr', ['filteredInquires']),
  },
  methods: {
    mapPurposeToIcon(purpose) {
      return purposeIconMap[purpose]
    },
    setSelected(item) {
      this.selected = item
    },
  },
})
</script>

<style lang="scss" scoped>
.inquiry-list {
  height: 200px;
  max-width: 100%;
}
</style>
