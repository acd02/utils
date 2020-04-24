type Box<T> = {
  /**
   * takes your value as an argument, allowing you to update it safely
   */
  map: <U>(fn: (a: NonNullable<T>) => U) => Box<U>
  /**
   * if value is defined, calls the function you give on
   * the item in the Box and returns its result
   */
  flatMap: <U>(fn: (a: NonNullable<T>) => Box<U>) => Box<U>
  /**
   * takes your value as an argument, allowing you to return a predicate
   */
  filter: (fn: (a: NonNullable<T>) => boolean) => Box<T>
  /**
   * expects a fallback value in case of the initial value was `undefined`
   * or `null`.
   */
  getOrElse: (t: NonNullable<T>) => NonNullable<T>
  /**
   * returns your value
   */
  get: () => T | undefined
  /**
   * Takes two functions. a first function that will get executed if the value
   * is`undefined` or `null`, allowing you to return a fallback value.
   *
   * A second function that will get called with the value if defined.
   * The result of this function will be then returned.
   */
  fold: <U>(onNone: () => U, onSome: (a: NonNullable<T>) => U) => U
}

/**
 * Wraps a potentially `nullable` value and returns a `Box` object, allowing you
 * to manipulate the value safely as if it was defined.
 *
 * @param value A potentially nullable value
 * @returns Returns a `Box` with 5 methods, `map`, `filter`, `fold`, `get` and `getOrElse`
 *
 * @example
 * see: https://github.com/acd02/utils#when
 *
 */
export function when<T>(a: T) {
  const self = {} as Box<T>

  function isNone(a: T) {
    return a === undefined || a === null
  }

  function map<U>(fn: (arg: NonNullable<T>) => U) {
    if (isNone(a)) return when(undefined as unknown) as Box<U>
    return when(fn(a as NonNullable<T>))
  }

  function flatMap<U>(fn: (arg: NonNullable<T>) => Box<U>) {
    if (isNone(a)) return when(undefined as unknown) as Box<U>
    return fn(a as NonNullable<T>)
  }

  function filter(fn: (arg: NonNullable<T>) => boolean) {
    if (!isNone(a) && fn(a as NonNullable<T>)) return when(a)
    return (when(undefined) as unknown) as Box<T>
  }

  function getOrElse(t: NonNullable<T>): NonNullable<T> {
    if (isNone(a)) return t
    return a as NonNullable<T>
  }

  function fold<U>(onNone: () => U, onSome: (a: NonNullable<T>) => U) {
    if (isNone(a)) return onNone()
    return onSome(a as NonNullable<T>)
  }

  function get() {
    return a
  }

  self.map = map
  self.flatMap = flatMap
  self.filter = filter
  self.getOrElse = getOrElse
  self.get = get
  self.fold = fold

  return self
}

/**
 * Wraps a tuple (up to 5 elements) containing potentially `nullable` values and
 * returns a `Box` object, allowing you
 * to manipulate the values safely, as if there were all defined.
 * If not all values are defined, only `getOrElse` will be called.
 *
 * @param tuple A tuple (array) containing potentially nullable values
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
 * @param tuple A tuple (array) containing potentially nullable values
 * @returns Returns a `Box` with 5 methods, `map`, `filter`, `fold`, `get` and `getOrElse`
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
 * @param tuple A tuple (array) containing potentially nullable values
 * @returns Returns a `Box` with 5 methods, `map`, `filter`, `fold`, `get` and `getOrElse`
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
 * @returns Returns a `Box` with 5 methods, `map`, `filter`, `fold`, `get` and `getOrElse`
 *
 * @example
 * see: https://github.com/acd02/utils#whenall
 *
 */
export function whenAll<T1>(as: [T1]): Box<[NonNullable<T1>]>
/**
 * Wraps a tuple (up to 5 elements) containing potentially `nullable` values and
 * returns a `Box` object, allowing you
 * to manipulate the values safely, as if there were all defined.
 * If not all values are defined, only `getOrElse` will be called.
 *
 * @param tuple A tuple (array) containing potentially nullable values.
 * @returns Returns a `Box` with 5 methods, `map`, `filter`, `fold`, `get` and `getOrElse`
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
