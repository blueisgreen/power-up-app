<template>
  <div>
    <q-list bordered padding>
      <q-item>
        <q-item-section side>
          <q-item-label>Account ID</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ accountId }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section side>
          <q-item-label>Screen Name</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ screenName }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section side>
          <q-item-label>Email</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ email }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section side>
          <q-item-label>Avatar</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-avatar v-if="avatarUrl">
            <img :src="avatarUrl" />
          </q-avatar>
          <q-item-label v-if="avatarUrl === null">Unknown</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section side>
          <q-item-label>Created</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ createdAt }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section side>
          <q-item-label>Last Updated</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ updatedAt }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced />
      <q-item-label header>Settings</q-item-label>

      <q-item v-ripple tag="label">
        <q-item-section side top>
          <q-checkbox v-model="termsAcceptedAt" disable />
        </q-item-section>

        <q-item-section>
          <q-item-label>Terms of Use</q-item-label>
          <q-item-label caption>
            I agree to the terms of use. Violation of these terms may lead to suspension of my account.
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item v-ripple tag="label">
        <q-item-section side top>
          <q-checkbox v-model="cookiesAcceptedAt" disable />
        </q-item-section>

        <q-item-section>
          <q-item-label>Cookies</q-item-label>
          <q-item-label caption>
            I understand that Power Up uses cookies to make the experience
            great.
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item v-ripple tag="label">
        <q-item-section side top>
          <q-checkbox v-model="emailCommsAcceptedAt" disable />
        </q-item-section>

        <q-item-section>
          <q-item-label>Email Communication</q-item-label>
          <q-item-label caption>
            The Power Up team has permission to communicate with me via email
            about my account.
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const $store = useStore()
    return {
      accountId: computed(() => $store.state.profile.accountId),
      screenName: computed(() => $store.state.profile.screenName),
      email: computed(() => $store.state.profile.email),
      avatarUrl: computed(() => $store.state.profile.avatarUrl),
      createdAt: computed(() => $store.state.profile.createdAt),
      updatedAt: computed(() => $store.state.profile.updatedAt),
      termsAcceptedAt: computed(() => !!$store.state.profile.termsAcceptedAt),
      cookiesAcceptedAt: computed(() => !!$store.state.profile.cookiesAcceptedAt),
      emailCommsAcceptedAt: computed(() => !!$store.state.profile.emailCommsAcceptedAt),
      accountStateId: computed(() => $store.state.profile.accountStateId),
    }
  },
}
</script>

<style>
h4 {
  margin-top: 0em;
  margin-bottom: 0.5em;
}
</style>
