export type Result<E, S> = {
  /**
   * Takes two functions. a first function that will get executed if the value
   * is an `Err`, and a second function, that will get executed if the value
   * is an `Ok`.
   *
   */
  fold<U>(onErr: (a: E) => U, onSuccess: (a: S) => U): U
}

interface Err<E> {
  readonly _tag_: 'Err'
  readonly err: E
}

interface Ok<S> {
  readonly _tag_: 'Ok'
  readonly ok: S
}

// export type Result<E, S> = Err<E> | Ok<S>

export function err<E = never>(e: E): Err<E> {
  return { _tag_: 'Err', err: e }
}

export function ok<S = never>(a: S): Ok<S> {
  return { _tag_: 'Ok', ok: a }
}

function isErr<E, S>(a: Err<E> | Ok<S>): a is Err<E> {
  switch (a._tag_) {
    case 'Err':
      return true
    case 'Ok':
      return false
  }
}

/**
 * Wraps a value of one of two possible types (Result) and returns a `ResultBox` object
 * allowing you to unfold the value to handle both cases.
 *
 * An instance of `Result` is either an instance of Err or Ok.
 * The first type is used for failure (Err), the second for success (OK).
 *
 * @param value A Result (either an Err or OK)
 * @returns Returns a `ResultBox` with 1 method, `fold`
 *
 * @example
 *
 * const data: Result<number, string>
 *
 * fetch('someapi')
 *  .then((res: string) => setData(ok(res)))
 *  .catch((e: number) => setData(err(e)))
 *
 * result(data).fold(
 *   (e) => `the error code is ${e}`,
 *   (s) => `the data is ${s}`
 * )
 *
 */
export function result<E, S>(a: Err<E> | Ok<S>) {
  const self = {} as Result<E, S>

  function fold<U>(onErr: (a: E) => U, onSuccess: (a: S) => U) {
    if (isErr(a)) return onErr(a.err)
    return onSuccess(a.ok)
  }

  self.fold = fold

  return self
}
