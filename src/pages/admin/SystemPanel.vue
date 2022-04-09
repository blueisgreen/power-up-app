<template>
  <div class="q-pa-md">
    <h3>System Administration</h3>

    <q-toolbar class="bg-primary glossy">
      <q-toolbar-title shrink>Filters:</q-toolbar-title>

      <q-input v-model="startFilter" label="From" filled>
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
      <q-input v-model="endFilter" label="Until" filled>
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

      <q-select
        v-model="limit"
        :options="limitOptions"
        outlined
        label="Max Rows"
        class="limit"
      />

      <q-btn icon="navigate_before" @click="prior" />
      <q-btn icon="navigate_next" @click="next" />

      <q-space></q-space>
      <q-btn flat round dense icon="search" @click="findActionsUsingFilters" />
    </q-toolbar>
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
</template>
<script>
import { defineComponent, ref } from 'vue'
import { date } from 'quasar'
import { fetchActions, actionFilterBuilder } from '../../api/PowerUpApi'

export default defineComponent({
  setup() {
    const filterBuilder = actionFilterBuilder()
    const activity = ref([])
    const limitOptions = [10, 25, 50, 75, 100]
    const limit = ref(limitOptions[1])
    const formatDate = (ts) => date.formatDate(ts, 'YYYY-MM-DD')
    const startFilter = ref()
    const endFilter = ref()
    return {
      formatDate,
      startFilter,
      endFilter,
      activity,
      filterBuilder,
      limit,
      limitOptions,
    }
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
      builder.setLimit(this.limit)
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
