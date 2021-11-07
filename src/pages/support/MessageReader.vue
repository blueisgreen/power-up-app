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
          <tr v-for="msg in messageHistory" :key="msg.id">
            <td>{{ formatDate(msg.createdAt) }}</td>
            <td></td>
            <td>{{ msg.message }}</td>
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
import { formatDate } from '../../composables/powerUpUtils'

export default {
  setup() {
    onMounted(() => useStore().dispatch('support/refreshMyInquiries'))
    const activeMessageId = ref(-1)
    return {
      activeMessageId,
      formatDate,
    }
  },
  computed: {
    ...mapState('support', ['messageHistory']),
    activeMessage() {
      return this.activeMessageId > -1
        ? {
            createdAt: new Date(),
            purpose: 'Feedback',
            message:
              'I just wanted to let you know that something important. Your software is full of bugs. It is very frustrating to try to learn from your website. What the heck?!?',
          }
        : null
    },
  },
  methods: {
    handleSelect(id) {
      this.activeMessageId = id
      console.log(this.activeMessageId, this.activeMessage)
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
