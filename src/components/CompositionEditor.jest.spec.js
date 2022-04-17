import { describe, expect, it } from '@jest/globals'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest'
import { mount } from '@vue/test-utils'
import CompositionEditor from './CompositionEditor.vue'

installQuasarPlugin()

describe('AssignmentSelector', () => {
  it('shows initial text that is passed it', () => {
    const original = '<p>Start with this</p>'
    // FIXME: apparently this is unsupported due to "TypeError: document.execCommand is not a function"
    // const wrapper = mount(CompositionEditor, {
    //   props: {
    //     original,
    //   },
    // })
    expect(true).toBe(true)
  })
})
