<template>
  <q-page>
    <h3>Account Settings</h3>
    <div>
      <q-splitter v-model="splitterModel" style="height: 250px">
        <template v-slot:before>
          <q-tabs v-model="tab" vertical align="left">
            <q-tab name="overview" icon="private" label="Overview"></q-tab>
            <q-tab name="profile" icon="person" label="Profile"></q-tab>
            <q-tab name="settings" icon="control" label="Preferences"></q-tab>
          </q-tabs>
        </template>
        <template v-slot:after>
          <q-tab-panels v-model="tab" vertical>
            <q-tab-panel name="overview">
              <h4>Overview</h4>
              <p>
                A read-only display of all settings, user history, and as on.
              </p>
            </q-tab-panel>
            <q-tab-panel name="profile">
              <h4>Member Profile</h4>
              <p>
                Form for changing profile information - what is shared with the
                world.
              </p>
            </q-tab-panel>
            <q-tab-panel name="settings">
              <h4>Preferences</h4>
              <p>Form for changing preferences - customize your experience.</p>
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ComingSoon',
  data() {
    return {
      tab: ref('overview'),
      splitterModel: ref(20),
    }
  },
})
</script>
