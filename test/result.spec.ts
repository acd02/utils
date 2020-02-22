import { result, err, ok } from '../src/result/result'

describe('result', () => {
  describe('fold', () => {
    type Error = {
      code: number
    }

    type Success = {
      label: string
    }

    const makeData = (n: number) => {
      if (n > 2) return ok<Success>({ label: 'great' })
      else
        return err<Error>({
          code: 500,
        })
    }

    const errData = makeData(1)
    const successData = makeData(10)

    it('should execute the first function if value is an Err', () => {
      expect(
        result(errData).fold(
          e => e.code,
          s => s.label.length,
        ),
      ).toEqual(500)
    })

    it('should execute the second function if value is an Ok', () => {
      expect(
        result(successData).fold(
          e => e.code,
          s => s.label.length,
        ),
      ).toEqual(5)
    })
  })
})
