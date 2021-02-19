# Utils

A collection of utils implemented in TypeScript.

[test coverage report](https://acd02-utils-test-coverage.netlify.app/)

## Getting started

```
npm install acd-utils
```

Then you can import these:

- [result](#Result)
- [maybe](#Maybe)

## Result

`import { err, ok, result, Result } from 'acd-utils'`

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

Wraps a value of two possible types (`Ok | Err`) and returns a [`Result`](https://github.com/acd02/utils/blob/master/src/result/result.ts#L1) object
allowing you to unfold the value to handle both cases.

An instance of `Result<E, S>` is either an instance of `Err` or `Ok`.
The first type is used for failure (E), the second for success (S).

Sort of like a really really lightweight unlawful Result monad.

Methods available on the `Result` object are:

- `fold`, takes two functions
  - a first function that will get executed if the value is an `Err`
  - a second function, that will get executed if the value is an `Ok`

_example_

```typescript
import { err, ok, Result, result } from 'acd-utils'

type Item = {
  id: number
  label: string
}

type Error = {
  code: number
}

async function httpGet<Res, Err>(url: string): Promise<Result<Err, Res>> {
  const { error, data } = await fetch(url).then(i => i.json())
  
  return result(error ? err(error) : ok(data as Res))
}

const data = await httpGet<Item, Error>('someUrl')

data.fold(
  e => `the error code is ${e.code}`,
  item => `label is ${item.label}`,
)
```

## Maybe

`import { maybe, maybeAll } from 'acd-utils'`

#### `maybe`

Wraps a potentially `nullable` value and returns a [`Box`](https://github.com/acd02/utils/blob/master/src/maybe/maybe.ts#L1) object, allowing you
to manipulate the value safely as if it was defined.

Sort of like a really lightweight unlawful Maybe monad.

Methods available on the `Box` object are:

- [`map`](#map), takes your value as an argument, allowing you to update it safely
- [`filter`](#filter), takes your value as an argument, allowing you to return a predicate
- [`flatMap`](#flatMap), if value is defined, calls the function you give on the item in the Box and returns its result
- [`fold`](#fold), takes two functions
  - a first function that will get executed if the value is `undefined` or `null`, allowing you to return a fallback value.
  - a second function that will get called with the value if defined. The result of this function will be then returned.
- [`getOrElse`](#getOrElse), expects a fallback value in case of the initial value was `undefined` or `null`
- [`get`](#get), returns your value


### `map`
_example_

```typescript
const word: string | undefined = undefined
const result = maybe(word)
  .map(w => w.toUpperCase())
  .map(w => w + '!')
  .get()
// result === undefined

const word2: string | undefined = 'hello'
const result2 = maybe(word2)
  .map(w => w.toUpperCase())
  .map(w => w + '!')
  .get()
// result2 === 'HELLO!'
```

### `filter`
_example_

```typescript
const word: string | undefined = undefined
const result = maybe(word)
  .filter(w => w.length > 2)
  .map(w => w + '!')
  .get()
// result === undefined

const word2: string | undefined = 'ok'
const result2 = maybe(word2)
  .filter(w => w.length > 2)
  .map(w => w + '!')
  .get()
// result2 === undefined

const word3: string | undefined = 'hello'
const result3 = maybe(word3)
  .filter(w => w.length > 2)
  .map(w => w + '!')
  .get()
// result3 === 'hello!'
```

### `flatMap`
_example_

```typescript
type Obj = {
  label?: string
}

const obj: Obj | undefined = {
  label: 'some label'
}

const result = maybe(obj)
  .flatMap(obj => maybe(obj.label).map(label => label.toUpperCase()))
  .get()
// result === 'SOME LABEL'

const obj2: Obj | undefined = undefined

const result2 = maybe(obj2)
  .flatMap(obj => maybe(obj.label).map(label => label.toUpperCase()))
  .get()
// result2 === undefined
```

### `fold`
_example_

```typescript
type Obj = {
  label: string
}

const obj: Obj | undefined = {
  label: 'some label'
}

const result = maybe(obj)
  .fold(
    () => 'oops',
    ({ label }) => label.toUpperCase()
  )
// result === 'SOME LABEL

const obj2: Obj | undefined = undefined

const result2 = maybe(obj2)
  .fold(
    () => 'oops',
    ({ label }) => label.toUpperCase()
  )
// result2 === 'oops'
```

### `getOrElse`
_example_

```typescript
const word: string | undefined = undefined
const result = maybe(word)
  .map(w => w.toUpperCase())
  .map(w => w + '!')
  .getOrElse('fallback')
// result === 'fallback'

const word2: string | undefined = 'hello'
const result2 = maybe(word2)
  .map(w => w.toUpperCase())
  .map(w => w + '!')
  .getOrElse('fallback')
// result2 === 'HELLO!'
```

### `get`
_example_

```typescript
const word: string | undefined = undefined
const result = maybe(word)
  .map(w => w.toUpperCase())
  .map(w => w + '!')
  .get()
// result === undefined

const word2: string | undefined = 'hello'
const result2 = maybe(word2)
  .map(w => w.toUpperCase())
  .map(w => w + '!')
  .get()
// result2 === 'HELLO!'
```

#### `maybeAll`

Wraps a tuple (up to 5 elements) containing potentially `nullable` values and returns a [`Box`](https://github.com/acd02/utils/blob/master/src/maybe/maybe.ts#L1) object (containing your tuple), allowing you to manipulate the values safely, as if they were all defined.

For the `map`, `filter` methods, or the second function of the `fold` method to be executed, all values inside the tuple must be defined.

Sort of like a really lightweight unlawful Maybe monad.

Methods available on the `Box` object are:

- `map`, takes your value as an argument, allowing you to update it safely
- `filter`, takes your value as an argument, allowing you to return a predicate
- `fold`, takes two functions
  - a first function that will get executed if the value is `undefined` or `null`, allowing you to return a fallback value.
  - a second function that will get called with the value if defined. The result of this function will be then returned.
- `getOrElse`, expects a fallback value in case of the initial value was `undefined` or `null`
- `get`, returns your value

_example_

```typescript
const word: string | undefined = undefined
const num: number | undefined = 36
const result = maybeAll([word, num])
  .filter(([w]) => w.length > 4)
  .map(([w, n]) => `${String(n)} ${w}`)
  .getOrElse('wu')
// result === 'wu'

const word2: string | undefined = 'chambers'
const num2: number | undefined = 36
const result2= maybeAll([word2, num2])
  .filter(([w]) => w.length > 4)
  .map(([w, n]) => `${String(n)} ${w}`)
  .getOrElse('wu')
// result2 === '36 chambers'
```

---

This project was inspired by:

- [fp-ts](https://github.com/gcanti/fp-ts)
- [space-lift](https://github.com/AlexGalays/spacelift)

# TSDX Bootstrap

This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx).
