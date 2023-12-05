import Puzzle from '../../types/AbstractPuzzle'
import { Digits, SymbolCoordinate } from './types'
export default class ConcretePuzzle extends Puzzle {
  isNearby = (digit: Digits, symbol: SymbolCoordinate) =>
    symbol.x <= digit.x + 1 &&
    symbol.x >= digit.x - 1 &&
    symbol.y >= digit.yStart - 1 &&
    symbol.y <= digit.yEnd + 1

  public solveFirst(): string {
    const digits: Digits[] = []
    const symbols: SymbolCoordinate[] = []

    const lines = this.input.split('\n')
    lines.map((line, idx) => {
      Array.from(line.matchAll(/[^0-9|.]/g)).forEach((match) =>
        symbols.push({
          x: idx,
          y: match.index!,
        })
      )

      Array.from(line.matchAll(/[0-9]+/g)).forEach((match: RegExpMatchArray) =>
        digits.push({
          x: idx,
          yStart: match.index!,
          yEnd: match.index! + match[0].length - 1,
          value: parseInt(match[0]),
        })
      )
    })

    const validDigits = digits.filter((digit) =>
      symbols.some((symbol) => this.isNearby(digit, symbol))
    )

    return validDigits.reduce((acc, digit) => digit.value + acc, 0).toString()
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return '4361'
  }

  public solveSecond(): string {
    const gears: SymbolCoordinate[] = []
    const digits: Digits[] = []

    const lines = this.input.split('\n')
    lines.map((line, idx) => {
      Array.from(line.matchAll(/[0-9]+/g)).forEach((match: RegExpMatchArray) =>
        digits.push({
          x: idx,
          yStart: match.index!,
          yEnd: match.index! + match[0].length - 1,
          value: parseInt(match[0]),
        })
      )

      Array.from(line.matchAll(/\*/g)).forEach((match) =>
        gears.push({
          x: idx,
          y: match.index!,
        })
      )
    })

    const validGears = gears
      .map((gear) => {
        const matchingNumbers = digits.filter((digit) =>
          this.isNearby(digit, gear)
        )
        return {
          isValid: matchingNumbers.length === 2,
          gearRatio: matchingNumbers.reduce(
            (acc, number) => (acc === 0 ? number.value : acc * number.value),
            0
          ),
        }
      })
      .filter((gear) => gear.isValid)

    return validGears.reduce((acc, gear) => acc + gear.gearRatio, 0).toString()
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 1 solution 2'
  }
}
