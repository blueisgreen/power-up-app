<template>
  <q-page class="q-pa-md">
    <h3>Play with Power Up Calculators</h3>
    <p>
      Find out how much energy is produced by various types of power plants.
      Compare and contrast nuclear with other types. Or pit one type of nuclear
      against another.
    </p>
    <p>
      The calculators can give people a sense of how effective nuclear power is,
      especially compared with other energy sources. How much fissile material
      is needed to fulfill a lifetime of energy needs? How much waste is
      produced? And so on...
    </p>
    <p>Token: {{ token }}</p>
    <p>Go To: {{ goTo }}</p>
  </q-page>
</template>

<script>
export default {
  data() {
    const { token, goTo } = this.$route.query
    return {
      token,
      goTo,
    }
  }
}
</script>

<style></style>
