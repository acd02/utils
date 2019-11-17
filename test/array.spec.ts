import {
  append,
  compact,
  difference,
  differenceBy,
  drop,
  dropRight,
  flatten,
  groupBy,
  head,
  intersection,
  intersectionBy,
  last,
  nestedMap,
  prepend,
  prependAll,
  range,
  sortBy,
  take,
  takeRight,
  uniq,
  uniqBy,
  zipWih,
} from '../src/array/array'

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

describe('append', () => {
  it('should append an element to an array', () => {
    expect(append(10)(nums)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 10])
    expect(append({ label: 'fourteen', id: 14 })(items)).toEqual([
      { label: 'one', id: 1 },
      { label: 'two', id: 2 },
      { label: 'three', id: 3 },
      { label: 'four', id: 4 },
      { label: 'five', id: 5 },
      { label: 'six', id: 6 },
      { label: 'seven', id: 7 },
      { label: 'eight', id: 8 },
      { label: 'fourteen', id: 14 },
    ])
  })

  it('should append an element to an empty array', () => {
    expect(append(10)([])).toEqual([10])
  })
})

describe('compact', () => {
  it('should remove all falsy values from an array', () => {
    expect(compact([1, 2, '', -1, null, undefined, 'ok', true, false])).toEqual([
      1,
      2,
      -1,
      'ok',
      true,
    ])
  })

  it("should not remove zero's", () => {
    expect(compact([1, 2, 0, '', -1, null, undefined])).toEqual([1, 2, 0, -1])
  })

  it('should note remove empty arrays or empty objects', () => {
    expect(compact([1, 2, [], {}])).toEqual([1, 2, [], {}])
  })
})

describe('difference', () => {
  it('should find of all elements in the first list not contained in the second list', () => {
    expect(difference([1, 2, 10])(nums)).toEqual([10])
    expect(difference([3, 100, 4, 20, 40, 1, 200, 300, 400, 420])(nums)).toEqual([
      100,
      20,
      40,
      200,
      300,
      400,
      420,
    ])
  })

  it('should return an empty array, if the first array is empty', () => {
    expect(difference([] as number[])(nums)).toEqual([])
  })

  it('should return the array as is, if the second array is empty', () => {
    expect(difference(nums)([] as number[])).toEqual(nums)
  })
})

describe('differenceBy', () => {
  it('should find of all elements in the first list not contained in the second list', () => {
    expect(
      differenceBy<Item>(i => i.id, items)([
        { label: 'aa', id: 100 },
        { label: 'bb', id: 200 },
        { label: 'cc', id: 1 },
        { label: 'dd', id: 4 },
      ]),
    ).toEqual([
      { label: 'two', id: 2 },
      { label: 'three', id: 3 },
      { label: 'five', id: 5 },
      { label: 'six', id: 6 },
      { label: 'seven', id: 7 },
      { label: 'eight', id: 8 },
    ])

    expect(
      differenceBy<Item>(i => i.label, items)([
        { label: 'aa', id: 1 },
        { label: 'bb', id: 1 },
        { label: 'four', id: 1 },
        { label: 'two', id: 1 },
      ]),
    ).toEqual([
      { label: 'one', id: 1 },
      { label: 'three', id: 3 },
      { label: 'five', id: 5 },
      { label: 'six', id: 6 },
      { label: 'seven', id: 7 },
      { label: 'eight', id: 8 },
    ])
  })

  it('should return an empty array, if the first array is empty', () => {
    expect(differenceBy<Item>(i => i.id, [] as Item[])(items)).toEqual([])
  })

  it('should return the array as is, if the second array is empty', () => {
    expect(differenceBy<Item>(i => i.id, items)([] as Item[])).toEqual(items)
  })
})

describe('drop', () => {
  it('should drop n items from the start of an array', () => {
    expect(drop(-1)(nums)).toEqual(nums)
    expect(drop(0)(nums)).toEqual(nums)
    expect(drop(2)(nums)).toEqual([3, 4, 5, 6, 7, 8])
  })

  it('should return an empty array if droping more items than array length', () => {
    expect(drop(100)(nums)).toEqual([])
  })
})

