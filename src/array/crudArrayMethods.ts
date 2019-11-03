/**
 * Insert an element at the specified index, creating a new array,
 * or returning the array as is if the index is out of bounds
 *
 * @param number The index of the element to add.
 * @param T The item to add.
 * @returns Returns a function that expects the `array` to modify.
 *
 * @example
 *
 * const words = ['one', 'two', 'three', 'four']
 * const updatedWords = insertAt(1, 'hello')(words)
 * // updatedWords === ['one, 'hello', 'two', 'three', 'four']
 *
 */
export function insertAt<T>(index: number, item: T) {
  return (arr: T[]) => {
    if (!arr[index]) return arr

    const before = arr.slice(0, index)
    const after = arr.slice(index)
    return [...before, item, ...after]
  }
}

/**
 * Read a value at a particular index from an array
 *
 * @param number The index of the element to read.
 * @returns Returns a function that expects the `array` to iterate over.
 *
 * @example
 *
 * const words = ['one', 'two']
 * const maybeWord = lookupAt(1)(words)
 * // maybeWord === 'two
 */
export function lookupAt<T>(index: number) {
  return (arr: T[]) => {
    return arr[index] as T | undefined
  }
}

/**
 * Apply a function to the element at the specified index, creating a new array,
 * or returning the array as is if the index is out of bounds.
 *
 * @param number The index of the element to modify.
 * @param function A function that takes the element to modify as an argument.
 * @returns Returns a function that expects the `array` to modify.
 *
 * @example
 *
 * const words = ['one', 'two']
 * const updatedWords = modifyAt(1, w => w.toUpperCase())(words)
 * // updatedWords === ['one', 'TWO']
 */
export function modifyAt<T>(index: number, func: (item: T) => T) {
  return (arr: T[]) => {
    if (!arr[index]) return arr

    const before = arr.slice(0, index)
    const after = arr.slice(index + 1)
    const updatedItem = func(arr[index])
    return [...before, updatedItem, ...after]
  }
}

/**
 * Change the element at the specified index, creating a new array,
 * or returning the array as us if the index is out of bounds
 *
 * @param number The index of the element to replace.
 * @param T The item that will take over.
 * @returns Returns a function that expects the `array` to modify.
 *
 * @example
 *
 * const words = ['one', 'two']
 * const updatedWords = updateAt(1, 'hello')(words)
 * // updatedWords === ['one', 'hello']
 */
export function updateAt<T>(index: number, item: T) {
  return (arr: T[]) => {
    if (!arr[index]) return arr

    const before = arr.slice(0, index)
    const after = arr.slice(index + 1)
    return [...before, item, ...after]
  }
}

/**
 * Delete the element at the specified index, creating a new array,
 * or returning the array as is if the index is out of bounds
 *
 * @param number The index of the element to remove.
 * @returns Returns a function that expects the `array` to modify.
 */
export function deleteAt<T>(index: number) {
  return (arr: T[]) => {
    if (!arr[index]) return arr

    const before = arr.slice(0, index)
    const after = arr.slice(index + 1)
    return [...before, ...after]
  }
}
