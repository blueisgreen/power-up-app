<template>
  <div class="article">
    <h1 class="headline">About Power Up Magazine</h1>
    <h2 class="headline">Our Purpose</h2>
    <p>
      This interactive magazine is being built to share information about
      nuclear power. How it works, the science and engineering that goes into a
      nuclear power plant, the future of nuclear technology, the long-term
      effects, what's gone wrong before and how people are working to prevent
      those problems from recurring.
    </p>
    <p>
      Why? Because nuclear power is awesome and amazing. It has gotten a bad rap
      from people who predicted the worst and preached gloom and doom for
      decades. Enough hysterics.
    </p>
    <p>
      It's time to share what's good about nuclear power. It's time to talk
      about what's working and to dream up ways to make it even better. This
      work is already happening. Power Up Magazine is about sharing that
      knowledge with anyone who wants to know.
    </p>
    <p>
      It's time to spread hope. Time to empower the next generation. Literally.
    </p>
    <h2 class="headline">Get Plugged In</h2>
    <p>
      <q-avatar>
        <q-icon name="fab fa-twitter" size="md" class="gap-right" />
      </q-avatar>
      <q-btn href="https://twitter.com/ZanzibarNuclear" no-caps
        >Follow ZanzibarNuclear on Twitter</q-btn
      >
    </p>
    <p>
      <q-avatar square class="gap-right">
        <img src="https://cdn.powerupmagazine.com/logo-clear.svg" />
      </q-avatar>
      <q-btn :to="{ name: 'SupportCenter' }" no-caps
        >Connect with us using the Support Page</q-btn
      >
    </p>
    <p>
      <q-avatar square class="gap-right">
        <img src="https://cdn.powerupmagazine.com/locals-logo.svg" />
      </q-avatar>
      <q-btn href="https://powerupmagazine.locals.com/" no-caps
        >Join Power Up Magazine on Locals</q-btn
      >
    </p>
    <p>
      <q-avatar square class="gap-right">
        <img src="https://cdn.powerupmagazine.com/substack-logo.png" />
      </q-avatar>
      <q-btn href="https://zanzibar.substack.com/" no-caps
        >Read about Power Up Magazine on Substack.</q-btn
      >
    </p>
    <h2 class="headline">Coming Soon...</h2>
    <p>
      Power Up Magazine is just getting started. The pandemic provided a great
      opportunity to set up the foundations. At this point, it's time to write
      lots of articles and rough in more features. Here's what to expect in
      2022...
    </p>
    <ul>
      <li>
        <span class="text-bold">Lessons</span> - Topics will be organized into
        information-packed lessons that help focus and guide through the
        material.
      </li>
      <li>
        <span class="text-bold">Calculators</span> - A set of playful tools for
        comparing the dimensions of things. Nuclear energy works in ways that
        are difficult to grasp. People need practice thinking about the
        extremely small and unfathomably large.
      </li>
      <li>
        <span class="text-bold">Guest Authors</span> - The article workshop (for
        writing and publishing) will be open to members who have something to
        share about nuclear power.
      </li>
      <li>
        <span class="text-bold">Better styles and more pictures</span> - Need I
        say more?
      </li>
    </ul>
    <h2 class="headline">Policies and Legal Stuff</h2>
    <p>
      You might be interested in our
      <q-btn :to="{ name: 'TermsOfUsePage' }">Terms of Use</q-btn> or our
      <q-btn :to="{ name: 'PrivacyPolicyPage' }">Privacy Policy</q-btn>.
    </p>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AboutUs',
})
</script>

<style scoped>
.gap-right {
  margin-right: 0.5em;
}
li {
  margin-bottom: 0.5em;
}
</style>
