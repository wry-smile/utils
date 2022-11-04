const heapAdjustFn = (data: number[], i: number, length: number) => {
  let child = 2 * i + 1
  while (child < length) {
    if (child + 1 < length && data[child] < data[child + 1]) child++

    if (data[i] < data[child]) {
      [data[i], data[child]] = [data[child], data[i]]
      i = child
      child = 2 * i + 1
    }
    else {
      break
    }
  }
}

const buildHeapFn = (data: number[]) => {
  const length = data.length
  for (let i = Math.floor(length / 2 - 1); i >= 0; i--)
    heapAdjustFn(data, i, length)
}

const testArray = Array.from({ length: 100 }, () => {
  return Math.floor(Math.random() * 100)
})

const sortHeap = (data: number[]) => {
  buildHeapFn(data)

  for (let i = data.length - 1; i >= 0; i--) {
    [data[0], data[i]] = [data[i], data[0]]
    heapAdjustFn(data, 0, i)
  }
}

// eslint-disable-next-line no-console
console.time('start heap sort')
sortHeap(testArray)
// eslint-disable-next-line no-console
console.timeEnd('start heap sort')
// eslint-disable-next-line no-console
console.log(testArray)

export { sortHeap }
