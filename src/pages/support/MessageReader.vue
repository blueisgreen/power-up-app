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
    <show-message v-if="!!activeMessage" :message="activeMessage" />
  </div>
</template>

<script>
import { ref, onMounted, reactive } from 'vue'
import { formatDate, prettyTrunc } from '../../composables/powerUpUtils'
import { fetchMyInquiries, fetchRelatedMessages } from '../../api/PowerUpApi'
import ShowMessage from './ShowMessage.vue'

export default {
  components: {
    ShowMessage,
  },
  setup() {
    const myMessages = ref([])
    onMounted(async () => {
      const msgs = await fetchMyInquiries()
      msgs.forEach((msg) => myMessages.value.push(msg))
    })
    return {
      activeMessageId: ref(-1),
      myMessages,
      relatedMessages: reactive({}),
      formatDate,
      prettyTrunc,
      fetchRelatedMessages,
    }
  },
  computed: {
    activeMessage() {
      return this.myMessages.find((msg) => msg.id === this.activeMessageId)
    },
    activeRelatedMessages() {
      return this.relatedMessages[this.activeMessageId]
    },
  },
  methods: {
    async handleSelectMessage(id) {
      this.activeMessageId = id
      console.log('see related', this.relatedMessages[id])
      if (!this.relatedMessages[id]) {
        const related = await this.fetchRelatedMessages(id)
        if (related) {
          console.log('found related messages', related)
          this.relatedMessages[id] = related
        } else {
          console.log('no related messages')
          this.relatedMessages[id] = []
        }
      }
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
