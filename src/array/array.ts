/**
 * Append an element to the end of an array, creating a new array
 *
 * @param T item to append
 * @returns Returns a function that expects the `array` to append to
 *
 * @example
 *
 * const nums = [1, 2]
 * const result = append(3)(nums)
 * // result === [1, 2, 3]
 */
export function append<T>(a: T) {
  return (bs: T[]) => {
    const copy = bs.slice()
    copy.push(a)

    return copy
  }
}

/**
 * Creates an array with all falsy values removed.
 *
 * The values false, null, "", undefined, and NaN are considered falsy.
 * @param array The array to compact
 */
export function compact<T>(as: (T | null | undefined | false | '')[]): NonNullable<T>[] {
  return as.filter(a => {
    if (typeof a === 'number' && a === 0) return true
    else return Boolean(a)
  }) as NonNullable<T>[]
}

/**
 * Finds the set (i.e. no duplicates) of all elements in the first list
 * not contained in the second list.
 *
 * @param array The array to inspect
 * @returns Returns a function that expects the `array` with the values
 * to exclude
 *
 * @example
 *
 * const nums = [1, 2, 3, 4]
 * const otherdNums = [3, 2]
 * const result = difference(nums)(otherNums)
 * // result === [1, 4]
 */
export function difference<T>(as: T[]): (bs: T[]) => T[] {
  return bs => {
    const s = new Set(bs)

    return as.filter(a => !s.has(a))
  }
}

/**
 * Finds the set (i.e. no duplicates) of all elements in the first list
 * not contained in the second list.
 * Duplication is determined according to the value returned by applying
 * the supplied predicate to two list elements.
 *
 * @param function predicate
 * @param array The array to inspect
 * @returns Returns a function that expects the other `array`
 * with the values to exclude
 *
 * @example
 *
 * const items = [{ label: 'one', id: 1 }, { label: 'two', id: 2 }]
 * const otherItems = [{ label: 'three', id: 3 }, { label: 'one', id: 1 }]
 * const result = differenceBy(i => i.id, items)(otherItem)
 * // result === [{ label: 'two', id: 2}]
 */
export function differenceBy<T>(f: (t: T) => string | number, as: T[]): (bs: T[]) => T[] {
  return bs => {
    const s = new Set(bs.map(f))

    return as.filter(a => !s.has(f(a)))
  }
}

/**
 * Drop a number of elements from the start of an array, creating a new array.
 *
 * @param number The number of elements to take
 * @returns Returns a function that expects the `array` to iterate over
 *
 * @example
 *
 * const nums = [1, 2, 3, 4]
 * const result = drop(2)(nums)
 * // result === [3, 4]
 */
export function drop(n: number) {
  return <T>(as: T[]) => (n < 0 ? as : as.slice(n))
}

/**
 * Drop a number of elements from the end of an array, creating a new array.
 *
 * @param number The number of elements to take
 * @returns Returns a function that expects the `array` to iterate over
 *
 * @example
 *
 * const nums = [1, 2, 3, 4]
 * const result = dropRigth(1)(nums)
 * // result === [1, 2, 3]
 */
export function dropRight(n: number) {
  return <T>(as: T[]) => (n < 1 ? as : as.slice(0, -n))
}

/**
 * Removes one level of nesting.
 *
 * @param array
 */
export function flatten<T>(as: (T[][] | T[] | T)[]): T[] {
  return Array.prototype.concat(...((as as unknown) as T[])) as T[]
}

/**
 * Creates an object composed of keys generated from the results of running
 * each element of collection thru iteratee.
 *
 * The corresponding value of each key is an array of elements responsible
 * for generating the key. The iteratee is invoked with one argument: (item).
 *
 * @param function A function that returns the specific key
 * @returns Returns a function that expects the `array` to iterate over
 *
 * @example
 *
 * const items = [{ name: 'ONE', id: 1 }, { name: 'TWO', id: 2 }]
 * const result = groupBy(i => i.name.toLowerCase())(items)
 * // result === { one: [{ name: 'one', id: 1], two: [{ name: 'two', id: 2] }
 */
export function groupBy<T>(makeKey: (a: T) => string | number) {
  return (as: T[]) =>
    as.reduce<{ [k: string]: T[] }>(
      (acc, cur, _, __, k = makeKey(cur)) => ((acc[k] || (acc[k] = [])).push(cur), acc),
      {} as { [k: string]: T[] },
    )
}

/**
 * Get the first element in an array, or `undefined` if the array is empty.
 *
 * @param array
 */
export function head<T>(as: T[]): T | undefined {
  return as[0]
}

/**
 * Combines two lists into a set (i.e. no duplicates) composed
 * of those elements common to both lists.
 *
 * @param array The array to inspect
 * @returns Returns a function that expects the other `array`
 * to inspect
 *
 * @example
 *
 * const nums = [1, 2, 3, 4]
 * const otherNums = [5, 6, 2, 1]
 * const result = intersection(nums)(otherNums)
 * // result === [1, 2]
 */
export function intersection<T>(as: T[]): (bs: T[]) => T[] {
  return bs => {
    const s = new Set(bs)

    return as.filter(a => s.has(a))
  }
}

/**
 * Combines two lists into a set (i.e. no duplicates) composed
 * of those elements common to both lists.
 * Duplication is determined according to the value returned by applying
 * the supplied predicate to two list elements.
 *
 * @param function predicate
 * @param array the array to inspect
 * @returns Returns a function that expects the other `array` to inspect
 *
 * @example
 *
 * const items = [{ label: 'one', id: 1 }, { label: 'two', id: 2 }]
 * const otherItems = [{ label: 'one', id: 3 }, { label: 'one', id: 1 }]
 * const result = intersectionBy(i => i.id, items)(otherItems)
 * // result === [{ label: 'one', id: 1 }]
 */
