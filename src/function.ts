/**
 * This function returns undefined.
 *
 */
export function noop() {
  return undefined
}

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked.
 *
 * Provide `immediate` boolean to indicate whether `func` should be invoked on the
 * leading or trailing edge of the `wait` timeout.
 *
 * See [David Corbacho's article](https://bit.ly/1qbVIXw)
 * for details over the differences between `throttle` and `debounce`.
 *
 */
export function debounce(func: Function, wait?: number, immediate?: boolean) {
  let timeout: number | undefined | null

  return function() {
    const context = null
    const args = arguments
    const later = function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout as number)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

type ThrottleParams = {
  leading?: boolean
  trailing?: boolean
}

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds.
 *
 * Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * See [David Corbacho's article](https://bit.ly/1qbVIXw)
 * for details over the differences between `throttle` and `debounce`.
 *
 */
export function throttle(
  func: Function,
  wait: number,
  options: ThrottleParams = { leading: true, trailing: true }
): () => void {
  const context = null

  let args: IArguments | null
  let result: unknown
  let timeout: number | undefined | null | NodeJS.Timeout
  let previous = 0

  const later = function() {
    previous = options.leading === false ? 0 : Date.now()
    timeout = null
    result = func.apply(context, args)
    if (!timeout) args = null
  }

  return function() {
    const now = Date.now()
    if (!previous && options.leading === false) previous = now
    const remaining = wait - (now - previous)
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout as number)
        timeout = null
      }
      previous = now
      result = func.apply(context, args)
      if (!timeout) args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }

    return result
  }
}
