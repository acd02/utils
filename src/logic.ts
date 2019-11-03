import { doWhen } from './misc/doWhen'
export { doWhen }

/**
 * Creates a function that will process either the onTrue or the onFalse
 * function depending upon the result of the condition predicate.
 *
 * @example
 *
 * type Item = {
 *   label: string
 * }
 * const labelToUpperCase = ifElse<Item, string>(
 *   itm => itm.label.length > 2,
 *   itm => itm.label.toUpperCase,
 *   () => 'not enough characters'
 * )
 *
 * const foo = labelToUpperCase({ label: 'ok' }) // not enough characters
 * const bar = labelToUpperCase({ label: 'hello' }) // HELLO
 *
 */
export function ifElse<T, U>(
  predicate: (arg: T) => boolean,
  onTrue: (arg: NonNullable<T>) => U,
  onFalse: () => U
): (value: T) => U {
  return value => (predicate(value) ? onTrue(value as NonNullable<T>) : onFalse())
}

/**
 * Creates a function that will process the whenTrue function
 * if the condition predicate returns true,
 * otherwise the argument will be returned as is.
 *
 * @example
 *
 * const stringToUpperCase = when<string>(
 *   s => s.length > 2,
 *   s => s.toUpperCase()
 * )
 *
 * const foo = stringToUpperCase('ok') // ''ok'
 * const bar = stringToUpperCase('this is some text') // THIS IS SOME TEXT
 *
 */
export function when<T>(
  predicate: (arg: T) => boolean,
  whenTrue: (arg: T) => T
): (value: T) => T {
  return value => (predicate(value) ? whenTrue(value) : value)
}
