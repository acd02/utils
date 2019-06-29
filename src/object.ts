// see: https://bit.ly/2YPOFq7
interface OmitKeys {
  <T extends object, K extends [...(keyof T)[]]>(obj: T, ...keys: K): {
    [K2 in Exclude<keyof T, K[number]>]: T[K2]
  }
}

/**
 * Returns a partial copy of an object omitting the keys specified.
 *
 * @example
 *
 * const item = {
 *   label: 'ten',
 *   id: 10,
 *   isCool: true
 * }
 *
 * const updatedItem = omitKeys(item, 'label', 'isCool') // { id: 10 }
 *
 */
export const omitKeys: OmitKeys = (obj, ...keys) => {
  const ret = {} as { [K in keyof typeof obj]: (typeof obj)[K] }
  let key: keyof typeof obj
  for (key in obj) {
    if (!keys.includes(key)) {
      ret[key] = obj[key]
    }
  }

  return ret
}

/**
 * Preserves the type of the array returned by Object.keys
 *
 * @example
 *
 * const item = {
 *   label: 'ten',
 *   id: 10,
 *   isCool: true
 * }
 *
 * const keys = objectKeys(item).map(k => k.toUpperCase())
 * k = 'label' | 'id' | 'isCool'
 *
 */
export function objectKeys<T>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[]
}
