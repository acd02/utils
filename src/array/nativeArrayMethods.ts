/**
 * Combines two arrays.
 *
 * @param array
 * @returns Returns a function that expects the `array` array to concatenate.
 *
 *  @example
 *
 * const nums = [1, 2]
 * const otherNums = [3, 4]
 * const result = concat(nums)(otherNums)
 * // result === [1, 2, 3, 4]
 */
export function concat<T>(as: T[]) {
  return (bs: T[]) => as.concat(bs)
}

/**
 * Determines whether all the members of an array satisfy the specified test.
 *
 * @param callbackfn A function that accepts one argument. The every method calls the callbackfn function for each element in the array until the callbackfn returns a value which is coercible to the Boolean value false, or until the end of the array.
 * @returns Returns a function that expects the `array` to iterate over.
 *
 */
export function every<T>(predicate: (a: T) => boolean) {
  return (as: T[]) => as.every(predicate)
}

/**
 * Returns the elements of an array that meet the condition
 * specified in a callback function.
 *
 * @param callbackfn The function invoked per iteration.
 * @returns Returns a function that expects the `array` to iterate over.
 */
export function filter<T>(f: (a: T) => boolean) {
  return (as: T[]) => as.filter(f)
}

/**
 * Returns the elements of an array that meet the condition
 * specified in a callback function and refines type.
 *
 * @param callbackfn The function invoked per iteration.
 * @returns Returns a function that expects the `array` to iterate over.
 */
export function filterTypeGuard<T, S extends T>(f: (a: T) => a is S) {
  return (as: T[]) => as.filter(f)
}

/**
 * Returns the value of the first element in the array where predicate is true,
 * and undefined otherwise.
 *
 * @param callbackfn The function that get called once for each element of the array, in ascending order, until it finds one where predicate returns true. If such an element is found, immediately returns that element value. Otherwise returns undefined.
 * @returns Returns a function that expects the `array` to iterate over.
 */
export function find<T>(f: (a: T) => boolean) {
  return (as: T[]) => as.find(f)
}

/**
 * Returns the index of the first element in the array where predicate is true,
 * and -1 otherwise.
 *
 * @param callbackfn The function that get called once for each element of the array, in ascending order, until it finds one where predicate returns true. If such an element is found, immediately returns that element index. Otherwise returns undefined.
 * @returns Returns a function that expects the `array` to iterate over.
 */
export function findIndex<T>(f: (a: T) => boolean) {
  return (as: T[]) => as.findIndex(f)
}

/**
 * Determines whether an array includes a certain element,
 * returning true or false as appropriate.
 *
 * @param searchElement The element to search for.
 * @param fromIndex A second optional argument to indicate the position in this array at which to begin searching for searchElement.
 * @returns Returns a function that expects the `array` to iterate over.
 *
 */
export function includes<T>(a: T, fromIndex?: number) {
  return (as: T[]) => as.includes(a, fromIndex)
}

/**
 * Calls a defined callback function on each element of an array,
 * and returns an array that contains the results.
 *
 * @param callbackfn The function invoked per iteration.
 * @returns Returns a function that expects the `array` to iterate over.
 */
export function map<T, U>(f: (a: T) => U) {
  return (as: T[]) => as.map(f)
}

/**
 * Calls the specified callback function for all the elements in an array.
 * The return value of the callback function is the accumulated result,
 * and is provided as an argument in the next call to the callback function.
 *
 * @param callbackfn The function invoked per iteration.
 * @param initialValue The initial value.
 * @returns Returns a function that expects the `array` to iterate over.
 *
 * @example
 *
 * const words = ['one', 'two']
 * const wordsLength = reduce<string, number>((acc, cur) => acc + cur.length, 0)(words)
 */
export function reduce<T, U>(f: (acc: U, cur: T) => U, initial: U) {
  return (as: T[]) => as.reduce((acc, cur) => f(acc, cur), initial)
}

/**
 * Reverses the elements in an Array.
 *
 * @param array
 *
 */
export function reverse<T>(as: T[]) {
  const cp = as.slice()

  return cp.reverse()
}

/**
 * Determines whether the specified callback function returns true for any element of an array.
 *
 * @param callbackfn A function that accepts one argument. The some method calls the callbackfn function for each element in the array until the callbackfn returns a value which is coercible to the Boolean value true, or until the end of the array.
 * @returns Returns a function that expects the `array` to iterate over.
 *
 */
export function some<T>(predicate: (a: T) => boolean) {
  return (as: T[]) => as.some(predicate)
}
