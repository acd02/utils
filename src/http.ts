import { tryCatch } from 'fp-ts/lib/TaskEither'

// see: https://bit.ly/2JVfEgv
function handleErrors<Err>(res: Response) {
  if (!res.ok) {
    return Promise.reject((res as unknown) as Err)
  } else return Promise.resolve(res)
}

/**
 * Handle GET requests.
 *
 * @example
 *
 * get<Err, Data>('someapi')
 *   .then(data => data.fold(
 *     (e) => console.error(e), // Err
 *     (d) => console.log(d) // Data
 *   ))
 *
 */
export function get<Err, Res>(url: string) {
  return tryCatch<Err, Res>(
    () =>
      window
        .fetch(url)
        .then(handleErrors)
        .then(i => i.json()),
    err => err as Err
  ).run()
}

/**
 * Handle POST requests.
 *
 * @example
 *
 * type BlogPost = {
 * title: string
 * body: string
 * userId: number
 * }
 *
 * const newBlogPost: BlogPost = {
 * title: 'title',
 * body: 'hello',
 * userId: 4
 * }
 *
 * post<BlogPost, Err, Res>(newBlogPost)('someapi')
 *   .then(res => res.fold(
 *     e => console.error(e), // Err
 *     r => console.log(r) // Res
 * ))
 */
export function post<Data, Err, Res>(body: Data) {
  const headers = new Headers({ 'Content-type': 'application/json; charset=UTF-8' })

  return (url: string) =>
    tryCatch<Err, Res>(
      () =>
        window
          .fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
          })
          .then(handleErrors)
          .then(i => i.json()),
      err => err as Err
    ).run()
}
