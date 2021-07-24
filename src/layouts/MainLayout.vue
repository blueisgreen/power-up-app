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

        <authorization-widget />
      </q-toolbar>
      <signup-login-logout-banner />
      <div>Edition: <b>Summer 2021</b></div>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered class="bg-grey-1">
      <q-list>
        <q-item-label header class="text-grey-8">
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white text-center">
      <q-toolbar>
        <q-toolbar-title>
          <div>&copy; 2021 Happy Spirit Publishing</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import AuthorizationWidget from 'components/AuthorizationWidget.vue'
import SignupLoginLogoutBanner from 'components/SignupLoginLogoutBanner.vue'

const linksList = [
  {
    title: "What's New",
    caption: 'The latest headlines and articles',
    icon: 'home',
    link: '/',
  },
  {
    title: 'Courses',
    caption: 'Learn about nuclear',
    icon: 'school',
    link: '/learn',
  },
  {
    title: 'Exchange Ideas',
    caption: 'Message boards',
    icon: 'chat',
    link: '/boards',
  },
  {
    title: 'Simulation',
    caption: 'Play the simulation game',
    icon: 'precision_manufacturing',
    link: '/simulation',
  },
  {
    title: 'Calculators',
    caption: 'Fun with numbers',
    icon: 'calculate',
    link: '/calculators',
  },
  {
    title: 'Account',
    caption: 'Your profile and settings',
    icon: 'manage_accounts',
    link: '/profile',
  },
  {
    title: 'Support',
    caption: 'Get help with Power Up',
    icon: 'support',
    link: '/support',
  },
  {
    title: 'Course Composer',
    caption: 'Editors only area',
    icon: 'create',
    link: '/composer',
  },
  {
    title: 'Administration',
    caption: 'Administrators only',
    icon: 'admin_panel_settings',
    link: '/admin',
  },
]

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
    AuthorizationWidget,
    SignupLoginLogoutBanner,
  },

  setup() {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
    }
  },
})
</script>
