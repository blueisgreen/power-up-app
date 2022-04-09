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
      <q-space></q-space>
      <q-btn flat round dense icon="search" @click="findActionsUsingFilters" />
    </q-toolbar>
    <table>
      <tr>
        <th>When</th>
        <th>Who</th>
        <th>What</th>
        <th>Details</th>
      </tr>
      <tr v-for="action in activity" :key="action.createdAt">
        <td>{{ formatDate(action.createdAt) }}</td>
        <td>{{ action.userKey }}</td>
        <td>{{ action.actionCode }}</td>
        <td>{{ action.details }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { date } from 'quasar'
import { fetchActions, actionFilterBuilder } from '../../api/PowerUpApi'

export default defineComponent({
  setup() {
    const filterBuilder = actionFilterBuilder().setLimit(20)
    const activity = ref([])
    const formatDate = (ts) => date.formatDate(ts, 'YYYY-MM-DD')
    const startFilter = ref('2022-03-18')
    const endFilter = ref('2022-04-10')
    return {
      formatDate,
      startFilter,
      endFilter,
      activity,
      filterBuilder,
    }
  },
  methods: {
    async findActionsUsingFilters() {
      const builder = this.filterBuilder
      if (this.startFilter) {
        builder.setStart(this.startFilter)
      }
      if (this.endFilter) {
        builder.setEnd(this.endFilter)
      }
      const results = await fetchActions(builder)
      this.activity.length = 0
      results.forEach((result) => this.activity.push(result))
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
</style>
