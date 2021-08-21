<template>
  <q-page class="q-pa-md">
    <h3>Account Settings</h3>
    <div>
      <q-splitter v-model="splitterModel">
        <template #before>
          <q-tabs v-model="tab" vertical align="left" indicator-color="teal-10">
            <q-tab
              name="overview"
              icon="manage_accounts"
              label="Overview"
            ></q-tab>
            <q-tab name="profile" icon="person" label="Profile"></q-tab>
            <q-tab name="settings" icon="settings" label="Preferences"></q-tab>
          </q-tabs>
        </template>
        <template #after>
          <q-tab-panels v-model="tab" vertical>
            <q-tab-panel name="overview">
              <h4>Overview</h4>
              <member-account-view />
            </q-tab-panel>
            <q-tab-panel name="profile">
              <h4>Member Profile</h4>
              <p>Hello, {{ screenName }}</p>
              <member-profile-form />
            </q-tab-panel>
            <q-tab-panel name="settings">
              <h4>Preferences</h4>
              <member-settings-form />
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import MemberAccountView from 'components/MemberAccountView.vue'
import MemberProfileForm from 'components/MemberProfileForm.vue'
import MemberSettingsForm from 'components/MemberSettingsForm.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default defineComponent({
  components: {
    MemberAccountView,
    MemberProfileForm,
    MemberSettingsForm,
  },
  setup() {
    const store = useStore()
    return {
      screenName: computed(() => store.state.userSession.screenName),
    }
  },
  data() {
    return {
      tab: ref('overview'),
      splitterModel: ref(20),
    }
  },
})
</script>

<style scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 0;
  margin-bottom: 0em;
}
</style>