describe('dropRight', () => {
  it('should drop n items from the end of an array', () => {
    expect(dropRight(-1)(nums)).toEqual(nums)
    expect(dropRight(0)(nums)).toEqual(nums)
    expect(dropRight(2)(nums)).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('should return an empty array if droping more items than array length', () => {
    expect(dropRight(100)(nums)).toEqual([])
  })
})

describe('flatten', () => {
  it('should remove one level of nesting', () => {
    expect(flatten([nums])).toEqual(nums)
  })

  it('should remove only one level of nesting', () => {
    expect(flatten([[nums]])).toEqual([nums])
  })

  it('should return the array as is, if array is empty', () => {
    expect(flatten([])).toEqual([])
  })
})

describe('groupBy', () => {
  it('should create an object composed of keys generated from the results of running each element of collection (of objects) thru iteratee.', () => {
    expect(groupBy<Item>(i => i.label)(items)).toEqual({
      one: [{ label: 'one', id: 1 }],
      two: [{ label: 'two', id: 2 }],
      three: [{ label: 'three', id: 3 }],
      four: [{ label: 'four', id: 4 }],
      five: [{ label: 'five', id: 5 }],
      six: [{ label: 'six', id: 6 }],
      seven: [{ label: 'seven', id: 7 }],
      eight: [{ label: 'eight', id: 8 }],
    })
  })

  it('should create an object composed of keys generated from the results of running each element of collection (of arrays) thru iteratee.', () => {
    expect(groupBy<number[]>(x => x.length)([[1, 2], [1], [1, 2, 4]])).toEqual({
      1: [[1]],
      2: [[1, 2]],
      3: [[1, 2, 4]],
    })
  })

  it('should create an object composed of keys generated from the results of running each element of collection (of primitives) thru iteratee.', () => {
    expect(groupBy<string>(s => s.length)(['one', 'two', 'four'])).toEqual({
      3: ['one', 'two'],
      4: ['four'],
    })
  })
})

describe('head', () => {
  it('should get the first element in an array', () => {
    expect(head(nums)).toEqual(1)
  })

  it('should return undefined if the array is empty', () => {
    expect(head([])).toEqual(undefined)
  })
})

describe('intersection', () => {
  it('should combine two lists into a set (i.e. no duplicates) composed of those elements common to both lists', () => {
    expect(intersection([1, 2, 10])(nums)).toEqual([1, 2])
  })

  it('should have its output order determined by the first array', () => {
    expect(intersection([3, 100, 1, 20, 40, 4, 200, 300, 400, 420])(nums)).toEqual([
      3,
      1,
      4,
    ])
  })

  it('should return an empty array if the first array is empty', () => {
    expect(intersection([] as number[])(nums)).toEqual([])
  })

  it('should return an empty array if the second array is empty', () => {
    expect(intersection(nums)([] as number[])).toEqual([])
  })
})

describe('intersectionBy', () => {
  it('should combine two lists into a set (i.e. no duplicates) composed of those elements common to both lists', () => {
    expect(
      intersectionBy<Item>(i => i.id, items)([
        { label: 'aa', id: 100 },
        { label: 'bb', id: 200 },
        { label: 'cc', id: 1 },
        { label: 'dd', id: 4 },
      ]),
    ).toEqual([{ label: 'one', id: 1 }, { label: 'four', id: 4 }])
  })

  it('should have its output order determined by the first array', () => {
    expect(
      intersectionBy<Item>(i => i.label, items)([
        { label: 'aa', id: 1 },
        { label: 'bb', id: 1 },
        { label: 'four', id: 1 },
        { label: 'two', id: 1 },
      ]),
    ).toEqual([{ label: 'two', id: 2 }, { label: 'four', id: 4 }])
  })

  it('should return an empty array if the first array is empty', () => {
    expect(intersectionBy<Item>(i => i.id, [] as Item[])(items)).toEqual([])
  })

  it('should return an empty array if the second array is empty', () => {
    expect(intersectionBy<Item>(i => i.id, items)([] as Item[])).toEqual([])
  })
})

describe('last', () => {
  it('should get the last element in an array', () => {
    expect(last(nums)).toEqual(8)
  })

  it('should return undefined if the array is empty', () => {
    expect(last([])).toEqual(undefined)
  })
})

describe('nestedMap', () => {
  it('should call a defined callback function on each element of every array nested inside another one. Then, flattens the result with depth 1.', () => {
    expect(nestedMap<string, string>(s => s.toUpperCase())([['one'], ['two']])).toEqual([
      'ONE',
      'TWO',
    ])

    expect(nestedMap<string, string>(s => s.toUpperCase())([['one'], []])).toEqual([
      'ONE',
    ])

    expect(nestedMap<string, number>(s => s.length)([['one'], ['two']])).toEqual([3, 3])
  })

  it('should return an empty array if passed arrays are empty', () => {
    expect(nestedMap<string, number>(s => s.length)([])).toEqual([])
    expect(nestedMap<string, number>(s => s.length)([[], []])).toEqual([])
  })
})

describe('prepend', () => {
  it('should prepend an element to an array', () => {
    expect(prepend(10)(nums)).toEqual([10, 1, 2, 3, 4, 5, 6, 7, 8])
    expect(prepend({ label: 'fourteen', id: 14 })(items)).toEqual([
      { label: 'fourteen', id: 14 },
      { label: 'one', id: 1 },
      { label: 'two', id: 2 },
      { label: 'three', id: 3 },
      { label: 'four', id: 4 },
      { label: 'five', id: 5 },
      { label: 'six', id: 6 },
      { label: 'seven', id: 7 },
      { label: 'eight', id: 8 },
    ])
  })

  it('should prepend an element to an empty array', () => {
    expect(prepend(10)([])).toEqual([10])
  })
})

describe('prependAll', () => {
  it('should prepend an array to an array', () => {
    expect(prependAll(nums)([10])).toEqual([10, 1, 2, 3, 4, 5, 6, 7, 8])
    expect(prependAll(items)([{ label: 'fourteen', id: 14 }])).toEqual([
      { label: 'fourteen', id: 14 },
      { label: 'one', id: 1 },
      { label: 'two', id: 2 },
      { label: 'three', id: 3 },
      { label: 'four', id: 4 },
      { label: 'five', id: 5 },
      { label: 'six', id: 6 },
      { label: 'seven', id: 7 },
      { label: 'eight', id: 8 },
    ])
  })

  it('should prepend an array to an empty array', () => {
    expect(prependAll([10])([])).toEqual([10])
  })
})

describe('range', () => {
  it('should create an array containing a range of integers, including both endpoints', () => {
    expect(range(0, 0)).toEqual([0])
    expect(range(0, 1)).toEqual([0, 1])
    expect(range(1, 1)).toEqual([1])
    expect(range(1, 2)).toEqual([1, 2])
    expect(range(1, 4)).toEqual([1, 2, 3, 4])
    expect(range(2, 4)).toEqual([2, 3, 4])
  })

  it('should return an empty array if either one of the endpoint is < 0', () => {
    expect(range(-1, 100)).toEqual([])
    expect(range(-100, 100)).toEqual([])
    expect(range(-100, 0)).toEqual([])
    expect(range(10, -1)).toEqual([])
    expect(range(10, -100)).toEqual([])
    expect(range(10, 0)).toEqual([])
  })

  it('should return an empty array if end < start', () => {
    expect(range(12, 11)).toEqual([])
    expect(range(1, 0)).toEqual([])
  })
})

describe('sortBy', () => {
  it('should sort a list according to a list of iteratees.', () => {
    expect(sortBy<Item>([{ by: x => x.id, reverse: true }])(items)).toEqual([
      { label: 'eight', id: 8 },
      { label: 'seven', id: 7 },
      { label: 'six', id: 6 },
      { label: 'five', id: 5 },
      { label: 'four', id: 4 },
      { label: 'three', id: 3 },
      { label: 'two', id: 2 },
      { label: 'one', id: 1 },
    ])

    expect(sortBy<Item>([{ by: x => x.label }])(items)).toEqual([
      { label: 'eight', id: 8 },
      { label: 'five', id: 5 },
      { label: 'four', id: 4 },
      { label: 'one', id: 1 },
      { label: 'seven', id: 7 },
      { label: 'six', id: 6 },
      { label: 'three', id: 3 },
      { label: 'two', id: 2 },
    ])

    expect(
      sortBy<Item>([{ by: x => x.id }, { by: x => x.label, reverse: true }])([
        { label: 'one', id: 1 },
        { label: 'three', id: 3 },
        { label: 'two', id: 2 },
        { label: 'five', id: 5 },
        { label: 'seven', id: 7 },
        { label: 'second one', id: 1 },
        { label: 'six', id: 6 },
        { label: 'four', id: 4 },
      ]),
    ).toEqual([
      { label: 'second one', id: 1 },
      { label: 'one', id: 1 },
      { label: 'two', id: 2 },
      { label: 'three', id: 3 },
      { label: 'four', id: 4 },
      { label: 'five', id: 5 },
      { label: 'six', id: 6 },
      { label: 'seven', id: 7 },
    ])
  })
})

describe('take', () => {
  it('should keep only a number of elements from the start of an array', () => {
    expect(take(0)(nums)).toEqual([])
    expect(take(2)(nums)).toEqual([1, 2])
  })

  it('should return the array as is if taking more items than array length', () => {
    expect(take(100)(nums)).toEqual(nums)
  })

  it('should return the array as is if integer is < 0', () => {
    expect(take(-1)(nums)).toEqual(nums)
  })
})

describe('takeRight', () => {
  it('should keep only a number of elements from the end of an array', () => {
    expect(takeRight(0)(nums)).toEqual([])
    expect(takeRight(2)(nums)).toEqual([7, 8])
  })

  it('should return the array as is if taking more items than array length', () => {
    expect(takeRight(100)(nums)).toEqual(nums)
  })

  it('should return the array as is if integer is < 0', () => {
    expect(takeRight(-1)(nums)).toEqual(nums)
  })
})

describe('uniq', () => {
  it('should create a duplicate-free version of an array (of primitives)', () => {
    expect(uniq([])).toEqual([])
    expect(uniq(['one', 'two', 'three', 'two', 'four', '', 'two'])).toEqual([
      'one',
      'two',
      'three',
      'four',
      '',
    ])

    expect(uniq([1, 2, 3, 1, 4, 2])).toEqual([1, 2, 3, 4])
    expect(uniq([true, true, undefined, false, undefined])).toEqual([
      true,
      undefined,
      false,
    ])
  })
})

describe('uniqBy', () => {
  it('should create a duplicate-free version of an array (of objects)', () => {
    expect(uniqBy<Item>(x => x.id)([])).toEqual([])
    expect(
      uniqBy<Item>(x => x.id)([
        { label: 'one', id: 1 },
        { label: 'two', id: 2 },
        { label: 'second one', id: 1 },
        { label: 'third one', id: 1 },
        { label: 'three', id: 3 },
        { label: 'second two', id: 2 },
        { label: 'five', id: 5 },
      ]),
    ).toEqual([
      { label: 'one', id: 1 },
      { label: 'two', id: 2 },
      { label: 'three', id: 3 },
      { label: 'five', id: 5 },
    ])

    expect(
      uniqBy<Item>(x => x.label)([
        { label: 'one', id: 1 },
        { label: 'two', id: 2 },
        { label: 'one', id: 11 },
        { label: 'one', id: 12 },
        { label: 'three', id: 3 },
        { label: 'four', id: 4 },
        { label: 'three', id: 31 },
      ]),
    ).toEqual([
      { label: 'one', id: 1 },
      { label: 'two', id: 2 },
      { label: 'three', id: 3 },
      { label: 'four', id: 4 },
    ])
  })
})

describe('zipWith', () => {
  it('should apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array', () => {
    expect(
      zipWih<string, string, Item>((s, item) => `${s.toUpperCase()} ${item.id}`)(
        ['one', 'two', 'three', 'four'],
        items,
      ),
    ).toEqual(['ONE 1', 'TWO 2', 'THREE 3', 'FOUR 4'])
  })

  it('should discard excess elements of the longer array, if one input array is short', () => {
    expect(
      zipWih<string, string, number>((s, n) => `${s.toUpperCase()} ${n}`)(
        ['one', 'two', 'three', 'four'],
        [1, 2],
      ),
    ).toEqual(['ONE 1', 'TWO 2'])

    expect(
      zipWih<string, string, number>((s, n) => `${s.toUpperCase()} ${n}`)(
        ['one', 'two'],
        [1, 2, 3, 4],
      ),
    ).toEqual(['ONE 1', 'TWO 2'])
  })
})
