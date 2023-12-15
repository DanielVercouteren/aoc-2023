import Puzzle from '../../types/AbstractPuzzle'
import { Box } from './types'

export default class ConcretePuzzle extends Puzzle {
  calculateValue = (char: string) => {
    let result = 0
    for (let i = 0; i < char.length; i++) {
      result += char.charCodeAt(i)
      result *= 17
      result %= 256
    }
    return result
  }

  public solveFirst(): string {
    const inputs = this.input.replaceAll('\n', '').split(',').filter(Boolean)
    let currentValue = 0

    inputs.forEach((input) => {
      currentValue += this.calculateValue(input)
    })

    return currentValue.toString()
  }

  public getFirstExpectedResult(): string {
    return '1320'
  }

  public solveSecond(): string {
    const inputs = this.input.replaceAll('\n', '').split(',').filter(Boolean)
    const boxes: Box[][] = []

    inputs.forEach((input) => {
      const label = input.split(/[^a-z]/i)[0]
      const hash = this.calculateValue(label)

      if (!boxes[hash]) {
        boxes[hash] = []
      }

      if (input.includes('=')) {
        const length = Number(input.split('=')[1])
        const lens = boxes[hash].find((lens) => lens.label === label)
        if (lens) {
          lens.length = length
        } else {
          boxes[hash].push({ label, length })
        }
      } else {
        const idx = boxes[hash].findIndex((lens) => lens.label === label)
        if (idx >= 0) {
          boxes[hash].splice(idx, 1)
        }
      }
    })

    let solution = 0

    boxes.forEach((box, idx) => {
      box.forEach((item, slot) => {
        solution += (idx + 1) * (slot + 1) * item.length
      })
    })

    return solution.toString()
  }

  public getSecondExpectedResult(): string {
    return '145'
  }
}
