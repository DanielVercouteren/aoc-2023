import Puzzle from '../../types/AbstractPuzzle'

export default class ConcretePuzzle extends Puzzle {
  inputToLines = (): string[] =>
    this.input.split('\n').map((line) => line.replace('Game ', ''))

  hasEnoughBalls = (item: string): boolean => {
    const MAX_RED = 12
    const MAX_GREEN = 13
    const MAX_BLUE = 14

    const [amount, color] = item.split(' ')

    switch (color) {
      case 'red':
        return Number(amount) <= MAX_RED
      case 'blue':
        return Number(amount) <= MAX_BLUE
      case 'green':
        return Number(amount) <= MAX_GREEN
      default:
        return false
    }
  }

  getPowerOfMinimumAmountOfBalls = (line: string): number => {
    let MINIMUM_RED = 0
    let MINIMUM_BLUE = 0
    let MINIMUM_GREEN = 0

    if (!line.length) {
      return 0
    }

    const items = line.split(': ')[1].split('; ')

    items.forEach((item) => {
      item.split(', ').map((balls) => {
        const [amount, color] = balls.split(' ')

        switch (color) {
          case 'red':
            MINIMUM_RED = Math.max(MINIMUM_RED, Number(amount))
            break
          case 'blue':
            MINIMUM_BLUE = Math.max(MINIMUM_BLUE, Number(amount))
            break
          case 'green':
            MINIMUM_GREEN = Math.max(MINIMUM_GREEN, Number(amount))
            break
        }
      })
    })

    return MINIMUM_RED * MINIMUM_BLUE * MINIMUM_GREEN
  }

  getValueOfLine = (line: string): number => {
    if (!line.length) {
      return 0
    }

    const value = line.split(':')[0]
    const items = line.split(': ')[1].split('; ')
    let isCorrect = true

    items.forEach((item) => {
      if (!isCorrect) {
        return null
      }

      item.split(', ').map((balls) => {
        if (!isCorrect) {
          return null
        }

        isCorrect = this.hasEnoughBalls(balls)
      })
    })

    return isCorrect ? Number(value) : 0
  }
  public solveFirst(): string {
    let solution = 0
    this.inputToLines().forEach(
      (line) => (solution += this.getValueOfLine(line))
    )
    return solution.toString()
  }

  public getFirstExpectedResult(): string {
    return '8'
  }

  public solveSecond(): string {
    let solution = 0
    this.inputToLines().forEach((line) => {
      solution += this.getPowerOfMinimumAmountOfBalls(line)
    })

    return solution.toString()
  }

  public getSecondExpectedResult(): string {
    return '2286'
  }
}
