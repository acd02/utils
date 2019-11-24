import { omitKeys } from '../src/object/object'

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

describe('omitKeys', () => {
  it('should return a partial copy of an object omitting the keys specified', () => {
    expect(omitKeys(items[0], 'label')).toEqual({ id: 1 })
    expect(omitKeys(items[0], 'id')).toEqual({ label: 'one' })
  })
})
