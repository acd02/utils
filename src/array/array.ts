/**
 * Get the first element in an array, or `undefined` if the array is empty.
 *
 * @param array
 */
export function head<T>(arr: T[]): T | undefined {
  return arr[0]
}

/**
 * Get the last element in an array, or `undefined` if the array is empty.
 *
 * @param array
 */
export function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1]
}

/**
 * Attaches an element to the front of an array, creating a new array.
 *
 * @param T item to prepend
 * @returns Returns a function that expects the `array` to prepend to.
 *
 * @example
 *
 * const words = ['one', 'two']
 * const udpatedWords = prepend('hello')(words)
 * // udpatedWords === ['hello', 'one', 'two']
 */
export function prepend<T>(item: T) {
  return (arr: T[]) => {
    const copy = arr.slice()
    copy.unshift(item)

    return copy
  }
}

/**
 * Attaches an array to the front of another array, creating a new array.
 *
 * @param array original array.
 * @returns Returns a function that expects the `array` that will be attached to the original array.
 *
 * @example
 *
 * const original = ['one', 'two']
 * const other = ['three', 'four']
 * const result = prependArr(original)(other)
 * // result ==== ['three', 'four', 'one', 'two]
 */
export function prependArr<T>(original: T[]) {
  return (other: T[]) => other.concat(original)
}

/**
 * Append an element to the end of an array, creating a new array
 *
 * @param T item to append
 * @returns Returns a function that expects the `array` to append to.
 *
 * @example
 *
 * const words = ['one', 'two']
 * const udpatedWords = append('hello')(words)
 * // udpatedWords === ['one', 'two', 'hello']
 */
export function append<T>(item: T) {
  return (arr: T[]) => {
    const copy = arr.slice()
    copy.push(item)

    return copy
  }
}

/**
 * Creates an array with all falsey values removed.
 *
 * The values false, null, "", undefined, and NaN are falsey.
 * @param array The array to compact.
 */
export function compact<T>(
  array: (T | null | undefined | false | '')[],
): NonNullable<T>[] {
  return array.filter(t => {
    if (typeof t === 'number' && t === 0) return true
    else return Boolean(t)
  }) as NonNullable<T>[]
}

/**
 * Creates a duplicate-free version of an array
 *
 * @param array
 */
export function uniq<T>(arr: T[]) {
  const uniqArray = []

  for (let index = 0; index < arr.length; index++) {
    if (uniqArray.indexOf(arr[index]) < 0) uniqArray.push(arr[index])
  }

  return uniqArray
}

/**
 * Creates a duplicate-free version of an array,
 * with uniqueness determined by specific key.
 *
 * @param function A function that returns the specific key
 * @returns Returns a function that expects the `array` to iterate over.
 *
 * @example
 *
 * const items = [{ label: 'one', value: 1 }, { label: 'two', value: 1 }]
 * const uniqByValue = uniqBy(i => i.value)(items)
 * // uniqByValue === [{ label: 'one', value: 1 }]
 */
export function uniqBy<T>(makeKey: (item: T) => string | number) {
  return (arr: T[]) => {
    const uniqArray = []

    const keys: (string | number)[] = []
    for (let index = 0; index < arr.length; index++) {
      const currentKey: string | number = makeKey(arr[index])
      if (keys.indexOf(currentKey) < 0) {
        keys.push(currentKey)
        uniqArray.push(arr[index])
      }
    }

    return uniqArray
  }
}

type SortOption<T> = {
  by: (item: T) => string | number
  reverse?: boolean
}

/**
 * Sorts a list according to a list of comparators.
 *
 * @param SortOptions An array of comparators.
 * @returns Returns a function that expects the `array` to iterate over.
 *
 * @example
 *
 * const items = [{ label: 'one', value: 1 }, { label: 'two', value: 2 }]
 * const sort = sortBy([{ by: i => i.label }, { by: i => i.value, reverse: true }])
 * const sortedItems = sort(items)
 */
export function sortBy<T>(opts: SortOption<T>[]) {
  return (arr: T[]) => {
    const copy = arr.slice()

    return copy.sort((a, b) => {
      for (let index = 0; index < opts.length; index++) {
        const { by, reverse = false } = opts[index]

        if (by(a) < by(b)) return reverse ? 1 : -1
        if (by(a) > by(b)) return reverse ? -1 : 1
      }

      return 0
    })
  }
}

/**
 * Drop a number of elements from the start of an array, creating a new array.
 *
 * @param number The number of elements to take.
 * @returns Returns a function that expects the `array` to iterate over.
 *
 * @example
 *
 * const words = ['one', 'two', 'three', 'four']
 * const result = drop(2)(words)
 * // result === ['three', 'four']
 */
