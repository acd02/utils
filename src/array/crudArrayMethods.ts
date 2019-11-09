/**
 * Delete the element at the specified index, creating a new array,
 * or returning the array as is if the index is out of bounds
 *
 * @param number The index of the element to remove.
 * @returns Returns a function that expects the `array` to modify.
 */
export function deleteAt(index: number) {
  return <T>(as: T[]) => {
    if (!as[index]) return as

    const b = as.slice(0, index)
    const a = as.slice(index + 1)
    return [...b, ...a]
  }
}

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
 * const nums = [1, 2, 3, 4]
 * const result = insertAt(1, 10)(nums)
 * // result === [1, 10, 2, 3, 4]
 *
 */
export function insertAt<T>(index: number, a: T) {
  return (as: T[]) => {
    if (!as[index]) return as

    const b = as.slice(0, index)
    const at = as.slice(index)
    return [...b, a, ...at]
  }
}

/**
 * Read a value at a particular index from an array
 *
 * @param number The index of the element to read.
 * @returns Returns a function that expects the `array` to iterate over.
 *
 */
export function lookupAt(index: number) {
  return <T>(as: T[]) => {
    return as[index] as T | undefined
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
 * const nums = [1, 2]
 * const result = modifyAt(1, n => n * 2)(words)
 * // result === [1, 4]
 */
export function modifyAt<T>(index: number, f: (a: T) => T) {
  return (as: T[]) => {
    if (!as[index]) return as

    const b = as.slice(0, index)
    const at = as.slice(index + 1)
    const upd = f(as[index])
    return [...b, upd, ...at]
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
 * const nums = [1, 2]
 * const result = updateAt(1, 10)(nums)
 * // result === [1, 10]
 */
export function updateAt<T>(index: number, a: T) {
  return (as: T[]) => {
    if (!as[index]) return as

    const b = as.slice(0, index)
    const at = as.slice(index + 1)
    return [...b, a, ...at]
  }
}
