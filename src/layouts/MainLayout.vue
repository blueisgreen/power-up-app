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

        <div class="edition-label">Summer 2021</div>
        <authorization-widget />
      </q-toolbar>
      <signup-login-logout-banner />
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered class="bg-grey-1">
      <q-list>
        <q-item-label header class="text-grey-8"> Site Directory </q-item-label>

        <EssentialLink
          v-for="link in visibleMenuItems"
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
import { useStore, mapState, mapGetters } from 'vuex'

const linksList = [
  {
    title: "What's New",
    caption: 'The latest headlines and articles',
    icon: 'home',
    route: 'FrontPage',
    exact: true,
  },
  {
    title: 'Courses',
    caption: 'Learn about nuclear',
    icon: 'school',
    route: 'LearningCenter',
  },
  // {
  //   title: 'Exchange Ideas',
  //   caption: 'Message boards',
  //   icon: 'chat',
  //   route: 'DiscussionBoards',
  // },
  // {
  //   title: 'Simulations',
  //   caption: 'Play the simulation game',
  //   icon: 'precision_manufacturing',
  //   route: 'Simulations',
  // },
  // {
  //   title: 'Calculators',
  //   caption: 'Fun with numbers',
  //   icon: 'calculate',
  //   route: 'Calculators',
  // },
  {
    title: 'Account',
    caption: 'Your account information',
    icon: 'manage_accounts',
    route: 'UserAccount',
    exact: true,
  },
  {
    title: 'Support',
    caption: 'Get help with Power Up',
    icon: 'support',
    route: 'SupportCenter',
  },
  {
    title: 'Course Composer',
    caption: 'Editors only area',
    icon: 'create',
    route: 'Composer',
    rolesWithAccess: ['editor', 'editorInChief'],
  },
  {
    title: 'Article Management',
    caption: 'For creating articles (editors only)',
    icon: 'create',
    route: 'ArticleManagement',
    rolesWithAccess: ['editor', 'editorInChief'],
  },
  {
    title: 'Administration',
    caption: 'Administrators only',
    icon: 'admin_panel_settings',
    route: 'AdminPanel',
    rolesWithAccess: ['admin'],
  },
  {
    title: 'Customer Support',
    caption: 'Administrators only',
    icon: 'support',
    route: 'CustomerSupportRep',
    // rolesWithAccess: ['admin'],
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
    const leftDrawerOpen = ref(true)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      store: useStore(),
    }
  },
  computed: {
    visibleMenuItems() {
      const visibleItems = this.essentialLinks.filter(
        (item) =>
          !item.rolesWithAccess || (item.rolesWithAccess && this.isSignedIn)
      )
      return visibleItems
    },
    ...mapGetters('auth', ['isSignedIn']),
  },
})
</script>
<style scoped>
.edition-label {
  margin-right: 1em;
  font-weight: bold;
  color: gold;
}
</style>
