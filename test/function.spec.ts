import { noop, tap } from '../src/function/function'

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

describe('noop', () => {
  it('should always return undefined', () => {
    expect(noop()).toEqual(undefined)
  })
})

describe('tap', () => {
  it('should run the given function with the supplied value, then return the value as is', () => {
    expect(
      tap<Item>(i => {
        console.log('label ', i.label)
        i.label.toUpperCase()
      })(items[0]),
    ).toEqual({ label: 'one', id: 1 })
  })
})
