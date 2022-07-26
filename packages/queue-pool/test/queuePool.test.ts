import { describe, expect, test } from 'vitest'
import { QueuePool } from '../dist/index'

describe('queuePool', () => {
  test('excute order', async () => {
    const wait = (time = 1000) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(time)
        }, time)
      })
    }

    const result = await QueuePool([
      () => wait(1000),
      () => wait(1000),
      () => wait(1000),
      () => wait(2000),
    ], 2)

    expect(result).toMatchInlineSnapshot(`
      [
        1000,
        1000,
        1000,
        2000,
      ]
    `)
  })
})
