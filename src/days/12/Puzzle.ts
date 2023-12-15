import Puzzle from '../../types/AbstractPuzzle'

export default class ConcretePuzzle extends Puzzle {
  findPossibilities = (input: string, list: number[]): number => {
    let possibilities = 0
    if (list.length === 0) {
      if (input.includes('#')) {
        return 0
      }
      return 1
    }

    if (input[0] === '.' || input[0] === '?') {
      possibilities += this.findPossibilities(input.substring(1), list)
    }

    if (input[0] === '#' || input[0] === '?') {
      if (
        list[0] <= input.length &&
        !input.substring(0, list[0]).includes('.') &&
        (list[0] === input.length || input[list[0]] !== '#')
      ) {
        if (list[0] === input.length) {
          possibilities += this.findPossibilities('', list.slice(1))
        } else {
          possibilities += this.findPossibilities(
            input.substring(list[0] + 1),
            list.slice(1)
          )
        }
      }
    }

    return possibilities
  }

  solveFirst(): string {
    const lines = this.input.split('\n').filter(Boolean)
    let solution = 0

    lines.forEach((line) => {
      const [input, list] = line.split(' ')
      solution += this.findPossibilities(
        input,
        list.split(',').map((i) => Number(i))
      )
    })

    return solution.toString()
  }

  public getFirstExpectedResult(): string {
    return '21'
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
