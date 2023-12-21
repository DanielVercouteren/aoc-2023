import { HeapItem, SetItem } from '../days/17/types'

export const useMinimumHeap = () => {
  const heapPop = (heap): { currentItem: SetItem; heatLoss: number } => {
    const n = heap.length
    ;[heap[0], heap[n - 1]] = [heap[n - 1], heap[0]]

    const removedItem: HeapItem = heap.pop()
    let curr = 0

    while (2 * curr + 1 < heap.length) {
      const leftIndex = 2 * curr + 1
      const rightIndex = 2 * curr + 2
      const minChildIndex =
        rightIndex < heap.length && heap[rightIndex] < heap[leftIndex]
          ? rightIndex
          : leftIndex
      if (heap[minChildIndex] < heap[curr]) {
        ;[heap[minChildIndex], heap[curr]] = [heap[curr], heap[minChildIndex]]
        curr = minChildIndex
      } else {
        break
      }
    }

    return {
      currentItem: removedItem,
      heatLoss: removedItem.heatLoss,
    }
  }

  return {
    heapPop,
  }
}
