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
