<template>
  <q-banner class="bg-secondary text-blue-9 text-center">{{ statusMessage }}</q-banner>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
       ...mapState('context', ['isLoading', 'statusMessage'])
    }
}
</script>

<style>

</style>