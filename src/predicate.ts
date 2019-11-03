/**
 * Check whether the value is defined or not
 *
 */
export function isDefined<T>(value: T): boolean {
  return !(value === undefined || value === null)
}

/**
 * Check whether the value is empty.
 *
 * empty means `""`, `[]` or `{}`.
 *
 */
export function isEmpty<T>(value: T): boolean {
  if (isArray(value)) return !((value as unknown) as []).length
  if (isObject(value)) return !Object.keys(value).length
  if (typeof value === 'string') return !value.length
  else return false
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
