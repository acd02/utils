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
 * Append an element to the end of an array, creating a new array
 *
 * @param T item to append
 * @returns Returns a function that expects the `array` to append to.
 *
 * @example
 *
 * const words = ['one', 'two']
 * const udpatedWords = prepend('hello')(words)
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
