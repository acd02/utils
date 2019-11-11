/**
 * This function returns undefined.
 *
 */
export function noop() {
  return undefined
}

/**
 * Runs the given function with the supplied value, then returns the value.
 * Useful for debugging when inside a `pipe` or `compose` function.
 *
 * @example
 *
 * pipe(
 *  filter(w => w !== 'one'),
 *  tap(console.log), // ['two']
 *  map(w => w.toUpperCase())
 * )(['one', 'two'])
 *
 */
export function tap<T>(f: (a: T) => void) {
  return (a: T) => {
    f(a)

    return a
  }
}