export function drop<T>(n: number) {
  return (arr: T[]) => (n < 0 ? arr : arr.slice(n))
}

/**
 * Drop a number of elements from the end of an array, creating a new array.
 *
 * @param number The number of elements to take.
 * @returns Returns a function that expects the `array` to iterate over.
 *
 * @example
 *
 * const words = ['one', 'two', 'three', 'four']
 * const result = dropRigth(1)(words)
 * // result === ['one', 'two', 'three']
 */
export function dropRight<T>(n: number) {
  return (arr: T[]) => (n < 1 ? arr : arr.slice(0, -n))
}

/**
 * Create an array containing a range of integers, including both endpoints
 *
 * @param number start
 * @param number end
 *
 * @example
 *
 * const result = range(2, 4)
 * // result === [2, 3, 4]
 */
export function range(start: number, end: number) {
  if (start < 0 || end < 0) return []
  return Array.from({ length: end + 1 }, (_, i) => i).slice(start)
}

/**
 * Keep only a number of elements from the start of an array, creating a new array.
 *
 * @param number The number of elements to take.
 * @returns Returns a function that expects the `array` to iterate over.
 *
 * @example
 *
 * const words = ['one', 'two', 'three', 'four']
 * const result = take(2)(words)
 * // result === ['one', 'two']
 */
export function take<T>(n: number) {
  return (arr: T[]) => (n < 0 ? arr : arr.slice(0, n))
}

/**
 * Keep only a number of elements from the end of an array, creating a new array.
 *
 * @param number The number of elements to take.
 * @returns Returns a function that expects the `array` to iterate over.
 *
 * @example
 *
 * const words = ['one', 'two', 'three', 'four']
 * const result = takeRight(1)(words)
 * // result === ['four']
 */
export function takeRight<T>(n: number) {
  return (arr: T[]) => (n < 0 || n > arr.length ? arr : arr.slice(arr.length - n))
}

/**
 * Creates an object composed of keys generated from the results of running
 * each element of collection thru iteratee.
 *
 * The corresponding value of each key is an array of elements responsible
 * for generating the key. The iteratee is invoked with one argument: (item).
 *
 * @param function A function that returns the specific key
 * @returns Returns a function that expects the `array` to iterate over.
 *
 * @example
 *
 * const items = [{ name: 'ONE', id: 1 }, { name: 'TWO', id: 2 }]
 * const result = groupBy(i => i.name.toLowerCase())(items)
 * // result === { one: [{ name: 'one', id: 1], two: [{ name: 'two', id: 2] }
 */
export function groupBy<T>(makeKey: (item: T) => string | number) {
  return (arr: T[]) =>
    arr.reduce<{ [key: string]: T[] }>(
      (acc, cur, _, __, key = makeKey(cur)) => (
        (acc[key] || (acc[key] = [])).push(cur), acc
      ),
      {} as { [key: string]: T[] },
    )
}

/**
 * Apply a function to pairs of elements at the same index in two arrays,
 * collecting the results in a new array. If one input array is short, excess elements
 * of the longer array are discarded.
 *
 *
 * @param function A function to combine grouped values.
 * @returns Returns a function that expects the two `array` to iterate over.
 *
 * @example
 *
 * const words = ['one', 'two', 'three']
 * const nums = [1, 2]
 * const result = zipWith((w, n) => w + n)(words, num)
 * // result === ['one1', 'two2']
 */
export function zipWih<R, T, U>(f: (a: T, b: U) => R) {
  return (t: T[], u: U[]) => {
    const zip = []
    const length = Math.min(t.length, u.length)
    for (let i = 0; i < length; i++) {
      zip[i] = f(t[i], u[i])
    }
    return zip
  }
}

/**
 * Sort of like flatMap.
 *
 * Calls a defined callback function on each element of every array
 * nested inside another one.
 * Then, flattens the result with depth 1.
 *
 * @param callbackfn The function invoked per iteration.
 * @returns Returns a function that expects the `array` to iterate over.
 *
 * @example
 *
 * const nestedWords = [['one', 'two'], ['three', 'four']]
 * const result = flatMap<string, string>(i => i.toUpperCase())(nestedWords)
 * // result === ['ONE', 'TWO', 'THREE', 'FOUR']
 */
export function nestedMap<T, U>(f: (t: T) => U) {
  return (arr: T[][]) => Array.prototype.concat(...arr).map(f)
}

/**
 * Removes one level of nesting.
 *
 * @param array
 */
export function flatten<T>(arr: (T[][] | T[] | T)[]): T[] {
  return Array.prototype.concat(...((arr as unknown) as T[])) as T[]
}
