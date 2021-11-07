<template>
  <div class="p-pa-md">
    <q-scroll-area style="height: 200px" class="v-space">
      <q-markup-table flat bordered>
        <thead class="bg-secondary">
          <tr>
            <th class="text-overline text-left">When Sent</th>
            <th class="text-overline text-left">Purpose</th>
            <th class="text-overline text-left">Message</th>
          </tr>
        </thead>
        <tbody class="bg-grey-3">
          <tr
            v-for="msg in myMessages"
            :key="msg.id"
            @click="() => handleSelectMessage(msg.id)"
          >
            <td>{{ formatDate(msg.createdAt) }}</td>
            <td>{{ msg.purpose }}</td>
            <td>{{ prettyTrunc(msg.message, 60) }}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-scroll-area>
    <div v-if="!!activeMessage" class="v-space">
      <div class="text-caption">
        On {{ formatDate(activeMessage.createdAt) }}, you said:
      </div>
      <div class="message-window text-body1">{{ activeMessage.message }}</div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { mapState, useStore } from 'vuex'
import { formatDate, prettyTrunc } from '../../composables/powerUpUtils'
import { fetchMyInquiries } from '../../api/PowerUpApi'

export default {
  setup() {
    const activeMessageId = ref(-1)
    const myMessages = ref([])
    onMounted(async () => {
      const msgs = await fetchMyInquiries()
      msgs.forEach((msg) => myMessages.value.push(msg))
    })
    return {
      activeMessageId,
      myMessages,
      formatDate,
      prettyTrunc,
    }
  },
  computed: {
    ...mapState('support', ['messageHistory']),
    activeMessage() {
      return this.messageHistory.find((msg) => msg.id === this.activeMessageId)
    },
  },
  methods: {
    handleSelectMessage(id) {
      this.activeMessageId = id
    },
  },
}
</script>

<style>
.v-space {
  margin-top: 1em;
}
.message-window {
  border: solid black 1px;
  padding: 0.5em 2em;
}
</style>
