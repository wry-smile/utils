export async function promisePool(pool: Promise<any>[], limit = 1) {
  const queue: Promise<any>[] = []
  for (let i = 0; i < pool.length; i++) {
    const promise = pool[i]
    queue.push(promise)
    promise.then(() => {
      queue.splice(queue.indexOf(promise), 1)
    })
    if (queue.length === limit)
      await Promise.race(queue)
  }
}
