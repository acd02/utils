/**
 * Only execute the function if all the value inside the tuple are truthy.
 * The function will be called with the values contained by the tuple.
 *
 * As an optional third argument,
 *
 * you can pass an `orElse` function, that will be called if at least one of the values
 * inside the tuple was falsy.
 *
 * @param tuple A tuple of of potentially undefined values.
 * @param function A function that will be called with the values contained inside
 * the tuple, only if every value is truthy.
 * @param function A function that will be called if at least one of the values
 * inside the tuple was falsy.
 *
 * @example
 *
 * const maybeElm = document.querySelector('.foo')
 * const maybeOtherElm = document.querySelector('.bar')
 *
 * doWhen([maybeElm, maybeOtherElm], ([elm, otherElm]) => {
 *   elm.style.color = '#eee'
 *   otherElm.classList.add('baz')
 * }, () => console.log('one of the element was not found'))
 */
export function doWhen<T1, T2, T3, T4, T5>(
  maybeValues: [T1, T2, T3, T4, T5],
  f: (
    values: [
      NonNullable<T1>,
      NonNullable<T2>,
      NonNullable<T3>,
      NonNullable<T4>,
      NonNullable<T5>,
    ],
  ) => void,
  orElse?: () => void,
): void
/**
 * Only execute the function if all the value inside the tuple are truthy.
 * The function will be called with the values contained by the tuple.
 *
 * As an optional third argument,
 *
 * you can pass an `orElse` function, that will be called if at least one of the values
 * inside the tuple was falsy.
 *
 * @param tuple A tuple of of potentially undefined values.
 * @param function A function that will be called with the values contained by the tuple,   only if every value is truthy.
 * @param function A function that will be called if at least one of the values
 * inside the tuple was falsy.
 *
 * @example
 *
 * const maybeElm = document.querySelector('.foo')
 * const maybeOtherElm = document.querySelector('.bar')
 *
 * doWhen([maybeElm, maybeOtherElm], ([elm, otherElm]) => {
 *   elm.style.color = '#eee'
 *   otherElm.classList.add('baz')
 * }, () => console.log('one of the element was not found'))
 */
export function doWhen<T1, T2, T3, T4>(
  maybeValues: [T1, T2, T3, T4],
  f: (
    values: [NonNullable<T1>, NonNullable<T2>, NonNullable<T3>, NonNullable<T4>],
  ) => void,
  orElse?: () => void,
): void
/**
 * Only execute the function if all the value inside the tuple are truthy.
 * The function will be called with the values contained by the tuple.
 *
 * As an optional third argument,
 *
 * you can pass an `orElse` function, that will be called if at least one of the values
 * inside the tuple was falsy.
 *
 * @param tuple A tuple of of potentially undefined values.
 * @param function A function that will be called with the values contained by the tuple,   only if every value is truthy.
 * @param function A function that will be called if at least one of the values
 * inside the tuple was falsy.
 *
 * @example
 *
 * const maybeElm = document.querySelector('.foo')
 * const maybeOtherElm = document.querySelector('.bar')
 *
 * doWhen([maybeElm, maybeOtherElm], ([elm, otherElm]) => {
 *   elm.style.color = '#eee'
 *   otherElm.classList.add('baz')
 * }, () => console.log('one of the element was not found'))
 */
export function doWhen<T1, T2, T3>(
  maybeValues: [T1, T2, T3],
  f: (values: [NonNullable<T1>, NonNullable<T2>, NonNullable<T3>]) => void,
  orElse?: () => void,
): void
/**
 * Only execute the function if all the value inside the tuple are truthy.
 * The function will be called with the values contained by the tuple.
 *
 * As an optional third argument,
 *
 * you can pass an `orElse` function, that will be called if at least one of the values
 * inside the tuple was falsy.
 *
 * @param tuple A tuple of of potentially undefined values.
 * @param function A function that will be called with the values contained by the tuple,   only if every value is truthy.
 * @param function A function that will be called if at least one of the values
 * inside the tuple was falsy.
 *
 * @example
 *
 * const maybeElm = document.querySelector('.foo')
 * const maybeOtherElm = document.querySelector('.bar')
 *
 * doWhen([maybeElm, maybeOtherElm], ([elm, otherElm]) => {
 *   elm.style.color = '#eee'
 *   otherElm.classList.add('baz')
 * }, () => console.log('one of the element was not found'))
 */
export function doWhen<T1, T2>(
  maybeValues: [T1, T2],
  f: (values: [NonNullable<T1>, NonNullable<T2>]) => void,
  orElse?: () => void,
): void
/**
 * Only execute the function if all the value inside the tuple are truthy.
 * The function will be called with the values contained by the tuple.
 *
 * As an optional third argument,
 *
 * you can pass an `orElse` function, that will be called if at least one of the values
 * inside the tuple was falsy.
 *
 * @param tuple A tuple of of potentially undefined values.
 * @param function A function that will be called with the values contained by the tuple,   only if every value is truthy.
 * @param function A function that will be called if at least one of the values
 * inside the tuple was falsy.
 *
 * @example
 *
 * const maybeElm = document.querySelector('.foo')
 * const maybeOtherElm = document.querySelector('.bar')
 *
 * doWhen([maybeElm, maybeOtherElm], ([elm, otherElm]) => {
 *   elm.style.color = '#eee'
 *   otherElm.classList.add('baz')
 * }, () => console.log('one of the element was not found'))
 */
export function doWhen<T1>(
  maybeValues: [T1],
  f: (values: [NonNullable<T1>]) => void,
  orElse?: () => void,
): void

/**
 * Only execute the function if all the value inside the tuple are truthy.
 * The function will be called with the values contained by the tuple.
 *
 * As an optional third argument,
 *
 * you can pass an `orElse` function, that will be called if at least one of the values
 * inside the tuple was falsy.
 *
 * @param tuple A tuple of of potentially undefined values.
 * @param function A function that will be called with the values contained by the tuple,   only if every value is truthy.
 * @param function A function that will be called if at least one of the values
 * inside the tuple was falsy.
 *
 * @example
 *
 * const maybeElm = document.querySelector('.foo')
 * const maybeOtherElm = document.querySelector('.bar')
 *
 * doWhen([maybeElm, maybeOtherElm], ([elm, otherElm]) => {
 *   elm.style.color = '#eee'
 *   otherElm.classList.add('baz')
 * }, () => console.log('one of the element was not found'))
 */
export function doWhen<T>(
  maybeValues: T[],
  f: (...values: NonNullable<T[]>) => void,
  orElse?: () => void,
) {
  if (!maybeValues.some(v => !v)) {
    if (!!orElse) {
      orElse()
    } else {
      f(maybeValues as any)
    }
  }
}
