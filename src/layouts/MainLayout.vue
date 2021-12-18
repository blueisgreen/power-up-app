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

        <div class="edition-label">Autumn 2021</div>
        <authorization-widget />
      </q-toolbar>
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
      <status-bar />
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white text-center">
      <q-toolbar>
        <q-toolbar-title>
          <div class="copyright-text">Copyright 2021 &copy; Happy Spirit Publishing</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useStore, mapGetters } from 'vuex'
import AuthorizationWidget from 'components/AuthorizationWidget.vue'
import EssentialLink from 'components/EssentialLink.vue'
import StatusBar from 'components/StatusBar.vue'

const linksList = [
  {
    title: "What's New",
    caption: 'The latest headlines and articles',
    icon: 'home',
    route: 'FrontPage',
    exact: true,
  },
  {
    title: 'Account',
    caption: 'Your account information',
    icon: 'manage_accounts',
    route: 'UserAccount',
    exact: true,
    rolesWithAccess: ['member'],
  },
  {
    title: 'Support',
    caption: 'Get help with Power Up',
    icon: 'support',
    route: 'SupportCenter',
  },
  {
    title: 'Article Workbench',
    caption: 'For creating articles (editors only)',
    icon: 'article',
    route: 'ArticleWorkbench',
    rolesWithAccess: ['author', 'editor', 'editorInChief'],
  },
  {
    title: 'Customer Support',
    caption: 'Administrators only',
    icon: 'support',
    route: 'CustomerSupportRep',
    rolesWithAccess: ['admin'],
  },
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
    AuthorizationWidget,
    StatusBar,
  },

  setup() {
    const leftDrawerOpen = ref(false)

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
    visibleMenuItems() {  // FIXME: get this to watch user roles
      const visibleItems = this.essentialLinks.filter(
        (menuItem) =>
          !menuItem.rolesWithAccess ||
          (this.isSignedIn && this.hasRole(menuItem.rolesWithAccess))
      )
      return visibleItems
    },
    ...mapGetters('auth', ['isSignedIn', 'hasRole']),
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
.copyright-text {
  font-family: merriweather;
  font-size: 12pt;
}
</style>
