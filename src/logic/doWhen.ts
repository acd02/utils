/**
 * Only execute the `func` function if all the value inside the tuple are truthy.
 *
 * The `func` function will be called with the values contained by the tuple.
 *
 * As an optional third argument,
 *
 * you can pass a filter function, which will be called with the values contained by the tuple as well,
 *
 * in that case, the `func` will be executed only if the filter function returns true
 *
 * @param tuple A tuple of of potentially undefined values.
 * @param function A function that will be called with the values contained by the tuple,   only if every value is truthy.
 * @param function An optional filter function.
 *
 * @example
 *
 * const maybeElm = document.querySelector('.foo')
 * const maybeOtherElm = document.querySelector('.bar')
 *
 * doWhen([maybeElm, maybeOtherElm], ([elm, otherElm]) => {
 *   elm.style.color = '#eee'
 *   otherElm.classList.add('something')
 * })
 *
 * // with filter function
 * doWhen([maybeElm, maybeOtherElm], ([elm, otherElm]) => {
 *   elm.style.color = '#eee'
 *   otherElm.classList.add('something')
 * }, ([_, otherElm]) => otherElm.classList.contains('stuff')) // <- filter function
 *
 */
export function doWhen<T1, T2, T3, T4, T5>(
  predicateValues: [T1, T2, T3, T4, T5],
  func: (
    values: [
      NonNullable<T1>,
      NonNullable<T2>,
      NonNullable<T3>,
      NonNullable<T4>,
      NonNullable<T5>,
    ],
  ) => void,
  filterFunc?: (
    values: [
      NonNullable<T1>,
      NonNullable<T2>,
      NonNullable<T3>,
      NonNullable<T4>,
      NonNullable<T5>,
    ],
  ) => boolean,
): void
/**
 * Only execute the `func` function if all the value inside the tuple are truthy.
 *
 * The `func` function will be called with the values contained by the tuple.
 *
 * As an optional third argument,
 *
 * you can pass a filter function, which will be called with the values contained by the tuple as well,
 *
 * in that case, the `func` will be executed only if the filter function returns true
 *
 * @param tuple A tuple of of potentially undefined values.
 * @param function A function that will be called with the values contained by the tuple,   only if every value is truthy.
 * @param function An optional filter function.
 *
 * @example
 *
 * const maybeElm = document.querySelector('.foo')
 * const maybeOtherElm = document.querySelector('.bar')
 *
 * doWhen([maybeElm, maybeOtherElm], ([elm, otherElm]) => {
 *   elm.style.color = '#eee'
 *   otherElm.classList.add('something')
 * })
 *
 * // with filter function
 * doWhen([maybeElm, maybeOtherElm], ([elm, otherElm]) => {
 *   elm.style.color = '#eee'
 *   otherElm.classList.add('something')
 * }, ([_, otherElm]) => otherElm.classList.contains('stuff')) // <- filter function
 *
 */
export function doWhen<T1, T2, T3, T4>(
  predicateValues: [T1, T2, T3, T4],
  func: (
    values: [NonNullable<T1>, NonNullable<T2>, NonNullable<T3>, NonNullable<T4>],
  ) => void,
  filterFunc?: (
    values: [NonNullable<T1>, NonNullable<T2>, NonNullable<T3>, NonNullable<T4>],
  ) => boolean,
): void
/**
 * Only execute the `func` function if all the value inside the tuple are truthy.
 *
 * The `func` function will be called with the values contained by the tuple.
 *
 * As an optional third argument,
 *
 * you can pass a filter function, which will be called with the values contained by the tuple as well,
 *
 * in that case, the `func` will be executed only if the filter function returns true
 *
 * @param tuple A tuple of of potentially undefined values.
 * @param function A function that will be called with the values contained by the tuple,   only if every value is truthy.
 * @param function An optional filter function.
 *
 * @example
 *
 * const maybeElm = document.querySelector('.foo')
 * const maybeOtherElm = document.querySelector('.bar')
 *
 * doWhen([maybeElm, maybeOtherElm], ([elm, otherElm]) => {
 *   elm.style.color = '#eee'
 *   otherElm.classList.add('something')
 * })
 *
 * // with filter function
 * doWhen([maybeElm, maybeOtherElm], ([elm, otherElm]) => {
 *   elm.style.color = '#eee'
 *   otherElm.classList.add('something')
 * }, ([_, otherElm]) => otherElm.classList.contains('stuff')) // <- filter function
 *
 */
