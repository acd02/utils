import { when, whenAll } from '../src/when/when'

type Item = {
  label: string
  id: number
}

describe('when', () => {
  describe('map', () => {
    it('should be able to chain calls to the map function (with the last returned value as an argument)', () => {
      const item: Item | undefined = {
        label: 'ok',
        id: 1,
      }

      expect(
        when(item)
          .map(i => i.label.toUpperCase())
          .get(),
      ).toEqual('OK')

      expect(
        when(item)
          .map(i => i.label.toUpperCase())
          .map(l => l.length)
          .get(),
      ).toEqual(2)
    })

    it('should not execute the map function if the value is not truthy', () => {
      const item = (undefined as unknown) as Item | undefined

      expect(
        when(item)
          .map(i => i.label.toUpperCase())
          .get(),
      ).toEqual(undefined)
    })
  })

  describe('filter', () => {
    it('should prevent the next call to the map function, or the second argument to the fold function, if the filter function returns false', () => {
      const item: Item | undefined = {
        label: 'ok',
        id: 1,
      }

      expect(
        when(item)
          .map(i => i.label.toUpperCase())
          .filter(w => w.length > 10)
          .map(w => w.length)
          .get(),
      ).toEqual(undefined)

      expect(
        when(item)
          .map(i => i.label.toUpperCase())
          .filter(w => w.length > 10)
          .fold(() => 'none', w => w),
      ).toEqual('none')
    })

    it('should not prevent the next call to the map function, or the second argument to the fold function, if the filter function returns true', () => {
      const item: Item | undefined = {
        label: 'ok',
        id: 1,
      }

      expect(
        when(item)
          .map(i => i.label.toUpperCase())
          .filter(w => w.length > 1)
          .map(w => w.length)
          .get(),
      ).toEqual(2)

      expect(
        when(item)
          .map(i => i.label.toUpperCase())
          .filter(w => w.length > 1)
          .fold(() => 'none', w => w),
      ).toEqual('OK')
    })
  })

  describe('get', () => {
    it('should return the last returned value', () => {
      const item: Item | undefined = {
        label: 'ok',
        id: 1,
      }

      expect(
        when((undefined as unknown) as Item)
          .map(i => i.label.toUpperCase())
          .filter(w => w.length > 10)
          .map(w => w.length)
          .get(),
      ).toEqual(undefined)

      expect(
        when(item)
          .map(i => i.label.toUpperCase())
          .filter(w => w.length > 10)
          .map(w => w.length)
          .get(),
      ).toEqual(undefined)

      expect(
        when(item)
          .map(i => i.label.toUpperCase())
          .filter(w => w.length > 1)
          .map(w => w.length)
          .get(),
      ).toEqual(2)
    })
  })

  describe('getOrElse', () => {
    it('should return a fallback value if the last returned value was not defined', () => {
      const item: Item | undefined = {
        label: 'ok',
        id: 1,
      }

      expect(
        when((undefined as unknown) as Item)
          .map(i => i.label.toUpperCase())
          .filter(w => w.length > 10)
          .map(w => w.length)
          .getOrElse(10),
      ).toEqual(10)

      expect(
        when(item)
          .map(i => i.label.toUpperCase())
          .filter(w => w.length > 10)
          .map(w => w.length)
          .getOrElse(10),
      ).toEqual(10)
    })

    it('should not return a fallback value if the last returned value was defined', () => {
      const item: Item | undefined = {
        label: 'ok',
        id: 1,
      }

      expect(
        when(item)
          .map(i => i.label.toUpperCase())
          .filter(w => w.length > 1)
          .map(w => w.length)
          .getOrElse(10),
      ).toEqual(2)
    })
  })

  describe('fold', () => {
    it('should execute the first function if the last returned value was not defined', () => {
      const item: Item | undefined = {
        label: 'ok',
        id: 1,
      }

      expect(
        when((undefined as unknown) as Item)
          .map(i => i.label.toUpperCase())
          .filter(w => w.length > 10)
          .fold(() => 'none', w => w),
      ).toEqual('none')

      expect(
        when(item)
          .map(i => i.label.toUpperCase())
          .filter(w => w.length > 10)
          .fold(() => 'none', w => w),
      ).toEqual('none')
    })

    it('should execute the second function if the last returned value was not defined', () => {
      const item: Item | undefined = {
        label: 'ok',
        id: 1,
      }

      expect(
        when(item)
          .map(i => i.label.toUpperCase())
          .filter(w => w.length > 1)
          .fold(() => 'none', w => w),
      ).toEqual('OK')
    })
  })
})

describe('whenAll', () => {
  it('should only execute the map function or the second argument to the fold function if all values are truthy', () => {
    expect(
      whenAll(['one', 2, undefined, 'bar'])
        .map(([word]) => word.toUpperCase())
        .get(),
    ).toEqual(undefined)

    expect(
      whenAll(['one', 2, 3, 'bar'])
        .map(([word]) => word.toUpperCase())
        .get(),
    ).toEqual('ONE')

    expect(
      whenAll(['one', 2, undefined, 'bar'])
        .map(([word]) => word.toUpperCase())
        .fold(() => 'none', w => w),
    ).toEqual('none')

    expect(
      whenAll(['one', 2, 3, 'bar'])
        .map(([word]) => word.toUpperCase())
        .fold(() => 'none', w => w),
    ).toEqual('ONE')
  })
})
