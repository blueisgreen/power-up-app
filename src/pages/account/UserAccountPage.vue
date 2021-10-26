<template>
  <q-page class="q-pa-md">
    <q-tabs v-model="tab" align="left" indicator-color="teal-10">
      <q-tab name="overview" icon="manage_accounts" label="Overview"></q-tab>
      <q-tab name="profile" icon="person" label="Profile"></q-tab>
      <q-tab name="settings" icon="settings" label="Settings"></q-tab>
    </q-tabs>
    <q-tab-panels v-model="tab" vertical>
      <q-tab-panel name="overview">
        <member-account-view />
      </q-tab-panel>
      <q-tab-panel name="profile">
        <p>Hello, {{ screenName }}</p>
        <member-profile-form />
      </q-tab-panel>
      <q-tab-panel name="settings">
        <member-settings-form />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import MemberAccountView from './MemberAccountView.vue'
import MemberProfileForm from './MemberProfileForm.vue'
import MemberSettingsForm from './MemberSettingsForm.vue'
import { mapState } from 'vuex'

export default defineComponent({
  components: {
    MemberAccountView,
    MemberProfileForm,
    MemberSettingsForm,
  },
  setup() {
    return {
      tab: ref('overview'),
    }
  },
  computed: mapState('profile', ['screenName']),
})
</script>

<style></style>
