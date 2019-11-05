/**
 * Check whether the value is defined or not
 *
 */
export function isDefined<T>(t: T): boolean {
  return !(t === undefined || t === null)
}

/**
 * Check whether the value is empty.
 *
 * empty means `""`, `[]` or `{}`.
 * `undefined` and `null` will be considered empty as well.
 *
 */
export function isEmpty<T>(t: T): boolean {
  if (isArray(t)) return !((t as unknown) as []).length
  if (isObject(t)) return !Object.keys(t).length
  if (typeof t === 'string') return !t.length
  if (typeof t === 'number') return false
  else return !t
}

/* Helpers
   ========================================================================== */

/**
 * Check if value is of type `[]`
 *
 */
function isArray(x: any): boolean {
  return !!x && x.constructor === Array
}

/**
 * Check if value is of type `{}`
 *
 */
function isObject(x: any) {
  return !!x && x.constructor === Object
}
