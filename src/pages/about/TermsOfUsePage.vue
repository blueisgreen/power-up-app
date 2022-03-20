<template>
  <div class="article">
    <h1 class="headline">Terms of Use for Power Up Magazine</h1>
    <p>
      By using the Power Up website and applications, you are agreeing to the
      following terms of use.
    </p>
    <ul>
      <li>
        This site is meant for educational and informational purposes only. You
        might also be amused, entertained, dazzled, and inspired. No guarantees.
      </li>
      <li>
        Be polite. Constructive commentary—such as expressing differences of
        opinion or pointing out mistakes—is fine. Personal attacks and insults
        are not welcome in any Power Up Magazine forums or comments.
      </li>
      <li>
        You agree to our use of cookies to remember that it is you. We want to
        give you the best experience we can, and that is difficult to do if we
        keep forgetting who you are.
      </li>
      <li>
        These terms are subject to change. When they do, you can find updates
        here.
      </li>
    </ul>
    <p>
      Take a look at our <q-btn :to="{ name: 'PrivacyPolicyPage' }">Privacy Policy</q-btn> if
      that is of interest to you.
    </p>
    <p>Enjoy!</p>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TermsOfUsePage',
})
</script>

<style scoped>
.section {
  margin-top: 2em;
}
.section h3 {
  margin-left: 0;
}
li {
  margin-bottom: 0.5em;
}
</style>
