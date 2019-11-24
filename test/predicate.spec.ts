import { hasKey, isDefined, isEmpty } from '../src/predicate/predicate'

type Item = {
  label: string
  id: number
}
const items: Item[] = [
  { label: 'one', id: 1 },
  { label: 'two', id: 2 },
  { label: 'three', id: 3 },
  { label: 'four', id: 4 },
  { label: 'five', id: 5 },
  { label: 'six', id: 6 },
  { label: 'seven', id: 7 },
  { label: 'eight', id: 8 },
]

describe('hasKey', () => {
  it('should check if object contains a certain key', () => {
    expect(hasKey('ok')(items[0])).toEqual(false)
    expect(hasKey('label')(items[0])).toEqual(true)
  })
})

describe('isDefined', () => {
  it('should check whether the value is defined or not', () => {
    expect(isDefined(undefined)).toEqual(false)
    expect(isDefined(null)).toEqual(false)
    expect(isDefined(-1)).toEqual(true)
    expect(isDefined(0)).toEqual(true)
    expect(isDefined(1)).toEqual(true)
    expect(isDefined('')).toEqual(true)
    expect(isDefined('ok')).toEqual(true)
    expect(isDefined([])).toEqual(true)
    expect(isDefined({})).toEqual(true)
  })
})

describe('isEmpty', () => {
  it('should check whether the value is empty or not', () => {
    expect(isEmpty(undefined)).toEqual(true)
    expect(isEmpty(null)).toEqual(true)
    expect(isEmpty([])).toEqual(true)
    expect(isEmpty({})).toEqual(true)
    expect(isEmpty('')).toEqual(true)

    expect(isEmpty(['ok'])).toEqual(false)
    expect(isEmpty({ a: 'a' })).toEqual(false)
    expect(isEmpty(-1)).toEqual(false)
    expect(isEmpty(0)).toEqual(false)
    expect(isEmpty(1)).toEqual(false)
    expect(isEmpty('ok')).toEqual(false)
    expect(isEmpty(true)).toEqual(false)
    expect(isEmpty(false)).toEqual(false)
  })
})
