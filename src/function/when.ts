type Box<T> = {
  /**
   * takes your value as an argument, allowing you to update it safely
   */
  map: <U>(fn: (a: NonNullable<T>) => U) => Box<U>
  /**
   * takes your value as an argument, allowing you to return a predicate
   */
  filter: (fn: (a: NonNullable<T>) => boolean) => Box<T>
  /**
   * a function that will be executed if the initial value was `undefined`
   * or `null`, allowing you to return a fallback value.
   */
  getOrElse: (f: () => T) => T
  /**
   * returns your value.
   */
  get: () => T | undefined
}

/**
 * Wraps a potentially `nullable` value and returns a `Box` object, allowing you
 * to manipulate the value safely as if it was defined.
 *
 * @param value A potentially nullable value.
 * @returns Returns a `Box` with 4 methods, `map`, `filter`, `get` and `getOrElse`
 *
 * @example
 * see: https://github.com/acd02/utils#when
 *
 */
export function when<T>(a: T, __init__ = true) {
  const self = {} as Box<T>

  function isNone(a: T) {
    return a === undefined || a === null
  }

  function map<U>(fn: (arg: NonNullable<T>) => U) {
    if (isNone(a)) return when(undefined as unknown) as Box<U>
    return when(fn(a as NonNullable<T>), false)
  }

  function filter(fn: (arg: NonNullable<T>) => boolean) {
    if (!isNone(a) && fn(a as NonNullable<T>)) return when(a)
    return (when(undefined) as unknown) as Box<T>
  }

  function getOrElse(f: () => T): T {
    if (isNone(a) && __init__ !== false) return f()
    return a
  }

  function get() {
    return a
  }

  self.map = map
  self.filter = filter
  self.getOrElse = getOrElse
  self.get = get

  return self
}

/**
 * Wraps a tuple (up to 5 elements) containing potentially `nullable` values and
 * returns a `Box` object, allowing you
 * to manipulate the values safely, as if there were all defined.
 * If not all values are defined, only `getOrElse` will be called.
 *
 * @param tuple A tuple (array) containing potentially nullable values.
 * @returns Returns a `Box` with 4 methods, `map`, `filter`, `get` and `getOrElse`
 *
 * @example
 * see: https://github.com/acd02/utils#whenall
 *
 */
export function whenAll<T1, T2, T3, T4, T5>(
  as: [T1, T2, T3, T4, T5],
): Box<
  [NonNullable<T1>, NonNullable<T2>, NonNullable<T3>, NonNullable<T4>, NonNullable<T5>]
>
/**
 * Wraps a tuple (up to 5 elements) containing potentially `nullable` values and
 * returns a `Box` object, allowing you
 * to manipulate the values safely, as if they were all defined.
 * If not all values are defined, only `getOrElse` will be called.
 *
 * @param tuple A tuple (array) containing potentially nullable values.
 * @returns Returns a `Box` with 4 methods, `map`, `filter`, `get` and `getOrElse`
 *
 * @example
 * see: https://github.com/acd02/utils#whenall
 *
 */
export function whenAll<T1, T2, T3, T4>(
  as: [T1, T2, T3, T4],
): Box<[NonNullable<T1>, NonNullable<T2>, NonNullable<T3>, NonNullable<T4>]>
/**
 * Wraps a tuple (up to 5 elements) containing potentially `nullable` values and
 * returns a `Box` object, allowing you
 * to manipulate the values safely, as if there were all defined.
 * If not all values are defined, only `getOrElse` will be called.
 *
 * @param tuple A tuple (array) containing potentially nullable values.
 * @returns Returns a `Box` with 4 methods, `map`, `filter`, `get` and `getOrElse`
 *
 * @example
 * see: https://github.com/acd02/utils#whenall
 *
 */
export function whenAll<T1, T2, T3>(
  as: [T1, T2, T3],
): Box<[NonNullable<T1>, NonNullable<T2>, NonNullable<T3>]>
/**
 * Wraps a tuple (up to 5 elements) containing potentially `nullable` values and
 * returns a `Box` object, allowing you
 * to manipulate the values safely, as if there were all defined.
 * If not all values are defined, only `getOrElse` will be called.
 *
 * @param tuple A tuple (array) containing potentially nullable values.
 * @returns Returns a `Box` with 4 methods, `map`, `filter`, `get` and `getOrElse`
 *
 * @example
 * see: https://github.com/acd02/utils#whenall
 *
 */
export function whenAll<T1, T2>(as: [T1, T2]): Box<[NonNullable<T1>, NonNullable<T2>]>
/**
 * Wraps a tuple (up to 5 elements) containing potentially `nullable` values and
 * returns a `Box` object, allowing you
 * to manipulate the values safely, as if there were all defined.
 * If not all values are defined, only `getOrElse` will be called.
 *
 * @param tuple A tuple (array) containing potentially nullable values.
 * @returns Returns a `Box` with 4 methods, `map`, `filter`, `get` and `getOrElse`
 *
 * @example
 * see: https://github.com/acd02/utils#whenall
 *
 */
export function whenAll<T1>(as: T1): Box<[NonNullable<T1>]>
/**
 * Wraps a tuple (up to 5 elements) containing potentially `nullable` values and
 * returns a `Box` object, allowing you
 * to manipulate the values safely, as if there were all defined.
 * If not all values are defined, only `getOrElse` will be called.
 *
 * @param tuple A tuple (array) containing potentially nullable values.
 * @returns Returns a `Box` with 4 methods, `map`, `filter`, `get` and `getOrElse`
 *
 * @example
 * see: https://github.com/acd02/utils#whenall
 *
 */
export function whenAll<T>(as: T[]) {
  return !as.some(a => a === undefined || a === null)
    ? when<T>((as as unknown) as T)
    : when<T>((undefined as unknown) as T)
}
