import Puzzle from '../../types/AbstractPuzzle'

export default class ConcretePuzzle extends Puzzle {
  sum = 0

  allNumbersAreZero = (numbers: number[]): boolean => {
    const x = [...numbers].sort()
    return x[0] === 0 && x[numbers.length - 1] === 0
  }
  calculateNextLine = (numbers: number[]): number => {
    const diff: number[] = []

    for (let i = 1; i < numbers.length; i++) {
      diff.push(numbers[i] - numbers[i - 1])
    }

    this.sum += numbers[numbers.length - 1]
    if (this.allNumbersAreZero(diff)) {
      return
    } else {
      this.calculateNextLine(diff)
    }
  }

  calculatePreviousLine = (numbers: number[], firstItems: number[]): void => {
    const diff: number[] = []

    for (let i = 1; i < numbers.length; i++) {
      diff.push(numbers[i] - numbers[i - 1])
    }
    firstItems.push(diff[0])

    if (this.allNumbersAreZero(diff)) {
      let solution = 0

      for (let i = firstItems.length - 1; i > 0; i--) {
        solution = firstItems[i - 1] - solution
      }

      this.sum += solution
    } else {
      this.calculatePreviousLine(diff, firstItems)
    }
  }

  public solveFirst(): string {
    const lines = this.input.split('\n').filter(Boolean)

    lines.map((line) => {
      const numbers: number[] = line.split(' ').map((i) => Number(i))
      this.calculateNextLine(numbers)
    })
    return this.sum.toString()
  }

  public getFirstExpectedResult(): string {
    return '114'
  }

  public solveSecond(): string {
    this.sum = 0
    const lines = this.input.split('\n').filter(Boolean)

    lines.map((line) => {
      const numbers: number[] = line.split(' ').map((i) => Number(i))
      this.calculatePreviousLine(numbers, [numbers[0]])
    })
    return this.sum.toString()
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return '2'
  }
}
