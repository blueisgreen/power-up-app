<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          Power Up Magazine - Learn About Nuclear Power
        </q-toolbar-title>
        <div class="edition-label">{{ edition }}</div>
        <authorization-widget />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered class="bg-grey-1">
      <q-list>
        <q-item-label header class="text-grey-8">Site Directory</q-item-label>
        <EssentialLink
          v-for="link in visibleMenuItems"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
      <img class="logo" alt="Power Up logo" src="~assets/logo-clear.svg" />
    </q-drawer>

    <q-page-container>
      <status-bar />
      <router-view />
    </q-page-container>

    <main-footer />
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useUserStore } from '../stores/user'
import AuthorizationWidget from 'components/AuthorizationWidget.vue'
import EssentialLink from 'components/EssentialLink.vue'
import StatusBar from 'components/StatusBar.vue'
import MainFooter from 'layouts/MainFooter.vue'
import MainMenuLinks from './MainMenuLinks'

export default defineComponent({
  name: 'MainLayout',
  components: {
    EssentialLink,
    AuthorizationWidget,
    StatusBar,
    MainFooter,
  },
  setup() {
    const leftDrawerOpen = ref(false)
    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }
    return {
      essentialLinks: MainMenuLinks,
      user: useUserStore(),
      leftDrawerOpen,
      toggleLeftDrawer,
    }
  },
  computed: {
    visibleMenuItems() {
      return this.essentialLinks.filter((menuItem) => {
        return (
          !menuItem.rolesWithAccess ||
          (this.user.isSignedIn &&
            menuItem.rolesWithAccess.some((itemRole) =>
              // this.user.roles.includes(itemRole)
              this.user.hasRole(itemRole)
            ))
        )
      })
    },
    edition() {
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth()
      const day = now.getDate()
      const season =
        (month === 11 && day >= 21) ||
        month === 0 ||
        month === 1 ||
        (month === 2 && day < 21)
          ? 'Winter'
          : (month === 2 && day >= 21) ||
            month === 3 ||
            month === 4 ||
            (month === 5 && day < 21)
          ? 'Spring'
          : (month === 5 && day >= 21) ||
            month === 6 ||
            month === 7 ||
            (month === 8 && day <= 21)
          ? 'Summer'
          : 'Autumn'
      return season + ' ' + year
    },
  },
})
</script>
<style>
.edition-label {
  margin-right: 1em;
  font-weight: bold;
  color: gold;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 0;
  margin-bottom: 0.5em;
  margin-left: 0.5em;
}
.section {
  margin-top: 2em;
}
.logo {
  margin-top: 3em;
  width: 100%;
}
</style>
