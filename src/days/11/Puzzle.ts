import Puzzle from '../../types/AbstractPuzzle'

export default class ConcretePuzzle extends Puzzle {
  expandRows = (lines: string[]): number[] => {
    return Array.from({ length: lines.length }, (_, y) => y)
      .filter((y) => !lines[y].split('').includes('#'))
      .map((y) => Number(y))
  }
  expandColumns = (lines: string[]): number[] => {
    return Array.from({ length: lines[0].length }, (_, x) => x)
      .filter((x) => lines.every((line) => line[x] === '.'))
      .map((x) => Number(x))
  }

  getGalaxyCoordinates = (arr: string[][]) => {
    const coordinates: number[][] = []

    for (let x = 0; x < arr.length; x++) {
      for (let y = 0; y < arr[0].length; y++) {
        if (arr[x][y] === '#') {
          coordinates.push([x, y])
        }
      }
    }

    return coordinates
  }

  getManhattanDistance = (
    a: number[],
    b: number[],
    multiplier,
    expandingRows: number[],
    expandingColumns: number[]
  ) => {
    const [xMin, xMax] = a[0] - b[0] < 0 ? [a[0], b[0]] : [b[0], a[0]]
    const [yMin, yMax] = a[1] - b[1] < 0 ? [a[1], b[1]] : [b[1], a[1]]

    const deltaX =
      xMax -
      xMin +
      (multiplier - 1) *
        expandingRows.filter((row) => xMin < row && row < xMax).length

    const deltaY =
      yMax -
      yMin +
      (multiplier - 1) *
        expandingColumns.filter((col) => yMin < col && col < yMax).length

    return deltaX + deltaY
  }

  public solveFirst(): string {
    let solution = 0
    const lines = this.input.split('\n').filter(Boolean)
    const expandingRows: number[] = this.expandRows(lines)
    const expandingColumns: number[] = this.expandColumns(lines)

    const lines2D = lines.map((line) => line.split(''))
    const galaxyCoordinates = this.getGalaxyCoordinates(lines2D)

    for (let i = 0; i < galaxyCoordinates.length - 1; i++) {
      for (let j = 1; j < galaxyCoordinates.length; j++) {
        if (i < j) {
          solution += this.getManhattanDistance(
            galaxyCoordinates[i],
            galaxyCoordinates[j],
            2,
            expandingRows,
            expandingColumns
          )
        }
      }
    }
    return solution.toString()
  }

  public getFirstExpectedResult(): string {
    return '374'
  }

  public solveSecond(): string {
    let solution = 0
    const lines = this.input.split('\n').filter(Boolean)
    const expandingRows: number[] = this.expandRows(lines)
    const expandingColumns: number[] = this.expandColumns(lines)

    const lines2D = lines.map((line) => line.split(''))
    const galaxyCoordinates = this.getGalaxyCoordinates(lines2D)

    for (let i = 0; i < galaxyCoordinates.length - 1; i++) {
      for (let j = 1; j < galaxyCoordinates.length; j++) {
        if (i < j) {
          solution += this.getManhattanDistance(
            galaxyCoordinates[i],
            galaxyCoordinates[j],
            10 ** 6,
            expandingRows,
            expandingColumns
          )
        }
      }
    }
    return solution.toString()
  }

  public getSecondExpectedResult(): string {
    // return 1030 for multiplier 10
    // return 8410 for multiplier 100
    return '8410'
  }
}
