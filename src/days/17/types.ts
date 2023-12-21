export type SetItem = {
  row: number
  col: number
  rowDirection: number
  colDirection: number
  numDirection: number
}

export type HeapItem = {
  heatLoss: number
} & SetItem
