<template>
  <q-page class="q-pa-md">
    <h4>Your Power Up Account</h4>
    <div class="q-pb-md">
      Review and update your online profile and account settings.
    </div>
    <q-list padding bordered>
      <q-item-label header>Profile</q-item-label>

      <q-item>
        <q-item-section side>
          <q-item-label class="text-bold">Member since:</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ formatDayMonthYear(createdAt) }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section side>
          <q-item-label class="text-bold">Screen name:</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ screenName }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section side>
          <q-item-label class="text-bold">Email:</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label v-if="email">{{ email }}</q-item-label>
          <q-item-label v-else class="text-italic">unknown</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section side>
          <q-item-label class="text-bold">Avatar:</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-avatar v-if="avatarUrl">
            <img :src="avatarUrl" />
          </q-avatar>
          <q-item-label v-if="avatarUrl === null">Unknown</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced />
      <q-item-label header>Settings</q-item-label>

      <q-separator spaced />
      <q-item-label header>Terms of Use</q-item-label>

      <q-separator spaced />
      <q-item-label header>Technical Details</q-item-label>

      <q-item>
        <q-item-section side>
          <q-item-label class="text-bold">Account ID</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ accountId }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section side>
          <q-item-label class="text-bold">Account Status</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ accountStateId }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section side>
          <q-item-label class="text-bold">Last Updated</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ formatDayMonthYear(updatedAt) }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import { formatDayMonthYear } from '../../composables/powerUpUtils'

export default defineComponent({
  components: {},
  setup() {
    return {
      formatDayMonthYear,
    }
  },
  computed: mapState('profile', [
    'accountId',
    'screenName',
    'email',
    'avatarUrl',
    'createdAt',
    'updatedAt',
    'termsAcceptedAt',
    'cookiesAcceptedAt',
    'emailCommsAcceptedAt',
    'accountStateId',
  ]),
})
</script>

<style>
h4 {
  margin: 0em;
  margin-bottom: 0.5em;
}
</style>
