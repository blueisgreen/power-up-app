<template>
  <q-footer elevated class="bg-grey-8 text-white text-center">
    <q-toolbar>
      <q-toolbar-title>
        <div class="copyright-text">
          Copyright 2021-{{ year }} &copy;
          <a href="https://www.happyspiritpublishing.com"
            >Happy Spirit Publishing</a
          >
        </div>
      </q-toolbar-title>
      <q-btn-dropdown color="primary" label="Policies">
        <q-list>
          <q-item
            v-close-popup
            clickable
            @click="() => navigate('TermsOfUsePage')"
          >
            <q-item-section>
              <q-item-label>Terms of Use</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-close-popup
            clickable
            @click="() => navigate('PrivacyPolicyPage')"
          >
            <q-item-section>
              <q-item-label>Privacy Policy</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </q-toolbar>
  </q-footer>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'MainFooter',
  computed: {
    year() {
      return new Date().getFullYear()
    },
  },
  methods: {
    navigate(to) {
      this.$router.push({ name: to })
    },
  },
})
</script>

<style scoped>
.copyright-text {
  font-family: 'merriweather';
  font-size: 12pt;
  color: white;
}
a:link {
  color: white;
}
a:visited {
  color: white;
}
a:hover {
  color: white;
}
a:active {
  color: white;
}
</style>
