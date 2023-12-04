import Puzzle from '../../types/AbstractPuzzle'

export default class ConcretePuzzle extends Puzzle {
  calculateMatchPoints = (points: number): number => {
    return Math.pow(2, points - 1)
  }
  public solveFirst(): string {
    let solution = 0
    const cards = this.input
      .split('\n')
      .filter((card) => card.length)
      .map((card) => card.split(': ')[1])

    cards.map((card) => {
      let matches = 0
      const drawnNumbers = card
        .split(' | ')[1]
        .replaceAll('  ', ' ')
        .split(' ')
        .filter((x) => x !== '' && x !== ' ')
      const winningNumbers = card
        .split(' | ')[0]
        .split(' ')
        .filter((x) => x !== '' && x !== ' ')
      drawnNumbers.map(
        (drawnNumber) => winningNumbers.includes(drawnNumber) && matches++
      )

      matches && (solution += this.calculateMatchPoints(matches))
    })
    return solution.toString()
  }
  public getFirstExpectedResult(): string {
    return '13'
  }

  public solveSecond(): string {
    const getSum = (solution: number[]) =>
      solution.reduce((curr: number, acc: number) => {
        return curr + acc
      }, 0)

    const cards = this.input
      .split('\n')
      .filter((card) => card.length)
      .map((card) => card.split(': ')[1])

    const solution: number[] = Array.from({ length: cards.length }, () => 1)

    cards.map((card, idx) => {
      let matches = 0
      const drawnNumbers = card
        .split(' | ')[1]
        .replaceAll('  ', ' ')
        .split(' ')
        .filter((x) => x !== '' && x !== ' ')
      const winningNumbers = card
        .split(' | ')[0]
        .split(' ')
        .filter((x) => x !== '' && x !== ' ')
      drawnNumbers.map(
        (drawnNumber) => winningNumbers.includes(drawnNumber) && matches++
      )

      if (matches) {
        for (let i = idx + 1; i <= idx + matches; i++) {
          solution[i] = solution[i] + solution[idx]
        }
      }
    })
    return getSum(solution).toString()
  }

  public getSecondExpectedResult(): string {
    return '30'
  }
}
