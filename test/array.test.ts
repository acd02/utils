import { map } from '../src/array'

describe('map function', () => {
  it('works', () => {
    expect(map<string, string>(i => i.toUpperCase())(['one'])).toEqual(['ONE'])
  })
})
