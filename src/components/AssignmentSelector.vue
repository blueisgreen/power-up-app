<template>
  <div>
    <h1>Assignment Selector</h1>

    <q-splitter
      v-model="splitterModel"
      :limits="[50, 100]"
      style="height: 400px"
    >
      <template #before>
        <h2>Available</h2>
        <q-list>
          <q-item
            v-for="item in unassigned"
            :key="item"
            clickable
            ripple
            data-test="available"
            @click="() => handleAddItem(item)"
          >
            <q-item-section>{{ item }}</q-item-section>
          </q-item>
        </q-list>
      </template>

      <template #after>
        <h2>Assigned</h2>
        <q-list>
          <q-item
            v-for="item in assignedItems"
            :key="item"
            clickable
            ripple
            data-test="assigned"
            @click="() => handleRemoveItem(item)"
          >
            <q-item-section>{{ item }}</q-item-section>
          </q-item>
        </q-list>
      </template>
    </q-splitter>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
export default defineComponent({
  name: 'AssignmentSelector',
  props: {
    availableItems: {
      type: Array,
      required: true,
    },
    assignedItems: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['addItem', 'removeItem'],
  setup(props) {
    const unassigned = computed(() => {
      return props.availableItems.filter(
        (item) => !props.assignedItems.includes(item)
      )
    })
    return {
      unassigned,
      splitterModel: ref(50),
    }
  },
  methods: {
    lookupLabel(value) {
      return typeof item === object ? item.label : item
    },
    getValue(item) {
      return typeof item === object ? item.value : item
    },
    handleAddItem(item) {
      this.$emit('addItem', item)
    },
    handleRemoveItem(item) {
      this.$emit('removeItem', item)
    },
  },
})
</script>

<style></style>
