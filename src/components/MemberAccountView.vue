<template>
  <div class="q-pa-md">
    <q-list bordered padding>
      <q-item-label header>Member Profile</q-item-label>

      <q-item>
        <q-item-section side>
          <q-item-label>Account ID</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ this.publicId }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section side>
          <q-item-label>Screen Name</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ this.screenName }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section side>
          <q-item-label>Email</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ this.email }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section side>
          <q-item-label>Avatar URL</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ this.avatarUrl }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section side>
          <q-item-label>Created</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ this.createdAt }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section side>
          <q-item-label>Last Updated</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ this.updatedAt }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced />
      <q-item-label header>Preferences</q-item-label>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox disable v-model="this.termsAcceptedAt" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Terms of Use</q-item-label>
          <q-item-label caption>
            I agree to the terms of use. Violation of these terms may lead to suspension of my account.
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox disable v-model="this.cookiesAcceptedAt" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Cookies</q-item-label>
          <q-item-label caption>
            I understand that Power Up uses cookies to make the experience
            great.
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox disable v-model="this.emailCommsAcceptedAt" />
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
import { mapState } from 'vuex'

export default {
  computed: mapState([
    'publicId',
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
}
</script>

<style></style>
