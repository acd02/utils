import {
  deleteAt,
  insertAt,
  lookupAt,
  modifyAt,
  updateAt,
} from '../src/array/crudArrayMethods'

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
const nums = [1, 2, 3, 4, 5, 6, 7, 8]

const mockedItems = jest
  .fn()
  .mockReturnValue([
    { label: 'one', id: 1 },
    { label: 'two', id: 2 },
    { label: 'three', id: 3 },
    { label: 'four', id: 4 },
    { label: 'five', id: 5 },
    { label: 'six', id: 6 },
    { label: 'seven', id: 7 },
    { label: 'eight', id: 8 },
  ])()
const mockedNums = jest.fn().mockReturnValue([1, 2, 3, 4, 5, 6, 7, 8])()

afterEach(() => {
  expect(nums).toEqual(mockedNums)
  expect(items).toEqual(mockedItems)
})

describe('deleteAt', () => {
  it('should delete the element at the specified index, creating a new array', () => {
    expect(deleteAt(2)(items)).toEqual([
      { label: 'one', id: 1 },
      { label: 'two', id: 2 },
      { label: 'four', id: 4 },
      { label: 'five', id: 5 },
      { label: 'six', id: 6 },
      { label: 'seven', id: 7 },
      { label: 'eight', id: 8 },
    ])
    expect(deleteAt(0)(nums)).toEqual([2, 3, 4, 5, 6, 7, 8])
    expect(deleteAt(7)(nums)).toEqual([1, 2, 3, 4, 5, 6, 7])
  })

  it('should return the array as is if the index is out of bounds', () => {
    expect(deleteAt(12)(items)).toEqual(items)
    expect(deleteAt(-1)(nums)).toEqual(nums)
  })
})

describe('insertAt', () => {
  it('should insert an element at the specified index, creating a new array', () => {
    expect(insertAt(2, { label: 'extra', id: 100 })(items)).toEqual([
      { label: 'one', id: 1 },
      { label: 'two', id: 2 },
      { label: 'extra', id: 100 },
      { label: 'three', id: 3 },
      { label: 'four', id: 4 },
      { label: 'five', id: 5 },
      { label: 'six', id: 6 },
      { label: 'seven', id: 7 },
      { label: 'eight', id: 8 },
    ])
    expect(insertAt(0, 100)(nums)).toEqual([100, 1, 2, 3, 4, 5, 6, 7, 8])
    expect(insertAt(4, 101)(nums)).toEqual([1, 2, 3, 4, 101, 5, 6, 7, 8])
  })

  it('should return the array as is if the index is out of bounds', () => {
    expect(insertAt(12, { label: 'extra', id: 100 })(items)).toEqual(items)
    expect(insertAt(-1, 100)(nums)).toEqual(nums)
  })
})

describe('lookupAt', () => {
  it('should read a value at a particular index from an array', () => {
    expect(lookupAt(2)(items)).toEqual({ label: 'three', id: 3 })
    expect(lookupAt(0)(nums)).toEqual(1)
    expect(lookupAt(4)(nums)).toEqual(5)
  })

  it('should return undefined if the index is out of bounds', () => {
    expect(lookupAt(12)(items)).toEqual(undefined)
    expect(lookupAt(-1)(nums)).toEqual(undefined)
  })
})

describe('modifyAt', () => {
  it('should apply a function to the element at the specified index, creating a new array', () => {
    expect(
      modifyAt<Item>(2, i => ({ ...i, label: i.label.toUpperCase() }))(items),
    ).toEqual([
      { label: 'one', id: 1 },
      { label: 'two', id: 2 },
      { label: 'THREE', id: 3 },
      { label: 'four', id: 4 },
      { label: 'five', id: 5 },
      { label: 'six', id: 6 },
      { label: 'seven', id: 7 },
      { label: 'eight', id: 8 },
    ])
    expect(modifyAt<number>(0, n => n * 2)(nums)).toEqual([2, 2, 3, 4, 5, 6, 7, 8])
  })

  it('should return the array as is if the index is out of bounds.', () => {
    expect(
      modifyAt<Item>(12, i => ({ ...i, label: i.label.toUpperCase() }))(items),
    ).toEqual(items)
    expect(modifyAt<number>(-1, n => n * 2)(nums)).toEqual(nums)
  })
})

describe('updateAt', () => {
  it('should change the element at the specified index, creating a new array,', () => {
    expect(updateAt<Item>(2, { id: 100, label: 'extra' })(items)).toEqual([
      { label: 'one', id: 1 },
      { label: 'two', id: 2 },
      { label: 'extra', id: 100 },
      { label: 'four', id: 4 },
      { label: 'five', id: 5 },
      { label: 'six', id: 6 },
      { label: 'seven', id: 7 },
      { label: 'eight', id: 8 },
    ])
    expect(updateAt<number>(0, 100)(nums)).toEqual([100, 2, 3, 4, 5, 6, 7, 8])
  })

  it('should return the array as is if the index is out of bounds.', () => {
    expect(updateAt<Item>(12, { id: 100, label: 'extra' })(items)).toEqual(items)
    expect(updateAt<number>(-1, 100)(nums)).toEqual(nums)
  })
})
