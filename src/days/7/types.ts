export type Card =
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | 'T'
  | 'J'
  | 'Q'
  | 'K'
  | 'A'

export enum CardValueWithoutJoker {
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '0T',
  '0J',
  '0Q',
  '0K',
  '0A',
}

export enum CardValueWithJoker {
  '0J',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '0T',
  '0Q',
  '0K',
  '0A',
}

export type Hand = Card[]

export type HandBid = {
  hand: Hand
  bid: number
}

export type Block = {
  [item: string]: number
}
