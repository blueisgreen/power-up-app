import { describe, expect, it } from '@jest/globals'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest'
import { mount } from '@vue/test-utils'
import AssignmentSelector from './AssignmentSelector.vue'

installQuasarPlugin()

describe('AssignmentSelector', () => {
  it('shows all available items when none have been assigned', () => {
    const wrapper = mount(AssignmentSelector, {
      props: {
        availableItems: ['a', 'b'],
      },
    })

    const items = wrapper.findAll('[data-test="available"]')

    expect(items).toHaveLength(2)
  })

  it('shows correct available items when one already assigned', () => {
    const wrapper = mount(AssignmentSelector, {
      props: {
        availableItems: ['a', 'b'],
        assignedItems: ['b'],
      },
    })

    const items = wrapper.findAll('[data-test="available"]')

    expect(items).toHaveLength(1)
    expect(items[0].text()).toBe('a')
  })

  it('shows correct assigned items', () => {
    const wrapper = mount(AssignmentSelector, {
      props: {
        availableItems: ['a', 'b'],
        assignedItems: ['b'],
      },
    })

    const items = wrapper.findAll('[data-test="assigned"]')

    expect(items).toHaveLength(1)
    expect(items[0].text()).toBe('b')
  })

  it('shows no assigned items when none are', () => {
    const wrapper = mount(AssignmentSelector, {
      props: {
        availableItems: ['a', 'b'],
      },
    })

    const items = wrapper.findAll('[data-test="assigned"]')

    expect(items).toHaveLength(0)
  })

  it('handles action to add item', async () => {
    const wrapper = mount(AssignmentSelector, {
      props: {
        availableItems: ['a'],
      },
    })
    await wrapper.find('[data-test="available"]').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('addItem')
    const event = wrapper.emitted('addItem')
    expect(event).toHaveLength(1)
    expect(event[0]).toEqual(['a'])
  })

  it('handles action to remove item', async () => {
    const wrapper = mount(AssignmentSelector, {
      props: {
        availableItems: ['a'],
        assignedItems: ['a'],
      },
    })
    await wrapper.find('[data-test="assigned"]').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('removeItem')
    const event = wrapper.emitted('removeItem')
    expect(event).toHaveLength(1)
    expect(event[0]).toEqual(['a'])
  })
})
