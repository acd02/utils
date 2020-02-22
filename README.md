# Utils

A collection of utils implemented in TypeScript.

[test coverage report](https://cdn.statically.io/gh/acd02/utils/master/coverage/lcov-report/index.html)

## Getting started

```
npm install acd-utils
```

Then you can import these:

- [result](#Result)
- [when](#When)

## Result

`import { err, ok, result, Result } from 'acd-utils'`

```typescript
type Result<E, S> = Err<E> | Ok<S>
```

#### `err`

Returns an `Err`

_example_

```typescript
type Error = {
  code: number
}

const error: Error = {
  code: 400,
}

const err: Err = err(error)
```

#### `ok`

Returns an `Ok`

_example_

```typescript
type Data = {
  values: number[]
}

const data: Data = {
  values: [1, 2],
}

const success: Ok = ok(data)
```

#### `result`

Wraps a value of two possible types (`Result`) and returns a [`ResultBox`](https://github.com/acd02/utils/blob/master/src/result/result.ts#L1) object
allowing you to unfold the value to handle both cases.

An instance of `Result<E, S>` is either an instance of `Err` or `Ok`.
The first type is used for failure (E), the second for success (S).

Sort of like a really really lightweight outlaw Result monad.

Methods available on the `ResultBox` object are:

- `fold`, takes two functions
  - a first function that will get executed if the value is an `Err`
  - a second function, that will get executed if the value is an `Ok`

_example_

```typescript
type Item = {
  id: number
  label: string
}

type Error = {
  code: number
}

function setData<T>(value: T) {
  data = value
}

const data: Result<Error, Item[]>

fetch('someapi')
  .then((res: Item[]) => setData(ok(res)))
  .catch((e: Error) => setData(err(e)))

result(data).fold(
  e => `the error code is ${e.code}`,
  items => `the data is ${JSON.stringify(items, null, 2)}`,
)
```

## When

`import { when, whenAll } from 'acd-utils'`

#### `when`

Wraps a potentially `nullable` value and returns a [`Box`](https://github.com/acd02/utils/blob/master/src/when/when.ts#L1) object, allowing you
to manipulate the value safely as if it was defined.

Sort of like a really lightweight outlaw Maybe monad.

Methods available on the `Box` object are:

- `map`, takes your value as an argument, allowing you to update it safely
- `filter`, takes your value as an argument, allowing you to return a predicate
- `fold`, takes two functions
  - a first function that will get executed if the value is `undefined` or `null`, allowing you to return a fallback value.
  - a second function that will get called with the value if defined. The result of this function will be then returned.
- `getOrElse`, expects a fallback value in case of the initial value was `undefined` or `null`
- `get`, returns your value.

_example_

```typescript
const word: string | undefined = undefined
const result = when(word)
  .filter(w => w.length > 4)
  .map(w => w.toUpperCase())
  .map(w => w + '!')
  .getOrElse(('hello')
// result === 'hello'

const otherWord: string | undefined = 'some text'
const otherResult = when(word)
  .filter(w => w.length > 4)
  .map(w => w.toUpperCase())
  .map(w => w + '!')
  .getOrElse(('hello')
// otherResult === 'SOME TEXT!'
```

#### `whenAll`

Wraps a tuple (up to 5 elements) containing potentially `nullable` values and returns a [`Box`](https://github.com/acd02/utils/blob/master/src/when/when.ts#L1) object (containing your tuple), allowing you to manipulate the values safely, as if they were all defined.

For the `map` method, or the second function of the `fold` method to be executed, all values inside the tuple must be truthy.

Sort of like a really lightweight outlaw Maybe monad.

Methods available on the `Box` object are:

- `map`, takes your value as an argument, allowing you to update it safely
- `filter`, takes your value as an argument, allowing you to return a predicate
- `fold`, takes two functions
  - a first function that will get executed if the value is `undefined` or `null`, allowing you to return a fallback value.
  - a second function that will get called with the value if defined. The result of this function will be then returned.
- `getOrElse`, expects a fallback value in case of the initial value was `undefined` or `null`
- `get`, returns your value.

_example_

```typescript
const word: string | undefined = undefined
const num: number | undefined = 1
const result = whenAll([word, num])
  .filter(([w]) => w.length > 4)
  .map(([w, n]) => `${w.toUpperCase()} ${n}`)
  .getOrElse('hello')
// result === 'hello'

const otherWord: string | undefined = 'some text'
const otherNum: number | undefined = 1
const otherResult = whenAll([word, num])
  .filter(([w]) => w.length > 4)
  .map(([w, n]) => `${w.toUpperCase()} ${n}`)
  .getOrElse(('hello')
// otherResult === 'SOME TEXT 1'
```

---

This project was inspired by:

- [fp-ts](https://github.com/gcanti/fp-ts)
- [space-lift](https://github.com/AlexGalays/spacelift)

# TSDX Bootstrap

This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx).
