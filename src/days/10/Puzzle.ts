import Puzzle from '../../types/AbstractPuzzle'
import { Direction } from './types'

export default class ConcretePuzzle extends Puzzle {
  map: string[][]
  pipeTypes = {
    '|': ['N', 'S'],
    '-': ['W', 'E'],
    L: ['N', 'E'],
    J: ['N', 'W'],
    '7': ['S', 'W'],
    F: ['S', 'E'],
    S: ['N', 'E', 'S', 'W'],
  }

  getNextDirection = (
    pipe: string,
    enteringDirection: Direction
  ): Direction => {
    return this.pipeTypes[pipe].filter((i) => i !== enteringDirection)[0]
  }

  moveDirection = (
    direction: Direction,
    currentPosition: number[]
  ): number[] => {
    console.log(`moving ${direction} from ${currentPosition}`)
    switch (direction) {
      case Direction.N:
        return [(currentPosition[0] -= 1), currentPosition[1]]
      case Direction.E:
        return [currentPosition[0], (currentPosition[1] += 1)]
      case Direction.S:
        return [(currentPosition[0] += 1), currentPosition[1]]
      case Direction.W:
        return [currentPosition[0], (currentPosition[1] -= 1)]
    }
  }

  getPreviousDirection = (direction: Direction): Direction => {
    switch (direction) {
      case Direction.N:
        return Direction.S
      case Direction.E:
        return Direction.W
      case Direction.S:
        return Direction.N
      case Direction.W:
        return Direction.E
    }
  }

  public solveFirst(): string {
    this.map = this.input.split('\n').map((line) => line.split(''))
    let currentPosition = [32, 28]
    let stepsToGoRound = 1
    let previousDirection = Direction.N
    while (true) {
      if (this.map[currentPosition[0]][currentPosition[1]] === 'S') {
        break
      }

      const directionToMove = this.getNextDirection(
        this.map[currentPosition[0]][currentPosition[1]],
        previousDirection
      )
      currentPosition = this.moveDirection(directionToMove, currentPosition)
      previousDirection = this.getPreviousDirection(directionToMove)
      stepsToGoRound++
    }
    return Math.floor(stepsToGoRound / 2).toString()
  }

  public getFirstExpectedResult(): string {
    return '4'
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