export function doWhen<T1, T2, T3>(
  predicateValues: [T1, T2, T3],
  func: (values: [NonNullable<T1>, NonNullable<T2>, NonNullable<T3>]) => void,
  filterFunc?: (values: [NonNullable<T1>, NonNullable<T2>, NonNullable<T3>]) => boolean,
): void
/**
 * Only execute the `func` function if all the value inside the tuple are truthy.
 *
 * The `func` function will be called with the values contained by the tuple.
 *
 * As an optional third argument,
 *
 * you can pass a filter function, which will be called with the values contained by the tuple as well,
 *
 * in that case, the `func` will be executed only if the filter function returns true
 *
 * @param tuple A tuple of of potentially undefined values.
 * @param function A function that will be called with the values contained by the tuple,   only if every value is truthy.
 * @param function An optional filter function.
 *
 * @example
 *
 * const maybeElm = document.querySelector('.foo')
 * const maybeOtherElm = document.querySelector('.bar')
 *
 * doWhen([maybeElm, maybeOtherElm], ([elm, otherElm]) => {
 *   elm.style.color = '#eee'
 *   otherElm.classList.add('something')
 * })
 *
 * // with filter function
 * doWhen([maybeElm, maybeOtherElm], ([elm, otherElm]) => {
 *   elm.style.color = '#eee'
 *   otherElm.classList.add('something')
 * }, ([_, otherElm]) => otherElm.classList.contains('stuff')) // <- filter function
 *
 */
export function doWhen<T1, T2>(
  predicateValues: [T1, T2],
  func: (values: [NonNullable<T1>, NonNullable<T2>]) => void,
  filterFunc?: (values: [NonNullable<T1>, NonNullable<T2>]) => boolean,
): void
/**
 * Only execute the `func` function if all the value inside the tuple are truthy.
 *
 * The `func` function will be called with the values contained by the tuple.
 *
 * As an optional third argument,
 *
 * you can pass a filter function, which will be called with the values contained by the tuple as well,
 *
 * in that case, the `func` will be executed only if the filter function returns true
 *
 * @param tuple A tuple of of potentially undefined values.
 * @param function A function that will be called with the values contained by the tuple,   only if every value is truthy.
 * @param function An optional filter function.
 *
 * @example
 *
 * const maybeElm = document.querySelector('.foo')
 * const maybeOtherElm = document.querySelector('.bar')
 *
 * doWhen([maybeElm, maybeOtherElm], ([elm, otherElm]) => {
 *   elm.style.color = '#eee'
 *   otherElm.classList.add('something')
 * })
 *
 * // with filter function
 * doWhen([maybeElm, maybeOtherElm], ([elm, otherElm]) => {
 *   elm.style.color = '#eee'
 *   otherElm.classList.add('something')
 * }, ([_, otherElm]) => otherElm.classList.contains('stuff')) // <- filter function
 *
 */
export function doWhen<T1>(
  predicateValues: [T1],
  func: (values: [NonNullable<T1>]) => void,
  filterFunc?: (values: [NonNullable<T1>]) => boolean,
): void
/**
 * Only execute the `func` function if all the value inside the tuple are truthy.
 *
 * The `func` function will be called with the values contained by the tuple.
 *
 * As an optional third argument,
 *
 * you can pass a filter function, which will be called with the values contained by the tuple as well,
 *
 * in that case, the `func` will be executed only if the filter function returns true
 *
 * @param tuple A tuple of of potentially undefined values.
 * @param function A function that will be called with the values contained by the tuple,   only if every value is truthy.
 * @param function An optional filter function.
 *
 * @example
 *
 * const maybeElm = document.querySelector('.foo')
 * const maybeOtherElm = document.querySelector('.bar')
 *
 * doWhen([maybeElm, maybeOtherElm], ([elm, otherElm]) => {
 *   elm.style.color = '#eee'
 *   otherElm.classList.add('something')
 * })
 *
 * // with filter function
 * doWhen([maybeElm, maybeOtherElm], ([elm, otherElm]) => {
 *   elm.style.color = '#eee'
 *   otherElm.classList.add('something')
 * }, ([_, otherElm]) => otherElm.classList.contains('stuff')) // <- filter function
 *
 */
export function doWhen<T>(
  predicateValues: T[],
  func: (...values: NonNullable<T[]>) => void,
  filterFunc?: (...values: NonNullable<T[]>) => boolean,
) {
  if (!predicateValues.some(v => !v)) {
    if (!!filterFunc) {
      filterFunc(predicateValues as any) && func(predicateValues as any)
    } else {
      func(predicateValues as any)
    }
  }
}
