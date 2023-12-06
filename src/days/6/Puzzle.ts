import Puzzle from '../../types/AbstractPuzzle'

export default class ConcretePuzzle extends Puzzle {
  getTimes = (line: string) =>
    Array.from(line.replace('Time:', '').matchAll(/\d+/g)).map((item) =>
      Number(item[0])
    )

  getDistances = (line: string) =>
    Array.from(line.replace('Distance:', '').matchAll(/\d+/g)).map((item) =>
      Number(item[0])
    )

  calculateWays = (time: number, record: number) => {
    let ways = 0

    for (let i = 0; i <= time; i++) {
      if ((time - i) * i > record) {
        ways += 1
      }
    }

    return ways
  }
  public solveFirst(): string {
    let solution = 1
    const lines = this.input.split('\n')
    const times = this.getTimes(lines[0])
    const distances = this.getDistances(lines[1])

    for (let i = 0; i < times.length; i++) {
      solution *= this.calculateWays(times[i], distances[i])
    }

    return solution.toString()
  }

  public getFirstExpectedResult(): string {
    return '288'
  }

  public solveSecond(): string {
    const lines = this.input.split('\n')
    const times = this.getTimes(lines[0]).join().replaceAll(',', '')
    const distances = this.getDistances(lines[1]).join().replaceAll(',', '')

    return this.calculateWays(Number(times), Number(distances)).toString()
  }

  public getSecondExpectedResult(): string {
    return '71503'
  }
}
