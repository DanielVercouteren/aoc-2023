import Puzzle from '../../types/AbstractPuzzle'
import { useMinimumHeap } from '../../hooks/useMinimumHeap'
import { HeapItem, SetItem } from './types'

export default class ConcretePuzzle extends Puzzle {
  heap: Array<HeapItem> = [
    {
      heatLoss: 0,
      row: 0,
      col: 0,
      rowDirection: 0,
      colDirection: 0,
      numDirection: 0,
    },
  ]
  public solveFirst(): string {
    let solution = 0
    const { heapPop } = useMinimumHeap()
    const grid = this.input
      .split('\n')
      .filter(Boolean)
      .map((line) => line.split('').map((i) => Number(i)))

    const seen: Set<SetItem> = new Set()

    const heapPush = (value) => {
      this.heap.push(value)
      let curr = this.heap.length - 1

      while (curr > 0) {
        const parent = Math.floor((curr - 1) / 2)
        if (this.heap[curr] < this.heap[parent]) {
          ;[this.heap[curr], this.heap[parent]] = [
            this.heap[parent],
            this.heap[curr],
          ]
          curr = parent
        } else {
          break
        }
      }
    }

    while (this.heap) {
      const { currentItem, heatLoss } = heapPop(this.heap)
      const { row, col, rowDirection, colDirection, numDirection } = currentItem

      if (row === grid.length - 1 && col === grid[0].length - 1) {
        solution = heatLoss
        break
      }

      if (seen.has(currentItem)) {
        continue
      } else {
        seen.add(currentItem)
      }

      if (numDirection < 3 && !(rowDirection === 0 && colDirection === 0)) {
        const nextRow = row + rowDirection
        const nextCol = col + colDirection
        if (
          0 <= nextRow &&
          nextRow <= grid.length &&
          0 <= nextCol &&
          nextCol <= grid.length[0]
        ) {
          const newValue: HeapItem = {
            heatLoss: heatLoss + grid[nextCol][nextRow],
            row: nextRow,
            col: nextCol,
            rowDirection: currentItem.rowDirection,
            colDirection: currentItem.colDirection,
            numDirection: currentItem.numDirection + 1,
          }
          heapPush(newValue)
        }
      }

      ;[
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ].forEach(([newRowDirection, newColDirection]) => {
        if (
          !(
            newColDirection === colDirection && newRowDirection === rowDirection
          ) &&
          !(
            newColDirection === -colDirection &&
            newRowDirection === -rowDirection
          )
        ) {
          const nextRow = row + newRowDirection
          const nextCol = col + newColDirection
          if (
            nextRow >= 0 &&
            nextRow <= grid.length &&
            nextCol >= 0 &&
            nextCol <= grid[0].length
          ) {
            const newValue: HeapItem = {
              heatLoss: heatLoss + grid[nextCol][nextRow],
              row: nextRow,
              col: nextCol,
              rowDirection: currentItem.rowDirection,
              colDirection: currentItem.colDirection,
              numDirection: 1,
            }
            heapPush(newValue)
          }
        }
      })
    }
    return solution.toString()
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 'day 1 solution 1'
  }

  public solveSecond(): string {
    // WRITE SOLUTION FOR TEST 2
    return 'day 1 solution 2'
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 1 solution 2'
  }
}
