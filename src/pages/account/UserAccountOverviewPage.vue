<template>
  <div>
    <q-splitter v-model="splitterModel">
      <template v-slot:before>
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
      <template v-slot:after>
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
      </template>
    </q-splitter>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import MemberAccountView from 'components/MemberAccountView.vue'
import MemberProfileForm from 'components/MemberProfileForm.vue'
import MemberSettingsForm from 'components/MemberSettingsForm.vue'
import { mapState, mapActions } from 'vuex'

export default defineComponent({
  components: {
    MemberAccountView,
    MemberProfileForm,
    MemberSettingsForm,
  },
  data() {
    return {
      tab: ref('overview'),
      splitterModel: ref(20),
    }
  },
  // created() {
  //   this.fetchUserProfile()
  // },
  computed: mapState('profile', ['screenName']),
  // methods: mapActions('profile', ['fetchUserProfile']),
})
</script>

<style></style>
