export type QueueTask = ((...args: any) => Promise<any>)[]

/**
 * @description promise queue pool
 * @param {QueueTask}  queueTask - queue pool
 * @param {number}  limit - limit concurrent number
 */
export function queuePool(queueTask: QueueTask = [], limit = 6) {
  const length = queueTask.length

  const result = Array.from({ length }).fill(false)

  let count = 0

  return new Promise((resolve) => {
    while (count < limit) next()

    function next() {
      const current = count++

      if (current >= length) {
        result.every(Boolean) && resolve(result)
        return
      }

      const currentExcuteFn = queueTask[current]

      if (typeof currentExcuteFn !== 'function') {
        result[current] = {}
        throw Error(`Task with index value ${current} in queue is not a Function !`)
      }

      Promise.resolve(currentExcuteFn())
        .then((res) => {
          result[current] = res
          if (current < length)
            next()
        })
        .catch((error) => {
          result[current] = error
          if (current < length)
            next()
        })
    }
  })
}
