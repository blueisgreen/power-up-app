<template>
  <div class="q-pa-md">
    <q-list bordered padding>
      <q-item-label header>Member Profile</q-item-label>

      <q-item>
        <q-item-section side>
          <q-item-label>Screen Name</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ this.profile.screenName }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section side>
          <q-item-label>Email</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ this.profile.email }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section side>
          <q-item-label>Twitter Handle</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>@ZanzibarNuclear</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section side top>
          <q-item-label>User Roles</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label v-for="role in this.profile.roles" :key="role">
            {{ role }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced />
      <q-item-label header>Preferences</q-item-label>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox disable v-model="settings.allowEmailComms" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Email Communication</q-item-label>
          <q-item-label caption>
            The Power Up team has permission to communicate with me via email
            about my account.
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox disable v-model="settings.allowCookies" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Cookies</q-item-label>
          <q-item-label caption>
            I understand that Power Up uses cookies to make the experience
            great.
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  setup() {
    // TODO call fetch method to get profile

    // connect to store values
    
    return {
      profile: {
        screenName: 'Bubba',
        email: 'bubba@happyspiritpublishing.com',
        accessToken: '',
        roles: ['member', 'author'],
      },
      settings: {
        allowEmailComms: true,
        allowCookies: true,
      },
    }
  },
}
</script>

<style></style>
