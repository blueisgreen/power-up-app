<template>
  <div class="q-pa-md">
    <h3>System Administration</h3>

    <q-toolbar class="bg-primary glossy text-white">
      <q-toolbar-title shrink>Filters:</q-toolbar-title>
      <q-input v-model="dateFilter" label="When" filled>
        <template #prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="dateFilter" mask="YYYY-MM-DD">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-space></q-space>
      <q-btn flat round dense icon="search" />
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
import { fetchActivity } from '../../api/PowerUpApi'

export default defineComponent({
  setup() {
    const formatDate = (ts) => date.formatDate(ts, 'YYYY MMM DD')
    const dateFilter = ref(new Date())
    const activity = ref([
      {
        createdAt: new Date(),
        userKey: '123-abc-4567-def-890',
        actionCode: 'navigate',
        details: '{"target":"AdminPanels"}',
      },
    ])
    return {
      formatDate,
      activity,
      dateFilter,
    }
  },
  async mounted() {
    const results = await fetchActivity(this.dateFilter)
    console.log('found activities', results)
    this.activity.length = 0
    results.forEach((result) => this.activity.push(result))
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
