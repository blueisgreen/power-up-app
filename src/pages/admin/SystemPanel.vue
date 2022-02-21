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
      <tr>
        <td>{{ formatDate(new Date()) }}</td>
        <td>The Happy Spirit</td>
        <td>viewpage</td>
        <td>Home</td>
      </tr>
    </table>
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'
import { date } from 'quasar'

export default defineComponent({
  setup() {
    formatDate = (ts) => date.formatDate(ts, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
    return {
      formatDate,
    }
  },
})
</script>
