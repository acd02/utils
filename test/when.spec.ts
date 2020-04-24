import { when, whenAll } from '../src/when/when'

type Item = {
  label: string
  id: number
  info?: string
}

const item: Item | undefined = {
  label: 'ok',
  id: 1,
}

const undefinedItem = (undefined as unknown) as Item | undefined

describe('when', () => {
  describe('map', () => {
    it('should be able to chain calls to the map function (with the last returned value as an argument)', () => {
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
      expect(
        when(undefinedItem)
          .map(i => i.label.toUpperCase())
          .get(),
      ).toEqual(undefined)
    })
  })

  describe('flatMap', () => {
    it('should be able to safely call the function applied on the item passed to the Box', () => {
      const itemWithInfo: Item | undefined = {
        label: 'ok',
        id: 1,
        info: 'some info',
      }

      expect(
        when(item)
          .flatMap(i => when(i.info).map(info => info.toUpperCase()))
          .get(),
      ).toEqual(undefined)

      expect(
        when(itemWithInfo)
          .flatMap(i => when(i.info).map(info => info.toUpperCase()))
          .get(),
      ).toEqual('SOME INFO')

      expect(
        when(undefinedItem)
          .flatMap(i => when(i.info).map(info => info.toUpperCase()))
          .get(),
      ).toEqual(undefined)
    })

    it('should not execute the map function if the value is not truthy', () => {
      expect(
        when(undefinedItem)
          .map(i => i.label.toUpperCase())
          .get(),
      ).toEqual(undefined)
    })
  })

  describe('filter', () => {
    it('should prevent the next call to the map function, or the second argument to the fold function, if the filter function returns false', () => {
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
          .fold(
            () => 'none',
            w => w,
          ),
      ).toEqual('none')
    })

    it('should not prevent the next call to the map function, or the second argument to the fold function, if the filter function returns true', () => {
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
          .fold(
            () => 'none',
            w => w,
          ),
      ).toEqual('OK')
    })
  })

  describe('get', () => {
    it('should return the last returned value', () => {
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
      expect(
        when((undefined as unknown) as Item)
          .map(i => i.label.toUpperCase())
          .filter(w => w.length > 10)
          .fold(
            () => 'none',
            w => w,
          ),
      ).toEqual('none')

      expect(
        when(item)
          .map(i => i.label.toUpperCase())
          .filter(w => w.length > 10)
          .fold(
            () => 'none',
            w => w,
          ),
      ).toEqual('none')
    })

    it('should execute the second function if the last returned value was not defined', () => {
      expect(
        when(item)
          .map(i => i.label.toUpperCase())
          .filter(w => w.length > 1)
          .fold(
            () => 'none',
            w => w,
          ),
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
        .fold(
          () => 'none',
          w => w,
        ),
    ).toEqual('none')

    expect(
      whenAll(['one', 2, 3, 'bar'])
        .map(([word]) => word.toUpperCase())
        .fold(
          () => 'none',
          w => w,
        ),
    ).toEqual('ONE')
  })
})
