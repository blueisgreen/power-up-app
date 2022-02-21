<template>
  <div class="q-pa-md">
    <h3>System Administration</h3>
    <div class="row">
      <div class="col">Filters</div>
      <div class="col">
        Date:
        <q-input v-model="dateFilter" filled>
          <template #prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col">
        Who:
        <q-select
          v-model="userFilter"
          standout="bg-teal text-white"
          :options="usersWithActivity"
          label="Only for selected user"
        />
      </div>
    </div>
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
    const userFilter = ref(null)
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
      userFilter,
      usersWithActivity: ref(['bubba', 'zanzibar']),
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