export function intersectionBy<T>(
  f: (t: T) => string | number,
  as: T[],
): (bs: T[]) => T[] {
  return bs => {
    const s = new Set(bs.map(f))

    return as.filter(a => s.has(f(a)))
  }
}

/**
 * Get the last element in an array, or `undefined` if the array is empty.
 *
 * @param array
 */
export function last<T>(as: T[]): T | undefined {
  return as[as.length - 1]
}

/**
 * Sort of like flatMap.
 *
 * Calls a defined callback function on each element of every array
 * nested inside another one.
 * Then, flattens the result with depth 1.
 *
 * @param callbackfn The function invoked per iteration
 * @returns Returns a function that expects an `array` (`T[][]`) to iterate over
 *
 * @example
 *
 * const nestedNums = [[1, 2], [3, 4]]
 * const result = flatMap<number, number>(i => i * 2)(nestedNums)
 * // result === [2, 4, 6, 8]
 */
export function nestedMap<T, U>(f: (t: T) => U) {
  return (as: T[][]) => Array.prototype.concat(...as).map(f)
}

/**
 * Attaches an element to the front of an array, creating a new array.
 *
 * @param T item to prepend
 * @returns Returns a function that expects the `array` to prepend to
 *
 * @example
 *
 * const nums = [1, 2]
 * const result = prepend(3)(nums)
 * // result === [3, 1, 2]
 */
export function prepend<T>(a: T) {
  return (bs: T[]) => {
    const copy = bs.slice()
    copy.unshift(a)

    return copy
  }
}

/**
 * Attaches an array to the front of another array, creating a new array.
 *
 * @param array original array
 * @returns Returns a function that expects the `array` that will be attached to the original array
 *
 * @example
 *
 * const original = [1, 2]
 * const other = [3, 4]
 * const result = prependArr(original)(other)
 * // result ==== [3, 4, 1, 2]
 */
export function prependAll<T>(as: T[]) {
  return (bs: T[]) => bs.concat(as)
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

  return Array.from(Array(end + 1).keys()).slice(start)
}

type SortRecord<T> = {
  by: (a: T) => string | number
  reverse?: boolean
}

/**
 * Sorts a list according to a list of iteratees.
 *
 * @param sortRecords `{ by: (a: T) => string | number; reverse?: boolean }[]`
 * @returns Returns a function that expects the `array` to iterate over
 *
 * @example
 *
 * const items = [{ label: 'one', value: 1 }, { label: 'two', value: 2 }]
 * const sort = sortBy([{ by: i => i.label }, { by: i => i.value, reverse: true }])
 * const result = sort(items)
 */
export function sortBy<T>(cs: SortRecord<T>[]) {
  return (as: T[]) => {
    const cp = as.slice()

    return cp.sort((a, b) => {
      for (let i = 0; i < cs.length; i++) {
        const { by, reverse = false } = cs[i]

        if (by(a) < by(b)) return reverse ? 1 : -1
        if (by(a) > by(b)) return reverse ? -1 : 1
      }

      return 0
    })
  }
}

/**
 * Keep only a number of elements from the start of an array, creating a new array.
 *
 * @param number The number of elements to take
 * @returns Returns a function that expects the `array` to iterate over
 *
 * @example
 *
 * const nums = [1, 2, 3, 4]
 * const result = take(2)(nums)
 * // result === [1, 2]
 */
export function take(n: number) {
  return <T>(as: T[]) => (n < 0 ? as : as.slice(0, n))
}

/**
 * Keep only a number of elements from the end of an array, creating a new array.
 *
 * @param number The number of elements to take
 * @returns Returns a function that expects the `array` to iterate over
 *
 * @example
 *
 * const nums = [1, 2, 3, 4]
 * const result = takeRight(1)(nums)
 * // result === [4]
 */
export function takeRight(n: number) {
  return <T>(as: T[]) => (n < 0 || n > as.length ? as : as.slice(as.length - n))
}

/**
 * Creates a duplicate-free version of an array
 *
 * @param array
 */
export function uniq<T>(as: T[]) {
  return Array.from(new Set(as))
}

/**
 * Creates a duplicate-free version of an array,
 * with uniqueness determined by specific key.
 *
 * @param function A function that returns the specific key
 * @returns Returns a function that expects the `array` to iterate over
 *
 * @example
 *
 * const items = [{ label: 'one', value: 1 }, { label: 'two', value: 1 }]
 * const result = uniqBy(i => i.value)(items)
 * // result === [{ label: 'one', value: 1 }]
 */
export function uniqBy<T>(makeKey: (a: T) => string | number) {
  return (as: T[]) => {
    const bs = []

    const keys: (string | number)[] = []
    for (let i = 0; i < as.length; i++) {
      const k: string | number = makeKey(as[i])
      if (keys.indexOf(k) < 0) {
        keys.push(k)
        bs.push(as[i])
      }
    }

    return bs
  }
}

/**
 * Apply a function to pairs of elements at the same index in two arrays,
 * collecting the results in a new array. If one input array is short, excess elements
 * of the longer array are discarded.
 *
 *
 * @param function A function to combine grouped values
 * @returns Returns a function that expects the two `array` to iterate over
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
