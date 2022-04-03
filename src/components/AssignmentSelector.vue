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
            <q-item-section>{{ getLabel(item) }}</q-item-section>
          </q-item>
        </q-list>
      </template>

      <template #after>
        <h2>Assigned</h2>
        <q-list>
          <q-item
            v-for="item in assigned"
            :key="item"
            clickable
            ripple
            data-test="assigned"
            @click="() => handleRemoveItem(item)"
          >
            <q-item-section>{{ getLabel(item) }}</q-item-section>
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
    labelPropName: {
      type: String,
      default: 'label',
    },
    valuePropName: {
      type: String,
      default: 'value',
    },
  },
  emits: ['addItem', 'removeItem'],
  setup(props) {
    return {
      splitterModel: ref(50),
    }
  },
  computed: {
    unassigned() {
      return this.availableItems.filter(
        (item) => !this.assignedItems.includes(this.getValue(item))
      )
    },
    assigned() {
      const assignedItems = this.assignedItems.map((valueToFind) =>
        this.availableItems.find(
          (item) =>
            item === valueToFind || item[this.valuePropName] === valueToFind
        )
      )
      return assignedItems
    },
  },
  methods: {
    getLabel(item) {
      return typeof item === 'object' ? item[this.labelPropName] : item
    },
    getValue(item) {
      return typeof item === 'object' ? item[this.valuePropName] : item
    },
    handleAddItem(item) {
      this.$emit('addItem', this.getValue(item))
    },
    handleRemoveItem(item) {
      this.$emit('removeItem', this.getValue(item))
    },
  },
})
</script>

<style>
h1 {
  font-size: 24pt;
}
h2 {
  font-size: 16pt;
}
</style>
