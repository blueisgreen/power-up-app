<template>
  <div>
    <q-splitter v-model="splitterModel">
      <template #before>
        <q-tabs v-model="tab" vertical class="text-teal">
          <q-tab name="welcome" icon="fas fa-tools" label="Welcome" />
          <q-tab name="members" icon="fas fa-users-cog" label="Members" />
          <q-tab name="system" icon="settings" label="System" />
        </q-tabs>
      </template>

      <template #after>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="welcome">
            <welcome-panel />
          </q-tab-panel>

          <q-tab-panel name="members">
            <member-panel />
          </q-tab-panel>

          <q-tab-panel name="system">
            <system-panel />
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>

<script>
import { ref } from 'vue'
import WelcomePanel from './WelcomePanel.vue'
import MemberPanel from './MemberPanel.vue'
import SystemPanel from './SystemPanel.vue'

export default {
  components: { WelcomePanel, MemberPanel, SystemPanel },
  setup() {
    return {
      tab: ref('welcome'),
      splitterModel: ref(20),
    }
  },
}
</script>
