<template>
  <div class="q-pa-md">
    <div>
      <q-toolbar class="bg-primary glossy">
        <q-toolbar-title shrink>When:</q-toolbar-title>

        <q-input
          v-model="startFilter"
          label="From"
          label-color="orange-2"
          filled
        >
          <template #prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="startFilter" mask="YYYY-MM-DD">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input
          v-model="endFilter"
          label="Until"
          label-color="orange-2"
          filled
        >
          <template #prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="endFilter" mask="YYYY-MM-DD">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-space />

        <q-select
          v-model="limitFilter"
          :options="limitOptions"
          outlined
          label="Rows"
          label-color="orange-2"
          class="limit"
        />
      </q-toolbar>
      <q-toolbar class="bg-primary glossy">
        <q-toolbar-title shrink>Focus on:</q-toolbar-title>

        <q-input v-model="userKeyFilter" label="Who" label-color="orange-2" />
        <q-input v-model="actionCodeFilter" label="Action" label-color="orange-2" />
        <q-space />
        <q-btn
          flat
          round
          dense
          icon="search"
          @click="findActionsUsingFilters"
        />
        <span v-if="hasResults">
          <q-btn icon="navigate_before" @click="prior" />
          <q-btn icon="navigate_next" @click="next" />
        </span>
      </q-toolbar>
    </div>
    <div class="text-h5 text-center">Activity Records</div>
    <div>
      <div class="row q-col-gutter-sm text-weight-bold bg-secondary">
        <div class="col-2">When</div>
        <div class="col-3">Who</div>
        <div class="col-3">Action</div>
        <div class="col-4">Details</div>
      </div>
      <div
        v-for="action in activity"
        :key="action.createdAt"
        class="row q-col-gutter-sm"
      >
        <div class="col-2">{{ formatDate(action.createdAt) }}</div>
        <div class="col-3">{{ action.userKey }}</div>
        <div class="col-3">{{ action.actionCode }}</div>
        <div class="col-4">{{ action.details }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { date } from 'quasar'
import { fetchActions, queryFilterBuilder } from '../../api/PowerUpApi'

export default defineComponent({
  setup() {
    const filterBuilder = queryFilterBuilder()
    const activity = ref([])
    const userKeyFilter = ref('')
    const actionCodeFilter = ref('')
    const limitOptions = [10, 25, 50, 75, 100]
    const limitFilter = ref(limitOptions[1])
    const formatDate = (ts) => date.formatDate(ts, 'YYYY-MM-DD')
    const startFilter = ref()
    const endFilter = ref()
    return {
      activity,
      formatDate,
      filterBuilder,
      userKeyFilter,
      actionCodeFilter,
      startFilter,
      endFilter,
      limitFilter,
      limitOptions,
    }
  },
  computed: {
    hasResults() {
      return this.activity.length > 0
    },
  },
  methods: {
    async findActions() {
      const results = await fetchActions(this.filterBuilder)
      this.activity.length = 0
      results.forEach((result) => this.activity.push(result))
    },
    async next() {
      this.filterBuilder.nextPage()
      await this.findActions()
    },
    async prior() {
      this.filterBuilder.priorPage()
      await this.findActions()
    },
    async findActionsUsingFilters() {
      const builder = this.filterBuilder
      builder.setLimit(this.limitFilter)
      if (this.userKeyFilter && this.userKeyFilter.length > 0) {
        builder.setUserKey(this.userKeyFilter)
      }
      if (this.actionCodeFilter && this.actionCodeFilter.length > 0) {
        builder.setActionCode(this.actionCodeFilter)
      }
      if (this.startFilter) {
        builder.setStart(this.startFilter)
      }
      if (this.endFilter) {
        builder.setEnd(this.endFilter)
      }
      await this.findActions()
    },
  },
})
</script>
<style scoped>
th {
  background-color: bisque;
}
td {
  border-bottom: 1px solid gray;
  padding: 0.5em;
}
.limit {
  min-width: 7em;
}
</style>
