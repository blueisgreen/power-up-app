<template>
  <q-page class="flex">
    <div class="q-pa-md">
      <div class="section">
        <h3 class="headline-font">About Power Up Magazine</h3>
        <p class="article-font">
          This interactive magazine is being built to share information about
          nuclear power. How it works, the science and engineering that goes
          into a nuclear power plant, the future of nuclear technology, the
          long-term effects, what's gone wrong before and how people are working
          to prevent those problems from recurring.
        </p>
        <p class="article-font">
          Why? Because nuclear power is awesome and amazing. It has gotten a bad
          rap from people who predicted the worst and preached gloom and doom
          for decades. Enough hysterics.
        </p>
        <p class="article-font">
          It's time to share what's good about nuclear power. It's time to talk
          about what's working and to dream up ways to make it even better. This
          work is already happening. Power Up Magazine is about sharing that
          knowledge with anyone who wants to know.
        </p>
        <p class="article-font">
          It's time to spread hope. Time to empower the next generation.
          Literally.
        </p>
      </div>
      <div class="section">
        <h3 class="headline-font">Coming Soon...</h3>
        <p class="article-font">
          Power Up Magazine is just getting started. The pandemic provided a
          great opportunity to set up the foundations. At this point, it's time
          to write lots of articles and rough in more features. Here's what to
          expect in 2022...
        </p>
        <ul class="article-font">
          <li>
            <span class="text-bold">Sign Up / Sign In</span> - Authentication is
            almost ready, but a few things need to work better. Rather than
            leave you frustrated, we held off until we can make it right
            (enough).
          </li>
          <li>
            <span class="text-bold">Lessons</span> - Topics will be organized
            into information-packed lessons that help focus and guide through
            the material.
          </li>
          <li>
            <span class="text-bold">Calculators</span> - A set of playful tools
            for comparing the dimensions of things. Nuclear energy works in ways
            that are difficult to grasp. People need practice thinking about the
            extremely small and unfathomably large.
          </li>
          <li>
            <span class="text-bold">Guest Authors</span> - The article workshop
            (for writing and publishing) will be open to members who have
            something to share about nuclear power.
          </li>
          <li>
            <span class="text-bold">Better styles and more pictures</span> -
            Need I say more?
          </li>
        </ul>
      </div>
      <div class="section">
        <h3 class="headline-font">Get Plugged In</h3>
        <p class="article-font">
          Want to help? You can send a note using the Support page.
        </p>
        <p class="article-font">
          <q-btn
            icon="fab fa-twitter"
            href="https://twitter.com/ZanzibarNuclear"
            no-caps
            >Follow ZanzibarNuclear on Twitter</q-btn
          >
        </p>
        <p class="article-font">
          <a href="https://zanzibar.substack.com/"
            >Read about Power Up Magazine on Substack.</a
          >
        </p>
        <p class="article-font">
          Join Power Up Magazine on Locals. (<a
            href="https://powerupmagazine.locals.com/"
            >pending approval</a
          >)
        </p>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ComingSoon',
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
