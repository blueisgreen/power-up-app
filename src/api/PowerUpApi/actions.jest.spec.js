import { describe, expect, it } from '@jest/globals'
import { actionFilterBuilder } from './actions'

describe('PowerUpApi actions', () => {
  it('is empty by default', () => {
    const filter = actionFilterBuilder().buildQueryString()

    expect(filter).toEqual('')
  })

  it('filters by start date', () => {
    const filter = actionFilterBuilder()
      .setStart('2022-01-05')
      .buildQueryString()

    expect(filter).toMatch('start=2022-01-05')
  })

  it('filters by end date', () => {
    const filter = actionFilterBuilder().setEnd('2022-01-10').buildQueryString()

    expect(filter).toMatch('end=2022-01-10')
  })

  it('filters by action code', () => {
    const filter = actionFilterBuilder()
      .setActionCode('navigate')
      .buildQueryString()

    expect(filter).toMatch('action=navigate')
  })

  it('filters by user', () => {
    const filter = actionFilterBuilder()
      .setUserKey('abc-12345-def-67890')
      .buildQueryString()

    expect(filter).toMatch('user=abc-12345-def-67890')
  })

  it('specifies limit', () => {
    const filter = actionFilterBuilder().setLimit(10).buildQueryString()

    expect(filter).toMatch('limit=10')
  })

  it('specifies offset', () => {
    const filter = actionFilterBuilder().setOffset(20).buildQueryString()

    expect(filter).toMatch('offset=20')
  })

  it('combines filters', () => {
    const filter = actionFilterBuilder()
      .setStart('2022-03-10')
      .setLimit(50)
      .setActionCode('login')
      .buildQueryString()

    expect(filter.includes('start=2022-03-10')).toBeTruthy()
    expect(filter.includes('limit=50')).toBeTruthy()
    expect(filter.includes('action=login')).toBeTruthy()
  })

  it('can be reused', () => {
    const builder = actionFilterBuilder().setStart('2022-03-10').setLimit(50)

    builder.buildQueryString()
    builder.setOffset(50)
    const query = builder.buildQueryString()

    expect(query.includes('start=2022-03-10')).toBeTruthy()
    expect(query.includes('limit=50')).toBeTruthy()
    expect(query.includes('offset=50')).toBeTruthy()
  })

  it('makes paging easy', () => {
    const builder = actionFilterBuilder().setLimit(42)
    expect(builder.buildQueryString()).toEqual('limit=42')

    builder.nextPage()
    expect(builder.buildQueryString().includes('limit=42')).toBeTruthy()
    expect(builder.buildQueryString().includes('offset=42')).toBeTruthy()

    builder.nextPage()
    expect(builder.buildQueryString().includes('limit=42')).toBeTruthy()
    expect(builder.buildQueryString().includes('offset=84')).toBeTruthy()

    builder.priorPage()
    builder.priorPage()
    expect(builder.buildQueryString().includes('limit=42')).toBeTruthy()
    expect(builder.buildQueryString().includes('offset=0')).toBeTruthy()
  })

  it('prevents negative offsets', () => {
    const builder = actionFilterBuilder().setLimit(40).setOffset(50)
    builder.priorPage()
    builder.priorPage()

    expect(builder.buildQueryString().includes('offset=0')).toBeTruthy()
    expect(builder.buildQueryString().includes('limit=40')).toBeTruthy()
  })
})
