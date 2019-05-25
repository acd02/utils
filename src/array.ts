/**
 * Calls a defined callback function on each element of an array,
 * and returns an array that contains the results.
 *
 * @param callbackfn The function invoked per iteration.
 * @returns Returns a function that expects the `array` to iterate over.
 */
export function map<T, U>(fun: (_: T) => U) {
  return (arr: T[]) => arr.map(fun)
}

export function add(a: number) {
  return a
}

/**
 * Returns the elements of an array that meet the condition
 * specified in a callback function.
 *
 * @param callbackfn The function invoked per iteration.
 * @returns Returns a function that expects the `array` to iterate over.
 */
export function filter<T>(fun: (_: T) => boolean) {
  return (arr: T[]) => arr.filter(fun)
}

/**
 * Returns the elements of an array that meet the condition
 * specified in a callback function and refines type.
 *
 * @param callbackfn The function invoked per iteration.
 * @returns Returns a function that expects the `array` to iterate over.
 */
export function filterTypeGuard<T, S extends T>(fun: (_: T) => _ is S) {
  return (arr: T[]) => arr.filter(fun)
}

/**
 * Calls the specified callback function for all the elements in an array.
 * The return value of the callback function is the accumulated result,
 * and is provided as an argument in the next call to the callback function.
 *
 * @param callbackfn The function invoked per iteration.
 * @param initialValue The initial value.
 * @returns Returns a function that expects the `array` to iterate over.
 */
export function reduce<T, U>(fun: (acc: U, current: T) => U, initialValue: U) {
  return (arr: T[]) => arr.reduce((acc, current) => fun(acc, current), initialValue)
}

/**
 * Creates an array with all falsey values removed.
 *
 * The values false, null, "", undefined, and NaN are falsey.
 * @param array The array to compact.
 */
export function compact<T>(array: (T | null | undefined | false | '')[]): T[] {
  return array.filter(t => {
    if (typeof t === 'number' && t === 0) return true
    else return Boolean(t)
  }) as T[]
}
