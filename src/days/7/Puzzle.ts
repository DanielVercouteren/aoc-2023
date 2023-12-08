import Puzzle from '../../types/AbstractPuzzle'
import {
  Block,
  Card,
  CardValueWithJoker,
  CardValueWithoutJoker,
  Hand,
  HandBid,
} from './types'

export default class ConcretePuzzle extends Puzzle {
  getHand = (block: Block, matches) => {
    return Object.entries(matches).map((match) => {
      return (
        Object.values(block).filter((item) => item === Number(match[0]))
          .length === match[1]
      )
    })
  }

  isFiveOfAKind = (block: Block) => {
    return this.getHand(block, { 5: 1 })
  }
  isFourOfAKind = (block: Block) => {
    return this.getHand(block, { 4: 1, 1: 1 })
  }

  isFullHouse = (block: Block) => {
    return this.getHand(block, { 3: 1, 2: 1 })
  }

  isThreeOfAKind = (block: Block) => {
    return this.getHand(block, { 3: 1, 1: 2 })
  }
  isTwoPair = (block: Block) => {
    return this.getHand(block, { 2: 2, 1: 1 })
  }
  isOnePair = (block: Block) => {
    return this.getHand(block, { 2: 1, 1: 3 })
  }
  public solveFirst(): string {
    const filterHandToBlock = (hand: Hand) => {
      const sortedBlock: Block = {
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        T: 0,
        J: 0,
        Q: 0,
        K: 0,
        A: 0,
      }
      hand.slice().forEach((card) => (sortedBlock[card] += 1))
      return Object.fromEntries(
        Object.entries(sortedBlock).filter(([_, value]) => !!value)
      )
    }

    const handsToBlocks = (hands: HandBid[]) => {
      const values: Array<HandBid[]> = [[], [], [], [], [], [], []]
      hands.forEach((item) => {
        const block: Block = filterHandToBlock(item.hand)
        if (this.isFiveOfAKind(block)) {
          values[0].push(item)
        } else if (this.isFourOfAKind(block)) {
          values[1].push(item)
        } else if (this.isFullHouse(block)) {
          values[2].push(item)
        } else if (this.isThreeOfAKind(block)) {
          values[3].push(item)
        } else if (this.isTwoPair(block)) {
          values[4].push(item)
        } else if (this.isOnePair(block)) {
          values[5].push(item)
        } else {
          values[6].push(item)
        }
      })
      return values
    }

    const getValues = (hand: Hand) => {
      const values: number[] = []
      hand
        .slice()
        .forEach((card) => values.push(CardValueWithoutJoker[`0${card}`]))
      return values
    }

    const sortHands = (a: Hand, b: Hand) => {
      const valuesA = getValues(a)
      const valuesB = getValues(b)
      let value = 0

      for (let i = 0; i < 5; i++) {
        value = valuesA[i] - valuesB[i]

        if (value !== 0) {
          return value < 0 ? 1 : -1
        }
      }
    }

    const handBids: HandBid[] = []

    const lines = this.input.split('\n').filter(Boolean)
    lines.forEach((line) => {
      const [hand, bid] = line.split(' ')
      const cards = hand.split('') as Card[]
      handBids.push({ hand: cards, bid: Number(bid) })
    })

    const handBlocks = handsToBlocks(handBids)
    handBlocks.forEach((block) => {
      block.sort((a, b) => sortHands(a.hand, b.hand))
    })

    return handBlocks
      .flat()
      .reverse()
      .reduce((acc, curr, idx) => {
        return (acc += curr.bid * (idx + 1))
      }, 0)
      .toString()
  }

  public getFirstExpectedResult(): string {
    return '6440'
  }

  public solveSecond(): string {
    return '?'
  }

  public getSecondExpectedResult(): string {
    return '5905'
  }
}
