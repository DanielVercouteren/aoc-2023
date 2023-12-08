import Puzzle from '../../types/AbstractPuzzle'
import { MapChart } from './types'

export default class ConcretePuzzle extends Puzzle {
  map: MapChart = new Map<string, string[]>()
  instructions = ''

  getNextPosition = (currentPosition: string, count: number) => {
    const shouldGoLeft =
      this.instructions[count % this.instructions.length] === 'L'
    return this.map.get(currentPosition)[shouldGoLeft ? 0 : 1]
  }

  getGreatestCommonDivider = (a: number, b: number): number => {
    while (b !== 0) {
      const temp = b
      b = a % b
      a = temp
    }
    return a
  }

  getLeastCommon = (a: number, b: number): number => {
    return (a * b) / this.getGreatestCommonDivider(a, b)
  }

  getLeastCommonMultiple = (nums: number[]): number => {
    let result = nums[0]
    for (let i = 1; i < nums.length; i++) {
      result = this.getLeastCommon(result, nums[i])
    }
    return result
  }
  public solveFirst(): string {
    const input = this.input.split('\n\n')
    this.instructions = input[0]

    input[1]
      .split('\n')
      .filter(Boolean)
      .forEach((command) => {
        const line = command
          .replaceAll(' ', '')
          .replaceAll('(', '')
          .replaceAll(')', '')
        const start = line.split('=')[0]
        const left = line.split('=')[1].split(',')[0]
        const right = line.split('=')[1].split(',')[1]

        this.map.set(start, [left, right])
      })

    let currentLocation = 'AAA'
    let solution = 0

    while (currentLocation !== 'ZZZ') {
      currentLocation = this.getNextPosition(currentLocation, solution)
      solution++
    }

    return solution.toString()
  }

  public getFirstExpectedResult(): string {
    return '6'
  }

  public solveSecond(): string {
    let nodes = [...this.map.keys()].filter((k) => k.endsWith('A'))
    let nodeDistances = nodes.map((_) => 0)
    let count = 0

    while (!nodeDistances.every((node) => node !== 0)) {
      nodes = nodes.map((k) => this.getNextPosition(k, count))
      nodes.forEach((point, idx) => {
        if (point.endsWith('Z') && nodeDistances[idx] === 0) {
          nodeDistances[idx] = count
        }
      })
      count++
    }
    nodeDistances = nodeDistances.map((node) => node + 1)
    return this.getLeastCommonMultiple(nodeDistances).toString()
  }

  public getSecondExpectedResult(): string {
    return '6'
  }
}
