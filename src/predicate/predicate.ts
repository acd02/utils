/**
 * Check whether the value is defined or not
 *
 */
export function isDefined<T>(a: T): boolean {
  return !(a === undefined || a === null)
}

/**
 * Check whether the value is empty.
 *
 * empty means `""`, `[]` or `{}`.
 * `undefined` and `null` will be considered empty as well.
 *
 */
export function isEmpty<T>(a: T): boolean {
  if (isArray(a)) return !((a as unknown) as []).length
  if (isObject(a)) return !Object.keys(a).length
  if (typeof a === 'string') return !a.length
  if (typeof a === 'number') return false
  else return !a
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
