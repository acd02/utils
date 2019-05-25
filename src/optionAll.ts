/* eslint-disable import/export */
import { fromNullable, Option, none, Some } from 'fp-ts/lib/Option'

/**
 * Returns a tuple of Some if all Options inside the array are defined,
 * otherwise returns a None
 *
 * @param array An array of Option
 */
export function optionAll<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
  arr: [
    Option<T1>,
    Option<T2>,
    Option<T3>,
    Option<T4>,
    Option<T5>,
    Option<T6>,
    Option<T7>,
    Option<T8>,
    Option<T9>,
    Option<T10>
  ]
): Option<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>
/**
 * Returns a tuple of Some if all Options inside the array are defined,
 * otherwise returns a None
 *
 * @param array An array of Option
 */
export function optionAll<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
  arr: [
    Option<T1>,
    Option<T2>,
    Option<T3>,
    Option<T4>,
    Option<T5>,
    Option<T6>,
    Option<T7>,
    Option<T8>,
    Option<T9>
  ]
): Option<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>
/**
 * Returns a tuple of Some if all Options inside the array are defined,
 * otherwise returns a None
 *
 * @param array An array of Option
 */
export function optionAll<T1, T2, T3, T4, T5, T6, T7, T8>(
  arr: [
    Option<T1>,
    Option<T2>,
    Option<T3>,
    Option<T4>,
    Option<T5>,
    Option<T6>,
    Option<T7>,
    Option<T8>
  ]
): Option<[T1, T2, T3, T4, T5, T6, T7, T8]>
/**
 * Returns a tuple of Some if all Options inside the array are defined,
 * otherwise returns a None
 *
 * @param array An array of Option
 */
export function optionAll<T1, T2, T3, T4, T5, T6, T7>(
  arr: [
    Option<T1>,
    Option<T2>,
    Option<T3>,
    Option<T4>,
    Option<T5>,
    Option<T6>,
    Option<T7>
  ]
): Option<[T1, T2, T3, T4, T5, T6, T7]>
/**
 * Returns a tuple of Some if all Options inside the array are defined,
 * otherwise returns a None
 *
 * @param array An array of Option
 */
export function optionAll<T1, T2, T3, T4, T5, T6>(
  arr: [Option<T1>, Option<T2>, Option<T3>, Option<T4>, Option<T5>, Option<T6>]
): Option<[T1, T2, T3, T4, T5, T6]>
/**
 * Returns a tuple of Some if all Options inside the array are defined,
 * otherwise returns a None
 *
 * @param array An array of Option
 */
export function optionAll<T1, T2, T3, T4, T5>(
  arr: [Option<T1>, Option<T2>, Option<T3>, Option<T4>, Option<T5>]
): Option<[T1, T2, T3, T4, T5]>
/**
 * Returns a tuple of Some if all Options inside the array are defined,
 * otherwise returns a None
 *
 * @param array An array of Option
 */
export function optionAll<T1, T2, T3, T4>(
  arr: [Option<T1>, Option<T2>, Option<T3>, Option<T4>]
): Option<[T1, T2, T3, T4]>
/**
 * Returns a tuple of Some if all Options inside the array are defined,
 * otherwise returns a None
 *
 * @param array An array of Option
 */
export function optionAll<T1, T2, T3>(
  arr: [Option<T1>, Option<T2>, Option<T3>]
): Option<[T1, T2, T3]>
/**
 * Returns a tuple of Some if all Options inside the array are defined,
 * otherwise returns a None
 *
 * @param array An array of Option
 */
export function optionAll<T1, T2>(arr: [Option<T1>, Option<T2>]): Option<[T1, T2]>
/**
 * Returns a tuple of Some if all Options inside the array are defined,
 * otherwise returns a None
 *
 * @param array An array of Option
 */
export function optionAll<T1>(arr: [Option<T1>]): Option<[T1]>
/**
 * Returns a tuple of Some if all Options inside the array are defined,
 * otherwise returns a None
 *
 * @param array An array of Option
 */
export function optionAll<T>(arr: Option<T>[]): Option<T[]> {
  return arr.every(opt => opt.isSome())
    ? (fromNullable(arr).map(i => i.map(_ => _.toUndefined())) as Some<T[]>)
    : none
}
