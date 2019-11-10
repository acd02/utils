# Utils

A collection of utils implemented in TypeScript.

## Getting started

```
npm install acd-utils
```

Then you can import each module individually:

- [array](#Array)
- [function](#Function)
- [object](#Object)
- [predicate](#Predicate)

## Array

`import { array } from 'acd-utils'`

### Helpers:

---

#### `append`

Append an element to the end of an array, creating a new array.

_example_

```typescript
const nums = [1, 2]
const result = append(3)(nums)
// result === [1, 2, 3]
```

#### `compact`

Creates an array with all falsy values removed.

_example_

```typescript
const items = [1, 2, 0, '', undefined, 'a']
const result = compact(items)
// result === [1, 2, 0, 'a']
```

#### `difference`

Finds the set (i.e. no duplicates) of all elements in the first list not contained in the second list.

_example_

```typescript
const nums = [1, 2, 3, 4]
const otherdNums = [3, 2]
const result = difference(nums)(otherNums)
// result === [1, 4]
```

#### `differenceBy`

Finds the set (i.e. no duplicates) of all elements in the first list not contained in the second list.
Duplication is determined according to the value returned by applying the supplied predicate to two list elements.

_example_

```typescript
const items = [{ label: 'one', id: 1 }, { label: 'two', id: 2 }]
const otherItems = [{ label: 'three', id: 3 }, { label: 'one', id: 1 }]
const result = differenceBy(i => i.id, items)(otherItem)
// result === [{ label: 'two', id: 2}]
```

#### `drop`

Drop a number of elements from the start of an array, creating a new array.

_example_

```typescript
const nums = [1, 2, 3, 4]
const result = drop(2)(nums)
// result === [3, 4]
```

#### `dropRight`

Drop a number of elements from the end of an array, creating a new array.

_example_

```typescript
const nums = [1, 2, 3, 4]
const result = dropRigth(1)(nums)
// result === [1, 2, 3]
```

#### `flatten`

Removes one level of nesting.

_example_

```typescript
const nums = [[1, 2], [3, 4]]
const result = flatten((nums)
// result === [1, 2, 3, 4]
```

#### `groupBy`

Creates an object composed of keys generated from the results of running
each element of collection thru iteratee.

The corresponding value of each key is an array of elements responsible
for generating the key. The iteratee is invoked with one argument: (item).

_example_

```typescript
const items = [{ name: 'ONE', id: 1 }, { name: 'TWO', id: 2 }]
const result = groupBy(i => i.name.toLowerCase())(items)
// result === { one: [{ name: 'one', id: 1], two: [{ name: 'two', id: 2] }
```

#### `head`

Get the first element in an array, or `undefined` if the array is empty.

_example_

```typescript
const nums = [1, 2, 3, 4]
const result = head(items)
// result === 1
```

#### `intersection`

Combines two lists into a set (i.e. no duplicates) composed of those elements common to both lists.

_example_

```typescript
const nums = [1, 2, 3, 4]
const otherNums = [5, 6, 2, 1]
const result = intersection(nums)(otherNums)
// result === [1, 2]
```

#### `intersectionBy`

Combines two lists into a set (i.e. no duplicates) composed of those elements common to both lists.
Duplication is determined according to the value returned by applying the supplied predicate to two list elements.

_example_

```typescript
const items = [{ label: 'one', id: 1 }, { label: 'two', id: 2 }]
const otherItems = [{ label: 'one', id: 3 }, { label: 'one', id: 1 }]
const result = intersectionBy(i => i.id, items)(otherItems)
// result === [{ label: 'one', id: 1 }]
```

#### `last`

Get the last element in an array, or `undefined` if the array is empty.

_example_

```typescript
const nums = [1, 2, 3, 4]
const result = last(4)
// result === 1
```

#### `nestedMap`

Sort of like flatMap.

Calls a defined callback function on each element of every array nested inside another one.
Then, flattens the result with depth 1.

_example_

```typescript
const nestedNums = [[1, 2], [3, 4]]
const result = flatMap<number, number>(i => i * 2)(nestedNums)
// result === [2, 4, 6, 8]
```

#### `preprend`

Attaches an element to the front of an array, creating a new array.

_example_

```typescript
const nums = [1, 2]
const result = prepend(3)(nums)
// result === [3, 1, 2]
```

#### `preprendAll`

Attaches an array to the front of another array, creating a new array.

_example_

```typescript
const original = [1, 2]
const other = [3, 4]
const result = prependArr(original)(other)
// result ==== [3, 4, 1, 2]
```

#### `sortBy`

Sorts a list according to a list of comparators.

_example_

```typescript
const items = [
  { label: 'one', value: 1 },
  { label: 'three', value: 3 },
  { label: 'two', value: 2 },
  { label: 'z', value: 1 },
]
const sort = sortBy([{ by: i => i.value }, { by: i => i.label, reverse: true }])
const result = sort(items)
// result ==== [{ label: 'z', value: 1 }, { label: 'one', value: 1 }, { label: 'two', value: 2 }, { label: 'three', value: 3 }]
```

#### `take`

Keep only a number of elements from the start of an array, creating a new array.

_example_

```typescript
const nums = [1, 2, 3, 4]
const result = take(2)(nums)
// result === [1, 2]
```

#### `takeRight`

Keep only a number of elements from the end of an array, creating a new array.

_example_

```typescript
const nums = [1, 2, 3, 4]
const result = takeRight(1)(nums)
// result === [4]
```

#### `range`

Create an array containing a range of integers, including both endpoints

_example_

```typescript
const result = range(2, 4)
// result === [2, 3, 4]
```

#### `uniq`

Creates a duplicate-free version of an array.

_example_

```typescript
const nums = [1, 2, 3, 1]
const result = uniq(nums)
// result === [1, 2, 3]
```

#### `uniqBy`

Creates a duplicate-free version of an array, with uniqueness determined by specific key.

_example_

```typescript
const items = [{ label: 'one', value: 1 }, { label: 'two', value: 1 }]
const result = uniqBy(i => i.value)(items)
// result === [{ label: 'one', value: 1 }]
```

#### `zipWith`

Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array.
If one input array is short, excess elements of the longer array are discarded.

_example_

```typescript
const words = ['one', 'two', 'three']
const nums = [1, 2]
const result = zipWith((w, n) => w + n)(words, num)
// result === ['one1', 'two2']
```

### Crud like operations:

---

#### `deleteAt`

Delete the element at the specified index, creating a new array, or returning the array as is if the index is out of bounds.

_example_

```typescript
const nums = [1, 2, 3, 4]
const result = deleteAt(2)(nums)
// result === [1, 2, 4]
```

#### `insertAt`

Insert an element at the specified index, creating a new array, or returning the array as is if the index is out of bounds.

_example_

```typescript
const nums = [1, 2, 3, 4]
const result = insertAt(2, 10)(nums)
// result === [1, 2, 10, 3, 4]
```

#### `lookupAt`

Read a value at a particular index from an array.

_example_

```typescript
const nums = [1, 2, 3, 4]
const result = lookupAt(2)(nums)
// result === 3
```

#### `modifyAt`

Apply a function to the element at the specified index, creating a new array, or returning the array as is if the index is out of bounds.

_example_

```typescript
const nums = [1, 2, 3, 4]
const result = modifyAt(2, n => n * 2)(nums)
// result === [1, 2, 6, 4]
```

#### `updateAt`

Change the element at the specified index, creating a new array, or returning the array as us if the index is out of bounds.

_example_

```typescript
const nums = [1, 2, 3, 4]
const result = updateAt(2, 20)(nums)
// result === [1, 2, 20, 4]
```

### Native (curried and iteratee-first data-last) array methods:

---

- concat
- every
- filter
- _filterTypeGuard_
- includes
- map
- reduce
- some

## Function

`import { func } from 'acd-utils'`

#### `curry`

Returns a curried equivalent of the provided function.

_example_

```typescript
function add(a: number, b: number) {
  return a + b
}
const curriedAdd = curry(add)
const addTwo = curriedAdd(2)
const result = addTwo(10) // 12
```

#### `noop`

This function always returns `undefined`.

#### `when`

Wraps a potentially `nullable` value and returns a [`Box`](https://github.com/acd02/utils/blob/master/src/function/when.ts#L1) object, allowing you
to manipulate the value safely as if it was defined.

Sort of like a really lightweight outlaw Maybe monad (but it is not).

_example_

```typescript
const word: string | undefined = undefined
const result = when(word)
  .filter(w => w.length > 4)
  .map(w => w.toUpperCase())
  .map(w => w + '!')
  .getOrElse(() => 'hello')
// result === 'hello'

const otherWord: string | undefined = 'some text'
const otherResult = when(word)
  .filter(w => w.length > 4)
  .map(w => w.toUpperCase())
  .map(w => w + '!')
  .getOrElse(() => 'hello')
// otherResult === 'SOME TEXT!'
```

#### `whenAll`

Wraps a tuple (up to 5 elements) containing potentially `nullable` values and returns a [`Box`](https://github.com/acd02/utils/blob/master/src/function/when.ts#L1) object, allowing you
to manipulate the values safely, as if they were all defined.

If not all values are defined, only `getOrElse` will be called.

Sort of like a really lightweight Maybe monad (but it is not).

_example_

```typescript
const word: string | undefined = undefined
const num: number | undefined = 1
const result = whenAll([word, num])
  .filter(([w]) => w.length > 4)
  .map(([w, n]) => `${w.toUpperCase()} ${n}`)
  .getOrElse(() => 'hello')
// result === 'hello'

const otherWord: string | undefined = 'some text'
const otherNum: number | undefined = 1
const otherResult = whenAll([word, num])
  .filter(([w]) => w.length > 4)
  .map(([w, n]) => `${w.toUpperCase()} ${n}`)
  .getOrElse(() => 'hello')
// otherResult === 'SOME TEXT 1'
```

## Object

`import { object } from 'acd-utils'`

#### `objectKeys`

Preserves the type of the array returned by `Object.keys`

_example_

```typescript
const item = {
  label: 'ten',
  id: 10,
  isCool: true,
}

const keys = objectKeys(item)
// const keys: ("label" | "id" | "isCool")[]
```

#### `omitKeys`

Returns a partial copy of an object omitting the keys specified.

_example_:

```typescript
const item = {
  label: 'ten',
  id: 10,
  isCool: true,
}

const updatedItem = omitKeys(item, 'label', 'isCool')
// updatedItem === { id: 10 }
```

## Predicate

`import { predicate } from 'acd-utils'`

#### `isDefined`

Check whether the value is defined or not

#### `isEmpty`

Check if the value is empty.

empty means `""`, `[]` or `{}`.

`undefined` or `null` will also be considered as empty.

---

# TSDX Bootstrap

This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx).
