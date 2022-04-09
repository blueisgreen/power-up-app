<template>
  <div>
    <div class="row">
      <div id="assignment-selector-label" class="col header-style">
        {{ label }}
      </div>
    </div>
    <div class="row">
      <div class="col">
        <q-splitter
          v-model="splitterModel"
          :limits="[50, 100]"
          class="widget-style"
        >
          <template #before>
            <div class="sub-header-style">Available</div>
            <q-list>
              <q-item
                v-for="item in unassigned"
                :key="item"
                clickable
                ripple
                data-test="available"
                @click="() => handleAddItem(item)"
              >
                <q-item-section class="item-style">{{ getLabel(item) }}</q-item-section>
              </q-item>
            </q-list>
          </template>

          <template #after>
            <div class="sub-header-style">Assigned</div>
            <q-list>
              <q-item
                v-for="item in assigned"
                :key="item"
                clickable
                ripple
                data-test="assigned"
                @click="() => handleRemoveItem(item)"
              >
                <q-item-section class="item-style">{{ getLabel(item) }}</q-item-section>
              </q-item>
            </q-list>
          </template>
        </q-splitter>
      </div>
    </div>
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
    label: {
      type: String,
      default: 'Cool Beans',
    },
    labelPropName: {
      type: String,
      default: 'display',
    },
    valuePropName: {
      type: String,
      default: 'code',
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

<style scoped>
.widget-style {
  height: 300px;
}
.header-style {
  text-align: center;
  font-size: 24pt;
  font-weight: bold;
}
.sub-header-style {
  text-align: center;
  font-size: 16pt;
  font-weight: bold;
  font-style: italic;
  background-color: bisque;
}
.item-style {
  text-align: center;
  font-size: 12pt;
}
</style>
