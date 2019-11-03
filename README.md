# Utils

## Array

`import { _array } from 'acd-utils`

### Helpers:

---

#### append

Append an element to the end of an array, creating a new array.

#### compact

Creates an array with all falsey values removed.

#### head

Get the first element in an array, or `undefined` if the array is empty.

#### last

Get the last element in an array, or `undefined` if the array is empty.

#### preprend

Attaches an element to the front of an array, creating a new array.

#### sortBy

Sorts a list according to a list of comparators.

#### uniq

Creates a duplicate-free version of an array.

#### uniqBy

Creates a duplicate-free version of an array, with uniqueness determined by specific key.

### Crud like operations:

---

#### deleteAt

Delete the element at the specified index, creating a new array, or returning the array as is if the index is out of bounds.

#### insertAt

Insert an element at the specified index, creating a new array, or returning the array as is if the index is out of bounds.

#### lookupAt

Read a value at a particular index from an array.

#### modifyAt

Apply a function to the element at the specified index, creating a new array, or returning the array as is if the index is out of bounds.

#### updateAt

Change the element at the specified index, creating a new array, or returning the array as us if the index is out of bounds.

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

`import { _function } from 'acd-utils`

#### curry

Returns a curried equivalent of the provided function.

#### debounce

Creates a debounced function that delays invoking `func` until after wait milliseconds have elapsed since the last time the debounced function was invoked.

#### noop

This function always returns `undefined`.

#### throttle

Creates a throttled function that only invokes func at most once per every wait milliseconds.

## Logic

`import { _logic } from 'acd-utils`

#### doWhen

arguments:

- a tuple (up to 5) of potentially undefined values.
- a function A function that will be called with the
- optional, a filter function

Only execute the function if all the value inside the tuple are truthy.

The function will be called with the values contained by the tuple.

As an optional third argument,

you can pass a filter function, which will be called with the values contained by the tuple as well,

in that case, the function will be executed only if the filter function returns true

example:

```typescript
const maybeElm = document.querySelector('.foo')
const maybeOtherElm = document.querySelector('.bar')

doWhen([maybeElm, maybeOtherElm], ([elm, otherElm]) => {
  elm.style.color = '#eee'
  otherElm.classList.add('something')
})

// with filter function
doWhen(
  [maybeElm, maybeOtherElm],
  ([elm, otherElm]) => {
    elm.style.color = '#eee'
    otherElm.classList.add('something')
  },
  ([_, otherElm]) => otherElm.classList.contains('stuff'),
)
```

#### ifElse

Creates a function that will process either the onTrue or the onFalse function depending upon the result of the condition predicate.

#### when

Creates a function that will process the whenTrue function if the condition predicate returns true, otherwise the argument will be returned as is.

## Object

`import { _object } from 'acd-utils`

#### objectKeys

Preserves the type of the array returned by `Object.keys`

example:

```typescript
const item = {
  label: 'ten',
  id: 10,
  isCool: true,
}

const keys = objectKeys(item)
// const keys: ("label" | "id" | "isCool")[]
```

#### omitKeys

Returns a partial copy of an object omitting the keys specified.

## Predicate

`import { _predicate } from 'acd-utils`

#### isDefined

Check whether the value is defined or not

#### isEmpty

Check whether the value is empty.

empty means `""`, `[]` or `{}`.

`undefined` or `null` will also be considered as empty.

---

# TSDX Bootstrap

This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx).

## Local Development

Below is a list of commands you will probably find useful.

### `npm start` or `yarn start`

Runs the project in development/watch mode. Your project will be rebuilt upon changes. TSDX has a special logger for you convenience. Error messages are pretty printed and formatted for compatibility VS Code's Problems tab.

<img src="https://user-images.githubusercontent.com/4060187/52168303-574d3a00-26f6-11e9-9f3b-71dbec9ebfcb.gif" width="600" />

Your library will be rebuilt if you make edits.

### `npm run build` or `yarn build`

Bundles the package to the `dist` folder.
The package is optimized and bundled with Rollup into multiple formats (CommonJS, UMD, and ES Module).

<img src="https://user-images.githubusercontent.com/4060187/52168322-a98e5b00-26f6-11e9-8cf6-222d716b75ef.gif" width="600" />

### `npm test` or `yarn test`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.
