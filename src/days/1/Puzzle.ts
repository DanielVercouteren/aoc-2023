import Puzzle from '../../types/AbstractPuzzle'

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const lines = this.input.split('\n')
    let solution = 0

    lines.map((line) => {
      const matches = line.match(/\d/g) || []
      if (matches[0] && matches.at(-1)) {
        solution += Number(`${matches[0]}${matches.at(-1)}`)
      }
    })

    return solution.toString()
  }

  public getFirstExpectedResult(): string {
    return '142'
  }

  public solveSecond(): string {
    const textToNumber = (item: string) => {
      return item
        .replace('one', '1')
        .replace('two', '2')
        .replace('three', '3')
        .replace('four', '4')
        .replace('five', '5')
        .replace('six', '6')
        .replace('seven', '7')
        .replace('eight', '8')
        .replace('nine', '9')
        .replace('zero', '0')
    }
    const lines = this.input.split('\n')

    let solution = 0

    lines.map((line) => {
      const matches = [
        ...line.matchAll(
          /(?=(one|two|three|four|five|six|seven|eight|nine|zero|\d))/g
        ),
      ]
        .map((item) => item[1])
        .map((item) => textToNumber(item))

      if (matches[0] && matches.at(-1)) {
        solution += Number(`${matches[0]}${matches.at(-1)}`)
      }
    })

    return solution.toString()
  }

  public getSecondExpectedResult(): string {
    return 'day 1b solution 2'
  }
}
